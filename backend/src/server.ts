import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import authRoutes  from "./routes/notes.js";
import noteRoutes from "./routes/notes.js";
import { initSocket } from "./socket.js";
import userRoutes from "./routes/userRoutes.js";
import collabRoutes from "./routes/collabRoutes.js";

dotenv.config();


connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.use("/users", userRoutes);
app.use("/collab", collabRoutes);



app.get("/", (_req, res) => {
  res.send("NoteStack API running");
});


const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initSocket(server);


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
