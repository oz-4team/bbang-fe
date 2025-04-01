import React, { useEffect, useState } from "react";
import useReadArtistAndGroups from "../api/artist/useReadArtistAndGroups";
import defaultImage from "../assets/images/img-defualt.png";
import "../styles/ArtistCardArea.css";
import ArtistCard from "./ArtistCard";
import SearchBar from "./SearchBar";

const ArtistCardArea = ({ onCardClick, searchQuery, setSearchQuery }) => {
  const { artistAndGroups } = useReadArtistAndGroups();
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    if (artistAndGroups?.data) {
      setArtists(artistAndGroups.data);
    }
  }, [artistAndGroups]);

  const toggleLike = (id, type) => {
    setArtists((prev) =>
      prev.map((artist) =>
        artist.id === id &&
        ((type === "solo" && artist.artist_name) ||
          (type === "group" && artist.artist_group))
          ? { ...artist, is_liked: !artist.is_liked }
          : artist
      )
    );
  };

  if (!artistAndGroups || artistAndGroups.length === 0) {
    return <div>loading...</div>;
  }

  // 그룹에 속해있는 아티스트는 제외
  let filteredArtists = artists.filter(
    (a) => !(a.artist_name && a.artist_group)
  );

  // 검색어로 필터링
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredArtists = filteredArtists.filter((a) =>
      (a.artist_name || a.artist_group).toLowerCase().includes(q)
    );
  }

  // 좋아요만 보기
  if (showLikedOnly) {
    filteredArtists = filteredArtists.filter((a) => a.is_liked);
  }

  return (
    <>
      <div className="toggle-buttons">
        <button
          className={!showLikedOnly ? "active" : ""}
          onClick={() => {
            setShowLikedOnly(false);
            setSearchQuery(""); // Reset search query
          }}
        >
          전체 가수 보기
        </button>
        <button
          className={showLikedOnly ? "active" : ""}
          onClick={() => {
            setShowLikedOnly(true);
            setSearchQuery(""); // Reset search query
          }}
        >
          좋아요한 가수들
        </button>
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <div className="artist-card-area">
        {filteredArtists.length > 0 ? (
          filteredArtists.map((a, index) => {
            const type = a.artist_name ? "solo" : "group";
            return (
              <ArtistCard
                key={index}
                name={a.artist_name || a.artist_group}
                image={a.image_url || defaultImage}
                type={type}
                id={a.id}
                onCardClick={() => onCardClick()}
                is_liked={a.is_liked}
                onLikeToggle={() => toggleLike(a.id, type)}
              />
            );
          })
        ) : (
          <div className="no-results">검색 결과가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default ArtistCardArea;
