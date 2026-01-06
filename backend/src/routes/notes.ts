import { Router } from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote
} from "../controller/notes.js"

const router = Router();

router.post("/createNotes", createNote);        // Create note
router.get("/getAllNotes", getAllNotes);         // Read all notes
router.get("/getNotesById/:id", getNoteById);      // Read single note
router.put("/updateNoteById/:id", updateNote);       // Update note
router.delete("/deleteNoteById/:id", deleteNote);    // Delete note

export default router;
