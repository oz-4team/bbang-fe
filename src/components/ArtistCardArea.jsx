import React from "react";
import useReadArtist from "../api/useReadArtist";
import ArtistCard from "./ArtistCard";

const ArtistCardArea = () => {
  const { artist } = useReadArtist();
  if (artist.length === 0) {
    return <div>loading...</div>;
  }

  console.log("artist area 🙂:", artist);

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
      {artist.data.map((a) => (
        <>
          <ArtistCard key={a.id} name={a.artist_name} image={a.image_url} />
        </>
      ))}
    </div>
  );
};

export default ArtistCardArea;
