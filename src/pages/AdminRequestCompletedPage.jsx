import React from "react";
import "../styles/AdminRequestCompleted.css";
import { useLocation } from "react-router-dom";

const AdminRequestCompletedPage = () => {
    const location = useLocation();
    const { artistName, companyName } = location.state || {};
  
    return (
      <div className="container">
        <h1>관리자 권한 신청 완료</h1>
        <p>
          아티스트명: <span className="artist-name">{artistName}</span>
        </p>
        <p>
          회사명: <span className="company-name">{companyName}</span>
        </p>
        <p>관리자 권한 신청이 접수되었습니다.</p>
        <p>소요시간은 약 <strong>1~2일</strong>입니다.</p>
        <button onClick={() => window.location.href = "/"}>홈페이지로 돌아가기</button>
      </div>
    );
};

export default AdminRequestCompletedPage;