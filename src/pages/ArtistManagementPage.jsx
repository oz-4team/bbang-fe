import React, { useState } from "react";
import "../styles/ArtistManagementPage.css";

const ArtistManagementPage = () => {
  const [members, setMembers] = useState([{ name: "", instagram: "", photo: null }]);
  const [groupPhoto, setGroupPhoto] = useState(null);
  const [groupLogo, setGroupLogo] = useState(null);

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

  const handleFileUpload = (event, setter) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setter(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleMemberPhotoUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => updateMember(index, "photo", e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="artist-management-page">
      <div className="group-info">
        <div className="group-photo">
          {groupPhoto && <img src={groupPhoto} alt="Group Photo" />}
          <label className="upload-button">
            사진 업로드
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, setGroupPhoto)}
              hidden
            />
          </label>
        </div>
        <div className="group-details">
          <h2>그룹명</h2>
          <p>회사명</p>
          <div className="group-logo">
            {groupLogo && <img src={groupLogo} alt="Group Logo" />}
            <label className="upload-button">
              로고 업로드
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, setGroupLogo)}
                hidden
              />
            </label>
          </div>
          <p>데뷔 0000.00.00</p>
          <div className="fandom-row">
            <p>팬덤 팬덤명</p>
            <button className="save-button">저장</button>
          </div>
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
                +업로드
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleMemberPhotoUpload(index, e)} 
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

            <button className="save-button">저장</button>
          </div>
        ))}
      </div>
      <button className="add-member-button" onClick={addMember}>
        +멤버추가
      </button>
    </div>
  );
};

export default ArtistManagementPage;
