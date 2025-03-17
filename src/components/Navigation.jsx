import React from "react";
import styled from "styled-components";

const NavigationLayout = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  /* background-color: #097ff5; */
  border-bottom: 1px solid #e9ecef;
`;

const Navigation = () => {
  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  return (
    <>
      <NavigationLayout>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="../src/assets/images/idolsycn-logo.png"
            alt="idonsync"
            style={{
              width: "40px",
              height: "40px",
              marginRight: "1rem",
            }}
          />
          <div
            style={{
              fontSize: "26px",
              fontWeight: "bold",
            }}
          >
            IdolSync
          </div>
        </div>
        <div style={{ fontSize: "20px", display: "flex" }}>
          <ul
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <li style={{ paddingRight: "1rem", fontWeight: "bold" }}>홈</li>
            <li style={{ paddingRight: "1rem" }}>아티스트</li>
            <li>스케줄</li>
          </ul>
          {/* 로그인 후 나오는 버튼 영역 */}
          <ul
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              paddingLeft: "3rem",
            }}
          >
            {/* 아바타 이미지랑 종 이모티콘 추후 수정 예정 */}
            <li>
              <button
                style={{
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  padding: "0",
                }}
              >
                {/* <img
                  src="favicon.png"
                  alt=""
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                /> */}
                👤
              </button>
            </li>
            <li>
              <button
                style={{
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  padding: "0",
                }}
              >
                🔔
              </button>
            </li>
          </ul>
        </div>
        <div>
          <button style={{ background: "none" }} onClick={handleLoginClick}>
            로그인
          </button>
        </div>
      </NavigationLayout>
    </>
  );
};

export default Navigation;
("");
