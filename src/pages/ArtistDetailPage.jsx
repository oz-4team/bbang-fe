import React from "react";
import ArtistInfo from "../components/ArtistInfo";
import MemberCard from "../components/MemberCard";
import ScheduleAreaInArtist from "../components/ScheduleAreaInArtist";

const ArtistDetailPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // maxWidth: "800px",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        width: "100vw",
        // backgroundColor: "#f0f0f0",
      }}
    >
      <ArtistInfo />
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            // width: "100vw",
            maxWidth: "800px",
            padding: "1rem",
          }}
        >
          {/* <div>a</div>
          <div>b</div> */}
          <MemberCard />
          <MemberCard />
        </div>
      </div>
      <ScheduleAreaInArtist />
    </div>
  );
};

export default ArtistDetailPage;
