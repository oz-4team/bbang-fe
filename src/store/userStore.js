import { create } from "zustand";
import { getToken } from "../utils/authUtils";

// Zustand 상태 관리
const useUserStore = create((set) => ({
    user: null,
    isAuthenticated: !!getToken(), // ✅ 로그인 유지

    // ✅ 로그인 함수
    login: (userData) => set({ user: userData, isAuthenticated: true }),

    // ✅ 로그아웃 함수
    logout: () => {
        set({ user: null, isAuthenticated: false });
    },
}));

export default useUserStore;