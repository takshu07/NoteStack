import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utility/jwtUtility.js";

export interface AuthRequest extends Request {
  user?: {
    email: string;
    userUUID: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Invalid token format" });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // attach user info to request object
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
