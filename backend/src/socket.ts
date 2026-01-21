import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import CollabNote from "./models/collabNote.js";

export const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("🔌 Socket connected:", socket.id);

    // ================= JOIN COLLAB =================
    socket.on("join-collab", async ({ collabId }: { collabId: string }) => {
      if (!mongoose.Types.ObjectId.isValid(collabId)) {
        console.error("❌ Invalid collabId:", collabId);
        return;
      }

      const collab = await CollabNote.findById(collabId);
      if (!collab) {
        console.error("❌ Collab not found:", collabId);
        return;
      }

      socket.join(collabId);

      socket.emit("init-collab", {
        title: collab.title,
        content: collab.content,
      });

      console.log(`✅ Joined collab ${collabId}`);
    });

    // ================= REAL-TIME UPDATE =================
    socket.on(
      "collab-update",
      ({ collabId, title, content }: { collabId: string; title: string; content: string }) => {
        if (!mongoose.Types.ObjectId.isValid(collabId)) return;

        socket.to(collabId).emit("collab-updated", {
          title,
          content,
        });
      }
    );

    // ================= SAVE =================
    socket.on(
      "collab-save",
      async ({ collabId, title, content }: { collabId: string; title: string; content: string }) => {
        if (!mongoose.Types.ObjectId.isValid(collabId)) return;

        await CollabNote.findByIdAndUpdate(collabId, {
          title,
          content,
          updatedAt: new Date(),
        });

        io.to(collabId).emit("collab-saved");
      }
    );

    socket.on("disconnect", () => {
      console.log("🔌 Socket disconnected:", socket.id);
    });
  });
};
