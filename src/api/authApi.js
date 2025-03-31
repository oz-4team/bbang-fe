import axios from "axios";
import useUserStore from "../store/userStore";
import { removeToken, saveToken } from "../utils/authUtils";

// 백엔드 API URL 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";
const USE_BACKEND = true;

/** 로그인 */
export const loginUser = async (email, password) => {
  if (USE_BACKEND) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, { email, password });

      if (response.data.access && response.data.refresh) {
        saveToken(response.data.access, response.data.refresh);

        const userInfo = {
          email: response.data.email,
          nickname: response.data.nickname,
          is_staff: response.data.is_staff,
          image_url: response.data.image_url,
          id: response.data.id,
        };
        localStorage.setItem("user_info", JSON.stringify(userInfo));
        useUserStore.getState().login(userInfo, response.data.access, response.data.refresh);

        return {
          user: userInfo,
          access: response.data.access,
          refresh: response.data.refresh,
        };
      }
    } catch (error) {
      console.error("❌ 로그인 실패:", error.response?.data);
      throw new Error(error.response?.data?.message || "로그인 실패");
    }
  }
};

/** 로그아웃 */
export const logoutUser = async () => {
  if (USE_BACKEND) {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await axios.post(`${API_BASE_URL}/logout/`, { refresh: refreshToken }, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.warn("⚠️ 로그아웃 중 에러:", error);
    }
  }

  useUserStore.getState().logout();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user_info");
  localStorage.removeItem("signupFormData");
  localStorage.removeItem("lastActivity");
};

/** 회원가입 */
export const signupUser = async (userData) => {
  if (USE_BACKEND) {
    try {
      const response = await axios.post(`${API_BASE_URL}/register/`, userData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("❌ 회원가입 실패:", error.response?.data);
      if (error.response?.data?.email) {
        throw new Error(error.response.data.email[0] || "이미 가입된 이메일입니다.");
      }
      throw new Error(
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.message ||
        "회원가입 실패"
      );
    }
  }
};

/** 비밀번호 재설정 이메일 요청 */
export const sendPasswordResetEmail = async (email) => {
  if (USE_BACKEND) {
    try {
      const response = await axios.post(`${API_BASE_URL}/password-reset/request/`, { email });
      return response.data;
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "비밀번호 재설정 요청 실패";
      console.error("❌ 비밀번호 재설정 요청 실패:", msg);
      throw new Error(msg);
    }
  }
};

/** 비밀번호 재설정 */
export const resetPassword = async (token, newPassword) => {
  if (USE_BACKEND) {
    try {
      const payload = { token, password: newPassword };
      const response = await axios.post(`${API_BASE_URL}/password-reset/reset/`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      removeToken();
      return response.data;
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "비밀번호 변경 실패";
      console.error("❌ 비밀번호 재설정 실패:", msg);
      throw new Error(msg);
    }
  }
};

/** 프로필 조회 */
export const fetchUserProfile = async () => {
  if (USE_BACKEND) {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile/`);
      return response.data;
    } catch (error) {
      console.error("❌ 프로필 가져오기 실패:", error);
      throw new Error(error.response?.data?.message || "프로필 정보 가져오기 실패");
    }
  }
  return null;
};

/** 프로필 수정 */
export const updateUserProfile = async (userData) => {
  if (USE_BACKEND) {
    try {
      let response;
      if (userData.image_url) {
        const formData = new FormData();
        if (userData.image_url) formData.append("image_url", userData.image_url);
        if (userData.password) formData.append("password", userData.password);
        if (userData.nickname) formData.append("nickname", userData.nickname);
        if (userData.current_password) formData.append("current_password", userData.current_password);
        response = await axios.patch(`${API_BASE_URL}/profile/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        const jsonData = {
          nickname: userData.nickname,
          password: userData.password || undefined,
          current_password: userData.current_password || undefined,
        };

        response = await axios.patch(`${API_BASE_URL}/profile/`, jsonData, {
          headers: { "Content-Type": "application/json" },
        });
      }

      if (![200, 204].includes(response.status)) {
        console.error("❌ 응답 상태코드 문제:", response.status);
        throw new Error("서버 응답 오류: 프로필 수정 실패");
      }

      console.log("✅ 프로필 업데이트 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ 프로필 수정 실패:", error.response?.data);
      throw new Error(error.response?.data?.message || "프로필 업데이트 실패");
    }
  }
  return null;
};

/** 프로필 삭제 */
export const deleteUserProfile = async () => {
  if (USE_BACKEND) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/profile/`, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "프로필 삭제 실패");
    }
  }
};
