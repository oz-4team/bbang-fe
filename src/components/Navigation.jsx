import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoNotificationsOutline, IoPersonOutline } from "react-icons/io5";
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

const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: white;
    border-top: 1px solid #e9ecef;
    padding: 1rem 0;
  }
`;

const NavItem = styled.li`
  padding-right: 1rem;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  cursor: pointer;
  font-size: 1.2rem;
  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const Navigation = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

        <MenuIcon onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </MenuIcon>

        <NavMenu isOpen={menuOpen}>
          <NavItem
            isActive={location.pathname === "/"}
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
          >
            홈
          </NavItem>

          {!user?.isAdmin && (
            <>
              <NavItem
                isActive={location.pathname === "/artist"}
                onClick={() => {
                  navigate("/artist");
                  setMenuOpen(false);
                }}
              >
                아티스트
              </NavItem>
              <NavItem
                isActive={location.pathname === "/schedule"}
                onClick={() => {
                  navigate("/schedule");
                  setMenuOpen(false);
                }}
              >
                스케줄
              </NavItem>
            </>
          )}

          {user?.isAdmin && (
            <>
              <NavItem
                isActive={location.pathname === "/artist-management"}
                onClick={() => {
                  navigate("/artist-management");
                  setMenuOpen(false);
                }}
              >
                아티스트 관리
              </NavItem>
              <NavItem
                isActive={location.pathname === "/schedule-management"}
                onClick={() => {
                  navigate("/schedule-management");
                  setMenuOpen(false);
                }}
              >
                스케줄 관리
              </NavItem>
            </>
          )}

          {user ? (
            <>
              {user.isAdmin ? (
                <NavItem style={{ fontWeight: "bold" }}>
                  {user.nickname} 관리자님
                </NavItem>
              ) : (
                <>
                  <NavItem onClick={handleProfileClick}>
                    <button
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        backgroundColor: "white",
                        padding: "8px",
                        fontSize: "1.5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IoPersonOutline />
                    </button>
                  </NavItem>
                  <NavItem>
                    <button
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        backgroundColor: "white",
                        padding: "8px",
                        fontSize: "1.5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <IoNotificationsOutline />
                      <span
                        style={{
                          backgroundColor: "red",
                          height: "10px",
                          width: "10px",
                          borderRadius: "50%",
                          position: "absolute",
                          top: "10px",
                          right: "5px",
                        }}
                      ></span>
                    </button>
                  </NavItem>
                </>
              )}
              <NavItem onClick={handleLogoutClick}>
                <button
                  style={{
                    background: "none",
                    fontSize: "16px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    // marginLeft: "1rem",
                  }}
                >
                  로그아웃
                </button>
              </NavItem>
            </>
          ) : (
            <NavItem onClick={handleLoginClick}>
              <button
                style={{
                  background: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                로그인
              </button>
            </NavItem>
          )}
        </NavMenu>
      </NavigationLayout>
      <div style={{ height: "5rem" }} />
    </>
  );
};

export default Navigation;
