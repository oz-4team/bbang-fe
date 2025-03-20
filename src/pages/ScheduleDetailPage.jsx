import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoDocumentTextOutline, IoShareSocialOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineWatchLater } from "react-icons/md";
import { RiKakaoTalkFill } from "react-icons/ri";
import useUserStore from "../store/userStore";

const ScheduleDetailPage = () => {
  const [starred, setStarred] = useState(false);
  const { user, logout } = useUserStore();

  const toggleStar = () => {
    setStarred(!starred);
  };
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
            }}
          >
            image
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
            <div style={{ fontSize: "1.5rem" }}>스케줄명</div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <LuCalendarDays color="#AFB1B6" /> <div>2025.03.12</div>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <MdOutlineWatchLater color="#AFB1B6" /> <div>18:00 ~ 24:00</div>
            </div>
            <div>category tag area</div>
            <div>hashtag area</div>
          </div>
          {user?.isAdmin ? null : (
            <div
              onClick={toggleStar}
              style={{ cursor: "pointer", fontSize: "2rem" }}
            >
              {starred ? (
                <FaStar color="#FEE500" />
              ) : (
                <FaRegStar color="#AFB1B6" />
              )}
            </div>
          )}
        </div>
        <div
          style={{
            borderBottom: "1px solid #AFB1B6",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        ></div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <BsPerson color="#AFB1B6" /> <div>출연진</div>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <IoDocumentTextOutline color="#AFB1B6" /> <div>설명</div>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <FiLink color="#AFB1B6" /> <div>링크</div>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <GrLocation color="#AFB1B6" />
            <div>주소 ㅇㅇ시 ㅇㅇ구 ㅇㅇ동 ㅇㅇ번지 </div>
          </div>
        </div>
        <div
          style={{
            borderBottom: "1px solid #AFB1B6",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        ></div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <IoShareSocialOutline color="#AFB1B6" />
          <div>공유하기</div>
          <button
            style={{ display: "flex", gap: "1rem", alignItems: "center" }}
          >
            <div
              style={{
                backgroundColor: "#FFEB00",
                borderRadius: "50%",
                padding: "0.5rem",
              }}
            >
              <RiKakaoTalkFill />
            </div>
            카카오로 공유하기
          </button>
          <button
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              // backgroundColor: "none",
            }}
          >
            <div
              style={{
                backgroundColor: "#4285F4",
                borderRadius: "50%",
                padding: "0.5rem",
                color: "white",
                fontSize: "0.5rem",
              }}
            >
              url
            </div>
            URL 복사하기
          </button>
        </div>
        <div
          style={{
            borderBottom: "1px solid #AFB1B6",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        ></div>
        <button>수정하기</button>
      </div>
    </div>
  );
};

export default ScheduleDetailPage;
