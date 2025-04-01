import { default as React, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useFavorites from "../api/schedule/useFavorites";
import useUserStore from "../store/userStore";

const ScheduleListItem = ({ schedules, handleclickUserCheck }) => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const id = schedules?.id;
  const title = schedules?.title;
  const full_date = schedules?.start_date?.split("T")[0];
  const date = full_date.split("-").slice(1).join(".");
  const full_start_time = schedules?.start_date?.split("T")[1];
  const start_time = full_start_time.split(":").slice(0, 2).join(":");
  const end_time = schedules?.end_date?.split("T")[1];
  const is_favorited = schedules?.is_favorited;
  const [starred, setStarred] = useState(is_favorited);
  const artist = schedules?.artist;
  const artist_group = schedules?.artist_group;

  const { addFavorite, deleteFavorite } = useFavorites();

  const toggleStar = async () => {
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
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        {
          user ? navigate(`/schedule/details/${id}`) : handleclickUserCheck();
        }
      }}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "1rem",
        gap: "1rem",
        border: "1px solid #ebebeb",
        borderRadius: "15px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          flexGrow: "1",
          display: "flex",
          gap: "1rem",
          alignItems: "top",
        }}
      >
        <div style={{ color: "#000000a4" }}> {date} </div>
        <div style={{ color: "#000000a4" }}>{start_time?.slice(0, 5)} </div>
        <div>
          <div style={{ textAlign: "left", fontWeight: "bold" }}>{title}</div>
          <div
            style={{
              textAlign: "left",
              color: "#6200ead5",
              fontSize: "0.7rem",
            }}
          >
            {artist?.artist_name || artist_group?.artist_group}
          </div>
        </div>
      </div>
      {user?.is_staff ? null : (
        <div
          onClick={(e) => {
            e.stopPropagation();
            {
              user ? toggleStar() : handleclickUserCheck();
            }
          }}
          style={{ cursor: "pointer", fontSize: "2rem" }}
        >
          {starred ? <FaStar color="#FEE500" /> : <FaRegStar color="#ebebeb" />}
        </div>
      )}
    </div>
  );
};

export default ScheduleListItem;
