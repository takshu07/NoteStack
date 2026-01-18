import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { startCollab } from "../controller/collabController.js";

const router = Router();

router.post("/start", authMiddleware, startCollab);

export default router;
