import connectDb from "./db.js";
import setCors from "./cors.js";
import { ChatHistory } from "../models.js";

const sendMessage = async (req, res) => {
  try {
    setCors(res);

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    await connectDb();

    const { message } = req.body;
    const response = `You sent '${message}', so i'm saying 'Hi User👋🏾'`;
    res.status(200).json({ data: response });
    return;
  } catch (e) {
    res.status(404).json({ data: false });
    console.log(`error finding products: ${e}`);
  }
};

export default sendMessage;
