import React from "react";
import useReadArtist from "../api/useReadArtist";
import ArtistCard from "./ArtistCard";

const ArtistCardArea = () => {
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
        gap: "16px",
        justifyContent: "center", // 수평 중앙 정렬
        alignContent: "center", // 수직 중앙 정렬
      }}
    >
      {artist.map((a) => (
        <>
          <ArtistCard key={a.name} name={a.name} image={a.image[3]["#text"]} />
        </>
      ))}
    </div>
  );
};

export default ArtistCardArea;
