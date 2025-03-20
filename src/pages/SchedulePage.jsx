import React from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import MyArtistFilterCard from "../components/MyArtistFilterCard";
import ScheduleList from "../components/ScheduleList";

const SchedulePage = () => {
  const navigateToDetails = () => {
    window.location.href = "/schedule/details";
  };

  const [view, setView] = React.useState("주간");

  const CalendarContainer = styled.div`
    flex-grow: 1;
    margin-top: 2rem;
    button {
      background-color: white;
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
          maxWidth: "800px",
          // backgroundColor: "lightgray",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "flex-start",
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
            minHeight: "500px",
            marginTop: "2rem",
          }}
        >
          <div style={{ flexGrow: "1" }}>
            <CalendarContainer>
              <Calendar />
            </CalendarContainer>
          </div>
          <div style={{ minWidth: "300px" }}>
            <div>
              {/* <label htmlFor="view-select">보기 모드: </label> */}
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
