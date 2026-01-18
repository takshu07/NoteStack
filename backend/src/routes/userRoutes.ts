import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { User } from "../models/user.js";

const router = Router();

router.get("/", authMiddleware, async (_req, res) => {
  const users = await User.find().select("_id name email");
  res.json(users);
});

export default router;
