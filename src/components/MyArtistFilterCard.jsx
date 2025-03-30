import React, { useEffect, useState } from "react";
import useLikes from "../api/artist/useLikes";
import easpa from "../assets/images/easpa.jpeg";

const MyArtistFilterCard = () => {
  const { readAllLikes, likes } = useLikes();

  useEffect(() => {
    readAllLikes();
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

  console.log("likes:", likes);

  return (
    <>
      {likes.map((like, index) => (
        <div
          key={index}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
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
              src={like.image || easpa}
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
    </>
  );
};

export default MyArtistFilterCard;
