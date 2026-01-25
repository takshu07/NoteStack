import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import App from "./App";
import AuthRoutes from "./Routes/auth";

import About from "./pages/about";
import Dashboard from "./pages/dashboard";

import Notes from "@/pages/notes";
import NotesHome from "./pages/notesHome";
import CreateNote from "./pages/createNote";
import UpdateNote from "./pages/updateNotes";
import CollabList from "./components/collab/collabList";
import CollabPage from "./pages/collab/CollabPage";
import NewCollab from "./pages/collab/NewCollab";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      {/* ================= AUTH ================= */}
      <Route path="/api/auth/*" element={<AuthRoutes />} />

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/about" element={<About />} />

      {/* ================= NOTES ================= */}
      <Route path="/notes" element={<Notes />}>
        {/* ✅ HOME: NOTES + COLLABS */}
        <Route index element={<NotesHome />} />

        <Route path="create" element={<CreateNote />} />

        {/* ===== COLLAB ROUTES ===== */}
        <Route path="collab">
          <Route index element={<CollabList />} />
          <Route path="new" element={<NewCollab />} />
          <Route path=":id" element={<CollabPage />} />
        </Route>

        {/* ===== UPDATE NOTE ===== */}
        <Route path=":id" element={<UpdateNote />} />
      </Route>

      {/* ================= LEGACY REDIRECTS ================= */}
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      <Route path="/dashboard/notes" element={<Navigate to="/notes" replace />} />
      <Route path="/dashboard/create" element={<Navigate to="/notes/create" replace />} />
      <Route path="/dashboard/collab" element={<Navigate to="/notes/collab" replace />} />
      <Route path="/dashboard/collab/new" element={<Navigate to="/notes/collab/new" replace />} />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);
