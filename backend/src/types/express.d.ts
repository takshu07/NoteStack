import { Types } from "mongoose";
declare global {
  namespace Express {
    interface User {
      id: string; // ALWAYS string at request layer
    }

    interface Request {
      user?: User;
    }
  }
}

export {};



