import React from "react";
import useReadArtist from "../api/useReadArtist";
import ScheduleCard from "./ScheduleCard";

const ScheduleCardArea = () => {
  const { artist } = useReadArtist();
  if (artist.length === null) {
    return <div>loading..a.</div>;
  }
  if (artist.length === 0) {
    return <div>호출 성공했지만 배열이 0인 상태</div>;
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "32px",
      }}
    >
      {artist.map((a) => (
        <>
          <ScheduleCard
            key={a.name}
            name={a.name}
            artistname={a.artist.name}
            image={a.image[3]["#text"]}
          />
        </>
      ))}
    </div>
  );
};

export default ScheduleCardArea;
