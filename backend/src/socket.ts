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

// 🔁 real-time sync ONLY
socket.on("collab-update", ({ collabId, title, content }) => {
  socket.to(collabId).emit("collab-updated", {
    title,
    content,
  });
});


socket.on("collab-save", async ({ collabId, title, content }) => {
  console.log("SAVE RECEIVED", collabId);

  await CollabNote.findByIdAndUpdate(collabId, {
    title,
    content,
    updatedAt: new Date(),
  });

  // 🔥 GUARANTEED DELIVERY
  io.to(collabId).emit("collab-saved"); // other users
  socket.emit("collab-saved");          // sender (YOU)
});




  });
};
