import React from "react";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL, exchangeSocialToken } from "../api/socialAuthApi";
import googleLogo from "../assets/images/googleLogo.png";
import naverLogo from "../assets/images/naverLogo.png";
import kakaoLogo from "../assets/images/kakaoLogo.png";
import { useNavigate } from "react-router-dom";

function SocialLogin() {
  const navigate = useNavigate();

  //  소셜 로그인 처리 함수
  const handleSocialLogin = (provider, authUrl) => {
    const popup = window.open(authUrl);

    //  로그인 성공 후 `authCode` 받기
    const messageHandler = async (event) => {
      if (event.origin !== window.location.origin) return;
      const { authCode } = event.data;
      if (authCode) {
        console.log(` ${provider} 로그인 코드:`, authCode);
        try {
          const response = await exchangeSocialToken(provider, authCode, navigate);
          console.log(" 소셜 로그인 성공:", response);
        } catch (error) {
          console.error(" 소셜 로그인 실패:", error);
        }
      }
      window.removeEventListener("message", messageHandler);
      popup.close();
    };

    window.addEventListener("message", messageHandler);
  };

  return (
    <div className="social-login">
      <button onClick={() => handleSocialLogin("naver", NAVER_AUTH_URL)} className="social-button">
        <img src={naverLogo} alt="Naver Logo" className="social-icon" />
      </button>
      <button onClick={() => handleSocialLogin("kakao", KAKAO_AUTH_URL)} className="social-button">
        <img src={kakaoLogo} alt="Kakao Logo" className="social-icon" />
      </button>
      <button onClick={() => handleSocialLogin("google", GOOGLE_AUTH_URL)} className="social-button">
        <img src={googleLogo} alt="Google Logo" className="social-icon" />
      </button>
    </div>
  );
}

export default SocialLogin;