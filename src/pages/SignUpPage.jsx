import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 추가함
import "../styles/SignupForm.css";
import { FiEye, FiEyeOff } from 'react-icons/fi'; // 아이콘 라이브러리 설치 필요
import SocialLogin from "../components/SocialLogin";
import { signupUser } from "../api/authApi";
import useUserStore from "../store/userStore";
import { Link } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate(); // 추가함
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [isNicknameButtonEnabled, setIsNicknameButtonEnabled] = useState(false);
  const [nicknameAvailability, setNicknameAvailability] = useState(null);

  // 독립적인 비밀번호 및 비밀번호 재확인 미리보기 상태
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);


  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameButtonEnabled(!!e.target.value); // 닉네임이 입력되면 버튼 활성화
    setNicknameAvailability(null); // 닉네임 변경 시 중복 여부 초기화
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email.includes("@")) {
      newErrors.email = "올바른 이메일 형식인지 확인해주세요.";
    }
    if (password.length < 10 || password.length > 20) {
      newErrors.password = "비밀번호는 최소 10자~20자로 입력해주세요.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호를 다시 확인해주세요.";
    }
    if (!nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // 폼이 유효한지 확인
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
        console.log("회원가입 요청 데이터:", { email, password, nickname, gender, birthYear, profileImage });

        try {
            const response = await signupUser({
                email,
                password,
                nickname,
                gender,
                birthYear,
                profileImage
            });

            console.log("회원가입 응답 데이터:", response);

            navigate("/signup-completed", { state: { nickname, email, profileImage } });
    } catch (error) {
      console.error("회원가입 실패:", error.message);
    }
    }
};
  
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameCheck = () => {
    // 실제로는 서버에 요청을 보내서 닉네임의 중복 여부를 확인해야 합니다.
    // 여기서는 예시로 사용할 수 있는 닉네임 목록을 가정합니다.
    const existingNicknames = ["test1", "test2"]; // 예시로 사용할 수 없는 닉네임 목록

    if (existingNicknames.includes(nickname)) {
      setNicknameAvailability(false); // 중복된 닉네임
      alert("중복된 닉네임입니다.");
    } else {
      setNicknameAvailability(true); // 사용 가능한 닉네임
      alert("사용 가능한 닉네임입니다.");
    }
  };

  const handleGoogleLogin = () => {
    console.log('구글 로그인 클릭');
    // 실제 구글 로그인 기능 구현 필요
  };

  const handleNaverLogin = () => {
    console.log('네이버 로그인 클릭');
    // 실제 네이버 로그인 기능 구현 필요
  };

  const handleKakaoLogin = () => {
    console.log('카카오 로그인 클릭');
    // 실제 카카오 로그인 기능 구현 필요
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h1>회원가입</h1>
      <div className="form-group">
        <label>프로필 업로드 (선택)</label>
        <div className="profile-upload">
          {profileImage ? (
            <img
              src={profileImage}
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

      {/* 비밀번호 입력 */}
      <div className="form-group password-group">
        <input
          type={passwordVisible ? 'text' : 'password'}
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <span className="password-toggle" onClick={() => setPasswordVisible(!passwordVisible)}>
          {passwordVisible ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>

      {/* 비밀번호 재확인 입력 */}
      <div className="form-group password-group">
        <input
          type={confirmPasswordVisible ? 'text' : 'password'}
          placeholder="비밀번호를 재입력해주세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
        <span className="password-toggle" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          {confirmPasswordVisible ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>

      <div className="form-group nickname-group">

        <div className="nickname-input-container">
          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={handleNicknameChange}
            className="nickname-input"
          />
          
          <button
            type="button"
            className="nickname-check"
            disabled={!isNicknameButtonEnabled}
            onClick={handleNicknameCheck}
          >
            중복확인
          </button>
        </div>
        {errors.nickname && <p className="error">{errors.nickname}</p>}
        {nicknameAvailability === true && (
          <p className="available">사용 가능한 닉네임입니다.</p>
        )}
        {nicknameAvailability === false && (
          <p className="unavailable">중복된 닉네임입니다.</p>
        )}
      </div>

      <div className="form-group birth-info">
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="birth-select">
          <option value="">성별 (선택)</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
        <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className="birth-select">
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
    <Link to="/privacy" className="terms-link">이용약관, 개인정보처리방침</Link>에 동의
  </label>
</div>

      <button type="submit" className="submit-button">회원가입</button>

      {/* 간편 회원가입 */}
      <SocialLogin/>
    </form>
  );
}

export default SignUpPage;
