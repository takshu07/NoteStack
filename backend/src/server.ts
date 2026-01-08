import { Server } from "socket.io";
import http from "http"; // for socket.io server setup
import jwt from "jsonwebtoken";
import { User } from "./models/user";
import type{ // for socket.io types
  ClientToServerEvents,
  ServerToClientEvents,
} from "./socket/types/socket.js";

interface JwtPayload { // for JWT payload typing
  userUUID: string;
  email: string;
}

export const initSocket = (server: http.Server) => { 
  const io = new Server< // for socket.io generics
    ClientToServerEvents,
    ServerToClientEvents
  >(server, {
    cors: { origin: "*" },
  });

  // 🔐 Socket authentication using JWT
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;

      // Resolve public UUID → internal MongoDB _id
      const user = await User.findOne({ userUUID: decoded.userUUID }).select("_id");

      if (!user) {
        return next(new Error("Unauthorized"));
      }

      // Attach internal identity to socket
      socket.data.userId = user._id.toString();
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Client joins their private room
    socket.on("join", () => {
      socket.join(socket.data.userId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};
