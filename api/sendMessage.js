import connectDb from "./db.js";
import setCors from "./cors.js";
import { ChatHistory } from "../models.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Groq } from "groq-sdk";
let formattedContent = [];

const sendMessage = async (req, res) => {
  try {
    setCors(res);

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    await connectDb();
    const { message } = req.body;

    // Get and Update the Chat History from Database (Prompt)
    let chat = await ChatHistory.findOne({ chatId: "anon_session_8f93a" });
    if (chat) {
      chat = await ChatHistory.findOneAndUpdate(
        { chatId: "anon_session_8f93a" },
        {
          $push: { messages: { role: "user", content: message } },
        },
        { new: true },
      );
    } else {
      chat = await ChatHistory.create({
        chatId: "anon_session_8f93a",
        messages: [{ role: "user", content: message }],
      });
    }

    // Send the message to Gemini API
    formattedContent = chat.messages.map((msg) => {
      return { role: msg.role, parts: [{ text: msg.content }] };
    });
    const apiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent`,
      { contents: formattedContent },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      },
    );

    // Get and Update the Chat History from Database (Response)
    const aiReply =
      apiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    const updatedChat = await ChatHistory.findOneAndUpdate(
      { chatId: "anon_session_8f93a" },
      {
        $push: { messages: { role: "model", content: aiReply } },
      },
      { new: true },
    );

    // Send final data to frontend
    res.status(200).json({ data: updatedChat });
    return;
  } catch (e) {
    if (e.response?.status === 429 || e.response?.status === 503) {
      try {
        // Send the message to Groq API as a fallback
        const groq = new Groq();
        formattedContent = formattedContent.map((msg) => {
          return {
            role: msg.role === "model" ? "assistant" : msg.role,
            content: msg.parts[0].text,
          };
        });

        const cappedContent = formattedContent.slice(-30);

        const chatCompletion = await groq.chat.completions.create({
          messages: cappedContent,
          model: "openai/gpt-oss-120b",
          temperature: 1,
          max_completion_tokens: 2048,
          top_p: 1,
          stream: false,
          reasoning_effort: "medium",
          stop: null,
        });

        // Get and Update the Chat History from Database (Response)
        const aiReply =
          chatCompletion.choices[0].message.content || "No response generated.";

        const updatedChat = await ChatHistory.findOneAndUpdate(
          { chatId: "anon_session_8f93a" },
          {
            $push: { messages: { role: "model", content: aiReply } },
          },
          { new: true },
        );
        // Send final data to frontend
        res.status(200).json({ data: updatedChat });
      } catch (e) {
        let error = "An error occurred while sending the message.";
        if (e.status === 429 || e.status === 503) {
          error = "The server is currently overloaded. Please try again later.";
        }
        res.status(500).json({ data: false, error: error });

        console.error("Status:", e.status);
        console.error("Provider Response Data:", e.message);
      }
    }
  }
};

export default sendMessage;
