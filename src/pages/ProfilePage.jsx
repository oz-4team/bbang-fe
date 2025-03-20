import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import useUserStore from "../store/userStore";
import "../styles/Profile.css";

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
        />
        <button
          type="button"
          className="toggle-password-btn"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <FiEyeOff className="password-icon" />
          ) : (
            <FiEye className="password-icon" />
          )}
        </button>
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

const ProfilePage = () => {
  const { user, logout } = useUserStore();

  if (!user) {
    return null;
  }
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("user@example.com");
  const [userNickname, setUserNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // 여기서 서버로부터 사용자 정보를 가져오는 API 호출을 할 수 있습니다.
    // 예: fetchUserData();
  }, []);

  const checkDuplicateNickname = async () => {
    if (!userNickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const isDuplicate = Math.random() < 0.5;

      if (isDuplicate) {
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        alert("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.error("Error checking nickname:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessage = "";

    if (!userNickname.trim()) {
      isValid = false;
      errorMessage += "닉네임을 입력해주세요.\n";
    }

    if (!currentPassword) {
      isValid = false;
      errorMessage += "현재 비밀번호를 입력해주세요.\n";
    }

    if (newPassword || confirmPassword) {
      if (newPassword.length < 8) {
        isValid = false;
        errorMessage += "새 비밀번호는 8자 이상이어야 합니다.\n";
      }
      if (newPassword !== confirmPassword) {
        isValid = false;
        errorMessage += "새 비밀번호와 확인 비밀번호가 일치하지 않습니다.\n";
      }
    }

    return { isValid, errorMessage };
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
    const { isValid, errorMessage } = validateForm();

    if (!isValid) {
      alert(errorMessage);
    } else {
      if (
        window.confirm(
          "프로필이 성공적으로 업데이트되었습니다. 확인 버튼을 누르면 홈페이지로 이동합니다."
        )
      ) {
        console.log("프로필 업데이트 로직 실행");
        navigate("/");
      }
    }
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "정말로 회원탈퇴를 하시겠습니까? 회원 정보가 모두 삭제됩니다."
      )
    ) {
      // 사용자 정보 초기화
      setUserEmail("");
      setUserNickname("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setProfileImage(null);

      // 회원탈퇴 후 홈페이지로 이동
      alert("회원탈퇴가 완료되었습니다.");
      navigate("/");
    }
  };

  return (
    <div className="page-container">
      {/* <Navigation isLoggedIn={true} /> */}
      <div className="profile-page">
        <div className="profile-picture">
          <label
            htmlFor="profile-image-upload"
            className="profile-image-wrapper"
          >
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-image" />
            ) : (
              <>
                <img
                  src="/icons/profile-placeholder.png"
                  alt=""
                  className="placeholder-icon"
                />
                <span className="change-image-text">프로필 사진</span>
              </>
            )}
          </label>
          <input
            type="file"
            id="profile-image-upload"
            onChange={handleProfileImageChange}
            accept="image/*"
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
            <div className="input-with-button">
              <input
                type="text"
                id="nickname"
                value={userNickname}
                onChange={(e) => setUserNickname(e.target.value)}
                placeholder="닉네임"
              />
              <button
                type="button"
                className="check-duplicate-btn"
                onClick={checkDuplicateNickname}
                disabled={loading}
              >
                {loading ? "확인 중..." : "중복확인"}
              </button>
            </div>
          </div>

          <PasswordInput
            label="현재 비밀번호"
            id="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <PasswordInput
            label="새로운 비밀번호"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordInput
            label="비밀번호 재확인"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
