import { create } from "zustand";
import { getToken, getRefreshToken, saveToken, removeToken, refreshAccessToken } from "../utils/authUtils";

//  로컬스토리지에서 사용자 정보 불러오기
const storedUser = JSON.parse(localStorage.getItem("authUser")) || null;
const storedAccessToken = getToken(); //  저장된 액세스 토큰 가져오기
const storedRefreshToken = getRefreshToken(); // 저장된 리프레시 토큰 가져오기

const useUserStore = create((set) => ({
    user: storedUser, // 초기 상태 (유저 정보)
    accessToken: storedAccessToken, //  액세스 토큰 저장
    refreshToken: storedRefreshToken, //  리프레시 토큰 저장
    isAuthenticated: !!storedAccessToken, //  액세스 토큰이 있으면 로그인 유지

    //  로그인 함수 (유저 정보 & 토큰 저장)
    login: (userData, accessToken, refreshToken) => {
        if (!accessToken || !refreshToken) {
            console.error("저장할 토큰이 없습니다. 로그인 실패!");
            return;
        }

        console.log("🎉 로그인 성공! 사용자 정보 저장:", userData); // 디버깅 로그

        localStorage.setItem("authUser", JSON.stringify(userData)); // 유저 정보 저장
        saveToken(accessToken, refreshToken); // 토큰 저장

        set({ 
            user: userData, 
            accessToken: accessToken, 
            refreshToken: refreshToken, 
            isAuthenticated: true 
        });

        // 자동 토큰 갱신 시작
        useUserStore.getState().autoRefreshToken();
    },

    // 로그아웃 함수 (토큰 및 로컬스토리지 데이터 삭제)
    logout: () => {
        if (!getToken() && !getRefreshToken()) {
            console.warn("로그아웃 요청했지만 저장된 토큰 없음.");
            return;
        }

        console.log("로그아웃 실행됨"); // 디버깅 로그
        removeToken(); // 토큰 삭제
        localStorage.removeItem("authUser"); // 유저 정보 삭제

        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });

        // 자동 토큰 갱신 중단
        clearInterval(useUserStore.getState().refreshInterval);
    },

    // 사용자 정보 새로고침 (예: 새로고침 후 상태 복구)
    refreshUser: () => {
        const refreshedUser = JSON.parse(localStorage.getItem("authUser")) || null;
        const refreshedAccessToken = getToken();
        const refreshedRefreshToken = getRefreshToken();

        set({ 
            user: refreshedUser, 
            accessToken: refreshedAccessToken, 
            refreshToken: refreshedRefreshToken, 
            isAuthenticated: !!refreshedAccessToken 
        });

        console.log("사용자 정보 새로고침 완료:", refreshedUser);
    },

    // 액세스 토큰 자동 갱신 (14분마다 실행)
    autoRefreshToken: () => {
        console.log("자동 토큰 갱신 시작...");
        
        const refreshInterval = setInterval(async () => {
            console.log("액세스 토큰 갱신 시도...");
            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
                set({
                    accessToken: newAccessToken,
                    isAuthenticated: true
                });
                console.log("액세스 토큰 갱신 완료!");
            } else {
                console.warn(" 액세스 토큰 갱신 실패! 자동 로그아웃 처리.");
                useUserStore.getState().logout();
            }
        }, 14 * 60 * 1000); // 14분마다 실행

        set({ refreshInterval });
    },
}));

export default useUserStore;