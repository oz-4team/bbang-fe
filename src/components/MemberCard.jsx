import React from "react";
import InstagramLogo from "../assets/images/Instagram-logo.svg";

const MemberCard = ({ artist }) => {
  const { artist_name, image_url } = artist;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // padding: "1rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <div
        style={{
          minHeight: "150px",
          minWidth: "150px",
          width: "100%",
          border: "1px solid #AFB1B6",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <img src={image_url} alt="" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "0.5rem",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "normal",
            flexGrow: "1",
            textAlign: "left",
          }}
        >
          {artist_name}
        </div>
        <div style={{ cursor: "pointer", fontSize: "2rem" }}>
          <img
            src={InstagramLogo}
            alt="Instagram"
            style={{ width: "24px", height: "24px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
