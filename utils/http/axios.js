import axios from "axios";
import cookies from "js-cookie";
import { AESDecrypt } from "utils/decrypt";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get(process.env.NEXT_PUBLIC_API_TOKEN_NAME);
    const tokenDecrypt = AESDecrypt(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${tokenDecrypt}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location = "/";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default instance;
