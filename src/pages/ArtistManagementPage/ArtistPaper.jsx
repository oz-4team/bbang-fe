import React from "react";
import { useNavigate } from "react-router-dom";
import useArtist from "../../api/artist/useArtist";
import "../../styles/ArtistManagementPage.css";

const ArtistPaper = ({ artist }) => {
  const { deleteArtist } = useArtist();
  const nav = useNavigate();
  const handleDeleteArtist = (groupId) => {
    if (
      !window.confirm(
        "정말로 아티스트 정보를 삭제하시겠습니까? 삭제된 정보는 복구할 수 없습니다."
      )
    ) {
      return;
    }

    // Call the deleteArtist function from useArtist
    // and handle the response
    deleteArtist(groupId)
      .then(() => {
        nav("/artist-add");
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error(`Error deleting group with ID ${groupId}:`, error);
      });
  };
  return (
    <>
      <div className="outlet-container">
        <div className="artist-item">
          <div className="artist-management-page">
            <div className="title">아티스트 정보</div>

            <div className="group-info">
              <div className="group-photo-container">
                <img src={artist.image_url} alt="" />
                {/* <div className="group-photo">
                  {artist.photo && <img src={artist.photo} alt="Group" />}
                  <label className="upload-button">
                    + 사진 업로드
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e, (img) =>
                          handleGroupChange("photo", img)
                        )
                      }
                      hidden
                    />
                  </label>
                </div> */}
              </div>

              <div className="group-details">
                <label>아티스트명</label>
                <p className="text-view">{artist.artist_name}</p>
                <label>회사명</label>
                <p className="text-view">{artist.artist_agency}</p>
                <label>데뷔날짜</label>
                <p className="text-view">{artist.debut_date}</p>
                <label>팬덤명</label>
                <p className="text-view">{artist.fandom}</p>
                <label>인스타그램</label>
                <p className="text-view">{artist.artist_insta}</p>
              </div>
            </div>
            <button
              className="btn-primary bg-none"
              onClick={() => handleDeleteArtist(artist.id)}
            >
              아티스트 정보 삭제하기
            </button>
            <div className="p-24"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistPaper;
