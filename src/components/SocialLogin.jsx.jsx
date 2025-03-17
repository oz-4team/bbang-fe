import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../api/socialAuthApi";

function SocialLogin() {
  const handleSocialLogin = (authUrl) => {
    window.location.href = authUrl;
  };

  return (
    <div className="social-buttons">
      <button onClick={() => handleSocialLogin(NAVER_AUTH_URL)}>네이버 로그인</button>
      <button onClick={() => handleSocialLogin(KAKAO_AUTH_URL)}>카카오 로그인</button>
      <button onClick={() => handleSocialLogin(GOOGLE_AUTH_URL)}>구글 로그인</button>
    </div>
  );
}

export default SocialLogin;