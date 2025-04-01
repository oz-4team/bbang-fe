import { default as React } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import useLikes from "../api/artist/useLikes";
import useUserStore from "../store/userStore";

const ArtistCard = ({ name, image, type, id, onCardClick, is_liked, onLikeToggle }) => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const {
    addLikeArtist,
    addLikeArtistGroup,
    deleteLikeArtistGroup,
    deleteLikeArtist,
  } = useLikes();

  const handleClickArtistDetail = (e) => {
    e.stopPropagation();
    navigate(`/artist/${type}/${id}`);
  };

  const toggleLike = async (e) => {
    e.stopPropagation();
    onLikeToggle(); // 로컬 상태 먼저 업데이트

    try {
      if (is_liked === false) {
        if (type === "solo") {
          await addLikeArtist(id);
        } else {
          await addLikeArtistGroup(id);
        }
      } else {
        if (type === "solo") {
          await deleteLikeArtist(id);
        } else {
          await deleteLikeArtistGroup(id);
        }
      }
    } catch (error) {
      console.error("좋아요 토글 중 오류 발생:", error);
      // TODO: 실패 시 롤백 처리 필요하면 여기 추가
    }
  };

  return (
    <div
      onClick={user ? handleClickArtistDetail : onCardClick}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
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
          style={{
            fontSize: "1.4rem",
            wordBreak: "break-all",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          {name}
        </div>
        <div
          onClick={user ? toggleLike : onCardClick}
          style={{ cursor: "pointer", fontSize: "2rem" }}
        >
          {is_liked ? <GoHeartFill color="#fe0000" /> : <GoHeart />}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;

