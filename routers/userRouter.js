import express from "express";
import { signup, login, protect } from "../controllers/authController.js";
import {
  getMe,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/login", login);
router.patch("/update-me", protect, getMe, updateUser);
router.get("/get-me", protect, getMe, getUserById);
router.get("/:id", protect, getUserById);

export default router;
