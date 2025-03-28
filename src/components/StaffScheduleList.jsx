import React, { useEffect, useState } from "react";
import ScheduleListItem from "./ScheduleListItem";
import { staffAllSchedules } from "../api/StaffSchedule/staffScheduleApi";


const StaffScheduleList = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const data = await staffAllSchedules();
        console.log("👀 받은 데이터:", data);
        setSchedules(Array.isArray(data) ? data : data.schedules || []);
      } catch (error) {
        console.error("❌ 일정 불러오기 실패:", error);
      }
    };
    loadSchedules();
  }, []);

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

export default StaffScheduleList
