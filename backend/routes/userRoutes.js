import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser); // ✅ This should now match /api/user/register
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
