import React, { useEffect, useState } from "react";
import useLikes from "../api/artist/useLikes";
import ArtistCardArea from "../components/ArtistCardArea";
import BannerAd from "../components/BannerAd";
import Modal from "../components/Modal";
import SearchBar from "../components/SearchBar";
import useUserStore from "../store/userStore";

const ArtistListPage = () => {
  const { user } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  


  const handleSecondaryClick = () => {
    
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginClick = () => {
    window.location.href = "/login";

  };

  const handleClickUserCheck = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="outlet-container">
      <div className="inner">
        <BannerAd />
        <div className="filter-container">
          {/* <MyArtistFilter onFilterChange={setSearchQuery} /> */}
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
