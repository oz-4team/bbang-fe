import axios from "axios";
import useUserStore from "../store/userStore"; // 사용자 스토어 불러오기

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

//  [1] 액세스 & 리프레시 토큰 저장
export const saveToken = (accessToken, refreshToken) => {
    if (!accessToken || !refreshToken) {
        console.warn("저장하려는 토큰이 없습니다.");
        return;
    }
    localStorage.setItem("authToken", accessToken); // 액세스 토큰 저장
    localStorage.setItem("refreshToken", refreshToken); // 리프레시 토큰 저장
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`; // 자동 헤더 설정
    console.log("🔹 토큰 저장 완료:", { accessToken, refreshToken });
};

// [2] 저장된 액세스 토큰 가져오기
export const getToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.warn("저장된 액세스 토큰이 없습니다.");
        return null;
    }
    return token;
};

// [3] 저장된 리프레시 토큰 가져오기
export const getRefreshToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        console.warn("저장된 리프레시 토큰이 없습니다.");
        return null;
    }
    return refreshToken;
};

// [4] 토큰 삭제 (로그아웃 시 사용)
export const removeToken = () => {
    const accessToken = localStorage.getItem("authToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken && !refreshToken) {
        console.warn("삭제할 토큰이 없습니다.");
        return;
    }

    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");

    if (axios.defaults.headers.common["Authorization"]) {
        delete axios.defaults.headers.common["Authorization"];
        console.log("인증 헤더 삭제 완료");
    }

    console.log("모든 토큰 삭제 완료!");
};

// [5] 액세스 토큰 갱신 (리프레시 토큰 사용)
export const refreshAccessToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            console.error("리프레시 토큰이 없습니다. 자동 로그아웃 처리!");
            useUserStore.getState().logout(); // 로그아웃 실행
            return null;
        }

        const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
        });

        if (response.data.access) {
            console.log("새 액세스 토큰 발급 완료:", response.data.access);
            saveToken(response.data.access, refreshToken); // 새 액세스 토큰 저장
            return response.data.access;
        } else {
            console.error("리프레시 토큰이 만료됨. 자동 로그아웃 처리!");
            useUserStore.getState().logout(); // 로그아웃 실행
            return null;
        }
    } catch (error) {
        console.error("토큰 갱신 실패:", error);
        useUserStore.getState().logout(); // 로그아웃 실행
        return null;
    }
};