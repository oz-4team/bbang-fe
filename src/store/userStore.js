import { create } from "zustand";
import { getToken, saveToken, removeToken } from "../utils/authUtils";

// 로컬스토리지에서 사용자 정보 불러오기
const storedUser = JSON.parse(localStorage.getItem("authUser")) || null;
const storedToken = getToken(); // 저장된 토큰 가져오기

const useUserStore = create((set) => ({
    user: storedUser, // 초기 상태 (유저 정보)
    token: storedToken, // 토큰 저장
    isAuthenticated: !!storedToken, // 토큰이 있으면 로그인 유지

    // 로그인 함수 (유저 정보 & 토큰 저장)
    login: (userData, token) => {
        console.log("🎉 로그인 성공! 사용자 정보 저장:", userData); // 디버깅용 로그
        localStorage.setItem("authUser", JSON.stringify(userData)); // 유저 정보 저장
        saveToken(token); // 토큰 저장

        set({ user: userData, token: token, isAuthenticated: true });
    },

    // 로그아웃 함수 (토큰 및 로컬스토리지 데이터 삭제)
    logout: () => {
        console.log("🚪 로그아웃 실행됨"); // 디버깅용 로그
        removeToken(); // 토큰 삭제
        localStorage.removeItem("authUser"); // 유저 정보 삭제
        set({ user: null, token: null, isAuthenticated: false });
    },
}));

export default useUserStore;