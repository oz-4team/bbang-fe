import axios from "axios";
import { saveToken, getToken } from "../utils/authUtils";
import useUserStore from "../store/userStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";
const USE_BACKEND = true; // 백엔드 활성화 여부

// ✅ 프론트에서 인가 코드 받도록 변경된 redirect_uri
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:5173/auth/callback?provider=google&response_type=code&scope=email%20profile`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:5173/auth/callback?provider=kakao&response_type=code`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&redirect_uri=http://localhost:5173/auth/callback?provider=naver&response_type=code`;

// ✅ 인가 코드 받아서 백엔드로 전송 후 액세스 & 리프레시 토큰 받기
export const exchangeSocialToken = async (provider, authCode, navigate) => {
    if (!authCode) {
        console.error("🚨 인가 코드 없음!");
        // alert("소셜 로그인 인가 코드가 없습니다. 다시 시도해주세요.");
        return;
    }

    if (USE_BACKEND) {
        try {
            console.log(`✅ ${provider} 로그인 코드 확인:`, authCode);
            console.log(`🔗 POST 요청 전송: ${API_BASE_URL}/auth/${provider}/callback/`);
            console.log("📨 전송 데이터:", { code: authCode });

            // 백엔드에 인가 코드 전달 (POST 요청)
            const response = await axios.post(`${API_BASE_URL}/auth/${provider}/callback/`, {
                code: authCode,
            });

            console.log("📩 백엔드 응답:", response.data);

            // 백엔드에서 accessToken과 refreshToken을 함께 받음
            const { access_token: accessToken, refresh_token: refreshToken, user } = response.data;

            if (!accessToken || !refreshToken) {
                console.error("🚨 백엔드에서 토큰이 반환되지 않음!");
                throw new Error("토큰이 정상적으로 발급되지 않았습니다.");
            }

            // 토큰 저장 및 로그인 처리
            saveToken(accessToken, refreshToken);
            useUserStore.getState().login(user, accessToken, refreshToken);

            console.log("🎉 로그인 성공! 사용자 정보 저장됨:", user);
            console.log("🔑 저장된 액세스 토큰:", getToken());

            // 로그인 성공 후 페이지 이동
            if (navigate) {
                console.log("🔄 메인 페이지로 이동!");
                navigate("/");
            } else {
                console.warn("⚠️ navigate 함수가 제공되지 않음. 페이지 이동 실패");
            }

            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "🚨 소셜 로그인 중 예상치 못한 오류가 발생했습니다.";
            console.error("🚨 소셜 로그인 실패:", errorMessage);
            alert(errorMessage);
            throw new Error(errorMessage);
        }
    }
};