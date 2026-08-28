import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid";

const chatHistorySchema = new mongoose.Schema(
  {
    chatId: { type: String, default: "anon_session_8f93a" },
    messages: [{ role: { type: String }, content: { type: String } }],
  },

  { timestamps: true },
);

export const ChatHistory = mongoose.model("Chat", chatHistorySchema);
