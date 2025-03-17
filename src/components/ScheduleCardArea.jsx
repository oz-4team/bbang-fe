import React from "react";
import ScheduleCard from "./ScheduleCard";

const ScheduleCardArea = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "16px",
      }}
    >
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
    </div>
  );
};

export default ScheduleCardArea;
