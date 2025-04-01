import React, { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import useLikes from "../api/artist/useLikes";

const ArtistInfo = ({ artist, artistGroups }) => {
  const artist_agency = artist?.artist_agency || artistGroups?.artist_agency;
  const debut_date = artist?.debut_date || artistGroups?.debut_date;
  const group_fandom = artist?.group_fandom || artistGroups?.group_fandom;
  const group_insta = artist?.group_insta || artistGroups?.group_insta;
  const artist_group = artist?.artist_group || artistGroups?.artist_group;
  const artist_name = artist?.artist_name || artistGroups?.artist_name;
  const image_url = artist?.image_url || artistGroups?.image_url;
  const is_liked = artist?.is_liked || artistGroups?.is_liked;
  const id = artist?.id || artistGroups?.id;

  const {
    addLikeArtist,
    addLikeArtistGroup,
    deleteLikeArtistGroup,
    deleteLikeArtist,
  } = useLikes();

  const type = artist_name ? "solo" : "group";

  const [favoriteArtist, setFavoriteArtist] = useState(is_liked);

  const toggleLike = (e) => {
    e.stopPropagation();
    setFavoriteArtist(!favoriteArtist);

    if (favoriteArtist === false) {
      if (type === "solo") {
        addLikeArtist(id);
      } else if (type === "group") {
        addLikeArtistGroup(id);
      }
    }

    if (favoriteArtist === true) {
      if (type === "solo") {
        deleteLikeArtist(id);
      } else if (type === "group") {
        deleteLikeArtistGroup(id);
      }
    }
  };

  // const toggleStar = () => {
  //   setFavoriteArtist(!favoriteArtist);
  // };
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
      <div onClick={toggleLike} style={{ cursor: "pointer", fontSize: "2rem" }}>
        {favoriteArtist ? <GoHeartFill color="#fe0000" /> : <GoHeart />}
      </div>
    </div>
  );
};

export default ArtistInfo;
