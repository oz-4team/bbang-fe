import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const ScheduleAreaInArtist = () => {
  return (
    <div>
      <div
        style={{
          textAlign: "left",
          fontSize: "2rem",
          marginTop: "2rem",
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        스케줄
        <div style={{ fontSize: "1rem" }}>
          <button>더보기</button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            border: "1px solid #AFB1B6",
            borderRadius: "15px",
            textAlign: "left",
            padding: "1rem",
            color: "AFB1B6",
            fontSize: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          스케줄명
          <div>
            <IoIosArrowForward />
          </div>
        </div>
        <div
          style={{
            border: "1px solid #AFB1B6",
            borderRadius: "15px",
            textAlign: "left",
            padding: "1rem",
            color: "AFB1B6",
            fontSize: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          스케줄명
          <div>
            <IoIosArrowForward />
          </div>
        </div>
        <div
          style={{
            border: "1px solid #AFB1B6",
            borderRadius: "15px",
            textAlign: "left",
            padding: "1rem",
            color: "AFB1B6",
            fontSize: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          스케줄명
          <div>
            <IoIosArrowForward />
          </div>
        </div>
        <div
          style={{
            border: "1px solid #AFB1B6",
            borderRadius: "15px",
            textAlign: "left",
            padding: "1rem",
            color: "AFB1B6",
            fontSize: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          스케줄명
          <div>
            <IoIosArrowForward />
          </div>
        </div>
        <div
          style={{
            border: "1px solid #AFB1B6",
            borderRadius: "15px",
            textAlign: "left",
            padding: "1rem",
            color: "AFB1B6",
            fontSize: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          스케줄명
          <div>
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAreaInArtist;
