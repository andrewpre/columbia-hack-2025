import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    dateCreated: { type: Date, default: Date.now },
    level: { type: Number, default: 1 },
    currentXp: { type: Number, default: 0 },

    trophies: {
      type: Map,
      of: Boolean,
      default: () => ({
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
      }),
    },

    completedTrophies: { type: Map, of: Boolean, default: {} },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
