import React from "react";
import ScheduleListItem from "./ScheduleListItem";

const ScheduleList = () => {
  return (
    <div
      style={{
        maxWidth: "400px",
        width: "100%",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxHeight: "500px",
        overflow: "scroll",
      }}
    >
      <ScheduleListItem />
      <ScheduleListItem />
      <ScheduleListItem />
      <ScheduleListItem />
      <ScheduleListItem />
      <ScheduleListItem />
      <ScheduleListItem />
      <ScheduleListItem />
      <ScheduleListItem />
    </div>
  );
};

export default ScheduleList;
