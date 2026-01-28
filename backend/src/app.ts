import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://note-stack-frontend-psi.vercel.app", "http://localhost:5173", "http://localhost:5174" ], // frontend URL
    credentials: true,               // 🔑 REQUIRED
  })
);

export default app;
