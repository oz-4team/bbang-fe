import React from "react";

const SchedulePage = () => {
  const navigateToDetails = () => {
    window.location.href = "/schedule/details";
  };

  return (
    <div>
      {/* <div>schedule</div> */}
      <button onClick={navigateToDetails}>디테일페이지로 이동</button>
    </div>
  );
};

export default SchedulePage;
