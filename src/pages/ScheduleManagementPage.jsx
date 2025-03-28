import React from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StaffScheduleList from "../components/StaffScheduleList";

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

const ScheduleManagementPage = () => {
  const navigate = useNavigate();
  const navigateToDetails = () => {
    window.location.href = "/schedule/details";
  };

  const [view, setView] = React.useState("주간");

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
          <img
            src="/easpa.jpeg"
            alt=""
            style={{
              width: "4rem",
              height: "4rem",
              borderRadius: "50%",
            }}
          />
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            에스파 스케줄
          </div>
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
            <Calendar />
          </CalendarContainer>

          <div style={{ minWidth: "300px", flexGrow: 1 }}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "1rem",
                }}
              >
                <button onClick={() => navigate("/schedule-management/add")}>
                  +일정등록
                </button>
              </div>
              <select id="view-select" value={view} onChange={handleViewChange}>
                <option value="주간">주간</option>
                <option value="일간">일간</option>
                <option value="월간">월간</option>
              </select>
              <div>
                <StaffScheduleList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagementPage;
