import { default as React, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const ScheduleCard = ({ artistname, name, image }) => {
  const [starred, setStarred] = useState(false);

  const toggleStar = () => {
    setStarred(!starred);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
        // border: "1px solid black",
        padding: "1rem 0",
      }}
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
        <img src={image} alt="" />
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
          {name}
        </div>
        <div
          onClick={toggleStar}
          style={{ cursor: "pointer", fontSize: "2rem" }}
        >
          {starred ? <FaStar color="#FEE500" /> : <FaRegStar color="#AFB1B6" />}
        </div>
      </div>
      <div style={{ textAlign: "left" }}>{artistname}</div>
    </div>
  );
};

export default ScheduleCard;
