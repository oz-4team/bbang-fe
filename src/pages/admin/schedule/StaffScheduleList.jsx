import React from "react";
import ScheduleListItemStaff from "./ScheduleListItemStaff";

const scrollContainerStyle = {
  width: "95%",
  margin: "0 auto",
  paddingTop: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxHeight: "700px",
  overflowY: "scroll",
  scrollbarWidth: "none", // Firefox
  msOverflowStyle: "none", // IE 10+
};

// Chrome, Safari, Edge 지원을 위한 스타일은 아래와 같이 class로 보완
const StaffScheduleList = ({ schedules }) => {
  if (schedules.length === 0) return <div>등록된 일정이 없습니다.</div>;

  return (
    <div
      style={scrollContainerStyle}
      className="hide-scrollbar"
    >
      {schedules.map((a) => (
        <React.Fragment key={a.id}>
          <ScheduleListItemStaff
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
        </React.Fragment>
      ))}
    </div>
  );
};

export default StaffScheduleList;

