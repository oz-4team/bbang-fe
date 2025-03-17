import React from "react";
import BannerAd from "../components/BannerAd";
import MyArtistFilter from "../components/MyArtistFilter";
import ScheduleCardArea from "../components/ScheduleCardArea";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        width: "100vw",
        // justifyContent: "center",
      }}
    >
      <BannerAd></BannerAd>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <MyArtistFilter></MyArtistFilter>
        <SearchBar></SearchBar>
      </div>
      <div>
        <h1
          style={{ textAlign: "left", marginTop: "1rem", marginBottom: "1rem" }}
        >
          오늘의 스케줄
        </h1>
        <ScheduleCardArea></ScheduleCardArea>
      </div>
    </div>
  );
};

export default HomePage;
