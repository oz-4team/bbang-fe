import React, { useState } from "react";
import { GrLocation } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  createArtistSchedule,
  createGroupSchedule,
} from "../../../api/StaffSchedule/staffScheduleApi";
// import { addSchedule } from "../api/schedule/useAddSchedule";

const Foo1Layout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
  flex-wrap: nowrap;

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

const ScheduleAddPage = () => {
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImage_url] = useState("");
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");

  const { id, type } = useParams();

  console.log("스케줄 추가 페이지", id, type);

  // useEffect(() => {
  //   console.log(
  //     "스케줄 추가 페이지",
  //     "title:",
  //     title,
  //     "location:",
  //     location,
  //     "start_date:",
  //     start_date,

  //     "end_date:",
  //     end_date,
  //     "description:",
  //     description,
  //     "image_url:",
  //     image_url
  //   );
  // }, [title, location, start_date, end_date, description, image_url]);

  // const validateForm = () => {
  //   console.log("🚀 유효성검사");
  // };

  const scheduleData = {
    artist_id: id,
    title: title,
    location: location,
    start_date: `${start_date}T${start_time}`,
    end_date: `${start_date}T${end_time}`,
    description: description,
    image_url: image_url,
  };
  console.log("스케줄 데이터:", scheduleData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (preview) {
      setImage_url(preview);
      console.log("🚀 이미지 URL:", preview);
    }

    // const formData = {
    //   title,
    //   location,
    //   start_date,
    //   end_date,
    //   description,
    //   image_url: preview,
    // };
    if (type === "solo") {
      createArtistSchedule(scheduleData);
    } else if (type === "group") {
      createGroupSchedule(scheduleData);
    }
    createArtistSchedule(scheduleData)
      .then((response) => {
        console.log("✅ 스케줄 생성 성공:", response);
        alert("스케줄이 등록되었습니다.");
      })
      .catch((error) => {
        console.error("❌ 스케줄 생성 실패:", error);
        alert("스케줄 등록에 실패했습니다.");
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setImage_url(reader.result);
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
        <Foo1Layout>
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
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                style={{ width: "100%" }}
                type="text"
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
            </div>

            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "1rem",
                flexGrow: 1,
              }}
            >
              <div style={{ width: "50%" }}>
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
              </div>
              <div style={{ width: "50%" }}>
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
        </Foo1Layout>

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

      <button style={{ width: "100%" }} onClick={handleSubmit}>
        등록하기
      </button>
      <button>삭제하기</button>
    </div>
  );
};

export default ScheduleAddPage;
