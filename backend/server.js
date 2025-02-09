import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./database/connect.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Explicitly allow frontend URL
    credentials: true, // Allow cookies and authentication headers
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

const startServer = async () => {
  try {
    await connect();
    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("❌ Server Unable To Launch, Error:", error);
  }
};

startServer();
