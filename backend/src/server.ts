import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db";
import noteRoutes from "./routes/notes.js";
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();

    app.use("/api/notes", noteRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
