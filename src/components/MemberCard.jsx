import React from "react";

const MemberCard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // maxWidth: "200px",
        // border: "1px solid black",
        padding: "1rem",
      }}
    >
      <div
        style={{
          minHeight: "150px",
          minWidth: "150px",
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
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            flexGrow: "1",
            textAlign: "left",
          }}
        >
          멤버명
        </div>
        <div style={{ cursor: "pointer", fontSize: "2rem" }}>인</div>
      </div>
    </div>
  );
};

export default MemberCard;
