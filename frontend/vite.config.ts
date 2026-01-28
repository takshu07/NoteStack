import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port : 5173,
    host: 'note-stack-frontend-psi.vercel.app',
    allowedHosts: ['note-stack-frontend-psi.vercel.app', 'note-stack-backend.onrender.com', 'localhost']
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify('https://note-stack-backend.onrender.com/'),
    'import.meta.env.VITE_API_URL': JSON.stringify('https://note-stack-backend.onrender.com/')
  },
});
