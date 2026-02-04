import axios from "axios";

const axiosInstance = axios.create({
  // ✅ Use local backend for development
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/",
  withCredentials: true,
});

export default axiosInstance;
