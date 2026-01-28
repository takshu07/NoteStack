import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://note-stack-backend.onrender.com/",
  withCredentials: true,
});

export default axiosInstance;
