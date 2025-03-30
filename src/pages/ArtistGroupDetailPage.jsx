import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useArtistGroups from "../api/artist/useArtistGroups";
import ArtistInfo from "../components/ArtistInfo";
import MemberCard from "../components/MemberCard";
import ScheduleAreaInArtist from "../components/ScheduleAreaInArtist";

const ArtistGroupDetailPage = () => {
  // const { id: groupId } = useParams();
  const { id } = useParams();
  const groupId = id; // URL에서 그룹 ID 추출

  const { readArtists, loading, artists, artist } = useArtistGroups();
  // useEffect(() => {
  //   readArtists(id);
  // }, [groupId]);

  useEffect(() => {
    readArtists(groupId);
  }, [groupId]);

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
          artist_id={groupId}
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
            {/* <MemberCard artist={artist} />
            {artists && artists.length === 0 && <div>No members found.</div>} */}
            {artists?.map((member) => (
              <MemberCard key={member.id} artist={member} />
            ))}
          </div>
        </div>
        <ScheduleAreaInArtist type="group" id={groupId} />
      </div>
    </div>
  );
};

export default ArtistGroupDetailPage;
