import axios from "axios";
import { setupInterceptorsTo } from "./axiosInterceptors";

let axiosInstance = axios.create({
  baseURL: "http://localhost:5144/",
  headers: {
    "Content-type": "application/json",
  },
});

setupInterceptorsTo(axiosInstance);

export default axiosInstance;
