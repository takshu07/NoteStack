import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://note-stack-backend.vercel.app/",
  withCredentials: true,
});

export default axiosInstance;
