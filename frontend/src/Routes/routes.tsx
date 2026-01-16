import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./auth";
import Dashboard from "../pages/dashboard"; // example protected page

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* App routes */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
