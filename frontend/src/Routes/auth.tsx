import { Routes, Route } from "react-router-dom";
import Register from "../pages/register";
import Login from "../pages/login";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default AuthRoutes;
