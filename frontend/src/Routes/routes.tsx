import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./auth";
import Dashboard from "../pages/dashboard";
import CreateNote from "../pages/createNote";
import NotesList from "../pages/noteList";
import UpdateNote from "../pages/updateNotes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/api/auth/*" element={<AuthRoutes />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="create" element={<CreateNote />} />
        <Route path="notes" element={<NotesList />} />
        <Route path="notes/:id" element={<UpdateNote />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
