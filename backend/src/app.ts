import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin:[ "https://note-stack-frontend-psi.vercel.app"], // frontend URL
    credentials: true,               // 🔑 REQUIRED
  })
);
export default app;