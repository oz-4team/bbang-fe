import { create } from "zustand";
import { getToken, removeToken } from "../utils/authUtils";

// ✅ 로컬스토리지에서 사용자 정보 불러오기
const storedUser = JSON.parse(localStorage.getItem("authUser")) || null;

const useUserStore = create((set) => ({
    user: storedUser, // ✅ 초기 상태를 로컬스토리지에서 가져옴
    isAuthenticated: !!getToken(), // ✅ 로그인 유지

    // ✅ 로그인 함수 (유저 정보 & 토큰 저장)
    login: (userData) => {
        localStorage.setItem("authUser", JSON.stringify(userData)); // ✅ 로그인 정보 로컬스토리지에 저장
        set({ user: userData, isAuthenticated: true });
    },

    // ✅ 로그아웃 함수 (토큰 및 로컬스토리지 데이터 삭제)
    logout: () => {
        removeToken(); // ✅ 토큰 삭제
        localStorage.removeItem("authUser"); // ✅ 로컬스토리지에서도 사용자 정보 삭제
        set({ user: null, isAuthenticated: false });
    },
}));

export default useUserStore;