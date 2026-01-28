import type { Request, Response } from "express";
import { User } from "../models/user.js";
export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find().select("_id name email");
  res.json(users);
};
