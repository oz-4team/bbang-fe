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

  const [modal, setModal] = useState({
    type: "", // success, warning, error
    message: "",
    visible: false,
  });

  const openModal = (type, message) => {
    setModal({ type, message, visible: true });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, visible: false }));
  };

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
    if (!groupInfo.image_url) return openModal("warning", "사진을 입력해주세요!");
    if (!groupInfo.artist_group) return openModal("warning", "그룹명을 입력해주세요!");
    if (!groupInfo.artist_agency) return openModal("warning", "회사명을 입력해주세요!");
    if (!groupInfo.debut_date) return openModal("warning", "데뷔날짜를 입력해주세요!");
    if (!groupInfo.group_fandom) return openModal("warning", "팬덤명을 입력해주세요!");

    createArtistGroup(groupInfo)
      .then(() => {
        openModal("success", "그룹 정보가\n 성공적으로 저장되었습니다!");
        setTimeout(() => {
          nav("/artist-management");
        }, 1500);
      })
      .catch((error) => {
        console.error("Error creating artist group:", error);
        openModal("error", "그룹 정보 저장에 실패했습니다.");
      });
  };

  const saveMember = () => {
    members.artist_group = createdGroupId;
    createArtistForGroup(createdGroupId, members);
    console.log("멤버 저장:", members);
  };

  return (
    <div className="artist-management-page">
      <div className="title">그룹정보</div>
      <div className="sub-title">그룹 정보를 입력을 완료하면 멤버를 추가할 수 있어요!</div>

      <div className="group-info">
        <div className="group-photo-container">
          <label>그룹 사진</label>
          <div className="group-photo">
            {groupInfo.image_url && <img src={groupInfo.image_url} alt="Group" />}
            <label className="upload-button">
              + 사진 업로드
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload(e, (img) => handleGroupChange("image_url", img))
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
            onChange={(e) => handleGroupChange("artist_group", e.target.value)}
          />
          <label>회사명</label>
          <input
            type="text"
            placeholder="회사명을 입력하세요"
            value={groupInfo.artist_agency}
            onChange={(e) => handleGroupChange("artist_agency", e.target.value)}
          />
          <label>데뷔날짜</label>
          <input
            type="date"
            value={groupInfo.debut_date}
            onChange={(e) => handleGroupChange("debut_date", e.target.value)}
          />
          <label>팬덤명</label>
          <input
            type="text"
            placeholder="팬덤명을 입력하세요"
            value={groupInfo.group_fandom}
            onChange={(e) => handleGroupChange("group_fandom", e.target.value)}
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

      <button className="btn-primary bg-primary full-width" onClick={saveGroup}>
        입력 완료하고 멤버 추가하기
      </button>

      {/* 알림 모달 */}
      {modal.visible && (
        <div className="modal-backdrop">
          <div
            className={`modal ${
              modal.type === "success"
                ? "modal-success"
                : modal.type === "error"
                ? "modal-error"
                : "modal-warning"
            }`}
          >
            <div className="modal-icon">
              {modal.type === "success" ? "❤️" : modal.type === "error" ? "❌" : "⚠️"}
            </div>
            <p className="modal-message">{modal.message}</p>
            <button className="btn-primary modal-button" onClick={closeModal}>
              확인
            </button>
          </div>
        </div>
      )}

      <div className="p-24"></div>
    </div>
  );
};

export default ArtistInfoGroup;

