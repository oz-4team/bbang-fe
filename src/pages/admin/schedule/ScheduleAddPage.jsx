import React, { useState, useRef } from "react";
import { GrLocation } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  createArtistSchedule,
  createGroupSchedule,
} from "../../../api/StaffSchedule/staffScheduleApi";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";

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

const SectionDivider = styled.div`
  border-bottom: 1px solid #afb1b6;
  margin: 2rem 0;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #6c63ff;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  margin-bottom: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #574fe1;
  }
`;

const DeleteButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;

  &:hover {
    background: #f8f8f8;
  }
`;

const ScheduleAddPage = () => {
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState([]);
  const [description, setDescription] = useState("");
  const [image_url, setImage_url] = useState("");
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const fileInputRef = useRef(null);

  const { id, type } = useParams();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !location || !start_time || dates.length === 0) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    if (end_time && start_time > end_time) {
      alert("종료 시간은 시작 시간보다 이후여야 합니다.");
      return;
    }

    try {
      for (const dateObj of dates) {
        const dateStr = dateObj.toString(); // format: YYYY-MM-DD

        const scheduleData = {
          artist_id: id,
          title,
          location,
          start_date: `${dateStr}T${start_time}`,
          end_date: `${dateStr}T${end_time || start_time}`,
          description,
          image_url: preview || image_url,
        };

        if (type === "solo") {
          await createArtistSchedule(scheduleData);
        } else {
          await createGroupSchedule(scheduleData);
        }
      }

      alert(`${dates.length}개의 스케줄이 등록되었습니다.`);
      nav(-1);
    } catch (error) {
      console.error("❌ 스케줄 등록 실패:", error);
      alert("스케줄 등록에 실패했습니다.");
    }
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

  const resetImage = () => {
    setPreview(null);
    setImage_url("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100vw", padding: "2rem 1rem" }}>
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <Foo1Layout>
          {/* 이미지 업로드 */}
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
              overflow: "hidden",
            }}
          >
            <label htmlFor="imgUpload" style={{ cursor: "pointer", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {!preview && <span style={{ color: "#999" }}>이미지 업로드</span>}
              {preview && (
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
              )}
            </label>
            <input
              id="imgUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            {preview && (
              <button
                onClick={resetImage}
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
            )}
          </div>

          {/* 입력 폼 */}
          <div style={{ display: "flex", flexDirection: "column", textAlign: "left", flexGrow: 1, gap: "1rem" }}>
            <div>
              <label>스케줄명</label>
              <input onChange={(e) => setTitle(e.target.value)} value={title} style={{ width: "100%" }} type="text" />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
  <label style={{ whiteSpace: "nowrap" }}>스케줄 날짜 (중복가능)</label>
  <DatePicker
    multiple
    value={dates}
    onChange={setDates}
    format="YYYY-MM-DD"
    sort
    style={{
      padding: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
      width: "100%",
    }}
    placeholder="날짜를 선택하세요"
  />
</div>


            <div style={{ display: "flex", width: "100%", gap: "1rem" }}>
              <div style={{ width: "50%" }}>
                <label>시작 시간</label>
                <input
                  value={start_time}
                  onChange={(e) => setStart_time(e.target.value)}
                  style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "5px", marginTop: "8px", width: "100%" }}
                  type="time"
                />
              </div>
              <div style={{ width: "50%" }}>
                <label>종료 시간 <span style={{ color: "#888", fontSize: "0.8rem" }}>(선택)</span></label>
                <input
                  value={end_time}
                  onChange={(e) => setEnd_time(e.target.value)}
                  style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "5px", marginTop: "8px", width: "100%" }}
                  type="time"
                />
              </div>
            </div>
          </div>
        </Foo1Layout>

        <SectionDivider />

        {/* 설명 및 주소 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <IoDocumentTextOutline color="#AFB1B6" />
              <div>설명</div>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "5px", marginTop: "8px", width: "100%" }}
              rows="5"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <GrLocation color="#AFB1B6" />
              <div>주소</div>
            </div>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "5px", marginTop: "8px", width: "100%" }}
              type="text"
            />
          </div>
        </div>

        <SectionDivider />
      </div>

      <SubmitButton onClick={handleSubmit}>등록하기</SubmitButton>
      <DeleteButton onClick={() => nav(-1)}>삭제하기</DeleteButton>
    </div>
  );
};

export default ScheduleAddPage;

