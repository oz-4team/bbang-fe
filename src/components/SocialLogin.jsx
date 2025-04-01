import React from "react";
import { GOOGLE_AUTH_URL } from "../api/googleAuthApi";
import { KAKAO_AUTH_URL } from "../api/kakaoAuthapi";
import { NAVER_AUTH_URL } from "../api/naverAuthApi";
import googleLogo from "../assets/images/googlelogo.png";
import kakaoLogo from "../assets/images/kakaologo.png";
import naverLogo from "../assets/images/naverlogo.png";

const SocialLogin = () => {

  // ✅ 로그인 버튼 클릭 시 해당 소셜 로그인 페이지로 리다이렉트
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleNaverLogin = () => {
  
    const logoutWindow = window.open("https://nid.naver.com/nidlogin.logout", "_blank", "width=500,height=600");
  
    // 팝업 닫기 (0.5초 후)
    setTimeout(() => {
      if (logoutWindow) {
        logoutWindow.close();
      }
      // 로그인 페이지로 리디렉트
      window.location.href = NAVER_AUTH_URL;
    }, 700);
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <div className="social-login">
      <button onClick={handleNaverLogin} className="social-button">
        <img src={naverLogo} alt="Naver Logo" className="social-icon" />
      </button>
      <button onClick={handleKakaoLogin} className="social-button">
        <img src={kakaoLogo} alt="Kakao Logo" className="social-icon" />
      </button>
      <button onClick={handleGoogleLogin} className="social-button">
        <img src={googleLogo} alt="Google Logo" className="social-icon" />
      </button>
    </div>
  );
};

export default SocialLogin;
