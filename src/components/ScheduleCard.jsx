import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const ScheduleCard = ({
  name,
  image,
  title,
  id,
  onCardClick,
  is_favorited,
  start_date,
  onToggleFavorite,
}) => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleClickScheduleDetail = (e) => {
    e.stopPropagation();
    navigate(`/schedule/details/${id}`);
  };

  return (
    <div
      onClick={user ? handleClickScheduleDetail : onCardClick}
      style={{
        display: "flex",
        transition: "transform 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        style={{
          maxHeight: "100px",
          maxWidth: "100px",
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
          justifyContent: "flex-start",
          flexDirection: "column",
          paddingLeft: "0.5rem",
          flexGrow: "1",
        }}
      >
        <div
          style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "left" }}
        >
          {title}
        </div>
        <div style={{ textAlign: "left" }}>{name}</div>
        <div style={{ textAlign: "left", color: "#AFB1B6" }}>
          {new Date(start_date)
            .toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\//g, "-")}
        </div>
      </div>
      {user?.is_staff ? null : (
        <div
          onClick={user ? onToggleFavorite : onCardClick}
          style={{ cursor: "pointer", fontSize: "2rem" }}
        >
          {is_favorited ? (
            <FaStar color="#FEE500" />
          ) : (
            <FaRegStar color="#ebebeb" />
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleCard;
