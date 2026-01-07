import type { Response, NextFunction } from "express";
import { verifyToken } from "../utility/jwtUtility.js";
import { User } from "../models/user.js";
import type { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string; // INTERNAL MongoDB _id (important) //-------
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];

if (!token) {
  res.status(401).json({ message: "Invalid token format" });
  return;
}

const decoded = verifyToken(token); // ✅ token is now string

    // decoded contains: email, userUUID

    // 🔐 Resolve public UUID → internal MongoDB _id
    const user = await User.findOne({ userUUID: decoded.userUUID }).select("_id"); //-------

    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // Attach ONLY internal ID to request
    req.user = { id: user._id.toString() };

    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
