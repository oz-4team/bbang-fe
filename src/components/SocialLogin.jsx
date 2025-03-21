import React from "react";
import { KAKAO_AUTH_URL } from "../api/kakaoAuthapi";
import { NAVER_AUTH_URL } from "../api/naverAuthApi";
import { GOOGLE_AUTH_URL } from "../api/googleAuthApi";
import googleLogo from "../assets/images/googleLogo.png";
import naverLogo from "../assets/images/naverLogo.png";
import kakaoLogo from "../assets/images/kakaoLogo.png";

const SocialLogin = () => {
    console.log("✅ SocialLogin 컴포넌트 로드됨!");

    // ✅ 로그인 버튼 클릭 시 해당 소셜 로그인 페이지로 리다이렉트
    const handleKakaoLogin = () => {
        console.log("🔗 카카오 로그인 페이지로 이동:", KAKAO_AUTH_URL);
        window.location.href = KAKAO_AUTH_URL;
    };

    const handleNaverLogin = () => {
        console.log("🔗 네이버 로그인 페이지로 이동:", NAVER_AUTH_URL);
        window.location.href = NAVER_AUTH_URL;
    };

    const handleGoogleLogin = () => {
        console.log("🔗 구글 로그인 페이지로 이동:", GOOGLE_AUTH_URL);
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