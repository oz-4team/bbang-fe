import React, { useState } from "react";
import "../styles/ArtistManagementPage.css";

const ArtistManagementPage = () => {
  const [groupInfo, setGroupInfo] = useState({
    name: "",
    company: "",
    debutDate: "",
    fandom: "",
    photo: null,
    logo: null,
  });

  const [members, setMembers] = useState([
    { name: "", instagram: "", photo: null },
  ]);

  const handleGroupChange = (field, value) => {
    setGroupInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event, callback) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => callback(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const addMember = () => {
    setMembers([...members, { name: "", instagram: "", photo: null }]);
  };

  const updateMember = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const deleteMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const saveGroup = () => {
  };

  const saveMember = (index) => {
  };

  return (
    <div className="artist-management-page">
      <div className="group-info">
        <div className="group-photo">
          {groupInfo.photo && <img src={groupInfo.photo} alt="Group" />}
          <label className="upload-button">
            사진 업로드
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, (img) => handleGroupChange("photo", img))}
              hidden
            />
          </label>
        </div>

        <div className="group-details">
          <input
            type="text"
            placeholder="그룹명"
            value={groupInfo.name}
            onChange={(e) => handleGroupChange("name", e.target.value)}
          />
          <input
            type="text"
            placeholder="회사명"
            value={groupInfo.company}
            onChange={(e) => handleGroupChange("company", e.target.value)}
          />
          <div className="group-logo">
            {groupInfo.logo && <img src={groupInfo.logo} alt="Logo" />}
            <label className="upload-button">
              로고 업로드
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, (img) => handleGroupChange("logo", img))}
                hidden
              />
            </label>
          </div>
          <input
            type="date"
            placeholder="데뷔일"
            value={groupInfo.debutDate}
            onChange={(e) => handleGroupChange("debutDate", e.target.value)}
          />
          <input
            type="text"
            placeholder="팬덤명"
            value={groupInfo.fandom}
            onChange={(e) => handleGroupChange("fandom", e.target.value)}
          />
          <button className="save-button" onClick={saveGroup}>
            그룹 저장
          </button>
        </div>
      </div>

      <h3 className="member-section-title">멤버 정보</h3>
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
                    handleImageUpload(e, (img) => updateMember(index, "photo", img))
                  }
                  hidden
                />
              </label>
            </div>

            <input
              type="text"
              placeholder="멤버 이름"
              value={member.name}
              onChange={(e) => updateMember(index, "name", e.target.value)}
            />

            <input
              type="text"
              placeholder={`멤버${index + 1} 인스타그램 링크`}
              value={member.instagram}
              onChange={(e) => updateMember(index, "instagram", e.target.value)}
            />

            <button className="save-button" onClick={() => saveMember(index)}>
              저장
            </button>
          </div>
        ))}
      </div>
      <button className="add-member-button" onClick={addMember}>
        + 멤버 추가
      </button>
    </div>
  );
};

export default ArtistManagementPage;
