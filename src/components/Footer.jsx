import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/idolsycn-logo.png";
import useUserStore from "../store/userStore";

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const handleAdminRequestClick = () => {
    window.location.href = "/adminrequest";
  };
  const handleHomeClick = () => {
    navigate("/");
  };
  const handlePrivacyClick = () => {
    navigate("/privacy");
  };
  const handleArtistClick = () => {
    navigate(user?.isAdmin ? "/artist-management" : "/artist");
  };
  const handleScheduleClick = () => {
    navigate(user?.isAdmin ? "/schedule-management" : "/schedule");
  };

  return (
    <>
      <footer>
        <div
          style={{
            padding: "2rem",
            backgroundColor: "#f8f9fa",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100vw",
          }}
        >
          <div>
            <img
              src={logo}
              alt="idol sync"
              style={{
                width: "50px",
                height: "50px",
                filter: "grayscale(100%)",
              }}
            />
            <div
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                textAlign: "left",
                color: "#00000052",
                paddingTop: "1rem",
              }}
            >
              IdolSync
            </div>

            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  fontSize: "20px",
                  color: "#00000052",
                  paddingTop: "2rem",
                  paddingBottom: "2rem",
                }}
              >
                <li
                  style={{ paddingBottom: "1rem", cursor: "pointer" }}
                  onClick={handleHomeClick}
                >
                  홈
                </li>
                <li
                  style={{ paddingBottom: "1rem", cursor: "pointer" }}
                  onClick={handleArtistClick}
                >
                  {user?.isAdmin ? "아티스트 관리" : "아티스트"}
                </li>
                <li
                  style={{ paddingBottom: "1rem", cursor: "pointer" }}
                  onClick={handleScheduleClick}
                >
                  {user?.isAdmin ? "스케줄 관리" : "스케줄"}
                </li>
                {!user?.isAdmin && (
                  <li
                    style={{ paddingBottom: "1rem", cursor: "pointer" }}
                    onClick={handleAdminRequestClick}
                  >
                    관리자 권한 신청 페이지로 이동
                  </li>
                )}
              </ul>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handlePrivacyClick()}
              >
                서비스 이용약관
              </div>
              <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>|</div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handlePrivacyClick()}
              >
                개인정보처리방침
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div>제휴/광고 문의</div>
            <div>
              <div>info@idolsync.com</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
