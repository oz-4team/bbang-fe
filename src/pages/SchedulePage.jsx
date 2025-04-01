import React, { useEffect, useState } from "react";
import { FaMusic } from "react-icons/fa";
import {
  fetchAllSchedules,
  fetchFavoriteSchedules,
} from "../api/schedule/scheduleApi";
import MyArtistFilterCard from "../components/MyArtistFilterCard";
import ScheduleList from "../components/ScheduleList";
import "../styles/SchedulePage.css";

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const SchedulePage = () => {
  const [view, setView] = useState("전체일정");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [allSchedules, setAllSchedules] = useState([]);
  const [favoriteSchedules, setFavoriteSchedules] = useState([]);
  const [filterType, setFilterType] = useState("전체일정");
  const [selectedArtistInfo, setSelectedArtistInfo] = useState(null);

  const fetchSchedules = async () => {
    try {
      const allData = await fetchAllSchedules();
      const favData = await fetchFavoriteSchedules();
      setAllSchedules(allData);
      setFavoriteSchedules(favData);
    } catch (err) {
      console.error("❌ 일정 가져오기 실패:", err);
    }
  };

  window.refetchSchedules = fetchSchedules;

  useEffect(() => {
    fetchSchedules();
  }, [filterType, selectedDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();
  const today = new Date();

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const scheduleData = allSchedules.reduce((acc, schedule) => {
    const start = new Date(schedule.start_date);
    if (start.getFullYear() === year && start.getMonth() === month) {
      const day = start.getDate();
      acc[day] = acc[day] || { total: 0, favorite: 0 };
      acc[day].total += 1;
    }
    return acc;
  }, {});

  favoriteSchedules.forEach((schedule) => {
    const start = new Date(schedule.start_date);
    if (start.getFullYear() === year && start.getMonth() === month) {
      const day = start.getDate();
      if (!scheduleData[day]) scheduleData[day] = { total: 0, favorite: 0 };
      scheduleData[day].favorite += 1;
    }
  });

  const weekdayHeaders = daysOfWeek.map((day, idx) => (
    <div className="day-header" key={idx}>
      {day}
    </div>
  ));

  const calendarCells = [];
  for (let i = 0; i < startDay; i++) {
    calendarCells.push(<div className="day-cell" key={`empty-${i}`} />);
  }

  for (let day = 1; day <= totalDays; day++) {
    const isToday =
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year;

    const isSelected = selectedDay === day;
    const scheduleCount = scheduleData[day]?.total || 0;
    const favoriteCount = scheduleData[day]?.favorite || 0;

    let className = "day-cell";
    if (isToday) className += " today";
    if (isSelected) className += " selected";

    const cellStyle = {};
    if (isToday) cellStyle.border = "2px solid #FF8C00"; // 강조된 오늘 테두리
    if (isSelected) {
      cellStyle.backgroundColor = "#a174ff"; // 선택 배경 강조
      cellStyle.color = "white"; // 글자색도 반전
    }

    calendarCells.push(
      <div
        key={day}
        className={className}
        style={cellStyle}
        onClick={() => {
          if (selectedDay === day) {
            setSelectedDay(null);
            setSelectedDate(null);
            setFilterType("전체일정");
          } else {
            setSelectedDay(day);
            const pad = (n) => String(n).padStart(2, "0");
            const isoDate = `${year}-${pad(month + 1)}-${pad(day)}`;
            setSelectedDate(isoDate);
          }
        }}
      >
        <div className="date-number">{day}</div>
        {isToday && (
          <div
            className="today-indicator"
            style={{
              position: "absolute",
              top: "5px",
              left: "5px",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#FF8C00",
              boxShadow: "0 0 5px rgba(255, 140, 0, 0.5)",
              color: "#FF8C00",
            }}
          ></div>
        )}
        {isToday && (
          <span
            style={{
              position: "absolute",
              top: "20px",
              left: "5px",
              fontSize: "0.7rem",
              color: "#FF8C00",
            }}
          >
            today
          </span>
        )}
        {(scheduleCount > 0 || favoriteCount > 0) && (
          <div
            className="content"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              flexWrap: "nowrap",
              fontSize: "0.8rem",
            }}
          >
            {scheduleCount === favoriteCount ? (
              <>
                <FaMusic style={{ color: "#ff6b81" }} />
                <span>{favoriteCount}</span>
              </>
            ) : (
              <>
                {scheduleCount > 0 && (
                  <>
                    <FaMusic style={{ color: "#a174ff" }} />
                    
                  </>
                )}
                {favoriteCount > 0 && scheduleCount !== favoriteCount && (
                  <>
                    <FaMusic style={{ color: "#ff6b81" }} />
                    
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="schedule-page">
      <div className="schedule-container">
        <MyArtistFilterCard
          onArtistClick={(info) => {
            if (info === null) {
              setSelectedArtistInfo(null);
              setFilterType("전체일정");
            } else if (
              selectedArtistInfo &&
              selectedArtistInfo.artistId === info.artistId &&
              selectedArtistInfo.artistGroupId === info.artistGroupId
            ) {
              setSelectedArtistInfo(null);
              setFilterType("전체일정");
            } else {
              setSelectedArtistInfo(info);
              setFilterType("아티스트");
            }
          }}
        />
        {/* </div> */}

        <div className="calendar-section">
          <div className="calendar-wrapper">
            <div className="calendar-header">
              <button
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              >
                ◀
              </button>
              <h2>
                {year}년 {month + 1}월
              </h2>
              <button
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              >
                ▶
              </button>
            </div>

            <div className="calendar-grid">
              {weekdayHeaders}
              {calendarCells}
            </div>
          </div>

          <div className="schedule-view">
            <div>
              <div className="schedule-view-selectbtn">
                <label
                  style={{
                    fontSize: "1.2rem",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    name="filter"
                    value="전체일정"
                    checked={filterType === "전체일정"}
                    onChange={handleFilterChange}
                  />
                  전체일정보기
                </label>
                <label
                  style={{
                    fontSize: "1.2rem",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    name="filter"
                    value="즐겨찾기"
                    checked={filterType === "즐겨찾기"}
                    onChange={handleFilterChange}
                  />
                  ⭐️ 즐겨찾기 한 일정보기
                </label>
              </div>

              <div>
                <ScheduleList view={filterType} selectedDay={selectedDate} artistInfo={selectedArtistInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
