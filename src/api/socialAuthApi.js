import axios from "axios";
import { saveToken, getToken } from "../utils/authUtils";
import useUserStore from "../store/userStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";
const USE_BACKEND = false; // 백엔드 활성화 여부

// 소셜 로그인 요청 URL (프론트에서 클릭 시 이동하는 URL)
export const GOOGLE_AUTH_URL = `${API_BASE_URL}/auth/google/callback/`;
export const KAKAO_AUTH_URL = `${API_BASE_URL}/auth/kakao/callback/`; // 슬래시 추가
export const NAVER_AUTH_URL = `${API_BASE_URL}/auth/naver/callback/`;

// 인가 코드 받아서 백엔드로 전송 후 액세스 & 리프레시 토큰 받기
export const exchangeSocialToken = async (provider, authCode, navigate) => {
    if (USE_BACKEND) {
        try {
            console.log(`${provider} 로그인 코드 확인:`, authCode);

            // 백엔드에 인가 코드 전달 (POST 요청)
            const response = await axios.post(`${API_BASE_URL}/auth/${provider}/callback/`, {
                code: authCode
            });

            console.log("백엔드 응답:", response.data);

            // 백엔드에서 accessToken과 refreshToken을 함께 받음
            const { access_token: accessToken, refresh_token: refreshToken, user } = response.data;

            if (accessToken && refreshToken) {
                saveToken(accessToken, refreshToken);
                useUserStore.getState().login(user, accessToken, refreshToken);
                console.log("로그인 성공! 사용자 정보 저장됨:", user);
                console.log("저장된 액세스 토큰:", getToken());
            }

            // 모든 과정이 완료된 후 페이지 이동
            if (navigate) {
                navigate("/");
            } else {
                console.warn("navigate 함수가 제공되지 않음. 페이지 이동 실패");
            }

            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "소셜 로그인 중 예상치 못한 오류가 발생했습니다.";
            console.error("소셜 로그인 실패:", errorMessage);
            alert(errorMessage);
            throw new Error(errorMessage);
        }
    }
};