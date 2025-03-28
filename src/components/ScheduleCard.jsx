import { default as React, useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useFavorites from "../api/schedule/useFavorites";
import useUserStore from "../store/userStore";

const ScheduleCard = ({
  artistname,
  name,
  image,
  title,
  id,
  onCardClick,
  is_favorited,
}) => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const [starred, setStarred] = useState(is_favorited);
  const { favorite, loading, addFavorite, readFavorite, deleteFavorite } =
    useFavorites();

  const toggleStar = async (e) => {
    e.stopPropagation();

    if (!starred) {
      try {
        await addFavorite(id);
        setStarred(true);
      } catch (err) {
        console.error("즐겨찾기 추가 실패:", err);
      }
    } else {
      try {
        await deleteFavorite(id);
        setStarred(false);
      } catch (err) {
        console.error("즐겨찾기 삭제 실패:", err);
      }
    }
  };
  const handleClickScheduleDetail = (e) => {
    e.stopPropagation();
    navigate(`/schedule/details/${id}`);
  };

  useEffect(() => {
    // readFavorite();
  }, []);

  return (
    <div
      onClick={user ? handleClickScheduleDetail : onCardClick}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
        padding: "1rem 0",
        transition: "transform 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
          {title}
        </div>
        <div
          onClick={user ? toggleStar : onCardClick}
          style={{ cursor: "pointer", fontSize: "2rem" }}
        >
          {starred ? <FaStar color="#FEE500" /> : <FaRegStar color="#AFB1B6" />}
        </div>
      </div>
      <div style={{ textAlign: "left" }}>{name}</div>
    </div>
  );
};

export default ScheduleCard;
