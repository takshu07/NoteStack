import { Server, Socket } from "socket.io";
import CollabNote from "./models/collabNote.js";

export const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.on("join-collab", async ({ collabId }) => {
      socket.join(collabId);

      const note = await CollabNote.findById(collabId);
      socket.emit("init-content", note?.content || "");
    });

   socket.on("join-collab", async ({ collabId }) => {
  socket.join(collabId);

  const collab = await CollabNote.findById(collabId);
  socket.emit("init-collab", {
    title: collab?.title || "",
    content: collab?.content || "",
  });
});

socket.on("collab-update", async ({ collabId, title, content }) => {
  await CollabNote.findByIdAndUpdate(collabId, {
    title,
    content,
    updatedAt: new Date(),
  });

  socket.to(collabId).emit("collab-updated", {
    title,
    content,
  });
});

  });
};
