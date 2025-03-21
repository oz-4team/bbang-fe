import { default as React, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const ArtistCard = ({ name, image }) => {
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
        maxWidth: "500px",

        padding: "1rem",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          minHeight: "150px",
          width: "100%",
          border: "1px solid #AFB1B6",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <img src={image} alt="" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "0.5rem",
        }}
      >
        <div
          style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "left" }}
        >
          {name}
        </div>
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
