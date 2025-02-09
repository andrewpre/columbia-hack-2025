import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./database/connect.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRoutes);

const startServer = async () => {
  try {
    await connect();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("❌ Server Unable To Launch, Error:", error);
  }
};

startServer();
