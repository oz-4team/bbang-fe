import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import Modal from "./Modal";

const MyArtistFilter = () => {
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

  return (
    <>
      <div>
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
          onClick={handleclickMyArtistFilter}
        >
          마이 아티스트
          <span style={{ marginLeft: "auto" }}>
            <TiArrowSortedDown />
          </span>
        </button>
      </div>
      {isModalOpen && (
        <Modal
          title="로그인이 필요해요 ☺️"
          description="로그인하시고 최애 정보를 확인해보세요!"
          primaryButtonText="로그인하러 가기"
          secondaryButtonText="닫기"
          onPrimaryClick={handlePrimaryClick}
          onSecondaryClick={handleSecondaryClick}
        />
      )}
    </>
  );
};

export default MyArtistFilter;
