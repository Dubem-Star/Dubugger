import mongoose from "mongoose";

const connectDb = async () => {
  // 1. If already connected, return immediately
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongoose connected succefully");
  } catch (e) {
    console.error("Error connecting mongoose:", e);

    throw new Error("Unable to connect to the database");
  }
};

export default connectDb;
