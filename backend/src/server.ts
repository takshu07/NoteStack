import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/notes.js";
import userRoutes from "./routes/userRoutes.js";
import collabRoutes from "./routes/collabRoutes.js";
import { initSocket } from "./socket.js";

dotenv.config();
connectDB();

// ✅ AUTH ROUTES (single source of truth)
app.use("/api/auth", authRoutes);

// other routes
app.use("/api/notes", noteRoutes);
app.use("/users", userRoutes);
app.use("/collab", collabRoutes);

app.get("/", (_req, res) => {
  res.send("NoteStack API running");
});

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
