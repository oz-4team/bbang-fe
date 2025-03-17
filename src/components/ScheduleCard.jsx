import { default as React, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const ScheduleCard = () => {
  const [starred, setStarred] = useState(false);

  const toggleStar = () => {
    setStarred(!starred);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "200px",
        // border: "1px solid black",
        padding: "1rem",
      }}
    >
      <div
        style={{
          minHeight: "150px",
          width: "100%",
          border: "1px solid black",
          borderRadius: "15px",
        }}
      >
        image
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "0.5rem",
        }}
      >
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>스케줄명</div>
        <div
          onClick={toggleStar}
          style={{ cursor: "pointer", fontSize: "2rem" }}
        >
          {starred ? <FaStar color="#FEE500" /> : <FaRegStar />}
        </div>
      </div>
      <div style={{ textAlign: "left" }}>아티스트명</div>
    </div>
  );
};

export default ScheduleCard;
