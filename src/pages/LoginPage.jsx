import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi"; // 백엔드 API 대신 `mock` 데이터 사용 중
import useUserStore from "../store/userStore";
import { isValidEmail, isValidPassword } from "../utils/validation";
import SocialLogin from "../components/SocialLogin.jsx";
import "../styles/login.css";
import logo from "../assets/images/logo.png"

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) return setError("올바른 이메일을 입력하세요.");
    if (!isValidPassword(password)) return setError("비밀번호는 최소 8자 이상이어야 합니다.");

    try {
      const { token, user } = await loginUser(email, password); // TODO: 백엔드 API 연결 후 수정
      login(user, token);
      navigate("/");
      
      if (user.isAdmin) {
        navigate("/admin")
      } else {
        navigate("/")
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">로그인</h1>
      <img src={logo} alt="프로젝트 로고" className="profile-icon" />
      <p className="service-name">서비스명</p>

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          로그인
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="extra-links">
        <Link to="/forgot-password">비밀번호 찾기</Link>
      </p>
      <p className="extra-links">
        아직 계정이 없으신가요? <Link to="/signup">회원가입</Link> {/*  경로 확인 */}
      </p>

      <div className="divider">간편 로그인.</div>

      {/* 소셜 로그인 버튼 */}
      <SocialLogin />
    </div>
  );
}

export default LoginPage;