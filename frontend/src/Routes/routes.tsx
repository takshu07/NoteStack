import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./auth";
import Dashboard from "../pages/dashboard";
import CreateNote from "../pages/createNote";
import NotesList from "../pages/noteList";
import UpdateNote from "../pages/updateNotes";
import CollabPage from "../pages/collab/CollabPage";
import NewCollab from "../pages/collab/NewCollab";
import CollabList from "../components/collab/collabList";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/api/auth/*" element={<AuthRoutes />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="create" element={<CreateNote />} />
        <Route path="notes" element={<NotesList />} />
        <Route path="notes/:id" element={<UpdateNote />} />

        {/* 🔹 Collab Routes */}
<Route path="collab/new" element={<NewCollab />} />
  <Route path="collab" element={<CollabList />} />
  <Route path="collab/:id" element={<CollabPage />} />      </Route>
    </Routes>
  );
};

export default AppRoutes;
