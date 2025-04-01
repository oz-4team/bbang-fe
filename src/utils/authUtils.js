import axios from "axios";
import useUserStore from "../store/userStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

/**토큰 저장*/
export const saveToken = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

/**토큰 가져오기*/
export const getToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const refreshAccessToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            console.error("리프레시 토큰 없음, 자동 로그아웃");
            localStorage.clear();
            useUserStore.getState().logout();
            throw new Error("Refresh token not found");
        }

        const response = await axios.post(
            `${API_BASE_URL}/api/token/refresh/`,
            { refresh: refreshToken },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.data.access) {
            saveToken(response.data.access, refreshToken);
            return response.data.access;
        } else {
            console.error("리프레시 토큰 만료됨, 자동 로그아웃");
            localStorage.clear();
            useUserStore.getState().logout();
            throw new Error("Refresh token expired");
        }
    } catch (error) {
        console.error("토큰 갱신 실패:", error);
        localStorage.clear();
        useUserStore.getState().logout();
        throw error;
    }
};

/** 토큰 삭제 */
export const removeToken = () => {
    ["accessToken", "refreshToken", "lastActivity", "user_info"].forEach((key) =>
        localStorage.removeItem(key)
    );

    if (axios.defaults.headers.common["Authorization"]) {
        delete axios.defaults.headers.common["Authorization"];
    }

};

/** 토큰 만료 여부 검사 */
export const isTokenExpired = () => {
    const token = getToken();
    if (!token) return true;

    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // JWT payload 디코딩
        const now = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
        return payload.exp < now;
    } catch (err) {
        console.error("토큰 디코딩 오류:", err);
        return true;
    }
};
/** 자동 로그아웃 */
export const shouldAutoLogout = () => {
    const lastActivity = localStorage.getItem("lastActivity");
    const now = Date.now();

    return lastActivity && now - parseInt(lastActivity, 10) > 30 * 60 * 1000; // 30분
};
/** 타이머 */
export const initInactivityLogoutTimer = () => {
    let timeout;

    const handleActivity = () => {
        clearTimeout(timeout);
        if (getToken()) {
            localStorage.setItem("lastActivity", Date.now());
        }
        timeout = setTimeout(() => {
            useUserStore.getState().logout();
            removeToken();
        }, 30 * 60 * 1000); // 30분
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("scroll", handleActivity);

    handleActivity(); // 최초 진입 시 타이머 시작

    return () => {
        clearTimeout(timeout);
        window.removeEventListener("mousemove", handleActivity);
        window.removeEventListener("keydown", handleActivity);
        window.removeEventListener("click", handleActivity);
        window.removeEventListener("scroll", handleActivity);
    };
};