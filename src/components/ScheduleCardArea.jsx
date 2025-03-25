import React from "react";
import useReadSchedules from "../api/schedule/useReadSchedules";
import ScheduleCard from "./ScheduleCard";


const ScheduleCardArea = ({ onCardClick }) => {
  const { schedules } = useReadSchedules();

  console.log("schedules🙂:", schedules);

  if (schedules.length === 0) {
    return <div>loading...</div>;

  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "32px",
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
          />
        </>
      ))}
    </div>
  );
};

export default ScheduleCardArea;
