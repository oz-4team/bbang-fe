import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoDocumentTextOutline, IoShareSocialOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineWatchLater } from "react-icons/md";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "../store/userStore";
import { fetchScheduleDetail } from "../api/schedule/scheduleApi";

const ScheduleDetailPage = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const date = schedule?.start_date?.split("T")[0];
  const start_time = schedule?.start_date?.split("T")[1];
  const end_time = schedule?.end_date?.split("T")[1];
  const location = schedule?.location;
  const description = schedule?.description;
  const image =
    schedule?.image_url ||
    schedule?.artist?.image_url ||
    schedule?.artist_group?.image_url;
  const is_favorited = schedule?.is_favorited;
  const [starred, setStarred] = useState(is_favorited);

  useEffect(() => {
    setStarred(is_favorited);
  }, [is_favorited]);

  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const data = await fetchScheduleDetail(id);
        console.log("✅ 가져온 상세 데이터:", data);
        setSchedule(data);
      } catch (err) {
        console.error("❌ 상세 정보 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, id, navigate]);

  if (loading || !schedule) return <div>로딩 중...</div>;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("URL이 클립보드에 복사되었습니다.");
    });
  };

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
              overflow: "hidden",
            }}
          >
            <img
              src={image}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                aspectRatio: "1/1",
              }}
            />
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
            <div style={{ fontSize: "1.5rem" }}>{schedule.title}</div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <LuCalendarDays color="#AFB1B6" /> <div>{date}</div>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <MdOutlineWatchLater color="#AFB1B6" />{" "}
              <div>
                {start_time} ~ {end_time}
              </div>
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
            <IoDocumentTextOutline color="#AFB1B6" />{" "}
            <div>{schedule.description}</div>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <FiLink color="#AFB1B6" /> <div>링크</div>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <GrLocation color="#AFB1B6" />
            <div>{schedule.location} </div>
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
            }}
            onClick={copyToClipboard}
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
        {!user?.isAdmin ? null : (
          <>
            <div
              style={{
                borderBottom: "1px solid #AFB1B6",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            ></div>
            <button onClick={() => navigate("/schedule-management/edit")}>
              수정하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleDetailPage;
