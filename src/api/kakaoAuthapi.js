import axios from "axios";
import { saveToken, getToken } from "../utils/authUtils";
import useUserStore from "../store/userStore";

// 백엔드 주소 및 환경 변수 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";
const USE_BACKEND = true; // 백엔드 활성화 여부

// Kakao 인증 URL (리다이렉트 URI에는 provider 정보 없이 설정)
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:5173/auth/kakao/callback/&response_type=code`;

// Kakao 로그인 함수
export const exchangeKakaoToken = async (authCode, navigate) => {
    if (!authCode) {
        console.error("🚨 Kakao 인가 코드가 없습니다!");
        return;
    }

    if (USE_BACKEND) {
        try {
          
            // 백엔드에 인가 코드 전달 (POST 요청)
            const response = await axios.post(`${API_BASE_URL}/auth/kakao/callback/`, {
                code: authCode,
            });


            // 응답 데이터에서 토큰 및 사용자 정보를 추출
            const { access_token: accessToken, refresh_token: refreshToken, nickname, is_staff } = response.data;

            // 사용자 정보 또는 토큰이 없으면 에러 발생
            if (!nickname || !accessToken || !refreshToken) {
                console.error("🚨 Kakao 로그인 응답 누락: 사용자 정보 또는 토큰 없음");
                localStorage.clear();
                window.location.reload();
                throw new Error("Kakao 로그인 실패: 필수 정보 누락");
            }

            // 토큰 저장 및 사용자 로그인 처리
             // 토큰 저장 및 로그인 처리
        saveToken(accessToken, refreshToken);
        const userInfo = {
            email: response.data.email,
            nickname: response.data.nickname,
            image_url: response.data.image_url,
            id: response.data.id,
            is_staff: response.data.is_staff,
        };
        useUserStore.getState().login(userInfo, accessToken, refreshToken);
            // 로그인 성공 후 페이지 이동
            if (navigate) {
                navigate("/");
            } else {
                console.warn("⚠️ navigate 함수가 제공되지 않음. 페이지 이동 실패");
            }

            return response.data;
        } catch (error) {
            console.error("🚨 Kakao 로그인 처리 중 오류 발생:", error);
            localStorage.clear();
            window.location.reload();
        }
    }
};