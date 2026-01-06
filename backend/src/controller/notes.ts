import type { Request, Response } from "express";
import { Note } from "../models/notes";
/**
 * Create a new note
 */
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    // Important: explicit validation to avoid invalid documents
    if (!title || !content  ) {
      return res.status(400).json({ message: "title, content and owner are required" });
    }

    const note = await Note.create({ title, content });

    return res.status(201).json(note);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create note" });
  }
};

/**
 * Get all notes
 */
export const getAllNotes = async (_req: Request, res: Response) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // createdAt: -1 means to start from latest order by createdAt descending order

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch notes" });
  }
};

/**
 * Get a single note by ID
 */
export const getNoteById = async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json(note);
  } catch (error) {
    return res.status(400).json({ message: "Invalid note ID" });
  }
};

/**
 * Update a note
 */
export const updateNote = async (req: Request, res: Response) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // Important: returns updated document
        runValidators: true // Important: enforces schema rules on update
      }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json(updatedNote);
  } catch (error) {
    return res.status(400).json({ message: "Failed to update note" });
  }
};

/**
 * Delete a note
 */
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Failed to delete note" });
  }
};
