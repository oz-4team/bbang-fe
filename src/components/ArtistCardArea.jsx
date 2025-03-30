import React from "react";
import useReadArtistAndGroups from "../api/artist/useReadArtistAndGroups";
import defaultImage from "../assets/images/img-defualt.png";
import ArtistCard from "./ArtistCard";

const ArtistCardArea = ({ onCardClick, searchQuery }) => {
  const { artistAndGroups } = useReadArtistAndGroups();

  if (!artistAndGroups || artistAndGroups.length === 0) {
    return <div>loading...</div>;
  }

  console.log("artist area 🙂:", artistAndGroups);

  const shuffledArtists = [...artistAndGroups.data].sort(
    () => Math.random() - 0.5
  );

  // 그룹에 속해있는 아티스트는 제외
  let filteredArtists = shuffledArtists.filter(
    (a) => !(a.artist_name && a.artist_group)
  );

  // 검색어로 필터링
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredArtists = filteredArtists.filter((a) =>
      (a.artist_name || a.artist_group).toLowerCase().includes(q)
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 2fr))",
        gap: "16px",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {filteredArtists.length > 0 ? (
        filteredArtists.map((a, index) => (
          <ArtistCard
            key={index}
            name={a.artist_name || a.artist_group}
            image={a.image_url || defaultImage}
            type={a.artist_name ? "solo" : "group"}
            id={a.id}
            onCardClick={() => onCardClick()}
            is_liked={a.is_liked}
          />
        ))
      ) : (
        <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default ArtistCardArea;
