import React from "react";
import bannerAd1 from "../assets/images/banner-ad-1.png";

const BannerAd = () => {
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        height: "200px",
        padding: "auto 0",
        overflow: "hidden",
      }}
    >
      <img
        src={bannerAd1}
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
