import React from "react";
import { useNavigate } from "react-router-dom";
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

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };
// 새로운 함수: 회원정보 수정 페이지로 이동
const handleProfileClick = () => {
  navigate("/ProfilePage"); // 회원정보 수정 페이지의 경로
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
          }}
        />
        <div style={{ fontSize: "26px", fontWeight: "bold" }}>IdolSync</div>
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
            style={{ paddingRight: "1rem", fontWeight: "bold" }}
            onClick={() => navigate("/")}
          >
            홈
          </li>

          {/* ✅ 일반 유저 메뉴 */}
          {!user?.isAdmin && (
            <>
              <li
                style={{ paddingRight: "1rem" }}
                onClick={() => navigate("/artist")}
              >
                아티스트
              </li>
              <li onClick={() => navigate("/schedule")}>스케줄</li>
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
                onClick={handleProfileClick} // 클릭 이벤트 핸들러 추가
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
