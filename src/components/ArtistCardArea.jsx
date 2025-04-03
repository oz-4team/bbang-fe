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

  // 로딩 화면 컴포넌트
  const LoadingScreen = () => {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.text}>아티스트 정보를 불러오고 있어요 ⭐️</p>
      </div>
    );
  };

  // 스타일 정의
  const styles = {
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f9f9f9",
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: "5px solid #ccc",
      borderTop: "5px solid #007bff",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    text: {
      marginTop: "20px",
      fontSize: "16px",
      color: "#333",
    },
  };

  // CSS 애니메이션 추가
  const globalStyle = document.createElement("style");
  globalStyle.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
  document.head.appendChild(globalStyle);

  // 아티스트 정보가 없을 때 로딩 화면 표시

  if (!artistAndGroups || artistAndGroups.length === 0) {
    return <LoadingScreen />;
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
      <div
        className="toggle-buttons"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
        }}
      >
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
