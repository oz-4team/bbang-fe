import React, { useState } from "react";
import axios from "axios";
import "../styles/AdminRequest.css";
import { useNavigate } from "react-router-dom";
import { isValidPhone } from "../utils/validation";
import { setupAxiosInterceptors } from "../api/axiosInterceptors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

const AdminRequestPage = () => {
  const [artistName, setArtistName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({ phone: "" });

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let phoneError = "";

    if (!isValidPhone(phone)) {
      phoneError = "전화번호는 '010-1234-5678' 형식이어야 합니다.";
    }

    if (phoneError) {
      setErrors({ phone: phoneError });
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/authority/`, {
        artistName,
        artist_agency: companyName,
        phone_number: phone,
        image_url: preview,
      });

      setupAxiosInterceptors();

      navigate("/admin-request-completed", {
        state: { artistName, companyName },
      });
    } catch (err) {
      console.error("신청 실패:", err);
      alert("신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="page-wrapper">
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
          <button type="submit" className="submit-button" disabled={!file}>
            신청하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRequestPage;
