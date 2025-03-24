// src/api/axiosInterceptors.js
import axios from "axios";
import { getToken, isTokenExpired, refreshAccessToken } from "../utils/authUtils";

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(async (config) => {
    const token = getToken();

    if (token && isTokenExpired()) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      }
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }, (error) => Promise.reject(error));
};