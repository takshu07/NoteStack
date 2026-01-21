import { Router } from "express";
import {Register,Login ,Logout} from "../controller/authController.js"

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
router.post("/logout",Logout)
router.use(authMiddleware);

router.post("/createNotes", createNote);        // Create note
router.get("/getAllNotes", getAllNotes);         // Read all notes
router.get("/getNotesById/:id", getNoteById);      // Read single note
router.put("/:id", updateNote);
router.delete("/deleteNoteById/:id", deleteNote);    // Delete note

export default router;
