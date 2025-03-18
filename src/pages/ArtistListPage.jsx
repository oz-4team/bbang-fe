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
        gap: "1rem",
        // justifyContent: "center",
      }}
    >
      <BannerAd />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <SearchBar />
      </div>

      <ArtistCardArea />
    </div>
  );
};

export default ArtistListPage;
