import axios from "axios";
import { saveToken } from "../utils/authUtils";
import useUserStore from "../store/userStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://your-backend.com/api"
const USE_BACKEND = false; // ✅ 백엔드 활성화 여부

export const GOOGLE_AUTH_URL = `${API_BASE_URL}/auth/google`;
export const KAKAO_AUTH_URL = `${API_BASE_URL}/auth/kakao`;
export const NAVER_AUTH_URL = `${API_BASE_URL}/auth/naver`;

// ✅ [소셜 로그인 후 백엔드에서 토큰 받아오기]
export const exchangeSocialToken = async (provider, authCode) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/social-login`, { provider, authCode });

            if (response.data.token) {
                saveToken(response.data.token);
                useUserStore.getState().login(response.data.user);
            }

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "소셜 로그인 실패");
        }
    }

    // ✅ 목업 데이터 (테스트용)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: `mock_social_token_${provider}`,
                user: { id: Math.floor(Math.random() * 1000), name: `${provider} 사용자`, email: `${provider}@mock.com` },
            });
        }, 1000);
    });
};