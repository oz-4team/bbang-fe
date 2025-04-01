import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginUser } from "../api/authApi";

import useUserStore from "../store/userStore";
import { isValidEmail, isValidPassword } from "../utils/validation";
import SocialLogin from "../components/SocialLogin.jsx";
import { getToken } from "../utils/authUtils";
import "../styles/login.css";
import logo from "../assets/images/logo.png";

// ✅ 간단한 모달 컴포넌트 정의
function Modal({ message, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose} className="modal-button">
          확인
        </button>
      </div>
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // ✅ 모달 상태

  useEffect(() => {
    if (getToken()) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) return setError("올바른 이메일을 입력하세요.");
    if (!isValidPassword(password)) return setError("비밀번호는 최소 8자 이상이어야 합니다.");

    try {
      const { user, access, refresh } = await loginUser(email, password);
      login(user, access, refresh);
      console.log("✅ 로그인 성공:", user);
      navigate("/");
    } catch (err) {
      console.error("❌ 로그인 실패 전체 에러 객체:", err);
      console.error("❌ 서버 응답 데이터:", err.response?.data);
      console.error("❌ 에러 메시지:", err.message);

      const errorMsg =
        err.response?.data?.message || err.message || "로그인 중 오류가 발생했습니다.";

      // ✅ 이메일 인증 미완료시 모달 표시
      if (errorMsg.includes("이메일 인증")) {
        setShowModal(true);
      }

      setError(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-style">
        <h1 className="login-title">로그인</h1>
        <img src={logo} alt="프로젝트 로고" className="profile-icon" />
        <p className="service-name">IdolSync</p>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input password-input"
            />
            <span
              className="toggle-password-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <p className="extra-links">
          <Link to="/forgot-password">비밀번호 찾기</Link>
        </p>
        <p className="extra-links">
          아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </p>

        <div className="divider">간편 로그인</div>
        <SocialLogin />
      </div>

      {/* ✅ 이메일 인증 모달 */}
      {showModal && (
        <Modal
          message="비밀번호가 틀렸거나 이메일 인증이 완료되지 않은 계정입니다."
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default LoginPage;
