import asyncHandler from "express-async-handler";
import User from "../models/user.js";

export const getLeaderboard = asyncHandler(async (req, res) => {
  const { leaderboardLimit = 10 } = req.query;

  const topUsers = await User.find()
    .sort({ level: -1, currentXp: -1 })
    .limit(Number(leaderboardLimit));

  res.status(200).json(
    topUsers.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      level: user.level,
      currentXp: user.currentXp,
    }))
  );
});
