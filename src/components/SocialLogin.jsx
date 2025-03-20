import React from "react";
import { useNavigate } from "react-router-dom";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL, exchangeSocialToken } from "../api/socialAuthApi";
import googleLogo from "../assets/images/googleLogo.png";
import naverLogo from "../assets/images/naverLogo.png";
import kakaoLogo from "../assets/images/kakaoLogo.png";

function SocialLogin() {
  console.log("✅ SocialLogin 컴포넌트 로드됨!");

  const navigate = useNavigate();

  const handleSocialLogin = (provider, authUrl) => {
    console.log(`✅ ${provider} 로그인 버튼 클릭됨!`);
    console.log(`🔗 소셜 로그인 URL: ${authUrl}`);

    // ✅ 새 창에서 로그인 페이지 열기
    const loginWindow = window.open(authUrl, "_blank");

    if (!loginWindow) {
      console.error("🚨 팝업 차단됨! 브라우저 팝업 설정을 확인하세요.");
      return;
    }

    // ✅ 메시지 수신 핸들러 (인가 코드 받기)
    const messageHandler = async (event) => {
      console.log("📩 메시지 수신됨!", event);

      if (event.origin !== window.location.origin) return;
      if (!event.data || !event.data.authCode || !event.data.provider) {
        console.warn("⚠️ 인가 코드 또는 provider 데이터 없음!", event.data);
        return;
      }

      const { authCode, provider } = event.data;

      console.log(`🔑 ${provider} 인가 코드 수신됨:`, authCode);

      try {
        const response = await exchangeSocialToken(provider, authCode, navigate);
        console.log("🎉 소셜 로그인 성공:", response);

        // ✅ 로그인 성공 시 새 창 닫기 & 메인 페이지 이동
        setTimeout(() => {
          if (loginWindow) loginWindow.close();
          navigate("/");
        }, 500);
      } catch (error) {
        console.error("🚨 소셜 로그인 실패:", error);
      }

      window.removeEventListener("message", messageHandler);
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