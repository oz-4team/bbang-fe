import React from "react";
import Calendar from "react-calendar";

import styled from "styled-components";
import MyArtistFilterCard from "../components/MyArtistFilterCard";
import ScheduleList from "../components/ScheduleList";
import "../styles/calendar.css";
const SchedulePage = () => {
  const navigateToDetails = () => {
    window.location.href = "/schedule/details";
  };

  const [view, setView] = React.useState("주간");

  const CalendarContainer = styled.div`
    flex-grow: 1;
    margin-top: 2rem;
    min-width: 300px;
    max-width: 600px;
    button {
      background-color: white;
    }

    @media (max-width: 900px) {
      max-width: 100%;
    }
  `;

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
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            paddingBottom: "2rem",
          }}
        >
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            마이아티스트
          </div>
        </div>
        <div
          style={{
            display: "-webkit-inline-box",
            gap: "1rem",
            overflow: "scroll",
            width: "100%",
          }}
        >
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
          <MyArtistFilterCard />
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <CalendarContainer>
            <Calendar
              calendarType="gregory"
              locale="ko"
              view="month"
              prev2Label={null}
              next2Label={null}
              formatDay={(locale, date) =>
                date.toLocaleString("en", { day: "numeric" })
              }

              // onClickDay={navigateToDetails}
            />
          </CalendarContainer>

          <div style={{ minWidth: "300px", flexGrow: 1 }}>
            <div>
              <select id="view-select" value={view} onChange={handleViewChange}>
                <option value="주간">주간</option>
                <option value="일간">일간</option>
                <option value="월간">월간</option>
              </select>
              <div>
                <ScheduleList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
