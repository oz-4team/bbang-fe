import { default as React, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const ArtistCard = () => {
  const navigate = useNavigate();
  const [favoriteArtist, setFavoriteArtist] = useState(false);

  const toggleStar = () => {
    setFavoriteArtist(!favoriteArtist);
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        navigate("/artist/details");
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "200px",
        // border: "1px solid black",
        padding: "1rem",
      }}
    >
      <div
        style={{
          minHeight: "150px",
          width: "100%",
          border: "1px solid #AFB1B6",
          borderRadius: "15px",
        }}
      >
        image
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "0.5rem",
        }}
      >
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>아티스트명</div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleStar();
          }}
          style={{ cursor: "pointer", fontSize: "2rem" }}
        >
          {favoriteArtist ? <GoHeartFill color="#fe0000" /> : <GoHeart />}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
