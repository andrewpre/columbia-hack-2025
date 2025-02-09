import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  addXpToUser,
  addTrophy,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/:id", getUser);
router.post("/:id/update", updateUserProfile);
router.post("/:id/add-xp", addXpToUser);
router.post("/:id/add-trophy", addTrophy);

export default router;
