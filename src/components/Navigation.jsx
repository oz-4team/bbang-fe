import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import logo from "../assets/images/idolsycn-logo.png";
import useUserStore from "../store/userStore";
import "../styles/Navigation.css";

const Navigation = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = async () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      try {
        await logoutUser();
        navigate("/");
      } catch (error) {
        console.error("로그아웃 실패:", error.message);
        alert("로그아웃에 실패했습니다.");
      }
    }
  };

  const handleProfileClick = () => {
    navigate("/ProfilePage");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navheight = "6rem";

  return (
    <>
      <div className="nav-layout">
        <div className="nav-logo-area" onClick={() => navigate("/")}>
          <img src={logo} alt="idolsync" className="nav-logo" />
          <div className="nav-title">IdolSync</div>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <li
            className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
          >
            홈
          </li>

          {!user?.is_staff && (
            <>
              <li
                className={`nav-item ${
                  location.pathname === "/artist" ? "active" : ""
                }`}
                onClick={() => {
                  navigate("/artist");
                  setMenuOpen(false);
                }}
              >
                아티스트
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/schedule" ? "active" : ""
                }`}
                onClick={() => {
                  navigate("/schedule");
                  setMenuOpen(false);
                }}
              >
                스케줄
              </li>
            </>
          )}

          {user?.is_staff && (
            <>
              <li
                className={`nav-item ${
                  location.pathname === "/artist-management" ? "active" : ""
                }`}
                onClick={() => {
                  navigate("/artist-management");
                  setMenuOpen(false);
                }}
              >
                아티스트 관리
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/schedule-management" ? "active" : ""
                }`}
                onClick={() => {
                  navigate("/schedule-management");
                  setMenuOpen(false);
                }}
              >
                스케줄 관리
              </li>
            </>
          )}

          {user ? (
            <>
              {user.is_staff ? (
                <li className="nav-item nickname">{user.nickname} 관리자님</li>
              ) : (
                <>
                  <li className="nav-item">
                    <button
                      className="icon-button"
                      onClick={handleProfileClick}
                    >
                      <IoPersonOutline />
                    </button>
                  </li>
                  {/* <li className="nav-item">
                    <button className="icon-button notification-button">
                      <IoNotificationsOutline />
                      <span className="notification-dot"></span>
                    </button>
                  </li> */}
                </>
              )}
              <li className="nav-item" onClick={handleLogoutClick}>
                <button className="text-button">로그아웃</button>
              </li>
            </>
          ) : (
            <li className="nav-item" onClick={handleLoginClick}>
              <button className="text-button">로그인</button>
            </li>
          )}
        </ul>
      </div>
      <div style={{ height: navheight }} />
    </>
  );
};

export default Navigation;
