import asyncHandler from "express-async-handler";
import User from "../models/user.js";

// Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  try {
    const user = await User.create({
      email,
      password,
      username,
      dateCreated: new Date(),
      level: 1,
      currentXp: 0,
      completedTopics: {},
      trophies: {},
    });

    res.status(201).json({
      _id: user.id,
      email: user.email,
      username: user.username,
      dateCreated: user.dateCreated,
      level: user.level,
      currentXp: user.currentXp,
      completedTopics: user.completedTopics,
      trophies: user.trophies,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Server error. Could not register user.");
  }
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await User.findOne({ email, password });

  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  res.status(200).json({
    _id: user.id,
    email: user.email,
    username: user.username,
    dateCreated: user.dateCreated,
    level: user.level,
    currentXp: user.currentXp,
    completedTopics: user.completedTopics,
    trophies: user.trophies,
  });
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
});
