import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./auth";

import About from "../pages/about";
import Dashboard from "../pages/dashboard";

import Notes from "@/pages/notes";
import NotesList from "../pages/noteList";
import CreateNote from "../pages/createNote";
import UpdateNote from "../pages/updateNotes";

import CollabPage from "../pages/collab/CollabPage";
import NewCollab from "../pages/collab/NewCollab";
import CollabList from "../components/collab/collabList";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= AUTH ================= */}
      <Route path="/api/auth/*" element={<AuthRoutes />} />

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/about" element={<About />} />

      {/* ================= NOTES ================= */}
     <Route path="/notes" element={<Notes />}>
  <Route index element={<NotesList />} />
  <Route path="create" element={<CreateNote />} />

  {/* 🔴 COLLAB MUST COME BEFORE :id */}
  <Route path="collab">
    <Route index element={<CollabList />} />
    <Route path="new" element={<NewCollab />} />
    <Route path=":id" element={<CollabPage />} />
  </Route>

  {/* 🔴 GENERIC PARAM ROUTE ALWAYS LAST */}
  <Route path=":id" element={<UpdateNote />} />
</Route>


      {/* ================= LEGACY REDIRECTS (SAFE ONLY) ================= */}
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      <Route path="/dashboard/notes" element={<Navigate to="/notes" replace />} />
      <Route path="/dashboard/create" element={<Navigate to="/notes/create" replace />} />
      <Route path="/dashboard/collab" element={<Navigate to="/notes/collab" replace />} />
      <Route path="/dashboard/collab/new" element={<Navigate to="/notes/collab/new" replace />} />

      {/* ❌ REMOVED PARAM REDIRECTS (THE BUG) */}
      {/* /dashboard/notes/:id */}
      {/* /dashboard/collab/:id */}

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
