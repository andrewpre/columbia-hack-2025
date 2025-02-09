import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

// ✅ Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error("User with this email already exists.");
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400);
    throw new Error("Username is already taken. Please choose another one.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      email,
      password,
      username,
      dateCreated: new Date(),
      level: 1,
      currentXp: 0,
      trophies: {
        "Intro to Sign Language": false,
        "Finger Spelling": false,
        "Basic Phrases": false,
        "Numbers & Counting": false,
        "Common Gestures": false,
        "Novice Learner": false,
        "Advanced Scholar": false,
        "Level 5 Achiever": false,
        "Level 10 Master": false,
        "XP Champion": false,
      },
      completedTrophies: {},
    });

    res.status(201).json({ userId: user._id });
  } catch (error) {
    res.status(500).json({
      message: "Server error. Could not register user.",
      error: error.message,
    });
  }
});

// ✅ Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.status(200).json({ userId: user._id });
});

// ✅ Get User Profile
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    _id: user._id,
    email: user.email,
    username: user.username,
    level: user.level,
    currentXp: user.currentXp,
    trophies: user.trophies, // ✅ Full list of trophies
    completedTrophies: user.completedTrophies, // ✅ Only earned trophies
    dateCreated: user.dateCreated,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
});

// ✅ Logout User
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out successfully" });
});

// ✅ Calculate XP needed for next level with progressive scaling
export const calculateXpForNextLevel = (level) => {
  return Math.floor(50 + level * 50 * Math.pow(1.15, level - 1));
};

// ✅ Function to check & award trophies automatically
export const checkForTrophies = async (user) => {
  let updated = false;

  if (!user.trophies) user.trophies = {};
  if (!user.completedTrophies) user.completedTrophies = {};

  console.log(
    `🟡 Checking trophies for User: ${user.username} (Level: ${user.level})`
  );

  const trophyConditions = {
    "Novice Learner": Object.keys(user.completedTrophies).length >= 5,
    "Advanced Scholar": Object.keys(user.completedTrophies).length >= 10,
    "Level 5 Achiever": user.level >= 5,
    "Level 10 Master": user.level >= 10,
    "XP Champion": user.currentXp >= 500,
  };

  for (const [trophy, condition] of Object.entries(trophyConditions)) {
    if (condition && !user.completedTrophies[trophy]) {
      console.log(`🏆 Awarding trophy: ${trophy} to ${user.username}`);
      user.completedTrophies[trophy] = true;
      user.trophies[trophy] = true;
      updated = true;
    }
  }

  if (updated) {
    await user.save();
    console.log(`✅ Trophies Updated in DB:`, user.completedTrophies);
  } else {
    console.log(`⚠️ No new trophies awarded.`);
  }
};

// ✅ Add XP to User & Handle Leveling
export const addXpToUser = asyncHandler(async (req, res) => {
  const { xpEarned } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  console.log(
    `🟡 Adding XP: ${xpEarned} to User: ${user.username} (Current XP: ${user.currentXp}, Level: ${user.level})`
  );

  user.currentXp += xpEarned;
  let xpForNextLevel = calculateXpForNextLevel(user.level);
  let leveledUp = false;

  while (user.currentXp >= xpForNextLevel) {
    user.currentXp -= xpForNextLevel;
    user.level += 1;
    xpForNextLevel = calculateXpForNextLevel(user.level);
    leveledUp = true;
    console.log(`🔼 User leveled up! New Level: ${user.level}`);
  }

  await checkForTrophies(user);

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        level: user.level,
        currentXp: user.currentXp,
        trophies: user.trophies,
        completedTrophies: user.completedTrophies,
      },
    },
    { new: true }
  );

  console.log(
    `✅ Final User State: Level: ${updatedUser.level}, XP: ${updatedUser.currentXp}`
  );
  res.status(200).json(updatedUser);
});

// ✅ Add Trophy to User and award XP
export const addTrophy = asyncHandler(async (req, res) => {
  const { trophyName, xpEarned } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const validTrophies = [
    "Intro to Sign Language",
    "Finger Spelling",
    "Basic Phrases",
    "Numbers & Counting",
    "Common Gestures",
    "Novice Learner",
    "Advanced Scholar",
    "Level 5 Achiever",
    "Level 10 Master",
    "XP Champion",
  ];

  if (
    !trophyName ||
    typeof trophyName !== "string" ||
    trophyName.trim() === "" ||
    !validTrophies.includes(trophyName.trim())
  ) {
    res.status(400);
    throw new Error("Invalid trophy name. Trophy does not exist.");
  }

  const trophyKey = trophyName.trim();

  user.trophies = user.trophies || new Map();
  user.completedTrophies = user.completedTrophies || new Map();

  if (user.completedTrophies.get(trophyKey)) {
    return res.status(200).json({
      message: "Trophy already earned",
      user,
    });
  }

  user.trophies.set(trophyKey, true);
  user.completedTrophies.set(trophyKey, true);
  user.currentXp += xpEarned;

  let xpForNextLevel = calculateXpForNextLevel(user.level);
  while (user.currentXp >= xpForNextLevel) {
    user.currentXp -= xpForNextLevel;
    user.level += 1;
    xpForNextLevel = calculateXpForNextLevel(user.level);
  }

  await checkForTrophies(user);

  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
});

// ✅ Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (username) {
    user.username = username;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    email: updatedUser.email,
    username: updatedUser.username,
    level: updatedUser.level,
    currentXp: updatedUser.currentXp,
    trophies: updatedUser.trophies,
    completedTrophies: updatedUser.completedTrophies,
    dateCreated: updatedUser.dateCreated,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
  });
});
