import React, { useState } from "react";
import Modal from "../components/Modal";

const TestSashaPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
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
    <div>
      {/* 모달 기본 템플릿 */}
      {/* <button onClick={handleOpenModal}>Open Modal</button>
      {isModalOpen && (
        <Modal
          title="Modal Title"
          description="This is the modal description."
          primaryButtonText="Confirm"
          //   secondaryButtonText="Cancel"
          onPrimaryClick={handlePrimaryClick}
          onSecondaryClick={handleSecondaryClick}
        />
      )} */}
      <button onClick={handleOpenModal}>모달오픈</button>
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
    </div>
  );
};

export default TestSashaPage;
