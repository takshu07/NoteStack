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
    const res = await axiosInstance.post("/api/auth/login", data,{
      withCredentials: true,
    }); // Include cookies in requests
    return res.data; // { message, token }
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Login failed";
    throw new Error(message);
  }
};

export const registerUser = async (data: RegisterPayload) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", data);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Registration failed";
    throw new Error(message);
  }
};

export const logoutUser = async () => {
  const res = await axiosInstance.post("/api/auth/logout");
  return res.data;
};