import React, { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import { fetchFavoriteSchedules } from "../api/schedule/scheduleApi";
import ScheduleListItem from "./ScheduleListItem";
import { fetchAllSchedules } from "../api/schedule/scheduleApi";

const ScheduleList = ({ view, selectedDay }) => {
  const { user } = useUserStore();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    console.log("📅 ScheduleList useEffect - selectedDay:", selectedDay);
    const loadSchedules = async () => {
      try {
        let data = [];

        if (view === "전체일정") {
          data = await fetchAllSchedules();
        } else {
          data = await fetchFavoriteSchedules();
        }

        // 필터: selectedDay가 있을 경우 해당 날짜만 필터링
        if (selectedDay) {
          data = data.filter((item) => {
            const itemDateObj = new Date(item.start_date);
            const itemDate = `${itemDateObj.getFullYear()}-${String(itemDateObj.getMonth() + 1).padStart(2, '0')}-${String(itemDateObj.getDate()).padStart(2, '0')}`;
            return itemDate === selectedDay;
          });
        }

        setSchedules(data);
      } catch (error) {
        console.error("❌ 일정 불러오기 실패:", error);
      }
    };
    loadSchedules();
  }, [view, selectedDay]);

  if (schedules.length === 0) return <div>일정이 없습니다.</div>;

  return (
    <div
      style={{
        width: "100%",
        paddingTop: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        overflow: "scroll",
      }}
    >
      {schedules.map((a) => (
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
          onCardClick={() => (window.location.href = `/schedule/${a.id}`)}
        />
      ))}
    </div>
  );
};

export default ScheduleList;
