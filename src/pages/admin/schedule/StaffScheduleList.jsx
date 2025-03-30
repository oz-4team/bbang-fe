import React from "react";
import ScheduleListItemStaff from "./ScheduleListItemStaff";

const StaffScheduleList = ({ schedules }) => {
  if (schedules.length === 0) return <div>등록된 일정이 없습니다.</div>;

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
          <ScheduleListItemStaff
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

export default StaffScheduleList;
