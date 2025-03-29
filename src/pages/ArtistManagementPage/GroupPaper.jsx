import React from "react";
import { useNavigate } from "react-router-dom";
import useArtistGroups from "../../api/artist/useArtistGroups";
import MembersPaper from "../ArtistAddPage/MembersPaper";

const GroupPaper = ({ group }) => {
  const [addedGroup, setAddedGroup] = React.useState(group);
  const { deleteArtistGroup } = useArtistGroups();
  const nav = useNavigate();

  const handleDeleteArtist = (groupId) => {
    if (
      !window.confirm(
        "정말로 아티스트 정보를 삭제하시겠습니까? 삭제된 정보는 복구할 수 없습니다."
      )
    ) {
      return;
    }

    // Call the deleteArtist function from useArtistGroups
    // and handle the response
    deleteArtistGroup(groupId)
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
                <div className="group-photo">
                  <img src={group.image_url} alt="" />
                </div>
              </div>

              <div className="group-details">
                <label>아티스트명</label>
                <p className="text-view">{group.artist_group}</p>
                <label>회사명</label>
                <p className="text-view">{group.artist_agency}</p>
                <label>데뷔날짜</label>
                <p className="text-view">{group.debut_date}</p>
                <label>팬덤명</label>
                <p className="text-view">{group.group_fandom}</p>
                <label>인스타그램</label>
                <p className="text-view">{group.group_insta}</p>
              </div>
            </div>
            <div className="p-24">
              <MembersPaper addedGroup={addedGroup} />
            </div>
            <button
              className="btn-primary bg-none"
              onClick={() => handleDeleteArtist(group.id)}
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

export default GroupPaper;
