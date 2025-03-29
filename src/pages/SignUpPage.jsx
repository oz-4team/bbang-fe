import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/authApi";
import SocialLogin from "../components/SocialLogin";
import "../styles/SignupForm.css";
import { isValidEmail, isValidPassword } from "../utils/validation";

function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("signupFormData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setEmail(parsed.email || "");
      setPassword(parsed.password || "");
      setConfirmPassword(parsed.confirmPassword || "");
      setNickname(parsed.nickname || "");
      setGender(parsed.gender || "");
      setAge(parsed.age || "");
      setPreviewImageUrl(parsed.previewImageUrl || null);
    }
  }, []);

  useEffect(() => {
    const formData = {
      email,
      password,
      confirmPassword,
      nickname,
      gender,
      age,
      previewImageUrl,
    };
    localStorage.setItem("signupFormData", JSON.stringify(formData));
  }, [email, password, confirmPassword, nickname, gender, age, previewImageUrl]);

  const validateForm = () => {
    const newErrors = {};
    if (!isValidEmail(email)) {
      newErrors.email = "올바른 이메일 형식인지 확인해주세요.";
    }
    if (!isValidPassword(password)) {
      newErrors.password = "비밀번호는 8자 이상으로 설정해주세요.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    if (!nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFile && imageFile.size > 10 * 1024 * 1024) {
      setModalMessage("10MB 이하의 파일만 업로드할 수 있습니다.");
      setIsModalOpen(true);
      return;
    }

    if (validateForm()) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;

        const userData = {
          email,
          password,
          nickname,
          gender,
          age,
          image_url: base64Image || null,
        };

        try {
          const response = await signupUser(userData);
          console.log("✅ 회원가입 응답:", response);

          // Reset
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setNickname("");
          setGender("");
          setAge("");
          setImageFile(null);
          setPreviewImageUrl(null);
          setErrors({});
          localStorage.removeItem("signupFormData");

          navigate("/signup-completed", {
            state: { nickname, email, image_url: previewImageUrl },
          });
        } catch (error) {
          console.error("❌ 회원가입 실패:", error.message);
          if (
            error.message.includes("이메일") &&
            error.message.includes("존재")
          ) {
            setModalMessage("이미 사용 중인 이메일입니다.");
          } else {
            setModalMessage("서버와의 연결에 실패했습니다. 다시 시도해주세요.");
          }
          setIsModalOpen(true);
        }
      };

      if (imageFile) {
        reader.readAsDataURL(imageFile);
      } else {
        reader.onloadend();
      }
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        passwordLang: "비밀번호에는 한글을 입력할 수 없습니다.",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.passwordLang;
        return newErrors;
      });
    }
    const filtered = value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    setPassword(filtered);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        passwordLang: "비밀번호에는 한글을 입력할 수 없습니다.",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.passwordLang;
        return newErrors;
      });
    }
    const filtered = value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    setConfirmPassword(filtered);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageUrl(reader.result);
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
          {previewImageUrl ? (
            <img
              src={previewImageUrl}
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

      <div className="form-group password-group">
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={handlePasswordChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        {errors.passwordLang && <p className="error">{errors.passwordLang}</p>}
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
          onChange={handleConfirmPasswordChange}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
        {errors.passwordLang && <p className="error">{errors.passwordLang}</p>}
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

      <div className="form-group terms-container">
        <label className="terms-label">
          <input type="checkbox" required />
          <span>
            <Link to="/privacy" className="terms-link" target="_blank">
              이용약관, 개인정보처리방침
            </Link>
            에 동의
          </span>
        </label>
      </div>


      <button type="submit" className="submit-button">
        회원가입
      </button>

      <SocialLogin />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={() => setIsModalOpen(false)}>확인</button>
          </div>
        </div>
      )}
    </form>
  );
}

export default SignUpPage;
