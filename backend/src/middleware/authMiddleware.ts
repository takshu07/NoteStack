import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utility/jwtUtility.js";
import { User } from "../models/user.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const decoded = verifyToken(token);
    // decoded: { email, userUUID }

    const user = await User.findOne({
      userUUID: decoded.userUUID,
    }).select("_id");

    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // ✅ SAFE: string assigned to string
    req.user = { id: user._id.toString() };

    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
