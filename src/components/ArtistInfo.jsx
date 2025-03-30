import React, { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

const ArtistInfo = ({ artist }) => {
  const [favoriteArtist, setFavoriteArtist] = useState(false);
  const {
    artist_agency,
    debut_date,
    group_fandom,
    group_insta,
    artist_group,
    artist_name,
    image_url,
  } = artist;

  const toggleStar = () => {
    setFavoriteArtist(!favoriteArtist);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        gap: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "300px",
          minWidth: "200px",
          maxHeight: "300px",
          minHeight: "200px",
          border: "1px solid #AFB1B6",
          borderRadius: "15px",
        }}
      >
        <img
          src={image_url}
          alt="Artist"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "15px",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          flexGrow: "1",
        }}
      >
        <div style={{ fontSize: "1.5rem" }}>
          {artist_name ? artist_name : artist_group}
        </div>
        <div>{artist_agency}</div>
        {/* <div>
          <img
            src={bigbangImage}
            alt="Artist"
            style={{
              maxWidth: "200px",
              maxHeight: "100px",
              borderRadius: "15px",
            }}
          />
        </div> */}
        <div>{debut_date}</div>
        <div>{group_fandom}</div>
        <div>
          {" "}
          <a href={group_insta}>{group_insta}</a>
        </div>
      </div>
      <div onClick={toggleStar} style={{ cursor: "pointer", fontSize: "2rem" }}>
        {favoriteArtist ? <GoHeartFill color="#fe0000" /> : <GoHeart />}
      </div>
    </div>
  );
};

export default ArtistInfo;
