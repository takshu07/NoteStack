import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utility/jwtUtility.js";
import { User } from "../models/user.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
      };
    }
  }
}

export interface AuthRequest extends Request {}

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
    }).select("_id name email");

    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // ✅ attach minimal safe user info
    req.user = { id: user._id.toString(), name: user.name, email: user.email };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
