import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const NavigationLayout = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  position: fixed;
  background-color: white;
`;

const EmptyLayout = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginBottom: "6rem",
        }}
      >
        <NavigationLayout>
          <nav
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              style={{ backgroundColor: "white" }}
              onClick={() => window.history.back()}
            >
              <span style={{ marginRight: "0.5rem" }}>←</span>
              뒤로가기
            </button>
          </nav>
        </NavigationLayout>
      </div>

      <Outlet />
    </>
  );
};

export default EmptyLayout;
