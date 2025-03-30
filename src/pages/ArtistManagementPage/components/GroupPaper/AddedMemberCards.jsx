import React from "react";
import useArtistGroups from "../../../../api/artist/useArtistGroups";
import useArtistManagementStore from "../../useArtistManagementStore";

const AddedMemberCards = () => {
  const { group, setRefresh } = useArtistManagementStore();
  const members = group.members;
  const { deleteMember } = useArtistGroups();

  const handleDeleteMember = (memberid) => {
    deleteMember(group.id, memberid).finally(() => {
      setRefresh(true);
    });
  };

  return (
    <div>
      {members.map((member, index) => (
        <>
          <div key={index} className="member-container">
            <div className="member-card">
              <button
                className="delete-button"
                onClick={() => handleDeleteMember(member.id)}
                title="삭제하기"
              >
                🗑️
              </button>

              <div className="member-photo">
                <img src={member.image_url} alt="" />
              </div>
              <div className="member-info">
                <label>이름</label>
                <p className="text-view">{member.artist_name}</p>

                <label>인스타그램</label>
                <p className="text-view">{member.artist_insta}</p>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default AddedMemberCards;
