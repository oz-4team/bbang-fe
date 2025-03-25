import React from "react";
import useReadSchedules from "../api/schedule/useReadSchedules";
import ScheduleListItem from "./ScheduleListItem";

const ScheduleList = () => {
  const { schedules } = useReadSchedules();

  return (
    <div
      style={{
        width: "100%",
        paddingTop: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        // maxHeight: "700px",
        overflow: "scroll",
      }}
    >
      {schedules.map((a) => (
        <>
          <ScheduleListItem
            key={a.id}
            name={a.artist ? a.artist.artist_name : a.artist_group.artist_group}
            image={
              a.image_url
                ? a.image_url
                : a.artist
                ? a.artist.image_url
                : a.artist_group.image_url
            }
            schedules={a}
            title={a.title}
            id={a.id}
            onCardClick={() => onCardClick()}
          />
        </>
      ))}
    </div>
  );
};

export default ScheduleList;
