import React from "react";
import MyArtistFilterCard from "../components/MyArtistFilterCard";

const SchedulePage = () => {
  const navigateToDetails = () => {
    window.location.href = "/schedule/details";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "lightgray",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "flex-start",
            paddingBottom: "2rem",
          }}
        >
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            마이아티스트
          </div>
        </div>
        <div
          style={{
            display: "-webkit-inline-box",
            gap: "1rem",
            // overflowX: "scroll",
            overflow: "scroll",
          }}
        >
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
        </div>

        <button onClick={navigateToDetails}>디테일페이지로 이동</button>
      </div>
    </div>
  );
};

export default SchedulePage;
