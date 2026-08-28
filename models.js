import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid";

const chatHistorySchema = new mongoose.Schema(
  {
    chatId: { Type: String, default: "anon_session_8f93a" },
    messages: [{ Type: String }],
  },

  { timestamps: true },
);

export const ChatHistory = mongoose.model("Chat", chatHistorySchema);
