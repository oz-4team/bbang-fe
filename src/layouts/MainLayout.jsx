import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
