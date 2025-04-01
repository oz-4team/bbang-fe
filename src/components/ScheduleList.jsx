import React, { useEffect, useState } from "react";
import {
  fetchAllSchedules,
  fetchArtistSchedules,
  fetchFavoriteSchedules,
  fetchGroupSchedules,
} from "../api/schedule/scheduleApi";
import useUserStore from "../store/userStore";
import ScheduleListItem from "./ScheduleListItem";

const ScheduleList = ({
  view,
  selectedDay,
  artistInfo,
  handleclickUserCheck,
}) => {
  const { user } = useUserStore();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        let data = [];

        if (view === "전체일정") {
          data = await fetchAllSchedules();
        } else if (view === "즐겨찾기") {
          data = await fetchFavoriteSchedules();
        } else if (view === "아티스트" && artistInfo) {
          if (artistInfo.artistId) {
            data = await fetchArtistSchedules(artistInfo.artistId);
          } else if (artistInfo.artistGroupId) {
            data = await fetchGroupSchedules(artistInfo.artistGroupId);
          }
        }

        // 필터: selectedDay가 있을 경우 해당 날짜만 필터링
        if (selectedDay) {
          data = data.filter((item) => {
            const itemDateObj = new Date(item.start_date);
            const itemDate = `${itemDateObj.getFullYear()}-${String(
              itemDateObj.getMonth() + 1
            ).padStart(2, "0")}-${String(itemDateObj.getDate()).padStart(
              2,
              "0"
            )}`;
            return itemDate === selectedDay;
          });
        }

        setSchedules(data);
      } catch (error) {
        console.error("❌ 일정 불러오기 실패:", error);
      }
    };
    loadSchedules();
  }, [view, selectedDay, artistInfo]);

  if (schedules.length === 0)
    return (
      <div style={{ marginTop: "1rem", color: "#AFB1B6" }}>
        앗, 일정이 없어요 🫠<br></br> 다른 날짜를 눌러서 다른 스케줄을
        확인해보세요!
      </div>
    );

  const now = new Date();

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
      {schedules.map((a) => {
        const endDate = new Date(a.end_date);
        const today = new Date();
        const isExpired = endDate.toDateString() < today.toDateString();

        return (
          <ScheduleListItem
            handleclickUserCheck={() => handleclickUserCheck()}
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
            isExpired={isExpired}
          />
        );
      })}
    </div>
  );
};

export default ScheduleList;
