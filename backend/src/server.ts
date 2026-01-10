import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import authRoutes  from "./routes/notes.js";
import noteRoutes from "./routes/notes.js";
dotenv.config();

/* =========================
   Database
========================= */
connectDB();

/* =========================
   Routes
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (_req, res) => {
  res.send("NoteStack API running");
});

/* =========================
   Server
========================= */
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
