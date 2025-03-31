import React, { useEffect, useState } from "react";
import useFavorites from "../api/schedule/useFavorites";
import BannerAd from "../components/BannerAd";
import Modal from "../components/Modal";
import MyArtistFilter from "../components/MyArtistFilter";
import ScheduleCardArea from "../components/ScheduleCardArea";
import SearchBar from "../components/SearchBar";
import useUserStore from "../store/userStore";

const HomePage = () => {
  const { readFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUserStore();

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            flexWrap: "wrap",
            width: "100%",
            gap: "1rem",
          }}
        >
          <MyArtistFilter onFilterChange={setSearchQuery}></MyArtistFilter>
          <SearchBar></SearchBar>
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
            오늘의 스케줄
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
