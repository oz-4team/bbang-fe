import axios from "axios";
import useUserStore from "../store/userStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

// 토큰 저장
export const saveToken = (accessToken, refreshToken) => {
    localStorage.setItem("authToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

// 토큰 가져오기 & 갱신
export const getToken = () => localStorage.getItem("authToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const refreshAccessToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            console.error("리프레시 토큰 없음, 자동 로그아웃");
            useUserStore.getState().logout();
            return null;
        }

        const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, { refresh: refreshToken });

        if (response.data.access) {
            saveToken(response.data.access, refreshToken);
            return response.data.access;
        } else {
            console.error("리프레시 토큰 만료됨, 자동 로그아웃");
            useUserStore.getState().logout();
            return null;
        }
    } catch (error) {
        console.error("토큰 갱신 실패:", error);
        useUserStore.getState().logout();
        return null;
    }
};

// 토큰 삭제 (로그아웃 시 사용)
export const removeToken = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");

    if (axios.defaults.headers.common["Authorization"]) {
        delete axios.defaults.headers.common["Authorization"];
    }

    console.log("모든 토큰 삭제 완료!");
};