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
router.put("/:id/update", updateUserProfile);
router.put("/:id/add-xp", addXpToUser);
router.put("/:id/add-trophy", addTrophy);

export default router;
