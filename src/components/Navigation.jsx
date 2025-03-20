import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useUserStore from "../store/userStore";

const NavigationLayout = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  position: fixed;
  background-color: white;
  z-index: 999;
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
    <>
      <NavigationLayout>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="../src/assets/images/idolsycn-logo.png"
            alt="idolsync"
            style={{
              width: "40px",
              height: "40px",
              marginRight: "1rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
          <div
            style={{
              fontSize: "26px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
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

            {!user?.isAdmin && (
              <>
                <li
                  style={{
                    paddingRight: "1rem",
                    fontWeight:
                      location.pathname === "/artist" ? "bold" : "normal",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/artist")}
                >
                  아티스트
                </li>
                <li
                  style={{
                    fontWeight:
                      location.pathname === "/schedule" ? "bold" : "normal",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/schedule")}
                >
                  스케줄
                </li>
              </>
            )}

            {user?.isAdmin && (
              <>
                <li
                  style={{
                    paddingRight: "1rem",
                    fontWeight:
                      location.pathname === "/artist-management"
                        ? "bold"
                        : "normal",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/artist-management")}
                >
                  아티스트 관리
                </li>
                <li
                  style={{
                    fontWeight:
                      location.pathname === "/schedule-management"
                        ? "bold"
                        : "normal",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/schedule-management")}
                >
                  스케줄 관리
                </li>
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
              {user.isAdmin ? (
                <li style={{ marginRight: "1rem", fontWeight: "bold" }}>
                  {user.nickname} 관리자님
                </li>
              ) : (
                <>
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
                </>
              )}
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
      <div style={{ height: "5rem" }} />
    </>
  );
};

export default Navigation;
