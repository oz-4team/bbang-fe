import React, { useState } from "react";
import "../styles/calendar.css";

const days = ["일", "월", "화", "수", "목", "금", "토"];

const dummyScheduleData = {
  "2025-03-31": 2,
  "2025-04-01": 1,
  "2025-04-04": 3,
  "2025-04-10": 1,
};

const CustomCalendar = () => {
  const today = new Date();
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

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
            <div className="schedule-count">🎵 {scheduleCount}건</div>
          )}
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="calendar-container">
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
    </div>
  );
};

export default CustomCalendar;
