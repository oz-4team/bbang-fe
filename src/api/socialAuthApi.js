import axios from "axios";
import { saveToken } from "../utils/authUtils";
import useUserStore from "../store/userStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";
const USE_BACKEND = true; // 백엔드 활성화 여부

// 소셜 로그인 요청 URL (프론트에서 클릭 시 이동하는 URL)
export const GOOGLE_AUTH_URL = `${API_BASE_URL}/auth/google/login/`;
export const KAKAO_AUTH_URL = `${API_BASE_URL}/auth/kakao/login/`;
export const NAVER_AUTH_URL = `${API_BASE_URL}/auth/naver/login/`;

// [소셜 로그인 후 백엔드에서 토큰 받아오기]
export const exchangeSocialToken = async (provider, authCode) => {
    if (USE_BACKEND) {
        try {
            console.log(`🔹 ${provider} 로그인 코드 확인:`, authCode); // 디버깅용

            //  백엔드의 /auth/{provider}/callback/ 엔드포인트 호출
            const response = await axios.get(`${API_BASE_URL}/auth/${provider}/callback/`, {
                params: { code: authCode },
            });

            console.log(" 백엔드 응답:", response.data); // 디버깅용

            if (response.data.token) {
                saveToken(response.data.token); //  토큰 저장

                //  로그인 상태 업데이트 (스토어에 저장)
                useUserStore.getState().login({
                    id: response.data.id,
                    email: response.data.email,
                    nickname: response.data.nickname,
                    profileImage: response.data.image_url, //  프로필 이미지 저장
                    provider: provider, //  로그인 제공자 정보 저장
                });

                console.log("로그인 성공! 사용자 정보 저장됨:", response.data);
            } else {
                console.error("로그인 성공했지만 토큰 없음:", response.data);
            }

            return response.data;
        } catch (error) {
            console.error("소셜 로그인 실패:", error);
            throw new Error(error.response?.data?.message || "소셜 로그인 실패");
        }
    }

    //  목업 데이터 (테스트용)
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockData = {
                token: `mock_social_token_${provider}`,
                id: Math.floor(Math.random() * 1000),
                email: `${provider}@mock.com`,
                nickname: `${provider} 사용자`,
                profileImage: "https://example.com/mock-profile.png",
                provider: provider,
            };

            saveToken(mockData.token); //  목업 토큰 저장
            useUserStore.getState().login(mockData); //  로그인 상태 업데이트
            console.log("🎉 목업 로그인 성공! 사용자 정보 저장됨:", mockData);

            resolve(mockData);
        }, 1000);
    });
};