import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import useUserStore from "../store/userStore";
import Modal from "./Modal";

const MyArtistFilter = () => {
  const { user, logout } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleclickMyArtistFilter = (e) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handlePrimaryClick = () => {
    console.log("Primary button clicked");
    handleCloseModal();
  };

  const handleSecondaryClick = () => {
    console.log("Secondary button clicked");
    handleCloseModal();
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
    console.log("로그인 페이지로 이동");
  };

  const alertLogin = () => {
    alert("로그인이 필요한 서비스입니다.");
  };

  console.log("🥹 현재 user 정보:", user);

  return (
    <>
      <div>
        {user ? (
          <>
            <select
              style={{
                minWidth: "300px",
                width: "100%",
                height: "60px",
                marginTop: "10px",
              }}
            >
              <option value="artist1">모든 아티스트</option>
              <option value="artist1">나의 아티스트들</option>
              <option value="artist2">에스파 ❤️</option>
              <option value="artist3">아이유 ❤️</option>
              <option value="artist3">윤하 ❤️</option>
            </select>
          </>
        ) : (
          <>
            <button
              style={{
                minWidth: "300px",
                width: "100%",
                height: "60px",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onClick={user ? alertLogin : handleclickMyArtistFilter}
            >
              마이 아티스트
              <span style={{ marginLeft: "auto" }}>
                <TiArrowSortedDown />
              </span>
            </button>
          </>
        )}
      </div>
      {isModalOpen && (
        <Modal
          title="로그인이 필요해요 ☺️"
          description="로그인하시고 최애 정보를 확인해보세요!"
          primaryButtonText="로그인하러 가기"
          secondaryButtonText="닫기"
          onPrimaryClick={handleLoginClick}
          onSecondaryClick={handleSecondaryClick}
        />
      )}
    </>
  );
};

export default MyArtistFilter;
