import React, { useState } from "react";
import useArtistGroups from "../../../../api/artist/useArtistGroups";
import useArtistManagementStore from "../../useArtistManagementStore";

const ToAddMemeberCard = () => {
  const { group, setRefresh } = useArtistManagementStore();

  const [groupId] = useState(group.id);

  const [toAddMember, setToAddMember] = useState({
    artist_name: "",
    artist_agency: group.artist_agency,
    group_insta: group.group_insta,
    artist_group_fandom: group.group_fandom,
    debut_date: group.debut_date,
    solomembers: "",
    image_url: null,
    artist_insta: "",
  });

  const { createArtistForGroup } = useArtistGroups();

  const handleImageUpload = (event, callback) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => callback(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const addMember = (groupId) => {
    console.log("groupId:", groupId);
    createArtistForGroup(groupId, [toAddMember])
      .then(() => {
        console.log("멤버 추가 성공");

        setRefresh();
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Error adding member:", error);
        alert("멤버 추가에 실패했습니다.");
      });
  };

  return (
    <div className="member-container">
      <div className="member-card">
        <div className="member-photo">
          {toAddMember.image_url && (
            <img src={toAddMember.image_url} alt="멤버 사진" />
          )}
          <label className="upload-button">
            업로드
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageUpload(e, (img) =>
                  setToAddMember({ ...toAddMember, image_url: img })
                )
              }
              hidden
            />
          </label>
        </div>

        <div>{JSON.stringify(toAddMember)}</div>
        <input
          type="text"
          placeholder="멤버 이름"
          value={toAddMember.artist_name}
          onChange={(e) => {
            setToAddMember({ ...toAddMember, artist_name: e.target.value });
          }}
        />

        <input
          type="text"
          placeholder={`멤버${+1} 인스타그램 링크`}
          value={toAddMember.artist_insta}
          onChange={(e) => {
            setToAddMember({ ...toAddMember, artist_insta: e.target.value });
          }}
        />

        <button
          className="btn-primary bg-none"
          onClick={() => addMember(groupId, [toAddMember])}
        >
          추가하기
        </button>
      </div>
    </div>
  );
};

export default ToAddMemeberCard;
