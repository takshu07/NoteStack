import type { Response, NextFunction } from "express";
import type { Request } from "express";
import { verifyToken } from "../utility/jwtUtility.js";
import { User } from "../models/user.js";

export interface AuthRequest extends Request {
  user?: {
    id: string; // INTERNAL MongoDB _id
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 🔐 READ TOKEN FROM COOKIE (NOT HEADER)
    const token = req.cookies?.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // ✅ Verify JWT
    const decoded = verifyToken(token);
    // decoded contains: email, userUUID

    // 🔐 Resolve public UUID → internal MongoDB _id
    const user = await User.findOne({
      userUUID: decoded.userUUID,
    }).select("_id");

    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // Attach ONLY internal ID
    req.user = { id: user._id.toString() };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
