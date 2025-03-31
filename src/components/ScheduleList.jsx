import React, { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import { fetchFavoriteSchedules } from "../api/schedule/scheduleApi";
import ScheduleListItem from "./ScheduleListItem";
import { fetchAllSchedules } from "../api/schedule/scheduleApi";

const ScheduleList = ({ view }) => {
  const { user } = useUserStore();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const data =
          view === "전체일정"
            ? await fetchAllSchedules()
            : await fetchFavoriteSchedules();
        setSchedules(data);
      } catch (error) {
        console.error("❌ 일정 불러오기 실패:", error);
      }
    };
    loadSchedules();
  }, [view]);

  if (schedules.length === 0) return <div>일정이 없습니다.</div>;

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
