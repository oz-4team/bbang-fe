import React from "react";
import useReadArtistAndGroups from "../api/artist/useReadArtistAndGroups";

import ArtistCard from "./ArtistCard";

const ArtistCardArea = ({ onCardClick }) => {
  const { artistAndGroups } = useReadArtistAndGroups();
  if (artistAndGroups.length === 0) {
    return <div>loading...</div>;
  }

  console.log("artist area 🙂:", artistAndGroups);

  const shuffledArtists = [...artistAndGroups.data].sort(
    () => Math.random() - 0.5
  );

  //그룹에 속해있는 아티스트는 제외
  const filteredArtists = shuffledArtists.filter(
    (a) => !(a.artist_name && a.artist_group)
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 2fr))",
        gap: "16px",
        justifyContent: "center", // 수평 중앙 정렬
        alignContent: "center", // 수직 중앙 정렬
      }}
    >
      {filteredArtists.map((a, index) => (
        <ArtistCard
          key={index}
          name={a.artist_name || a.artist_group}
          image={a.image_url}
          type={a.artist_name ? "solo" : "group"}
          id={a.id}
          onCardClick={() => onCardClick()}
          is_liked={a.is_liked}
        />
      ))}
    </div>
  );
};

export default ArtistCardArea;
