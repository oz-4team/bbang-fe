import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const DefualtContainer = styled.div`
  min-height: 600px;
`;

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <DefualtContainer>
        <Outlet />
      </DefualtContainer>

      <Footer />
    </>
  );
};

export default MainLayout;
