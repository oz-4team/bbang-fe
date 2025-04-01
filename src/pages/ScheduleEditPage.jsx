import React, { useEffect, useState } from "react";
import { GrLocation } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import useReadArtistGroups from "../api/artist/useReadArtistGroups";
import { fetchScheduleDetail } from "../api/schedule/scheduleApi";
import {
  deleteArtistSchedule,
  deleteGroupSchedule,
  updateArtistSchedule,
  updateGroupSchedule,
} from "../api/StaffSchedule/staffScheduleApi";

const ScheduleEditPage = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = React.useState(null);

  const [preview, setPreview] = useState(undefined);
  const [image_url, setImage_url] = useState(null);

  const [title, setTitle] = useState();
  const [location, setLocation] = useState();
  const [start_date, setStart_date] = useState();
  const [end_date, setEnd_date] = useState();
  const [description, setDescription] = useState();

  const [start_time, setStart_time] = useState();
  const [end_time, setEnd_time] = useState();

  const nav = useNavigate();

  // 초기화
  useEffect(() => {
    fetchScheduleDetail(id)
      .then((data) => {
        setSchedule(data);
        setTitle(data.title);
        setLocation(data.location);

        // 시작일
        setStart_date(data.start_date.split("T")[0]);
        // 시작시간
        setStart_time(data.start_date.split("T")[1]);

        // 종료일
        setEnd_date(data.end_date.split("T")[0]);
        // 종료시간
        setEnd_time(data.end_date.split("T")[1]);

        setDescription(data.description);
        setImage_url(data.image_url);
      })
      .catch((error) => {
        console.error("Error fetching schedule detail:", error);
      });
  }, [id]);

  const { artists, groups, readArtistGroups } = useReadArtistGroups();

  useEffect(() => {
    readArtistGroups();
    console.log("👀 아티스트 그룹 조회");
  }, []);
  // const [schedule, setSchedule] = React.useState([]);
  const type = artists ? "solo" : groups ? "group" : null;
  console.log("👀 아티스트 type 조회", type);

  const handleClickEdit = () => {
    const payload = {
      title: title,
      location: location,
      start_date: `${start_date}T${start_time}`,
      end_date: `${end_date}T${end_time}`,
      description: description,
    };

    if (preview) {
      payload.image_url = preview;
    }

    alert("일정이 수정되었습니다☺️");

    if (type === "solo") {
      updateArtistSchedule(id, payload)
        .then(() => {
          nav(-1);
        })
        .catch((error) => {
          console.error("❌ 일정 수정 실패:", error);
        });
    } else if (type === "group") {
      updateGroupSchedule(id, payload)
        .then(() => {
          nav(-1);
        })
        .catch((error) => {
          console.error("❌ 일정 수정 실패:", error);
        });
    }
  };

  const handleClickDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    if (type === "solo") {
      deleteArtistSchedule(id)
        .then(() => {
          nav("/schedule-management");
        })
        .catch((error) => {
          console.error("❌ Failed to delete solo schedule:", error);
        });
    } else if (type === "group") {
      deleteGroupSchedule(id)
        .then(() => {
          console.log("✅ Group schedule deleted");
        })
        .catch((error) => {
          console.error("❌ Failed to delete group schedule:", error);
        });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: "2rem",
          }}
        >
          <div
            style={{
              maxWidth: "300px",
              minWidth: "200px",
              maxHeight: "300px",
              minHeight: "200px",
              border: "1px solid #AFB1B6",
              borderRadius: "5px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {image_url && (
              <>
                <img
                  src={image_url}
                  alt="Preview"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
                <button
                  onClick={() => {
                    setImage_url(null);
                    document.querySelector('input[type="file"]').value = null;
                  }}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                >
                  삭제
                </button>
              </>
            )}
            {preview && (
              <>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
                <button
                  onClick={() => {
                    setPreview(null);
                    setImage_url(schedule.image_url);
                    document.querySelector('input[type="file"]').value = null;
                  }}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                >
                  삭제
                </button>
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              flexGrow: "1",
              gap: "1rem",
            }}
          >
            <div>
              <label>스케줄명</label>
              <input
                style={{ width: "100%" }}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>스케줄 날짜</label>
              <input
                value={start_date}
                onChange={(e) => setStart_date(e.target.value)}
                style={{
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginTop: "8px",
                  width: "100%",
                  display: "block",
                }}
                type="date"
              />
              <label>스케줄 종료일</label>
              <input
                value={end_date}
                onChange={(e) => setEnd_date(e.target.value)}
                style={{
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginTop: "8px",
                  width: "100%",
                  display: "block",
                }}
                type="date"
              />
            </div>
            <div>
              <label>시작 시간</label>
              <input
                value={start_time}
                onChange={(e) => setStart_time(e.target.value)}
                style={{
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginTop: "8px",
                  width: "100%",
                  display: "block",
                }}
                type="time"
              />
              <label>종료 시간 (선택)</label>
              <input
                value={end_time}
                onChange={(e) => setEnd_time(e.target.value)}
                style={{
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginTop: "8px",
                  width: "100%",
                  display: "block",
                }}
                type="time"
              />
            </div>
            {/* <div>
              <label>카테고리</label>
              <ScheduleCategoryInput />
            </div>
            <div>
              <label>해시태그</label>
              <ScheduleHashtagInput />
            </div> */}
          </div>
        </div>
        <div
          style={{
            borderBottom: "1px solid #AFB1B6",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        ></div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <BsPerson color="#AFB1B6" />
              <div>출연진</div>
            </div>
            <input
              style={{
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginTop: "8px",
                width: "100%",
                display: "block",
              }}
              type="text"
            />
          </div> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <IoDocumentTextOutline color="#AFB1B6" />
              <div>설명</div>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginTop: "8px",
                width: "100%",
                display: "block",
              }}
              name="Text1"
              rows="5"
            ></textarea>
          </div>
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <FiLink color="#AFB1B6" />
              <div>링크</div>
            </div>
          </div>
          <input
            style={{
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginTop: "8px",
              width: "100%",
              display: "block",
            }}
            type="text"
          /> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <GrLocation color="#AFB1B6" />
              <div>주소</div>
            </div>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginTop: "8px",
                width: "100%",
                display: "block",
              }}
              type="text"
            />
          </div>
        </div>
        <div
          style={{
            borderBottom: "1px solid #AFB1B6",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        ></div>
      </div>

      <button onClick={() => handleClickEdit()}>수정하기</button>
      <button onClick={() => handleClickDelete()}>삭제하기</button>
    </div>
  );
};

export default ScheduleEditPage;
