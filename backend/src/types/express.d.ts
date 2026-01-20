import type { Types } from "mongoose";

declare global {
  namespace Express {
    interface User {
      id: string;                 // ✅ always present (string for frontend)
      _id?: Types.ObjectId;        // optional mongoose id
      email?: string;
    }

    interface Request {
      user?: User;                // attached by authMiddleware
    }
  }
}

export {};
