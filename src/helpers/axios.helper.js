import axios from "axios";

const baseURL = "https://xtube-backend-wuhs.onrender.com/api/v1";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});