import React from "react";
import psyImage from "../assets/images/psy.jpg";

const MyArtistFilterCard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <img
        src={psyImage}
        style={{
          width: "4rem",
          height: "4rem",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <div>싸이</div>
    </div>
  );
};

export default MyArtistFilterCard;
