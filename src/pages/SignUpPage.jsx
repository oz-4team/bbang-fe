import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/authApi";
import SocialLogin from "../components/SocialLogin";
import "../styles/SignupForm.css";
import { isValidEmail, isValidPassword } from "../utils/validation"; // 의존성 유효성 함수 불러오기

function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [image_url, setImage_url] = useState(null);
  const [errors, setErrors] = useState({});

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [files, setFiles] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!isValidEmail(email)) {
      newErrors.email = "올바른 이메일 형식인지 확인해주세요.";
    }
    if (!isValidPassword(password)) {
      newErrors.password = "비밀번호는 8자이상으로 설정해주세요";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    if (!nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files && files[0].size > 10 * 1024 * 1024) {
      alert("10mb 이하의 파일만 업로드할 수 있습니다.");
    } else {
      setImage_url(files[0]);
    }
    if (validateForm()) {
      const userData = {
        email,
        password,
        nickname,
        gender,
        age,
        image_url,
      };

      console.log("🚀 회원가입 요청 데이터:", userData); //  전송 전 데이터 확인

      try {
        const response = await signupUser(userData);
        console.log(" 회원가입 응답 데이터:", response); //  응답 확인

        navigate("/signup-completed", {
          state: { nickname, email, image_url },
        });
      } catch (error) {
        console.error(" 회원가입 실패:", error.message);

        if (error.response) {
          console.error(" 백엔드 응답 데이터:", error.response.data); // 상세 원인
          console.error(" 전체 에러 응답 객체:", error.response); // 상태 코드 등 포함
        } else {
          console.error(" 서버 연결 실패 또는 응답 없음:", error);
        }
      }
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setFiles(e.target.files);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage_url(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h1>회원가입</h1>

      <div className="form-group">
        <label>프로필 업로드 (선택)</label>
        <div className="profile-upload">
          {image_url ? (
            <img
              src={image_url}
              alt="프로필 미리보기"
              className="profile-preview"
            />
          ) : (
            <div className="default-profile-icon">📷</div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="profile-upload-input"
          onChange={handleProfileImageChange}
        />
        {/* <button onClick={saveEventhandler}>upload</button> */}
      </div>

      <div className="form-group">
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-group password-group">
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <span
          className="password-toggle"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>

      <div className="form-group password-group">
        <input
          type={confirmPasswordVisible ? "text" : "password"}
          placeholder="비밀번호를 재입력해주세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
        <span
          className="password-toggle"
          onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          {confirmPasswordVisible ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>

      <div className="form-group nickname-group">
        <input
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="nickname-input"
        />
        {errors.nickname && <p className="error">{errors.nickname}</p>}
      </div>

      <div className="form-group birth-info">
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="birth-select"
        >
          <option value="">성별 (선택)</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
        <select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="birth-select"
        >
          <option value="">출생년도 (선택)</option>
          {[...Array(100)].map((_, i) => (
            <option key={i} value={1925 + i}>
              {1925 + i}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>
          <input type="checkbox" required />{" "}
          <Link to="/privacy" className="terms-link">
            이용약관, 개인정보처리방침
          </Link>
          에 동의
        </label>
      </div>

      <button type="submit" className="submit-button">
        회원가입
      </button>

      <SocialLogin />
    </form>
  );
}

export default SignUpPage;
