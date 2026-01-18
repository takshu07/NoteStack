import type { Request, Response } from "express";
import CollabNote from "../models/collabNote.js";

export const startCollab = async (req: Request, res: Response) => {
   console.log("🔥 startCollab HIT", req.body);
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { userId } = req.body;      // clicked user
  const myId = req.user.id;         // logged-in user

  // 🔁 Check if collab already exists
  let collab = await CollabNote.findOne({
    users: { $all: [myId, userId] },
  });

  // ➕ Create if not exists
  if (!collab) {
    collab = await CollabNote.create({
      users: [myId, userId],
      content: "",
    });
  }

  res.json(collab); // returns _id
};
