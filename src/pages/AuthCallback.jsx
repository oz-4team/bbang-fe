import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { exchangeGoogleToken } from "../api/googleAuthApi";
import { exchangeKakaoToken } from "../api/kakaoAuthapi";
import { exchangeNaverToken } from "../api/naverAuthApi";
import useUserStore from "../store/userStore";

const AuthCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useUserStore();

    useEffect(() => {
        // 🔍 URL에서 인가 코드 (authCode) 추출
        const queryParams = new URLSearchParams(location.search);
        const authCode = queryParams.get("code");

        // 🔍 경로에서 provider 자동 추출
        const path = location.pathname;
        let provider = null;
        if (path.includes("kakao")) {
            provider = "kakao";
        } else if (path.includes("naver")) {
            provider = "naver";
        } else if (path.includes("google")) {
            provider = "google";
        }

        console.log("🔍 인가 코드:", authCode);
        console.log("🔍 provider 확인:", provider);

        if (!authCode || !provider) {
            console.error("🚨 인가 코드 또는 provider 없음!");
            alert("소셜 로그인에 필요한 정보가 없습니다. 다시 시도해주세요.");
            navigate("/login");
            return;
        }

        // 🔄 provider에 따라 해당 API 호출
        const fetchSocialLogin = async () => {
            try {
                let response;
                if (provider === "kakao") {
                    response = await exchangeKakaoToken(authCode,navigate);
                } else if (provider === "naver") {
                    response = await exchangeNaverToken(authCode,navigate);
                } else if (provider === "google") {
                    response = await exchangeGoogleToken(authCode,navigate);
                } else {
                    throw new Error("알 수 없는 provider");
                }

                console.log("🎉 로그인 성공!", response);
                login(response, response.access_token, response.refresh_token);
                navigate("/");
            } catch (error) {
                console.warn("⚠️ 로그인 중 문제가 발생할 수 있습니다. 하지만 강제 오류 처리는 제거합니다.");
            }
        };

        fetchSocialLogin();
    }, [location, navigate, login]);

    return (
        <div>
            <p>소셜 로그인 중...</p>
        </div>
    );
};

export default AuthCallback;