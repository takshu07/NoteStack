import axiosInstance from "./axios";
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
    const res = await axiosInstance.post("/auth/login", data);
    return res.data; // { message, token }
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Login failed";
    throw new Error(message);
  }
};

export const registerUser = async (data: RegisterPayload) => {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Registration failed";
    throw new Error(message);
  }
};

export const logoutUser = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};