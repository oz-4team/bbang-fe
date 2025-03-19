import { default as React, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const ScheduleListItem = () => {
  const [starred, setStarred] = useState(false);

  const toggleStar = () => {
    setStarred(!starred);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "top",
        padding: "1rem",
        gap: "1rem",
        border: "1px solid #AFB1B6",
        borderRadius: "15px",
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
        <div>3.12</div>
        <div>18:00</div>
        <div style={{ textAlign: "left" }}>스케줄명</div>
      </div>

      <div onClick={toggleStar} style={{ cursor: "pointer", fontSize: "2rem" }}>
        {starred ? <FaStar color="#FEE500" /> : <FaRegStar color="#AFB1B6" />}
      </div>
    </div>
  );
};

export default ScheduleListItem;
