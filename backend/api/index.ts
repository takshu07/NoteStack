import app from "../src/app.js";
import dotenv from "dotenv";
import connectDB from "../src/config/db.js";
import authRoutes from "../src/routes/authRoutes.js";
import noteRoutes from "../src/routes/notes.js";
import userRoutes from "../src/routes/userRoutes.js";
import collabRoutes from "../src/routes/collabRoutes.js";

dotenv.config();

// Connect to database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/users", userRoutes);
app.use("/collab", collabRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "NoteStack API running", version: "1.0.0" });
});

app.get("/api", (_req, res) => {
  res.json({ message: "NoteStack API running", version: "1.0.0" });
});

// Export for Vercel serverless
export default app;
