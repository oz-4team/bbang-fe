import React from "react";

const ScheduleCard = () => {
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
          paddingTop: "1rem",
        }}
      >
        <div>스케줄명</div>
        <div>별</div>
      </div>
      <div style={{ textAlign: "left" }}>아티스트명</div>
    </div>
  );
};

export default ScheduleCard;
