import React from "react";

const BannerAd = () => {
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        height: "150px",
        padding: "auto 0",
        overflow: "hidden",
      }}
    >
      <img
        src="https://images.khan.co.kr/article/2025/02/04/news-p.v1.20250204.b790c1ad929e40eb9775126c3828f56b_P1.jpg"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          aspectRatio: "1/1",
        }}
      />
      {/* <div>AD Banner Area</div> */}
    </div>
  );
};

export default BannerAd;
