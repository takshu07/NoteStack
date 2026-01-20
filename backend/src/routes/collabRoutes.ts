import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { startCollab } from "../controller/collabController.js";
import { getMyCollabs } from "../controller/collabController.js";
import { deleteCollab } from "../controller/collabController.js";
const router = Router();

router.post("/start", authMiddleware, startCollab);
router.get("/my", authMiddleware, getMyCollabs);
router.delete("/:id", authMiddleware, deleteCollab);

export default router;
