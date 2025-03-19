import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import useUserStore from "../store/userStore";

const NavigationLayout = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
`;

const Navigation = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/ProfilePage");
  };

  return (
    <NavigationLayout>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="../src/assets/images/idolsycn-logo.png"
          alt="idolsync"
          style={{
            width: "40px",
            height: "40px",
            marginRight: "1rem",
            cursor: "pointer", // 클릭 가능하도록 설정
          }}
          onClick={() => navigate("/")} // 클릭 시 홈으로 이동
        />
        <div
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            cursor: "pointer", // 클릭 가능하도록 설정
          }}
          onClick={() => navigate("/")} // 클릭 시 홈으로 이동
        >
          IdolSync
        </div>
      </div>

      <div style={{ fontSize: "20px", display: "flex" }}>
        <ul
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <li
            style={{
              paddingRight: "1rem",
              fontWeight: location.pathname === "/" ? "bold" : "normal",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            홈
          </li>

          {/* ✅ 일반 유저 메뉴 */}
          {!user?.isAdmin && (
            <>
              <li
                style={{
                  paddingRight: "1rem",
                  fontWeight: location.pathname === "/artist" ? "bold" : "normal",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/artist")}
              >
                아티스트
              </li>
              <li
                style={{
                  fontWeight: location.pathname === "/schedule" ? "bold" : "normal",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/schedule")}
              >
                스케줄
              </li>
            </>
          )}

          {/* ✅ 관리자(admin) 메뉴 */}
          {user?.isAdmin && (
            <>
              <li style={{ paddingRight: "1rem", fontWeight: "bold" }}>
                아티스트 등록
              </li>
              <li>스케줄 등록</li>
            </>
          )}
        </ul>

        {user ? (
          <ul
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              paddingLeft: "3rem",
            }}
          >
            <li>
              <button
                style={{
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  padding: "0",
                }}
                onClick={handleProfileClick}
              >
                👤
              </button>
            </li>
            <li>
              <button
                style={{
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  padding: "0",
                }}
              >
                🔔
              </button>
            </li>
            <li>
              <button
                style={{
                  background: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginLeft: "1rem",
                }}
                onClick={handleLogoutClick}
              >
                로그아웃
              </button>
            </li>
          </ul>
        ) : (
          <button
            style={{
              background: "none",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={handleLoginClick}
          >
            로그인
          </button>
        )}
      </div>
    </NavigationLayout>
  );
};

export default Navigation;
