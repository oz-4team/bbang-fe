import axios from "axios";
import { saveToken, getToken } from "../utils/authUtils";
import useUserStore from "../store/userStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";
const USE_BACKEND = false; //  백엔드 활성화 여부

// 소셜 로그인 요청 URL (프론트에서 클릭 시 이동하는 URL)
export const GOOGLE_AUTH_URL = `${API_BASE_URL}/auth/google/login/`;
export const KAKAO_AUTH_URL = `${API_BASE_URL}/auth/kakao/login/`;
export const NAVER_AUTH_URL = `${API_BASE_URL}/auth/naver/login/`;

//  [소셜 로그인 후 백엔드에서 액세스 & 리프레시 토큰 받아오기]
export const exchangeSocialToken = async (provider, authCode, navigate) => {
    if (USE_BACKEND) {
        try {
            console.log(` ${provider} 로그인 코드 확인:`, authCode); //  디버깅용

            // 백엔드의 /auth/{provider}/callback/ 엔드포인트 호출
            const response = await axios.get(`${API_BASE_URL}/auth/${provider}/callback/`, {
                params: { code: authCode },
            });

            console.log(" 백엔드 응답:", response.data); // 디버깅용

            // 백엔드에서 accessToken과 refreshToken을 함께 받음
            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;

            if (accessToken && refreshToken) {
                saveToken(accessToken, refreshToken); // 두 개의 토큰 저장

                // 로그인 상태 업데이트 (스토어에 저장)
                useUserStore.getState().login(
                    {
                        id: response.data.id || response.data.user?.id,
                        email: response.data.email || response.data.user?.email,
                        nickname: response.data.nickname || response.data.user?.nickname,
                        profileImage: response.data.image_url || response.data.user?.image_url,
                        provider: provider, // 로그인 제공자 정보 저장
                    },
                    accessToken, 
                    refreshToken // 리프레시 토큰도 전달
                );

                console.log(" 로그인 성공! 사용자 정보 저장됨:", response.data);
                console.log(" 저장된 액세스 토큰:", getToken()); //  토큰이 정상적으로 저장되었는지 확인

                // 로그인 성공 후 페이지 이동 (예: 홈 화면으로)
                if (navigate) {
                    navigate("/"); //  로그인 후 홈으로 이동
                } else {
                    console.warn("navigate 함수가 제공되지 않음. 페이지 이동 실패!");
                }
            } else {
                console.error(" 로그인 성공했지만 토큰 없음:", response.data);
                alert("로그인은 성공했지만, 인증 토큰이 없습니다. 다시 시도해주세요.");
            }

            return response.data;
        } catch (error) {
            console.error("소셜 로그인 실패:", error);
            alert("소셜 로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
            throw new Error(error.response?.data?.message || "소셜 로그인 실패");
        }
    }

    // 목업 데이터 (테스트용)
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockData = {
                access_token: `mock_access_token_${provider}`,
                refresh_token: `mock_refresh_token_${provider}`,
                id: Math.floor(Math.random() * 1000),
                email: `${provider}@mock.com`,
                nickname: `${provider} 사용자`,
                profileImage: "https://example.com/mock-profile.png",
                provider: provider,
            };

            saveToken(mockData.access_token, mockData.refresh_token); //  목업 토큰 저장
            useUserStore.getState().login(mockData, mockData.access_token, mockData.refresh_token); // ✅ 로그인 상태 업데이트
            console.log("🎉 목업 로그인 성공! 사용자 정보 저장됨:", mockData);

            resolve(mockData);
        }, 1000);
    });
};