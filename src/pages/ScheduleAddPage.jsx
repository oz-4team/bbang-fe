import React from "react";
import { BsPerson } from "react-icons/bs";
import { FiLink } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";

const ScheduleAddPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: "2rem",
          }}
        >
          <div
            style={{
              maxWidth: "300px",
              minWidth: "200px",
              maxHeight: "300px",
              minHeight: "200px",
              border: "1px solid #AFB1B6",
              borderRadius: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input type="file" accept="image/*" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              flexGrow: "1",
              gap: "1rem",
            }}
          >
            <div>
              <label>스케줄명</label>
              <input type="text" />
            </div>
            <div>
              <label>스케줄 날짜</label>
              <input type="date" />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "flex-start",
              }}
            >
              <label>시작 시간</label>
              <input type="time" />
              <label>종료 시간</label>
              <input type="time" />
            </div>
            <div>category tag area</div>
            <div>
              <label>해시태그</label>
              <input type="text" />
            </div>
          </div>
        </div>
        <div
          style={{
            borderBottom: "1px solid #AFB1B6",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        ></div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <BsPerson color="#AFB1B6" />
              <div>출연진</div>
            </div>
            <input type="text" />
          </div>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <IoDocumentTextOutline color="#AFB1B6" />
              <div>설명</div>
            </div>
            <input type="text" />
          </div>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <FiLink color="#AFB1B6" />
              <div>링크</div>
            </div>
            <input type="text" />
          </div>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <GrLocation color="#AFB1B6" />
              <div>주소</div>
            </div>
            <input type="text" />
          </div>
        </div>
        <div
          style={{
            borderBottom: "1px solid #AFB1B6",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        ></div>
        <button>등록하기</button>
        <button>삭제하기</button>
      </div>
    </div>
  );
};

export default ScheduleAddPage;
