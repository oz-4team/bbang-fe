import React, { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useParams } from "react-router-dom";
import bigbangImage from "../assets/images/bigbang.png";
import ygImage from "../assets/images/yg.png";

const ArtistInfo = ({ artist, artistGroups }) => {
  const [favoriteArtist, setFavoriteArtist] = useState(false);
  const { artist_name, image_url } = artist;
  const { artist_type, id } = useParams();
  console.log("artist_type, id", artist_type, id);

  console.log("🥹🥹🥹🥹🥹🥹artist:", artist);
  console.log("❤️❤️❤️❤️❤️❤️artistGroups:", artistGroups);
  console.log("🥹🥹🥹🥹🥹🥹artist_name:", artist_name);

  const [matchingArtist, setMatchingArtist] = useState(null);

  useEffect(() => {
    if (artist_type === "solo") {
      const matchingArtist = artist.find((artist) => artist.id == id);
      setMatchingArtist(matchingArtist);
      console.log("Matching Artist:", matchingArtist, id);
    }
  }, []);

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
        {matchingArtist?.image_url}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          flexGrow: "1",
        }}
      >
        <div style={{ fontSize: "1.5rem" }}>{artist_name}</div>
        <div>
          <img
            src={ygImage}
            alt="Artist"
            style={{
              maxWidth: "200px",
              borderRadius: "15px",
            }}
          />
        </div>
        <div>
          <img
            src={bigbangImage}
            alt="Artist"
            style={{
              maxWidth: "200px",
              maxHeight: "100px",
              borderRadius: "15px",
            }}
          />
        </div>
        <div>데뷔일</div>
        <div>팬덤명</div>
      </div>
      <div onClick={toggleStar} style={{ cursor: "pointer", fontSize: "2rem" }}>
        {favoriteArtist ? <GoHeartFill color="#fe0000" /> : <GoHeart />}
      </div>
    </div>
  );
};

export default ArtistInfo;
