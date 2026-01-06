import { Router } from "express";
import {Register,Login} from "../controller/authController.js"

import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote
} from "../controller/notes.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register",Register)
router.post("/login",Login)

router.post("/createNotes",authMiddleware, createNote);        // Create note
router.get("/getAllNotes",authMiddleware, getAllNotes);         // Read all notes
router.get("/getNotesById/:id",authMiddleware, getNoteById);      // Read single note
router.put("/updateNoteById/:id", authMiddleware,updateNote);       // Update note
router.delete("/deleteNoteById/:id",authMiddleware, deleteNote);    // Delete note

export default router;
