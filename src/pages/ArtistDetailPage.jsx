import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useReadArtistApi from "../api/artist/useReadArtistApi";
import useReadArtistGroupApi from "../api/artist/useReadArtistGroupApi";
import ArtistInfo from "../components/ArtistInfo";
import ScheduleAreaInArtist from "../components/ScheduleAreaInArtist";

const ArtistDetailPage = () => {
  const { id: artistId } = useParams();

  const { artist, readArtist, loading } = useReadArtistApi();
  const { artistGroups, readArtistGroup } = useReadArtistGroupApi();

  useEffect(() => {
    readArtist({ id: artistId });
  }, [artistId]);

  useEffect(() => {
    readArtistGroup({ id: artistId });
  }, [artistId]);

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
          artist_id={artistId}
          artistGroups={artistGroups}
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
          ></div>
        </div>
        <ScheduleAreaInArtist type="artist" id={artistId} />
      </div>
    </div>
  );
};

export default ArtistDetailPage;
