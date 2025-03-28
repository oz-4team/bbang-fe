import { default as React, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import useLikes from "../api/artist/useLikes";
import useUserStore from "../store/userStore";

const ArtistCard = ({ name, image, type, id, onCardClick, is_liked }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [favoriteArtist, setFavoriteArtist] = useState(is_liked);
  const {
    addLikeArtist,
    addLikeArtistGroup,
    deleteLikeArtistGroup,
    deleteLikeArtist,
  } = useLikes();

  // useEffect(() => {
  //   readLike();
  // }, []);

  const handleClickArtistDetail = (e) => {
    e.stopPropagation();
    navigate(`/artist/${type}/${id}`);
  };

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

  return (
    <div
      onClick={user ? handleClickArtistDetail : onCardClick}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
        // padding: "1rem",
        cursor: "pointer",
        transition: "transform 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        style={{
          minHeight: "150px",
          minWidth: "150px",
          border: "1px solid #AFB1B6",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            aspectRatio: "1/1",
          }}
        />
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
          {id}:{name} {type === "group" ? "(그룹)" : "(솔로)"}
        </div>
        <div
          onClick={user ? toggleLike : onCardClick}
          style={{ cursor: "pointer", fontSize: "2rem" }}
        >
          {favoriteArtist ? <GoHeartFill color="#fe0000" /> : <GoHeart />}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
