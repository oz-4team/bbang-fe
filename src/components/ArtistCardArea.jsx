import React from "react";
import useReadArtistAndGroups from "../api/useReadArtistAndGroups";
import ArtistCard from "./ArtistCard";

const ArtistCardArea = () => {
  const { artistAndGroups } = useReadArtistAndGroups();
  if (artistAndGroups.length === 0) {
    return <div>loading...</div>;
  }

  console.log("artist area 🙂:", artistAndGroups);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "16px",
        justifyContent: "center", // 수평 중앙 정렬
        alignContent: "center", // 수직 중앙 정렬
      }}
    >
      {artistAndGroups.data.map((a) => (
        <>
          <ArtistCard
            key={a.index}
            name={a.artist_name || a.artist_group}
            image={a.image_url}
            type={a.artist_group ? "group" : "solo"}
            id={a.id}
          />
        </>
      ))}
    </div>
  );
};

export default ArtistCardArea;
