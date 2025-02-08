import mongoose from "mongoose";
import dotenv from "dotenv";

const connect = async () => {
  try {
    console.log("Connecting to MongoDB...\n");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔗 MongoDB connected Successfully");
  } catch (error) {
    console.log("❌ MongoDB connection failed", error.message);
  }
};

export { connect };
