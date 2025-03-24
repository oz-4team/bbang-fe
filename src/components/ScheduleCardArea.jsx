import React from "react";
import useReadArtists from "../api/useReadArtists";
import ScheduleCard from "./ScheduleCard";

const ScheduleCardArea = () => {
  const { artists } = useReadArtists();
  if (artists.length === 0) {
    return <div>loading...</div>;
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
        <ScheduleCard
          key={a.name}
          name={a.name}
          artistname={a.name}
          image={a.image?.[3]?.["#text"] || "default.png"}
        />
      ))}
    </div>
  );
};

export default ScheduleCardArea;
