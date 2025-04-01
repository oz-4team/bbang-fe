import React, { useEffect, useState } from "react";
import useLikes from "../api/artist/useLikes";
import defualtImage from "../assets/images/img-defualt.png"; // 기본 이미지 경로
import useUserStore from "../store/userStore";

const MyArtistFilterCard = ({ onArtistClick, setFilterType }) => {
  const { readAllLikes, likes } = useLikes();
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      readAllLikes();
    }
  }, []);

  const [myArtists, setMyArtists] = useState([]);
  useEffect(() => {
    if (likes.length > 0) {
      const updatedMyArtists = likes.map(
        (like) => like.artist || like.artist_group
      );
      setMyArtists(updatedMyArtists);
    }
  }, [likes]);

  return (
    <div style={{ display: user ? "block" : "none" }}>
      {likes.length > 0 ? (
        <>
          <div className="artist-header">
            <div className="title">마이아티스트</div>
          </div>

          <div className="artist-filter">

            <button

              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",

                // border: "2px solid #646cffaa",
                padding: "0.5rem",
                borderRadius: "8px",
              }}
              onClick={() => {
                // onArtistClick(null);
                likes.forEach((item) => (item.isSelected = false)); // Deselect all
                setFilterType("전체일정"); // Set filter type to "전체일정"
              }}
            >
              <img
                src={defualtImage}

                style={{
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "50%",

                  objectFit: "cover",
                }}
              />
              <div>전체보기</div>
            </button>



            {likes.map((like, index) => {
              const artistId = like.artist_id;
              const artistGroupId = like.artist_group_id;
              return (
                <button
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    border: like.isSelected ? "2px solid #646cffaa" : "none",
                    padding: "0.5rem",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    onArtistClick({ artistId, artistGroupId });
                    likes.forEach((item) => (item.isSelected = false)); // Deselect all
                    like.isSelected = true; // Select the clicked one
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <img
                      src={
                        like.artist_image ||
                        like.artist_group_image ||
                        defualtImage
                      }
                      alt={like.name}
                      style={{
                        width: "4rem",
                        height: "4rem",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <div>{like.artist || like.artist_group}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="no-likes-message">좋아하는 아티스트가 없습니다.</div>
      )}
    </div>
  );
};

export default MyArtistFilterCard;
