import React from "react";
import ArtistInfo from "../components/ArtistInfo";
import MemberCard from "../components/MemberCard";
import ScheduleAreaInArtist from "../components/ScheduleAreaInArtist";

import { useParams } from "react-router-dom";
import useReadArtistGroups from "../api/useReadArtistGroups";
import useReadArtists from "../api/useReadArtists";
import GroupMemberCard from "../components/GroupMemberCard";

const ArtistDetailPage = () => {
  const { artists } = useReadArtists();
  const { artistGroups } = useReadArtistGroups();
  const { artist_type, id } = useParams();

  console.log("artist_type, id", artist_type, id);

  console.log("🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹🥹artists:", artists);
  console.log("❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️artistGroups:", artistGroups);

  if (!artists || !artistGroups) {
    return <div>loading...</div>;
  }

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
        <ArtistInfo
          style={{ marginBottom: "2rem" }}
          artist={artist_type === "solo" ? artists : artistGroups}
          artist_type={artist_type}
          artist_id={id}
        />
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
            {artist_type === "solo" ? (
              <MemberCard artist={artists} />
            ) : (
              <GroupMemberCard artistGroups={artistGroups} />
            )}
          </div>
        </div>
        <ScheduleAreaInArtist />
      </div>
    </div>
  );
};

export default ArtistDetailPage;
