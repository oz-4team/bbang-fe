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
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <BannerAd />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "1rem",
          }}
        >
          <SearchBar />
        </div>

        <ArtistCardArea />
      </div>
    </div>
  );
};

export default ArtistListPage;
