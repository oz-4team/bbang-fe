import React, { useEffect } from "react";
import useLikes from "../api/artist/useLikes";
import "../styles/ArtistCardArea.css"; // 스타일 분리

const ArtistCardArea = ({ onCardClick, searchQuery }) => {
  // const { artistAndGroups } = useReadArtistAndGroups();
  const { readAllLikes, likes } = useLikes();
  useEffect(() => {
    readAllLikes();
  }, []);

  console.log("아티스트 페이지 likes:", likes);

  // if (!artistAndGroups || artistAndGroups.length === 0) {
  //   return <div>loading...</div>;
  // }
  // if (!likes || !likes.data) {
  //   return <div>Loading likes...</div>;
  // }
  console.log("아티스트 페이지 likes:", likes);

  // const shuffledArtists = [...artistAndGroups.data].sort(
  //   () => Math.random() - 0.5
  // );

  // // 그룹에 속해있는 아티스트는 제외
  // let filteredArtists = shuffledArtists.filter(
  //   (a) => !(a.artist_name && a.artist_group)
  // );

  // 검색어로 필터링
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    artistAndGroups.data = artistAndGroups.data.filter((a) =>
      (a.artist_name || a.artist_group).toLowerCase().includes(q)
    );
  }

  return (
    <div className="artist-card-area">
      {/* <pre>{JSON.stringify(likes, null, 2)}</pre> */}
      {/* {filteredArtists.length > 0 ? (
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
      )} */}
      {/* {artistAndGroups.data.map((a, index) => (
        <ArtistCard
          key={index}
          name={a.artist_name || a.artist_group}
          image={a.image_url || defaultImage}
          type={a.artist_name ? "solo" : "group"}
          id={a.id}
          onCardClick={() => onCardClick()}
          is_liked={a.is_liked}
        />
      ))} */}

      {/* <div>{likes.}</div> */}

      {/* {likes.data.map((a, index) => (
        <ArtistCard
          key={index}
          name={a.artist || a.artist_group}
          image={a.artist_group_image || a.artist_image || defaultImage}
          type={a.artist ? "solo" : "group"}
          id={a.artist_id || a.artist_group_id}
          onCardClick={() => onCardClick()}
          is_liked={a.is_liked}
        />
      ))} */}
    </div>
  );
};

export default ArtistCardArea;
