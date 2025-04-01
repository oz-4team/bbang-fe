import React, { useEffect, useState } from "react";
import useLikes from "../api/artist/useLikes";
import ArtistCardArea from "../components/ArtistCardArea";
import BannerAd from "../components/BannerAd";
import Modal from "../components/Modal";
import MyArtistFilter from "../components/MyArtistFilter";
import SearchBar from "../components/SearchBar";
import useUserStore from "../store/userStore";

const ArtistListPage = () => {
  const { user } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { readAllLikes, likes } = useLikes();
  console.log("searchQuery:", searchQuery);

  useEffect(() => {
    if (user) {
      readAllLikes();
    }
  }, []);

  console.log("아티스트 페이지 likes:", likes);

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
          <MyArtistFilter onFilterChange={setSearchQuery} />
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <button
          onClick={() =>
            setSearchQuery(
              likes
                .map((like) => like.artist_id || like.artist_group_id)
                .join(",")
            )
          }
        >
          좋아요 가수들
        </button>

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
