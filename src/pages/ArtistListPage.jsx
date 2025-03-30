import React, { useState } from "react";
import ArtistCardArea from "../components/ArtistCardArea";
import BannerAd from "../components/BannerAd";
import Modal from "../components/Modal";
import MyArtistFilter from "../components/MyArtistFilter";
import SearchBar from "../components/SearchBar";

const ArtistListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSecondaryClick = () => {
    console.log("Secondary button clicked");
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
    console.log("로그인 페이지로 이동");
  };

  const handleClickUserCheck = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="outlet-container">
      <div className="inner">
        <BannerAd />
        <div className="filter-container">
          <MyArtistFilter />
          <SearchBar onSearch={setSearchQuery} />
        </div>

        <ArtistCardArea
          onCardClick={handleClickUserCheck}
          searchQuery={searchQuery}
        />

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
      </div>
    </div>
  );
};

export default ArtistListPage;
