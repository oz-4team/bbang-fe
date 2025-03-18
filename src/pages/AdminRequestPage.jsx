import React, { useState } from "react";
import "../styles/AdminRequest.css";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가

const AdminRequestPage = () => {
  const [artistName, setArtistName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({ email: "", phone: "" });

  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/; // 예: 010-1234-5678
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailError = "";
    let phoneError = "";

    if (!validateEmail(email)) {
      emailError = "올바른 이메일 형식을 입력해주세요.";
    }

    if (!validatePhone(phone)) {
      phoneError = "전화번호는 '010-1234-5678' 형식이어야 합니다.";
    }

    if (emailError || phoneError) {
      setErrors({ email: emailError, phone: phoneError });
      return;
    }

    // 신청 완료 후 페이지 이동
    navigate("/admin-request-completed", { state: { artistName, companyName } });
  };

  return (
    <div className="admin-request-page">
      <h1 className="title">관리자 권한 신청</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="spaced-label">
          아티스트명
          <input
            type="text"
            placeholder="아티스트명"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </label>
        <label>
          회사명
          <input
            type="text"
            placeholder="회사명을 입력해주세요"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </label>
        <label>
          대표 이메일
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </label>
        <label>
          대표 전화
          <input
            type="tel"
            placeholder="전화번호를 입력해주세요"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </label>
        <label className="file-upload">
          증빙서류 (사업자등록증)
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        {preview && (
          <div className="file-preview">
            <img src={preview} alt="첨부파일 미리보기" />
          </div>
        )}
        <p className="notice">* 소요시간은 1 ~ 2일 소요될 수 있습니다</p>
        {/* 신청하기 버튼 - 첨부파일 없으면 비활성화 */}
        <button type="submit" className="submit-button" disabled={!file}>
          신청하기
        </button>
      </form>
    </div>
  );
};

export default AdminRequestPage;


