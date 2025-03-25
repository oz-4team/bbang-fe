import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useReadArtistGroupApi from "../api/artist/useReadArtistGroupApi";
import ArtistInfo from "../components/ArtistInfo";
import MemberCard from "../components/MemberCard";
import ScheduleAreaInArtist from "../components/ScheduleAreaInArtist";

const ArtistGroupDetailPage = () => {
  const { id } = useParams();

  const { artist, readArtist, loading, error } = useReadArtistGroupApi();

  useEffect(() => {
    readArtist({ id });
  }, [id]);

  if (loading || !artist) {
    return <div>Loading...</div>;
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
          artist={artist}
          // artist_type={artist_type}
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
            <MemberCard artist={artist} />
          </div>
        </div>
        <ScheduleAreaInArtist />
      </div>
    </div>
  );
};

export default ArtistGroupDetailPage;
