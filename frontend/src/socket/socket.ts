import { io, Socket } from "socket.io-client";

export const socket: Socket = io(
  "https://note-stack-backend.vercel.app/",
  { withCredentials: true }
);

console.log("🚀 Socket initializing with URL:", "https://note-stack-backend.vercel.app/");
