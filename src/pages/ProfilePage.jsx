import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import useUserStore from "../store/userStore";
import "../styles/Profile.css";

// PasswordInput 컴포넌트
const PasswordInput = ({ label, id, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          placeholder="**********"
          className="password-input"
          autoComplete="off"
        />
        <span
          type="button"
          className="toggle-password-btn"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <FiEyeOff className="password-icon" />
          ) : (
            <FiEye className="password-icon" />
          )}
        </span>
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

// 메인 컴포넌트
const ProfilePage = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setUserEmail(user.email || "user@example.com");
      setUserNickname(user.nickname || "");
      // TODO: 필요하면 사용자 프로필 정보 더 불러오기
    }
  }, [user]);

  if (!user) return null;

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!userNickname.trim()) {
      newErrors.nickname = "닉네임을 입력해주세요.";
      isValid = false;
    }

    if (!currentPassword) {
      newErrors.currentPassword = "현재 비밀번호를 입력해주세요.";
      isValid = false;
    }

    if (newPassword || confirmPassword) {
      if (newPassword.length < 8) {
        newErrors.newPassword = "새 비밀번호는 8자 이상이어야 합니다.";
        isValid = false;
      }
      if (newPassword !== confirmPassword) {
        newErrors.confirmPassword = "새 비밀번호와 확인 비밀번호가 일치하지 않습니다.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // TODO: 서버에 업데이트 요청 보내기
    alert("프로필이 성공적으로 업데이트되었습니다.");
    navigate("/");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm("정말로 회원탈퇴를 하시겠습니까? 회원 정보가 모두 삭제됩니다.")
    ) {
      // TODO: 서버에 회원탈퇴 요청 보내기

      setUserEmail("");
      setUserNickname("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setProfileImage(null);
      logout();

      alert("회원탈퇴가 완료되었습니다.");
      navigate("/");
    }
  };

  return (
    <div className="page-container">
      <div className="profile-page">
      <div className="profile-picture">
        <label htmlFor="profile-image-upload" className="profile-image-wrapper">
        <div className="image-preview">
        <img
        src={
          profileImage
            ? profileImage
            : "/icons/profile-placeholder.png"
        }
        alt="프로필 사진"
        className="profile-image-edit"
      />
      <div className="overlay">
        <span className="change-image-text">사진 변경</span>
      </div>
    </div>
  </label>
  <input
    type="file"
    id="profile-image-upload"
    accept="image/*"
    onChange={handleProfileImageChange}
    style={{ display: "none" }}
  />
</div>


        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={userEmail}
              readOnly
              className="disabled-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              value={userNickname}
              onChange={(e) => setUserNickname(e.target.value)}
              placeholder="닉네임"
            />
            {errors.nickname && <p className="error-text">{errors.nickname}</p>}
          </div>

          <PasswordInput
            label="현재 비밀번호"
            id="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            error={errors.currentPassword}
          />
          <PasswordInput
            label="새로운 비밀번호"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={errors.newPassword}
          />
          <PasswordInput
            label="비밀번호 재확인"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />

          <button type="submit" className="update-btn">
            수정
          </button>
        </form>

        <button
          type="button"
          className="delete-account-btn"
          onClick={handleDeleteAccount}
        >
          회원탈퇴
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
