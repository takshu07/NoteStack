import type { Request, Response } from "express";
import { Note } from "../models/notes.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import mongoose from "mongoose";
/**
 * Create a new note
 */

export const createNote = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content required" });
  }

  const note = await Note.create({
    title,
    content,
    owner: req.user!.id, // 🔐 enforced ownership ------
  });

  res.status(201).json(note);
};

/**
 * Get all notes
 */
export const getAllNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find({ owner: req.user!.id }).sort({ createdAt: -1 }); // createdAt: -1 means to start from latest order by createdAt descending order

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch notes" });
  }
};

/**
 * Get a single note by ID
 */
export const getNoteById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // 🔐 Explicit runtime + type safety check
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const note = await Note.findOne({
      _id: id,
      owner: req.user!.id, // authorized access
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json(note);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};


/**
 * Update a note
 */
export const updateNote = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  // 🔐 Eliminate undefined + invalid ObjectId
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }

  const note = await Note.findOneAndUpdate(
    {
      _id: id,                 // now strictly string
      owner: req.user!.id,     // authorized owner
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!note) {
    return res.status(404).json({ message: "Unauthorized or not found" });
  }

  return res.json(note);
};



/**
 * Delete a note
 */
export const deleteNote = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  // 🔐 Narrow type + validate ObjectId
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }

  const note = await Note.findOneAndDelete({
    _id: id,             // now strictly string
    owner: req.user!.id, // authorized owner
  });

  if (!note) {
    return res.status(404).json({ message: "Unauthorized or not found" });
  }

  return res.json({ message: "Note deleted" });
};

