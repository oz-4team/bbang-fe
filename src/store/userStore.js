import { create } from "zustand";

// ✅ Zustand 상태 관리
const useUserStore = create((set) => ({
  user: null, // 현재 로그인된 사용자 정보
  isAuthenticated: false, // 로그인 여부

  // ✅ 로그인 함수
  login: (userData) => set({ user: userData, isAuthenticated: true }),

  // ✅ 로그아웃 함수
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export default useUserStore;