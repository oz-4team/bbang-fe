import React, { useEffect, useState } from "react";
import useArtistGroups from "../../api/artist/useArtistGroups";

const ToAddMemeber = (addedGroup) => {
  console.log("addedGroups:", addedGroup.addedGroup.addedGroup.id);
  const [selectedId, setSelectedId] = useState(
    addedGroup.addedGroup.addedGroup.id
  );

  useEffect(() => {
    setSelectedId(addedGroup.addedGroup.addedGroup.id);
  }, [addedGroup.addedGroup.addedGroup.id]);

  console.log("selectedId:", selectedId);
  const { createArtistForGroup } = useArtistGroups();
  const [members, setMembers] = useState([
    {
      artist_name: "",
      artist_agency: addedGroup.addedGroup.addedGroup.artist_agency,
      group_insta: addedGroup.addedGroup.addedGroup.group_insta,
      artist_group_fandom: addedGroup.addedGroup.addedGroup.group_fandom,
      debut_date: addedGroup.addedGroup.addedGroup.debut_date,
      solomembers: "",
      image_url: null,
      artist_insta: "",
    },
  ]);

  const [toAddMember, setToAddMember] = useState({
    artist_name: "",
    artist_agency: addedGroup.addedGroup.addedGroup.artist_agency,
    group_insta: addedGroup.addedGroup.addedGroup.group_insta,
    artist_group_fandom: addedGroup.addedGroup.addedGroup.group_fandom,
    debut_date: addedGroup.addedGroup.addedGroup.debut_date,
    solomembers: "",
    image_url: null,
    artist_insta: "",
  });

  const handleImageUpload = (event, callback) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => callback(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const addMember = (selectedId, members) => {
    console.log("selectedId:", selectedId);
    console.log("members:", members);
    createArtistForGroup(selectedId, members);
  };

  return (
    <div className="member-container">
      <div className="member-card">
        <button
          className="delete-button"
          onClick={() => deleteMember()}
          title="삭제하기"
        >
          🗑️
        </button>

        <div className="member-photo">
          {members.image_url && <img src={members.image_url} alt="멤버 사진" />}
          <label className="upload-button">
            업로드
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageUpload(e, (img) => updateMember("image_url", img))
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
          onClick={() => addMember(selectedId, [toAddMember])}
        >
          추가하기
        </button>
      </div>
    </div>
  );
};

export default ToAddMemeber;
