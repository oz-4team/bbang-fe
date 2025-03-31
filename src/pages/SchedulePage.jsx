import React, { useState, useEffect } from "react";
import MyArtistFilterCard from "../components/MyArtistFilterCard";
import ScheduleList from "../components/ScheduleList";
import { FaMusic } from "react-icons/fa";
import "../styles/SchedulePage.css";
import { fetchAllSchedules } from "../api/schedule/scheduleApi";

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const SchedulePage = () => {
  const [view, setView] = useState("전체일정");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [allSchedules, setAllSchedules] = useState([]);
  const [filterType, setFilterType] = useState("전체일정");

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await fetchAllSchedules(); // 전체 일정 API 호출
        setAllSchedules(data);
      } catch (err) {
        console.error("❌ 전체 일정 가져오기 실패:", err);
      }
    };

    fetchSchedules();
  }, []);

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
      acc[day] = (acc[day] || 0) + 1;
    }
    return acc;
  }, {});

  const weekdayHeaders = daysOfWeek.map((day, idx) => (
    <div className="day-header" key={idx}>{day}</div>
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
    const scheduleCount = scheduleData[day] || 0;

    let className = "day-cell";
    if (isToday) className += " today";
    if (isSelected) className += " selected";

    calendarCells.push(
      <div
        key={day}
        className={className}
        onClick={() => {
          setSelectedDay(day);
          const fullDate = new Date(year, month, day);
          const isoDate = fullDate.toISOString().split("T")[0];
          setSelectedDate(isoDate);
        }}
      >
        <div className="date-number">{day}</div>
        {scheduleCount > 0 && (
          <div className="content">
            <FaMusic style={{ color: "#a174ff" }} />
            {scheduleCount}건
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="schedule-page">
      <div className="schedule-container">
        <div className="artist-header">
          <div className="title">마이아티스트</div>
        </div>

        <div className="artist-filter">
          <MyArtistFilterCard />
        </div>

        <div className="calendar-section">
          <div className="calendar-wrapper">
            <div className="calendar-header">
              <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>◀</button>
              <h2>{year}년 {month + 1}월</h2>
              <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>▶</button>
            </div>

            <div className="calendar-grid">
              {weekdayHeaders}
              {calendarCells}
            </div>
          </div>

          <div className="schedule-view">
            <div>
              <select
                style={{
                  minWidth: "300px",
                  width: "100%",
                  height: "60px",
                  marginTop: "10px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #ccc",
                }}
                id="filter-select"
                value={filterType}
                onChange={handleFilterChange}
              >
                <option value="전체일정">전체일정</option>
                <option value="즐겨찾기">즐겨찾기 한 일정</option>
              </select>
              <div>
                <ScheduleList view={filterType} selectedDate={selectedDate} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
