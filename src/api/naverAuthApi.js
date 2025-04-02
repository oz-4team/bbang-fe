// loginNaver.js
import axios from "axios";
import useUserStore from "../store/userStore";
import { saveToken } from "../utils/authUtils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";
const USE_BACKEND = true; // 백엔드 활성화 여부

// Naver 인증 URL (리다이렉트 URI에 provider 정보 없이 설정)
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&redirect_uri=https://idolsync.kro.kr/auth/naver/callback/&response_type=code&prompt=login`;

// Naver 로그인 함수
export const exchangeNaverToken = async (authCode, navigate) => {
    if (!authCode) {
        console.error("🚨 Naver 인가 코드가 없습니다!");
        return;
    }

    try {

        // 백엔드에 인가 코드 전달 (POST 요청)
        const response = await axios.post(`${API_BASE_URL}/auth/naver/callback/`, {
            code: authCode,
            state: "null",
        });

        // 응답 데이터에서 토큰 및 사용자 정보를 추출
        const { accessToken: accessToken, refresh_token: refreshToken, nickname } = response.data;

        if (!nickname || !accessToken || !refreshToken) {
            console.error("🚨 Naver 로그인 응답 누락: 사용자 정보 또는 토큰 없음");
            localStorage.clear();
            throw new Error("Naver 로그인 실패: 필수 정보 누락");
        }

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
        localStorage.setItem("is_staff", response.data.is_staff ? "true" : "false");
        console.log("🎉 Naver 로그인 성공! 사용자 정보 저장됨:", nickname);

        if (navigate) {
            navigate("/");
        } else {
            console.warn("⚠️ navigate 함수가 제공되지 않음. 페이지 이동 실패");
        }

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "🚨 Naver 소셜 로그인 중 오류 발생";
        console.error("🚨 Naver 소셜 로그인 실패:", errorMessage);
        localStorage.clear();
    }
};