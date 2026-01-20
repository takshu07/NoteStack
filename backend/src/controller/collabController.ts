import type { Request, Response } from "express";
import CollabNote from "../models/collabNote";

export const startCollab = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { userId } = req.body;

  // 🔥 FORCE UNIQUE USERS
  const users = Array.from(
    new Set([req.user.id, userId])
  );

  const collab = await CollabNote.create({
    users,
    title: "",
    content: "",
  });

  res.status(201).json(collab);
};



// controllers/collabController.ts

export const getMyCollabs = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const collabs = await CollabNote.find({
    users: req.user.id,
  })
    .populate("users", "name")
    .select("_id title users");

  res.json(collabs);
};


export const deleteCollab = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params;

  const collab = await CollabNote.findOneAndDelete({
    _id: id,
    users: req.user.id, // 🔐 only participant can delete
  });

  if (!collab) {
    return res.status(404).json({ message: "Collab not found" });
  }

  res.json({ message: "Collab deleted" });
};
