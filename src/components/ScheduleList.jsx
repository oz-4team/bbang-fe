import React from "react";
import ScheduleListItem from "./ScheduleListItem";

const ScheduleList = () => {
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
      <ScheduleListItem />
      <ScheduleListItem />
      <ScheduleListItem />
      <ScheduleListItem />
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
