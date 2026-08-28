import connectDb from "./db.js";
import setCors from "./cors.js";
import { ChatHistory } from "../models.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const sendMessage = async (req, res) => {
  try {
    setCors(res);

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    await connectDb();
    const { message } = req.body;

    // Get and Update the Chat History from Database (Prompt)
    // let chat = await ChatHistory.findOne({ chatId: "anon_session_8f93a" });
    // if (chat) {
    //   chat = await ChatHistory.findOneAndUpdate(
    //     { chatId: "anon_session_8f93a" },
    //     {
    //       $push: { messages: { role: "user", content: message } },
    //     },
    //     { new: true },
    //   );
    // } else {
    const chat = await ChatHistory.create(
      {
        chatId: "anon_session_8f93a",
        messages: [{ role: "user", content: message }],
      },

      // { new: true },
    );
    // }

    // Send the prompt to Gemini API
    const formattedContent = chat.messages.map((msg) => {
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
    res.status(404).json({ data: false, e: e });
    console.log(`error finding products: ${e}`);
  }
};

export default sendMessage;
