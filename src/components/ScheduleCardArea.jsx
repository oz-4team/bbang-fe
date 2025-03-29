import React, { useEffect, useState } from "react";
import { fetchAllSchedules } from "../api/schedule/scheduleApi";
import ScheduleCard from "./ScheduleCard";

const ScheduleCardArea = ({ onCardClick }) => {
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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "16px",
      }}
    >
      {schedules.map((a) => (
        <>
          <ScheduleCard
            key={a.id}
            name={a.artist ? a.artist.artist_name : a.artist_group.artist_group}
            image={
              a.image_url
                ? a.image_url
                : a.artist
                ? a.artist.image_url
                : a.artist_group.image_url
            }
            title={a.title}
            id={a.id}
            onCardClick={() => onCardClick()}
            is_favorited={a.is_favorited}
          />
        </>
      ))}
    </div>
  );
};

export default ScheduleCardArea;
