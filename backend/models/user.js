import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    level: {
      type: Number,
      default: 1, // Default starting level
    },
    currentXp: {
      type: Number,
      default: 0, // Starting XP
    },
    completedTopics: {
      type: Map, // A flexible key-value storage for topics
      of: Boolean,
      default: {}, // Default empty object
    },
    trophies: {
      type: Map, // Key-value structure for trophies
      of: Boolean,
      default: {}, // Default empty object
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// ✅ Fix: Use `export default`
const User = mongoose.model("User", UserSchema);
export default User;
