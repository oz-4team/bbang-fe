import React from "react";
import ArtistCardArea from "../components/ArtistCardArea";
import BannerAd from "../components/BannerAd";
import SearchBar from "../components/SearchBar";

const ArtistListPage = () => {
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
      <BannerAd />
      <SearchBar />
      <ArtistCardArea />
    </div>
  );
};

export default ArtistListPage;
