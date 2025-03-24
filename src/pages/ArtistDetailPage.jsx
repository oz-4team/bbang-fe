import React from "react";
import ArtistInfo from "../components/ArtistInfo";
import MemberCard from "../components/MemberCard";
import ScheduleAreaInArtist from "../components/ScheduleAreaInArtist";

import useReadArtist from "../api/useReadArtist";
import useReadArtistGroups from "../api/useReadArtistGroups";
import GroupMemberCard from "../components/GroupMemberCard";

const ArtistDetailPage = () => {
  const { artist } = useReadArtist();
  const { artistGroups } = useReadArtistGroups();
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
        <ArtistInfo style={{ marginBottom: "2rem" }} />
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "16px",
              justifyContent: "center",
              alignItems: "center",
              margin: "2rem auto",
            }}
          >
            <MemberCard artist={artist} />
            <GroupMemberCard artistGroups={artistGroups} />
          </div>
        </div>
        <ScheduleAreaInArtist />
      </div>
    </div>
  );
};

export default ArtistDetailPage;
