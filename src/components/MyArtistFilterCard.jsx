import React, { useEffect, useState } from "react";
import useLikes from "../api/artist/useLikes";
import defualtImage from "../assets/images/img-defualt.png"; // 기본 이미지 경로
import useUserStore from "../store/userStore";

const MyArtistFilterCard = () => {
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
      console.log("myArtists:", updatedMyArtists);
    }
  }, [likes]);

  return (
    <>
      {likes.length > 0 ? (
        <>
          <div className="artist-header">
            <div className="title">마이아티스트</div>
          </div>
          <div className="artist-filter">
            {likes.map((like, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
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
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-likes-message">좋아하는 아티스트가 없습니다.</div>
      )}
    </>
  );
};

export default MyArtistFilterCard;
