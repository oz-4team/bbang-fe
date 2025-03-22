import React from "react";
import { BsPerson } from "react-icons/bs";
import { FiLink } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";
import ScheduleCategoryInput from "../components/ScheduleCategoryInput";
import ScheduleHashtagInput from "../components/ScheduleHashtagInput";

const ScheduleEditPage = () => {
  const [preview, setPreview] = React.useState(null);

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
              <input style={{ width: "100%" }} type="text" />
            </div>
            <div>
              <label>스케줄 날짜</label>
              <input
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
            <div>
              <label>카테고리</label>
              <ScheduleCategoryInput />
            </div>
            <div>
              <label>해시태그</label>
              <ScheduleHashtagInput />
            </div>
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

      <button>수정하기</button>
      <button>삭제하기</button>
    </div>
  );
};

export default ScheduleEditPage;
