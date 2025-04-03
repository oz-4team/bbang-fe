import React, { useEffect, useState } from "react";
import { fetchAllSchedules } from "../api/schedule/scheduleApi";
import useFavorites from "../api/schedule/useFavorites";
import defaultImage from "../assets/images/img-defualt.png";
import ScheduleCard from "./ScheduleCard";

const ScheduleCardArea = ({ onCardClick, searchQuery }) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOnlyFavorited, setShowOnlyFavorited] = useState(false);

  const { addFavorite, deleteFavorite } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllSchedules();
        setSchedules(data);
      } catch (error) {
        console.error("❌ 일정 조회 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 로딩 화면 컴포넌트
  const LoadingScreen = () => {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.text}>아티스트 스케줄을 불러오고 있어요 ⭐️</p>
      </div>
    );
  };

  // 스타일 정의
  const styles = {
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "50vh",
      backgroundColor: "#f9f9f9",
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: "5px solid #ccc",
      borderTop: "5px solid #007bff",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    text: {
      marginTop: "20px",
      fontSize: "16px",
      color: "#333",
    },
  };

  // CSS 애니메이션 추가
  const globalStyle = document.createElement("style");
  globalStyle.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
  document.head.appendChild(globalStyle);

  // 아티스트 정보가 없을 때 로딩 화면 표시

  const toggleFavorite = async (scheduleId) => {
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === scheduleId ? { ...s, is_favorited: !s.is_favorited } : s
      )
    );

    try {
      const target = schedules.find((s) => s.id === scheduleId);
      if (target?.is_favorited) {
        await deleteFavorite(scheduleId);
      } else {
        await addFavorite(scheduleId);
      }
    } catch (error) {
      console.error("즐겨찾기 토글 실패:", error);
    }
  };

  if (loading) return <LoadingScreen />;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const filteredSchedules = schedules.filter((a) => {
    const scheduleDate = new Date(a.start_date);
    const isCurrentMonth =
      scheduleDate.getMonth() === currentMonth &&
      scheduleDate.getFullYear() === currentYear;

    if (searchQuery) {
      const name = (
        a.artist?.artist_name ||
        a.artist_group?.artist_group ||
        ""
      ).toLowerCase();
      return name.includes(searchQuery.toLowerCase()) && isCurrentMonth;
    }

    return isCurrentMonth;
  });

  const displayedSchedules = showOnlyFavorited
    ? filteredSchedules.filter((a) => a.is_favorited)
    : filteredSchedules;

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "16px",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            textAlign: "left",
            marginTop: "1rem",
            marginBottom: "1rem",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          이번달 스케줄
        </h1>
        <button onClick={() => setShowOnlyFavorited((prev) => !prev)}>
          {showOnlyFavorited ? "전체보기" : "⭐️ 즐겨찾기만 보기"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {displayedSchedules.map((a) => (
          <ScheduleCard
            key={a.id}
            name={a.artist ? a.artist.artist_name : a.artist_group.artist_group}
            image={
              a.image_url ||
              a.artist?.image_url ||
              a.artist_group?.image_url ||
              defaultImage
            }
            title={a.title}
            id={a.id}
            onCardClick={() => onCardClick()}
            is_favorited={a.is_favorited}
            start_date={a.start_date}
            onToggleFavorite={(e) => {
              e.stopPropagation(); // ✨ 상세 페이지 이동 차단
              toggleFavorite(a.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScheduleCardArea;
