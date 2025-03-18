import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/SignupComplete.css";

function SignupCompletePage() {
    const location = useLocation();
    const navigate = useNavigate(); // 네비게이션 훅 사용
    const { nickname, email, profileImage } = location.state || {}; // 전달된 state에서 닉네임, 이메일, 프로필 이미지 가져오기

    const handleLoginButtonClick = () => {
    navigate("/login"); // 로그인 페이지로 이동
    };

    return (
    <div className="email-verification-container">
        <div className="email-verification-card">
        {profileImage && (
            <img src={profileImage} alt="프로필 사진" className="profile-image" />
        )}
        <div className="welcome-message">
            환영합니다 🤗 <span className="nickname">{nickname}</span>님
        </div>
        <p>이메일 인증을 완료해주세요 :)</p>
        <p className="email-info">
            <span className="user-email">{email}</span>으로 인증 링크를 보내드렸습니다.
            <br />
            이메일에서 인증 링크를 확인해주세요!
        </p>
        <button className="login-button" onClick={handleLoginButtonClick}>
            로그인 하러가기
        </button>
        </div>
    </div>
    );
}

export default SignupCompletePage;


