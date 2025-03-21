// loginKakao.js
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
            console.log("✅ Kakao 로그인 코드 확인:", authCode);
            console.log(`🔗 POST 요청 전송: ${API_BASE_URL}/auth/kakao/callback/`);
            console.log("📨 전송 데이터:", { code: authCode });

            // 백엔드에 인가 코드 전달 (POST 요청)
            const response = await axios.post(`${API_BASE_URL}/auth/kakao/callback/`, {
                code: authCode,
            });

            console.log("📩 백엔드 응답:", response.data);

            // 응답 데이터에서 토큰 및 사용자 정보를 추출
            const { access_token: accessToken, refresh_token: refreshToken, nickname } = response.data;

            // 사용자 정보가 없으면 에러 발생
            if (!nickname) {
                console.error("🚨 백엔드에서 사용자 정보가 전달되지 않았습니다.");
                throw new Error("사용자 정보가 없습니다.");
            }

            // 토큰이 없으면 에러 처리
            if (!accessToken || !refreshToken) {
                console.error("🚨 백엔드에서 토큰이 반환되지 않음!");
                throw new Error("토큰이 정상적으로 발급되지 않았습니다.");
            }

            // 토큰 저장 및 사용자 로그인 처리
            saveToken(accessToken, refreshToken);
            useUserStore.getState().login(nickname, accessToken, refreshToken);
            console.log("🎉 Kakao 로그인 성공! 사용자 정보 저장됨:", nickname);
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
            console.warn("⚠️ Kakao 소셜 로그인 중 문제가 발생할 수 있습니다.");
            alert(`🚨 로그인 실패: ${error.message || "알 수 없는 오류 발생"}`);
        }
    }
};