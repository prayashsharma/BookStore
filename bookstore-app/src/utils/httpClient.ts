import axios from "axios";
import { setupInterceptorsTo } from "./axiosInterceptors";

let axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BOOKSTORE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

setupInterceptorsTo(axiosInstance);

export default axiosInstance;
