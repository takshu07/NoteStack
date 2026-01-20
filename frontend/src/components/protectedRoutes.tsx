import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthChecked, error } = useAppSelector((state) => state.auth);

  if (!isAuthChecked) return null;

  if (error) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
