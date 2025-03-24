import axios from "axios";
import useUserStore from "../store/userStore";
import { removeToken, saveToken } from "../utils/authUtils";

// 백엔드 API URL 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";
const USE_BACKEND = true; // 백엔드 활성화 여부 (false면 목업 데이터 사용)

// [1] 로그인 (백엔드 API or 목업 데이터)
export const loginUser = async (email, password) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/login/`, { email, password });

            if (response.data.access && response.data.refresh) {
                saveToken(response.data.access, response.data.refresh);
                console.log("🔑ddddddd 저장된 액세스 토큰:", response.data.access);
                console.log("🔑ddddddd 저장된 액세스 response:", response);

                const accessTokenParts = response.data.refresh.split('.');
                if (accessTokenParts.length === 3) {
                    const base64Url = accessTokenParts[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const decodedPayload = JSON.parse(atob(base64));
                    console.log("🔓 디코딩된 페이로드:", decodedPayload);
                }
                // 유저 정보 수동 추출
                const userInfo = {
                    email: response.data.email,
                    nickname: response.data.nickname,
                    is_staff: response.data.is_staff,
                    image: response.data.image_url
                };

                // Zustand에 로그인 상태 저장
                useUserStore.getState().login(userInfo, response.data.access, response.data.refresh);
                console.log("🔑duserInfouserInfouserInfouserInfo", userInfo);

                return {
                    user: userInfo,
                    access: response.data.access,
                    refresh: response.data.refresh,
                };
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "로그인 실패");
        }
    }
};

// [2] 로그아웃
export const logoutUser = async () => {
    if (USE_BACKEND) {
        try {
            await axios.post(`${API_BASE_URL}/logout/`);
            useUserStore.getState().logout();
        } catch (error) {
            throw new Error(error.response?.data?.message || "로그아웃 실패");
        }
    }
    useUserStore.getState().logout();
};

// [3] 회원가입 (백엔드 API or 목업 데이터)
export const signupUser = async (userData) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/register/`, userData, {
                headers: { "Content-Type": "application/json" },
            });

            return response.data;
        } catch (error) {
            throw new Error(
                error.response?.data?.message ||
                error.response?.data?.detail || // Django의 기본 오류 메시지 키
                error.message ||
                "회원가입 실패"
              );
        }
    }
};
// [4] 비밀번호 찾기 (백엔드 API or 목업 데이터)
export const sendPasswordResetEmail = async (email) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/password-reset/request/`, { email });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "비밀번호 재설정 요청 실패");
        }
    }
};

// [5] 비밀번호 재설정
export const resetPassword = async (token, newPassword) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/password-reset/reset/`, { token, newPassword });

            removeToken();
            useUserStore.getState().logout();

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "비밀번호 변경 실패");
        }
    }
};

// [6] 프로필 조회
export const fetchUserProfile = async () => {
    if (USE_BACKEND) {
        try {
            const response = await axios.get(`${API_BASE_URL}/profile/`);
            return response.data;
            console.log("🔑profile user data:", response.data);
        } catch (error) {
            throw new Error(error.response?.data?.message || "프로필 정보 가져오기 실패");
        }
    }
    return null;
};

// [7] 프로필 수정
export const updateUserProfile = async (userData) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.patch(`${API_BASE_URL}/profile/`, userData);
            return response.data;

        } catch (error) {
            throw new Error(error.response?.data?.message || "프로필 업데이트 실패");
        }
    }
    return null;
};

// [8] 프로필 삭제
export const deleteUserProfile = async () => {
    if (USE_BACKEND) {
        try {
            await axios.delete(`${API_BASE_URL}/profile/`);
            useUserStore.getState().logout();
        } catch (error) {
            throw new Error(error.response?.data?.message || "프로필 삭제 실패");
        }
    }
};