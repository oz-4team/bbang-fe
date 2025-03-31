import React, { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import useLikes from "../api/artist/useLikes";
import useUserStore from "../store/userStore";
import Modal from "./Modal";

const MyArtistFilter = ({ onFilterChange }) => {
  const { user, logout } = useUserStore();
  const { readAllLikes, likes } = useLikes();

  useEffect(() => {
    if (user) {
      readAllLikes();
    }
  }, []);

  console.log("likes:", likes);

  const [isLoading, setIsLoading] = useState(true);
  // const [likes, setLikes] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleclickUserCheck = (e) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handlePrimaryClick = () => {
    console.log("Primary button clicked");
    handleCloseModal();
  };

  const handleSecondaryClick = () => {
    console.log("Secondary button clicked");
    handleCloseModal();
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
    console.log("로그인 페이지로 이동");
  };

  const alertLogin = () => {
    alert("로그인이 필요한 서비스입니다.");
  };

  const [selectedArtist, setSelectedArtist] = useState("all");

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

  const handleArtistChange = (e) => {
    const newArtist = e.target.value; // 새로 선택된 값을 변수에 저장
    setSelectedArtist(newArtist); // 상태 업데이트
    handleFilter(newArtist); // 최신 값을 바로 전달
  };

  const handleFilter = (artist) => {
    if (artist === "myArtists") {
      console.log("myArtists:", myArtists);
    } else {
      if (onFilterChange) {
        onFilterChange(artist);
      }
    }
  };

  return (
    <>
      <div>
        {user ? (
          <>
            <select
              style={{
                minWidth: "300px",
                width: "100%",
                height: "60px",
                marginTop: "10px",
              }}
              onChange={handleArtistChange}
              value={selectedArtist}
            >
              <option value="all">모든 아티스트</option>
              <option value="myArtists">나의 아티스트들</option>
              {likes.map((like, index) => (
                <option key={index} value={like.artist || like.artist_group}>
                  {like.artist || like.artist_group} ❤️
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <button
              style={{
                minWidth: "300px",
                width: "100%",
                height: "60px",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
              }}
              onClick={user ? alertLogin : handleclickUserCheck}
            >
              마이 아티스트
              <span style={{ marginLeft: "auto" }}>
                <TiArrowSortedDown />
              </span>
            </button>
          </>
        )}
      </div>
      {isModalOpen && (
        <Modal
          title="로그인이 필요해요 ☺️"
          description="로그인하시고 최애 정보를 확인해보세요!"
          primaryButtonText="로그인하러 가기"
          secondaryButtonText="닫기"
          onPrimaryClick={handleLoginClick}
          onSecondaryClick={handleSecondaryClick}
        />
      )}
    </>
  );
};

export default MyArtistFilter;
