import React from "react";

const MyArtistFilterCard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <img
        src="src/assets/images/psy.jpg"
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
