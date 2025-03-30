import { default as React, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/userStore";
const ScheduleListItemStaff = ({ schedules }) => {
  const { user } = useUserStore();
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

  const toggleStar = () => {
    setStarred(!starred);
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/schedule/details/${id}`);
      }}
      style={{
        display: "flex",
        alignItems: "top",
        padding: "1rem",
        gap: "1rem",
        border: "1px solid #AFB1B6",
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
        <div> {date} </div>
        <div>{start_time}</div>
        <div style={{ textAlign: "left" }}>{title}</div>
      </div>
      {user?.is_staff ? null : (
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleStar();
          }}
          style={{ cursor: "pointer", fontSize: "2rem" }}
        >
          {starred ? <FaStar color="#FEE500" /> : <FaRegStar color="#AFB1B6" />}
        </div>
      )}
    </div>
  );
};

export default ScheduleListItemStaff;
