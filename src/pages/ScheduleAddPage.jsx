import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FiLink } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";
import styled from "styled-components";
// import { addSchedule } from "../api/schedule/useAddSchedule";
import ScheduleCategoryInput from "../components/ScheduleCategoryInput";
import ScheduleHashtagInput from "../components/ScheduleHashtagInput";

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

  useEffect(() => {
    console.log(
      "스케줄 추가 페이지",
      "title:",
      title,
      "location:",
      location,
      "start_date:",
      start_date,







      "end_date:",
      end_date,
      "description:",
      description,
      "image_url:",
      image_url
    );
  }, [title, location, start_date, end_date, description, image_url]);

  const validateForm = () => {
    console.log(
      "🚀 ~ file: ScheduleAddPage.jsx ~ line 52 ~ validateForm ~ title",
      title
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files) {
      setImage_url(files[0]);
    }
    if (validateForm()) {
      const scheduleData = {
        title,
        location,
        start_date,
        end_date,
        description,
        image_url,
      };

      console.log("🚀 스케줄 추가 데이터:", scheduleData); //  전송 전 데이터 확인

      try {
        // const response = await addSchedule(userData);
        console.log(" 회원가입 응답 데이터:", response); //  응답 확인

        navigate("/signup-completed", {
          state: { nickname, email, image_url },
        });
      } catch (error) {
        console.error(" 회원가입 실패:", error.message);

        if (error.response) {
          console.error(" 백엔드 응답 데이터:", error.response.data); // 상세 원인
          console.error(" 전체 에러 응답 객체:", error.response); // 상태 코드 등 포함
        } else {
          console.error(" 서버 연결 실패 또는 응답 없음:", error);
        }
      }
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
                  type="time"
                />
              </div>
            </div>
            <div>
              <label>카테고리</label>
              <ScheduleCategoryInput />
            </div>
            <div>
              <label>해시태그</label>
              <ScheduleHashtagInput />
            </div>
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
          <div
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
          </div>
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
          <div
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
          />
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
