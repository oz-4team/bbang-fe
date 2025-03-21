// loginGoogle.js
import axios from "axios";
import { saveToken, getToken } from "../utils/authUtils";
import useUserStore from "../store/userStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";
const USE_BACKEND = true; // 백엔드 활성화 여부

// Google 인증 URL (리다이렉트 URI에 provider 정보 없이 설정)
export const GOOGLE_AUTH_URL = `http://accounts.google.com/o/oauth2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:5173/auth/google/callback/&response_type=code&scope=email`;
// Google 로그인 함수
export const exchangeGoogleToken = async (authCode, navigate) => {
    if (!authCode) {
        console.error("🚨 Google 인가 코드가 없습니다!");
        return;
    }

    try {
        console.log("✅ Google 로그인 코드 확인:", authCode);
        console.log(`🔗 POST 요청 전송: ${API_BASE_URL}/auth/google/callback/`);
        console.log("📨 전송 데이터:", { code: authCode });

        // 백엔드에 인가 코드 전달 (POST 요청)
        const response = await axios.post(`${API_BASE_URL}/auth/google/callback/`, {
            code: authCode,
        });

        console.log("📩 백엔드 응답:", response.data);

        // 응답 데이터에서 토큰 및 사용자 정보를 추출
        const { access_token: accessToken, refresh_token: refreshToken, email:email } = response.data;

        if (!email) {
            console.error("🚨 백엔드에서 사용자 정보가 전달되지 않았습니다.");
            throw new Error("사용자 정보가 없습니다.");
        }
        if (!accessToken || !refreshToken) {
            console.error("🚨 백엔드에서 토큰이 반환되지 않음!");
            throw new Error("토큰이 정상적으로 발급되지 않았습니다.");
        }

        // 토큰 저장 및 로그인 처리
        saveToken(accessToken, refreshToken);
        useUserStore.getState().login(email, accessToken, refreshToken);
        console.log("🎉 Google 로그인 성공! 사용자 정보 저장됨:", email);
        console.log("🔑 저장된 액세스 토큰:", getToken());

        if (navigate) {
            console.log("🔄 메인 페이지로 이동!");
            navigate("/");
        } else {
            console.warn("⚠️ navigate 함수가 제공되지 않음. 페이지 이동 실패");
        }

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "🚨 Google 소셜 로그인 중 오류 발생";
        console.error("🚨 Google 소셜 로그인 실패:", errorMessage);
        throw new Error(errorMessage);
    }
};