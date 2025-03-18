import React from "react";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../api/socialAuthApi";
import googleLogo from '../assets/images/googleLogo.png';
import naverLogo from '../assets/images/naverLogo.png';
import kakaoLogo from '../assets/images/kakaoLogo.png';

function SocialLogin() {
  return (
    <div className="social-login">
      <button onClick={() => (window.location.href = NAVER_AUTH_URL)} className="social-button">
        <img src={naverLogo} alt="Naver Logo" className="social-icon" />
      </button>
      <button onClick={() => (window.location.href = KAKAO_AUTH_URL)} className="social-button">
        <img src={kakaoLogo} alt="Kakao Logo" className="social-icon" />
      </button>
      <button onClick={() => (window.location.href = GOOGLE_AUTH_URL)} className="social-button">
        <img src={googleLogo} alt="Google Logo" className="social-icon" />
      </button>
    </div>
  );
}

export default SocialLogin;