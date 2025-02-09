import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

// ✅ Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;
