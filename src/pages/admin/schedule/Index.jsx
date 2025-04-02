import React, { useEffect } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useReadArtistGroups from "../../../api/artist/useReadArtistGroups";
import {
  fetchArtistSchedules,
  fetchGroupSchedules,
} from "../../../api/schedule/scheduleApi";
import useArtistManagementStore from "../useArtistManagementStore";
import StaffScheduleList from "./StaffScheduleList";

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
  const { artists, groups, readArtistGroups } = useReadArtistGroups();

  useEffect(() => {
    readArtistGroups();
    console.log("👀 아티스트 그룹 조회");
  }, []);
  // const [schedule, setSchedule] = React.useState([]);
  const { artist, group, setArtist, setGroup, refresh, setRefresh } =
    useArtistManagementStore();

  const [artistName, setArtistName] = React.useState(null);
  const [artistPhoto, setArtistPhoto] = React.useState(null);

  useEffect(() => {
    const artistName = artist
      ? artist.artist_name
      : group
      ? group.artist_group
      : null;
    setArtistName(artistName);
  }, [artist, group]);

  useEffect(() => {
    const artistPhoto = artist
      ? artist.image_url
      : group
      ? group.image_url
      : null;
    setArtistPhoto(artistPhoto);
  }, [artist, group]);

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
  const navigate = useNavigate();

  const [view, setView] = React.useState("주간");

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const artistId = artist ? artist.id : null;
  const groupId = group ? group.id : null;
  const [schedules, setSchedules] = React.useState([]);

  // 아티스트 ID가 변경될 때마다 스케줄을 가져옴
  useEffect(() => {
    if (artistId) {
      fetchArtistSchedules(artistId).then((schedules) => {
        setSchedules(schedules);
      });
    }
  }, [artistId]);

  // 그룹 ID가 변경될 때마다 스케줄을 가져옴
  useEffect(() => {
    if (groupId) {
      fetchGroupSchedules(groupId).then((schedules) => {
        setSchedules(schedules);
      });
    }
  }, [groupId]);

  const type = artist ? "solo" : group ? "group" : null;

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
            src={artistPhoto}
            alt=""
            style={{
              width: "4rem",
              height: "4rem",
              borderRadius: "50%",
            }}
          />
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {artistName} 스케줄
          </div>
          <div></div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "1rem",
                }}
              >
                <button
                  onClick={() =>
                    navigate(
                      `/schedule-management/${artistId || groupId}/${type}/add`
                    )
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
                <StaffScheduleList schedules={schedules} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagementPage;
