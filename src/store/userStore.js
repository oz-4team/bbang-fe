import { create } from "zustand";
import { getToken, getRefreshToken, saveToken, removeToken, refreshAccessToken } from "../utils/authUtils";

const storedUser = JSON.parse(localStorage.getItem("authUser")) || null;
const storedAccessToken = getToken();
const storedRefreshToken = getRefreshToken();

const useUserStore = create((set, get) => ({
    user: storedUser,
    accessToken: storedAccessToken,
    refreshToken: storedRefreshToken,
    isAuthenticated: !!storedAccessToken || storedUser !== null,

    login: (userData, accessToken, refreshToken) => {
        console.log("로그인 시도: ", userData);

        if (!accessToken || !refreshToken) {
            console.error("🚨 액세스 토큰 또는 리프레시 토큰이 없습니다. 로그인 실패!");
            return;
        }

        localStorage.setItem("authUser", JSON.stringify(userData));
        saveToken(accessToken, refreshToken);

        set({ 
            user: userData, 
            accessToken, 
            refreshToken, 
            isAuthenticated: true 
        });

        console.log("✅ 로그인 성공! 사용자 정보 저장됨.");

        if (accessToken !== "mock_access_token") {
            get().autoRefreshToken();
        }
    },

    logout: async () => {
        if (!getToken() && !getRefreshToken()) {
            console.warn("🚨 로그아웃 요청했지만 저장된 토큰 없음.");
            return;
        }

        console.log("🚪 로그아웃 실행");

        try {
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout/`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${getToken()}` }
            });
        } catch (error) {
            console.warn("⚠️ 백엔드 로그아웃 요청 실패:", error);
        }

        removeToken();
        localStorage.removeItem("authUser");

        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });

        if (get().refreshInterval) {
            clearInterval(get().refreshInterval);
            set({ refreshInterval: null });
        }
    },

    autoRefreshToken: () => {
        console.log("🔄 자동 토큰 갱신 시작");

        if (get().refreshInterval) {
            clearInterval(get().refreshInterval);
        }

        const refreshInterval = setInterval(async () => {
            console.log("🔄 액세스 토큰 갱신 시도...");
            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
                set({ accessToken: newAccessToken, isAuthenticated: true });
                console.log("✅ 액세스 토큰 갱신 완료!");
            } else {
                console.warn("🚨 토큰 갱신 실패, 자동 로그아웃 실행");
                get().logout();
            }
        }, 14 * 60 * 1000);

        set({ refreshInterval });
    },
}));

export default useUserStore;