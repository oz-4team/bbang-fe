import React, { useState } from "react";

const MemberInGroupCard = () => {
  const [members, setMembers] = useState([
    {
      artist_name: "aa",
      artist_agency: "",
      group_insta: "",
      artist_group_fandom: "",
      debut_date: "2025-11-11",
      solomembers: "",
      image_url: null,
    },
  ]);

  const addMember = () => {
    setMembers([...members, { artist_group: "", instagram: "", photo: null }]);
  };

  const updateMember = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const deleteMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div className="title">멤버정보</div>
          <div className="sub-title">멤버정보를 추가해주세요 🙂</div>
        </div>
        <button className="btn-primary bg-none" onClick={addMember}>
          + 멤버 추가
        </button>
      </div>

      <div className="member-container">
        {members.map((member, index) => (
          <div key={index} className="member-card">
            <button
              className="delete-button"
              onClick={() => deleteMember(index)}
              title="삭제하기"
            >
              🗑️
            </button>

            <div className="member-photo">
              {member.photo && <img src={member.photo} alt="멤버 사진" />}
              <label className="upload-button">
                업로드
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, (img) =>
                      updateMember(index, "photo", img)
                    )
                  }
                  hidden
                />
              </label>
            </div>

            <input
              type="text"
              placeholder="멤버 이름"
              value={member.artist_name}
              onChange={(e) =>
                updateMember(index, "artist_name", e.target.value)
              }
            />

            <input
              type="text"
              placeholder={`멤버${index + 1} 인스타그램 링크`}
              value={member.artist_insta}
              onChange={(e) =>
                updateMember(index, "artist_insta", e.target.value)
              }
            />

            <button
              className="btn-primary bg-none"
              onClick={() => saveMember(index)}
            >
              추가하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberInGroupCard;
