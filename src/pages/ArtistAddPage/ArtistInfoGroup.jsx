import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useArtistGroups from "../../api/artist/useArtistGroups";
import useCreateArtistGroup from "../../api/artist/useCreateArtistGroup";
import "../../styles/ArtistManagementPage.css";

const ArtistInfoGroup = () => {
  const { createArtistGroup, artistGroup } = useCreateArtistGroup();
  const { createArtistForGroup } = useArtistGroups();
  const nav = useNavigate();

  const [groupInfo, setGroupInfo] = useState({
    artist_group: "",
    artist_agency: "",
    debut_date: "",
    group_fandom: "",
    image_url: null,
    logo: null,
    group_insta: "",
  });

  const [createdGroupId, setCreatedGroupId] = useState(artistGroup?.id);

  console.log("artistGroup:", artistGroup);

  useEffect(() => {
    if (artistGroup) {
      setGroupInfo((prev) => ({
        ...prev,
        artist_group: artistGroup.artist_group,
        artist_agency: artistGroup.artist_agency,
        debut_date: artistGroup.debut_date,
        group_fandom: artistGroup.group_fandom,
        image_url: artistGroup.image_url,
        logo: artistGroup.logo,
        group_insta: artistGroup.group_insta,
      }));
      setCreatedGroupId(artistGroup.id);
    }
  }, [artistGroup]);

  console.log("createdGroupId:", createdGroupId);

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

  const saveGroup = () => {
    console.log("그룹 정보 저장:", groupInfo);
    if (!groupInfo.image_url) {
      alert("사진을 입력해주세요!");
      return;
    }
    if (!groupInfo.artist_group) {
      alert("그룹명을 입력해주세요!");
      return;
    }
    if (!groupInfo.artist_agency) {
      alert("회사명을 입력해주세요!");
      return;
    }
    if (!groupInfo.debut_date) {
      alert("데뷔날짜를 입력해주세요!");
      return;
    }
    if (!groupInfo.group_fandom) {
      alert("팬덤명을 입력해주세요!");
      return;
    }
    alert("그룹 정보가 저장되었습니다!");

    if (
      groupInfo.artist_group &&
      groupInfo.artist_agency &&
      groupInfo.debut_date &&
      groupInfo.group_fandom
    ) {
      createArtistGroup(groupInfo)
        .then(() => {
          nav("/artist-management");
        })
        .catch((error) => {
          console.error("Error creating artist:", error);
          alert("아티스트 정보 저장에 실패했습니다.");
        });
    }
  };

  const saveMember = () => {
    console.log("createdGroupIdcreatedGroupId:", createdGroupId);

    (members.artist_group = createdGroupId),
      createArtistForGroup(createdGroupId, members);
    console.log(`멤버 저장:`, members);
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
              {groupInfo.image_url && (
                <img src={groupInfo.image_url} alt="Group" />
              )}
              <label className="upload-button">
                + 사진 업로드
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, (img) =>
                      handleGroupChange("image_url", img)
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
              value={groupInfo.debut_date}
              onChange={(e) => handleGroupChange("debut_date", e.target.value)}
            />
            <label>팬덤명</label>
            <input
              type="text"
              placeholder="팬덤명을 입력하세요"
              value={groupInfo.group_fandom}
              onChange={(e) =>
                handleGroupChange("group_fandom", e.target.value)
              }
            />
            <label>인스타그램</label>
            <input
              type="text"
              placeholder="인스타그램 주소를 입력하세요"
              value={groupInfo.group_insta}
              onChange={(e) => handleGroupChange("group_insta", e.target.value)}
            />
          </div>
        </div>
      )}
      <button className="btn-primary bg-primary full-width" onClick={saveGroup}>
        입력 완료하고 멤버 추가하기
      </button>
      <div className="p-24"></div>
    </div>
  );
};

export default ArtistInfoGroup;
