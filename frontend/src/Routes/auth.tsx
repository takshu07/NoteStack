import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/register";
import Login from "../pages/login";
const AuthRoutes = () => {
  return (
    <Routes>
      {/* Default auth route */}
      <Route path="/" element={<Navigate to="login" replace />} />

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default AuthRoutes;
