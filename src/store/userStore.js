import { create } from "zustand";
import {
  getRefreshToken,
  getToken,
  refreshAccessToken,
  removeToken,
  saveToken,
} from "../utils/authUtils";

const storedAccessToken = getToken();
const storedRefreshToken = getRefreshToken();

const useUserStore = create((set, get) => ({
  user: null,
  accessToken: storedAccessToken,
  refreshToken: storedRefreshToken,
  isAuthenticated: !!storedAccessToken,

  login: (userData, accessToken, refreshToken) => {

    if (!accessToken || !refreshToken) {
      console.error("🚨 액세스 토큰 또는 리프레시 토큰이 없습니다. 로그인 실패!");
      return;
    }

    // ✅ 유효한 userData만 저장
    if (typeof userData !== "object" || !userData.email) {
      return;
    }

    saveToken(accessToken, refreshToken);

    set({
      user: {
        ...userData,
        image_url: userData.image_url || userData.image || "", 
      },
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });

    localStorage.setItem("user_info", JSON.stringify(userData));

    if (accessToken !== "mock_access_token") {
      get().autoRefreshToken();
    }
  },

  logout: () => {

    removeToken();
    localStorage.removeItem("lastActivity");
    localStorage.removeItem("is_staff");
    localStorage.removeItem("user_info");
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });

    if (get().refreshInterval) {
      clearInterval(get().refreshInterval);
      set({ refreshInterval: null });
    }
  },

  autoRefreshToken: () => {

    if (get().refreshInterval) {
      clearInterval(get().refreshInterval);
    }

    const refreshInterval = setInterval(async () => {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        set({ accessToken: newAccessToken, isAuthenticated: true });
        
      } else {
        console.warn("🚨 토큰 갱신 실패, 자동 로그아웃 실행");
        get().logout();
      }
    }, 14 * 60 * 1000); // 14분마다 갱신

    set({ refreshInterval });
  },

  setUser: (newUserInfo) =>
    set((state) => ({
      user: { ...state.user, ...newUserInfo },
    })),
}));

export default useUserStore;