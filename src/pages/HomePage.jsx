import React, { useEffect, useState } from "react";
import useFavorites from "../api/schedule/useFavorites";
import BannerAd from "../components/BannerAd";
import Modal from "../components/Modal";
import ScheduleCardArea from "../components/ScheduleCardArea";
import SearchBar from "../components/SearchBar";
import useUserStore from "../store/userStore";

const HomePage = () => {
  const { readFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUserStore();
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    if (user) {
      readFavorite();
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const handleclickUserCheck = (e) => {
    setIsModalOpen(true);
  };

  // 그룹에 속해있는 아티스트는 제외
  let filteredArtists = artists.filter(
    (a) => !(a.artist_name && a.artist_group)
  );

  // 검색어로 필터링
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredArtists = filteredArtists.filter((a) =>
      (a.artist_name || a.artist_group).toLowerCase().includes(q)
    );
  }
  // 좋아요만 보기
  if (showLikedOnly) {
    filteredArtists = filteredArtists.filter((a) => a.is_liked);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        width: "100vw",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <BannerAd></BannerAd>
        <div className="toggle-buttons">
          {/* <button
            className={!showLikedOnly ? "active" : ""}
            onClick={() => {
              setShowLikedOnly(false);
              setSearchQuery(""); // Reset search query
            }}
          >
            전체 가수 보기
          </button>
          <button
            className={showLikedOnly ? "active" : ""}
            onClick={() => {
              setShowLikedOnly(true);
              setSearchQuery(""); // Reset search query
            }}
          >
            좋아요한 가수들
          </button> */}
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <div>
          <h1
            style={{
              textAlign: "left",
              marginTop: "1rem",
              marginBottom: "1rem",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            이번달 스케줄
          </h1>

          <ScheduleCardArea
            onCardClick={handleclickUserCheck}
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
    </div>
  );
};

export default HomePage;
