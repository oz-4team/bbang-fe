import React, { useState } from "react";
import styled from "styled-components";
import MyArtistFilterCard from "../components/MyArtistFilterCard";
import ScheduleList from "../components/ScheduleList";
import "../styles/calendar.css";

const days = ["일", "월", "화", "수", "목", "금", "토"];

// 📅 더미 일정 데이터 (실제 API로 대체 가능)
const dummyScheduleData = {
  "2025-03-31": 2,
  "2025-04-01": 1,
  "2025-04-04": 3,
  "2025-04-10": 1,
};

const CalendarContainer = styled.div`
  flex-grow: 1;
  margin-top: 2rem;
  min-width: 300px;
  max-width: 600px;

  @media (max-width: 900px) {
    max-width: 100%;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      font-size: 1.25rem;
      font-weight: 700;
      background: linear-gradient(90deg, #ff9ee8, #9bbdff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    button {
      background-color: transparent;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #9c27b0;
      transition: transform 0.2s;
    }

    button:hover {
      transform: scale(1.2);
    }
  }

  .calendar-days,
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    gap: 6px;
  }

  .calendar-day {
    font-weight: bold;
    color: #666;
    padding-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .calendar-cell {
    background: white;
    border-radius: 20px;
    border: 1px solid #eee;
    padding: 0.75rem 0.5rem;
    min-height: 70px;
    position: relative;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06);
    transition: all 0.2s ease;
  }

  .calendar-cell:hover {
    background: #faf0ff;
    transform: translateY(-2px);
  }

  .calendar-cell.today {
    background: linear-gradient(135deg, #ffb1f6, #b1c6ff);
    border: none;
    color: white;
    font-weight: 600;
  }

  .calendar-cell.today div:first-child {
    font-size: 1rem;
  }

  .schedule-count {
    position: absolute;
    bottom: 6px;
    right: 8px;
    background: #ffe0f0;
    color: #e91e63;
    padding: 2px 8px;
    font-size: 0.7rem;
    border-radius: 999px;
    display: flex;
    align-items: center;
    gap: 2px;
    box-shadow: 0 0 0 1px white;
  }
`;



const CustomCalendar = () => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const renderCalendarCells = () => {
    const cells = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-cell empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = date.toISOString().split("T")[0];
      const isToday = dateStr === todayStr;
      const scheduleCount = dummyScheduleData[dateStr] || 0;

      cells.push(
        <div key={day} className={`calendar-cell ${isToday ? "today" : ""}`}>
          <div>{day}</div>
          {scheduleCount > 0 && (
            <div className="schedule-count">
              🎵 {scheduleCount}건
            </div>
          )}
        </div>
      );
    }

    return cells;
  };

  return (
    <CalendarContainer>
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>◀</button>
        <h3>{currentYear}년 {currentMonth + 1}월</h3>
        <button onClick={handleNextMonth}>▶</button>
      </div>

      <div className="calendar-days">
        {days.map((day, index) => (
          <div key={index} className="calendar-day">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">{renderCalendarCells()}</div>
    </CalendarContainer>
  );
};

const SchedulePage = () => {
  const [view, setView] = useState("주간");

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center", paddingBottom: "2rem" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>마이아티스트</div>
        </div>

        <div style={{ display: "-webkit-inline-box", gap: "1rem", overflow: "scroll", width: "100%" }}>
          {[1, 2, 3, 4].map((_, idx) => (
            <MyArtistFilterCard key={idx} />
          ))}
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between", flexWrap: "wrap" }}>
          <CustomCalendar />

          <div style={{ minWidth: "300px", flexGrow: 1 }}>
            <select
              style={{
                minWidth: "300px",
                width: "100%",
                height: "60px",
                marginTop: "10px",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
              }}
              value={view}
              onChange={handleViewChange}
            >
              <option value="주간">주간</option>
              <option value="일간">일간</option>
              <option value="월간">월간</option>
            </select>
            <ScheduleList view={view} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
