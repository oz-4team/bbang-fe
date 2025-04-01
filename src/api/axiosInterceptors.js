import axios from "axios";
import { getToken, isTokenExpired, refreshAccessToken } from "../utils/authUtils";

/** 인터셉터 */
export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(async (config) => {
    try {
      const token = getToken();

      if (token && isTokenExpired()) {
        const newAccessToken = await refreshAccessToken(); // will throw if failed
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } else if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (err) {
      console.error("❌ 인터셉터 토큰 처리 실패:", err);
      localStorage.clear();
      window.location.href = "/login";
      return config;
    }
  }, (error) => Promise.reject(error));
};