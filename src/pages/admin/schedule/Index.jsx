import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import useReadArtistGroups from "../../../api/artist/useReadArtistGroups";
import { fetchArtistSchedules } from "../../../api/schedule/scheduleApi";
import useArtistManagementStore from "../useArtistManagementStore";
import StaffScheduleList from "./StaffScheduleList";
import "../../../styles/SchedulePage.css";

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const ScheduleManagementPage = () => {
  const { artists, groups, readArtistGroups } = useReadArtistGroups();
  const navigate = useNavigate();

  const {
    artist,
    group,
    setArtist,
    setGroup,
    refresh,
    setRefresh,
  } = useArtistManagementStore();

  const [artistName, setArtistName] = useState(null);
  const [artistPhoto, setArtistPhoto] = useState(null);
  const [view, setView] = useState("주간");
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const artistId = artist ? artist.id : null;
  const groupId = group ? group.id : null;
  const type = artist ? "solo" : group ? "group" : null;

  useEffect(() => {
    readArtistGroups();
  }, []);

  useEffect(() => {
    if (refresh) {
      setArtist(null);
      setGroup(null);
      readArtistGroups().finally(() => {
        setRefresh(false);
      });
    }
  }, [refresh]);

  useEffect(() => {
    if (artists && artists.length > 0) {
      setArtist(artists[0]);
    }
  }, [artists]);

  useEffect(() => {
    if (groups && groups.length > 0) {
      setGroup(groups[0]);
    }
  }, [groups]);

  useEffect(() => {
    if (artistId) {
      fetchArtistSchedules(artistId).then(setSchedules);
    }
  }, [artistId]);

  useEffect(() => {
    if (groupId) {
      fetchArtistSchedules(groupId).then(setSchedules);
    }
  }, [groupId]);

  useEffect(() => {
    const name = artist ? artist.artist_name : group ? group.artist_group : null;
    const photo = artist ? artist.image_url : group ? group.image_url : null;
    setArtistName(name);
    setArtistPhoto(photo);
  }, [artist, group]);

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();
  const today = new Date();

  const scheduleData = schedules.reduce((acc, schedule) => {
    const start = new Date(schedule.start_date);
    if (start.getFullYear() === year && start.getMonth() === month) {
      const day = start.getDate();
      acc[day] = acc[day] || { total: 0 };
      acc[day].total += 1;
    }
    return acc;
  }, {});

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
    const className = `day-cell${isToday ? " today" : ""}${isSelected ? " selected" : ""}`;
    const cellStyle = {};
    if (isToday) cellStyle.border = "2px solid #FF8C00";
    if (isSelected) {
      cellStyle.backgroundColor = "#a174ff";
      cellStyle.color = "white";
    }

    calendarCells.push(
      <div
        key={day}
        className={className}
        style={cellStyle}
        onClick={() => {
          setSelectedDay(day);
          const pad = (n) => String(n).padStart(2, "0");
          const isoDate = `${year}-${pad(month + 1)}-${pad(day)}`;
          const filtered = schedules.filter(
            (schedule) => schedule.start_date.slice(0, 10) === isoDate
          );
          setFilteredSchedules(filtered);
        }}
      >
        <div className="date-number">{day}</div>
        {isToday && (
          <>
            <div className="today-indicator"></div>
            <span className="today-label" 
            style={{ 
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "10px",
              color: "#FF8C00" }}>today</span>
          </>
        )}
        {scheduleData[day]?.total > 0 && (
          <div className="schedule-count">
            <FaMusic className="music-icon" />
            <span className="count-text">{scheduleData[day]?.total}건</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="schedule-page">
      <div className="schedule-container">
        <div style={{ display: "flex", gap: "2rem", alignItems: "center", paddingBottom: "2rem" }}>
          <img
            src={artistPhoto}
            alt=""
            style={{ width: "4rem", height: "4rem", borderRadius: "50%" }}
          />
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>{artistName} 스케줄</div>
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

          <div style={{ minWidth: "300px", flexGrow: 1 }}>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
              <button
                onClick={() =>
                  navigate(`/schedule-management/${artistId || groupId}/${type}/add`)
                }
              >
                +일정등록
              </button>
            </div>
            <select id="view-select" value={view} onChange={handleViewChange}>
              <option value="주간">주간</option>
              <option value="일간">일간</option>
              <option value="월간">월간</option>
            </select>
            <div>
              <StaffScheduleList schedules={selectedDay ? filteredSchedules : schedules} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagementPage;
