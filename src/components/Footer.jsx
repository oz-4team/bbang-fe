import React from "react";

const Footer = () => {
  return (
    <>
      <footer>
        <div
          style={{
            padding: "2rem",
            backgroundColor: "#f8f9fa",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100vw",
          }}
        >
          <div>
            <img
              src="../src/assets/images/idolsycn-logo.png"
              alt="idol sync"
              style={{
                width: "50px",
                height: "50px",
                filter: "grayscale(100%)",
              }}
            />
            <div
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                textAlign: "left",
                color: "#00000052",
                paddingTop: "1rem",
              }}
            >
              IdolSync
            </div>

            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  fontSize: "20px",
                  color: "#00000052",
                  paddingTop: "2rem",
                  paddingBottom: "2rem",
                }}
              >
                <li style={{ paddingBottom: "1rem" }}>홈</li>
                <li style={{ paddingBottom: "1rem" }}>아티스트</li>
                <li style={{ paddingBottom: "1rem" }}>스케줄</li>
                {/* <li style={{ paddingBottom: "1rem" }}>광고 문의</li> */}
                <li style={{ paddingBottom: "1rem" }}>
                  관리자 권한 신청 페이지로 이동
                </li>
              </ul>  
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>서비스 이용약관</div>
              <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>|</div>
              <div>개인정보처리방침</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div>제휴/광고 문의</div>
            <div>
              <div>aaaa@naver.com</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
