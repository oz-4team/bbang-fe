import { create } from "zustand";
import { getToken, getRefreshToken, saveToken, removeToken, refreshAccessToken } from "../utils/authUtils";

const storedUser = JSON.parse(localStorage.getItem("authUser")) || null;
const storedAccessToken = getToken();
const storedRefreshToken = getRefreshToken();

const useUserStore = create((set) => ({
    user: storedUser,
    accessToken: storedAccessToken,
    refreshToken: storedRefreshToken,
    isAuthenticated: !!storedAccessToken,

    login: (userData, accessToken = "mock_access_token", refreshToken = "mock_refresh_token") => {
        if (!accessToken || !refreshToken) {
            console.warn("액세스 토큰과 리프레시 토큰이 없습니다. 목업 로그인 진행.");
        }
    
        console.log("로그인 성공! 사용자 정보 저장:", userData);
        localStorage.setItem("authUser", JSON.stringify(userData));
    
        // 목업 데이터일 경우, 토큰 없이 로그인 유지
        if (accessToken !== "mock_access_token" && refreshToken !== "mock_refresh_token") {
            saveToken(accessToken, refreshToken);
        }
    
        set({ 
            user: userData, 
            accessToken, 
            refreshToken, 
            isAuthenticated: true 
        });
    
        console.log("로그인 상태 업데이트 후:", useUserStore.getState());
    
        // 실제 API 기반 로그인일 때만 자동 토큰 갱신 실행
        if (accessToken !== "mock_access_token") {
            useUserStore.getState().autoRefreshToken();
        }
    },

    logout: async () => {
        if (!getToken() && !getRefreshToken()) {
            console.warn("로그아웃 요청했지만 저장된 토큰 없음.");
            return;
        }

        console.log("로그아웃 실행됨. 현재 상태:", useUserStore.getState());

        await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout/`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${getToken()}` }
        }).catch(() => console.warn("백엔드 로그아웃 실패"));

        removeToken();
        localStorage.removeItem("authUser");

        console.log("토큰 제거 후 상태:", localStorage.getItem("authToken"), localStorage.getItem("refreshToken"));

        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });

        clearInterval(useUserStore.getState().refreshInterval);
    },

    autoRefreshToken: () => {
        console.log("자동 토큰 갱신 시작됨");

        const refreshInterval = setInterval(async () => {
            console.log("액세스 토큰 갱신 시도 중...");
            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
                console.log("새 액세스 토큰:", newAccessToken);
                set({ accessToken: newAccessToken, isAuthenticated: true });
            } else {
                console.warn("토큰 갱신 실패, 자동 로그아웃 실행");
                useUserStore.getState().logout();
            }
        }, 14 * 60 * 1000);
        set({ refreshInterval });
        console.log("갱신 인터벌 설정됨:", refreshInterval);
    },
}));

export default useUserStore;