import React, { useState } from "react";
import useCreateArtistGroup from "../../api/artist/useCreateArtistGroup";
import "../../styles/ArtistManagementPage.css";

const ArtistInfoGroup = () => {
  const { createArtistGroup } = useCreateArtistGroup();
  const [groupInfo, setGroupInfo] = useState({
    artist_group: "",
    artist_agency: "",
    debutDate: "",
    fandom: "",
    photo: null,
    logo: null,
  });

  const [members, setMembers] = useState([
    { artist_group: "", instagram: "", photo: null },
  ]);

  const [memberVisible, setMemberVisible] = useState(false);

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

  const saveGroup = () => {
    console.log("그룹 정보 저장:", groupInfo);
    if (!groupInfo.artist_group) {
      alert("그룹명을 입력해주세요!");
      return;
    }
    if (!groupInfo.artist_agency) {
      alert("회사명을 입력해주세요!");
      return;
    }
    if (!groupInfo.debutDate) {
      alert("데뷔날짜를 입력해주세요!");
      return;
    }
    if (!groupInfo.fandom) {
      alert("팬덤명을 입력해주세요!");
      return;
    }
    alert("그룹 정보가 저장되었습니다!");

    if (
      groupInfo.artist_group &&
      groupInfo.artist_agency &&
      groupInfo.debutDate &&
      groupInfo.fandom
    ) {
      createArtistGroup(groupInfo);
      setMemberVisible(true);
    }
  };

  const saveMember = (index) => {
    console.log(`멤버 ${index + 1} 저장:`, members[index]);
  };

  return (
    <div className="artist-management-page">
      <div className="title">그룹정보</div>
      <div className="sub-title">
        그룹 정보를 입력을 완료하면 멤버를 추가할 수 있어요!
      </div>

      {groupInfo && (
        <div className="group-info">
          <div className="group-photo-container">
            <label>그룹 사진</label>
            <div className="group-photo">
              {groupInfo.photo && <img src={groupInfo.photo} alt="Group" />}
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
            </div>
          </div>

          <div className="group-details">
            <label>그룹명</label>
            <input
              type="text"
              placeholder="그룹명을 입력하세요"
              value={groupInfo.artist_group}
              onChange={(e) =>
                handleGroupChange("artist_group", e.target.value)
              }
            />
            <label>회사명</label>
            <input
              type="text"
              placeholder="회사명을 입력하세요"
              value={groupInfo.artist_agency}
              onChange={(e) =>
                handleGroupChange("artist_agency", e.target.value)
              }
            />
            <label>데뷔날짜</label>
            <input
              type="date"
              placeholder="데뷔일"
              value={groupInfo.debutDate}
              onChange={(e) => handleGroupChange("debutDate", e.target.value)}
            />
            <label>팬덤명</label>
            <input
              type="text"
              placeholder="팬덤명을 입력하세요"
              value={groupInfo.fandom}
              onChange={(e) => handleGroupChange("fandom", e.target.value)}
            />
          </div>
        </div>
      )}
      <button className="btn-primary bg-primary full-width" onClick={saveGroup}>
        입력 완료하고 멤버 추가하기
      </button>
      <div className="p-24"></div>

      {memberVisible && (
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
                  value={member.name}
                  onChange={(e) => updateMember(index, "name", e.target.value)}
                />

                <input
                  type="text"
                  placeholder={`멤버${index + 1} 인스타그램 링크`}
                  value={member.instagram}
                  onChange={(e) =>
                    updateMember(index, "instagram", e.target.value)
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
      )}
    </div>
  );
};

export default ArtistInfoGroup;
