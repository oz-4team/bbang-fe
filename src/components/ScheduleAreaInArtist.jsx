import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  fetchArtistSchedules,
  fetchGroupSchedules,
} from "../api/schedule/scheduleApi";

const ScheduleAreaInArtist = ({ type, id }) => {
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        let data = [];
        if (type === "artist") {
          data = await fetchArtistSchedules(id);
        } else if (type === "group") {
          data = await fetchGroupSchedules(id);
        }
        setSchedules(data);
      } catch (error) {
        console.error("일정 데이터를 불러오는 데 실패했습니다.");
      }
    };

    if (id) {
      loadSchedules();
    }
  }, [type, id]);

  return (
    <div>
      <div
        style={{
          textAlign: "left",
          fontSize: "2rem",
          marginTop: "2rem",
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        스케줄
        {/* <div style={{ fontSize: "1rem" }}>
          <button>더보기</button>
        </div> */}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <div
              key={schedule.id}
              onClick={() => navigate(`/schedule/details/${schedule.id}`)}
              style={{
                border: "1px solid #AFB1B6",
                borderRadius: "15px",
                textAlign: "left",
                padding: "1rem",
                fontSize: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                cursor: "pointer",
              }}
            >
              {schedule.title}
              <div>
                <IoIosArrowForward />
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "left", color: "grey" }}>
            등록된 일정이 없어요 🥹
          </p>
        )}
      </div>
    </div>
  );
};

export default ScheduleAreaInArtist;
