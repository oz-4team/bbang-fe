import React, { useEffect, useState } from "react";
import { fetchAllSchedules } from "../api/schedule/scheduleApi";
import defaultImage from "../assets/images/img-defualt.png";
import ScheduleCard from "./ScheduleCard";

const ScheduleCardArea = ({ onCardClick, searchQuery }) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // 검색어로 필터링
  const filteredSchedules = searchQuery
    ? schedules.filter((a) =>
        (a.artist?.artist_name || a.artist_group?.artist_group)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : schedules;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {filteredSchedules.map((a) => (
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
        />
      ))}
      {searchQuery === "all" &&
        schedules.map((a) => (
          <ScheduleCard
            key={`all-${a.id}`}
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
          />
        ))}
    </div>
  );
};

export default ScheduleCardArea;
