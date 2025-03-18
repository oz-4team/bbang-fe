import React from "react";

const ArtistInfo = () => {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          maxWidth: "300px",
          minWidth: "100px",
          maxHeight: "300px",
          minHeight: "100px",
          border: "1px solid #eeeeee",
        }}
      >
        Image Area
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>아티스트명</div>
        <div>소속사 로고</div>
        <div>아티스트 로고</div>
        <div>데뷔일</div>
        <div>팬덤명</div>
      </div>
    </div>
  );
};

export default ArtistInfo;
