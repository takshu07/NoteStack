import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify('https://note-stack-backend.vercel.app/'),
    'import.meta.env.VITE_API_URL': JSON.stringify('https://note-stack-backend.vercel.app/')
  },
});
