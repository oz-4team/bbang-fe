import axios from "axios";
import { getToken, isTokenExpired, refreshAccessToken } from "../utils/authUtils";

/** 인터셉터 */
export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(async (config) => {
    try {
      const token = getToken();

      if (token && isTokenExpired()) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } else {
          // if refresh fails, clear localStorage and optionally redirect
          localStorage.clear();
        }
      } else if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (err) {
      console.error("❌ 인터셉터 토큰 처리 실패:", err);
      localStorage.clear();
      return config; // fallback
    }
  }, (error) => Promise.reject(error));
};