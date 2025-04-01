import React, { useEffect, useState } from "react";
import { fetchAllSchedules } from "../api/schedule/scheduleApi";
import defaultImage from "../assets/images/img-defualt.png";
import ScheduleCard from "./ScheduleCard";

const ScheduleCardArea = ({ onCardClick, searchQuery }) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOnlyFavorited, setShowOnlyFavorited] = useState(false); // ✅ 최상위에서 호출

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

  if (loading) {
    return <div>loading...</div>;
  }

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

  const toggleShowOnlyFavorited = () => {
    setShowOnlyFavorited((prev) => !prev);
  };

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
          justifyContent: "flex-end",
        }}
      >
        <button onClick={toggleShowOnlyFavorited}>
          {showOnlyFavorited ? "전체보기" : "⭐️ 즐겨찾기만 보기"}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {displayedSchedules.map((a) => (
          <ScheduleCard
            key={a.id}
            name={a.artist ? a.artist.artist_name : a.artist_group.artist_group}
            image={
              a.image_url ||
              (a.artist && a.artist.image_url) ||
              (a.artist_group && a.artist_group.image_url) ||
              defaultImage
            }
            title={a.title}
            id={a.id}
            onCardClick={() => onCardClick()}
            is_favorited={a.is_favorited}
            start_date={a.start_date}
          />
        ))}
      </div>
    </div>
  );
};

export default ScheduleCardArea;
