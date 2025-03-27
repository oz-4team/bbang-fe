import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { exchangeGoogleToken } from "../api/googleAuthApi";
import { exchangeKakaoToken } from "../api/kakaoAuthapi";
import { exchangeNaverToken } from "../api/naverAuthApi";
import useUserStore from "../store/userStore";

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useUserStore();

  const hasRun = useRef(false); // ✅ 중복 실행 방지용

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const authCode = queryParams.get("code");

    const path = location.pathname;
    let provider = null;
    if (path.includes("kakao")) provider = "kakao";
    else if (path.includes("naver")) provider = "naver";
    else if (path.includes("google")) provider = "google";

    console.log("🔍 인가 코드:", authCode);
    console.log("🔍 provider 확인:", provider);

    if (!authCode || !provider) {
      console.error("🚨 인가 코드 또는 provider 없음!");
      alert("소셜 로그인에 필요한 정보가 없습니다. 다시 시도해주세요.");
      navigate("/login");
      return;
    }

    if (hasRun.current) return; // ✅ 중복 방지
    hasRun.current = true;

    const fetchSocialLogin = async () => {
      try {
        let response;
        if (provider === "kakao") {
          response = await exchangeKakaoToken(authCode, navigate);
        } else if (provider === "naver") {
          response = await exchangeNaverToken(authCode, navigate);
        } else if (provider === "google") {
          response = await exchangeGoogleToken(authCode, navigate);
        } else {
          throw new Error("알 수 없는 provider");
        }

        console.log("🎉 로그인 성공!", response);

        // ✅ 필요한 값만 뽑아서 상태 저장
        const userInfo = {
          email: response.email,
          nickname: response.nickname,
          gender: response.gender,
          is_staff: response.is_staff,
          image_url: response.image_url || null,
          id: response.id,
        };

        login(userInfo, response.access_token, response.refresh_token);
        navigate("/");
      } catch (error) {
        console.warn("⚠️ 로그인 처리 중 오류 발생:", error);
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