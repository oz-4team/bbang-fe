// loginGoogle.js
import axios from "axios";
import useUserStore from "../store/userStore";
import { saveToken } from "../utils/authUtils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";
const USE_BACKEND = true; // 백엔드 활성화 여부

// Google 인증 URL (리다이렉트 URI에 provider 정보 없이 설정)
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=https://idolsync.kro.kr/auth/google/callback/&response_type=code&scope=email&prompt=select_account`;
// Google 로그인 함수
export const exchangeGoogleToken = async (authCode, navigate) => {
    if (!authCode) {
        console.error("🚨 Google 인가 코드가 없습니다!");
        return;
    }

    try {

        // 백엔드에 인가 코드 전달 (POST 요청)
        const response = await axios.post(`${API_BASE_URL}/auth/google/callback/`, {
            code: authCode,
        });


        // 응답 데이터에서 토큰 및 사용자 정보를 추출
        const { accessToken: accessToken, refreshToken: refreshToken, email, is_staff } = response.data;

        if (!email || !accessToken || !refreshToken) {
            console.error("🚨 Google 로그인 응답 누락: email/token 정보 없음");
            localStorage.clear();
            window.location.reload();
            throw new Error("Google 로그인 실패: 정보 누락");
        }

        // 토큰 저장 및 로그인 처리
        saveToken(accessToken, refreshToken);
        useUserStore.getState().login({ email, is_staff }, accessToken, refreshToken);
        localStorage.setItem("is_staff", is_staff ? "true" : "false");
        console.log("🎉 Google 로그인 성공! 사용자 정보 저장됨:", email);

        if (navigate) {
            navigate("/");
        } else {
            console.warn("⚠️ navigate 함수가 제공되지 않음. 페이지 이동 실패");
        }

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "🚨 Google 소셜 로그인 중 오류 발생";
        console.error("🚨 Google 소셜 로그인 실패:", errorMessage);
        localStorage.clear();
        window.location.reload();
    }
};