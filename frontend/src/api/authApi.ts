import axiosInstance from "./axios";
import { socket } from "../socket/socket";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  try {
    const res = await axiosInstance.post(
      "/api/auth/login",
      data,
      { withCredentials: true }
    );
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Login failed"
    );
  }
};

export const registerUser = async (data: RegisterPayload) => {
  try {
    const res = await axiosInstance.post(
      "/api/auth/register",
      data,
      { withCredentials: true }
    );
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Registration failed"
    );
  }
};

export const logoutUser = async () => {
  const res = await axiosInstance.post(
    "/api/auth/logout",
    {},
    { withCredentials: true }
  );
  socket.disconnect();
  return res.data;
};

// ✅ USED BY checkAuthThunk
export const checkAuth = async () => {
  const res = await axiosInstance.get(
    "/api/auth/me",
    { withCredentials: true }
  );
  return res.data;
};
