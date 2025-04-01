import React from "react";
import useReadArtistAndGroups from "../api/artist/useReadArtistAndGroups";
import defaultImage from "../assets/images/img-defualt.png";
import "../styles/ArtistCardArea.css"; // 스타일 분리
import ArtistCard from "./ArtistCard";

const ArtistCardArea = ({ onCardClick, searchQuery }) => {
  const { artistAndGroups } = useReadArtistAndGroups();

  console.log("artistAndGroups:", artistAndGroups);

  if (!artistAndGroups || artistAndGroups.length === 0) {
    return <div>loading...</div>;
  }

  let filteredArtists = artistAndGroups.data.filter(
    (a) => !(a.artist_name && a.artist_group)
  );

  // 검색어로 필터링
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    artistAndGroups.data = artistAndGroups.data.filter((a) =>
      (a.artist_name || a.artist_group).toLowerCase().includes(q)
    );
  }

  return (
    <>
      <button>좋아요한 가수들</button>
      <div className="artist-card-area">
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
          <div className="no-results">검색 결과가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default ArtistCardArea;
