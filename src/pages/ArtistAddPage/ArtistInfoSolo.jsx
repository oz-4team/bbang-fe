import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useArtist from "../../api/artist/useArtist";
import useUserStore from "../../store/userStore";
import "../../styles/ArtistManagementPage.css";

const ArtistInfoSolo = () => {
  const { createArtistSolo } = useArtist();
  const { user } = useUserStore();
  const nav = useNavigate();

  const [artistInfo, setArtistInfo] = useState({
    artist_name: "",
    artist_agency: "",
    debut_date: "",
    fandom: "",
    image_url: null,
    logo: null,
    artist_insta: "",
  });

  const [modal, setModal] = useState({
    type: "", // success, warning, error
    message: "",
    visible: false,
  });

  const openModal = (type, message) => {
    setModal({ type, message, visible: true });
  };

  const closeModal = () => {
    setModal({ ...modal, visible: false });
  };

  const handleGroupChange = (field, value) => {
    setArtistInfo((prev) => ({ ...prev, [field]: value }));
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
    if (!artistInfo.image_url) return openModal("warning", "사진을 추가해주세요!");
    if (!artistInfo.artist_name) return openModal("warning", "아티스트명을 입력해주세요!");
    if (!artistInfo.artist_agency) return openModal("warning", "회사명을 입력해주세요!");
    if (!artistInfo.debut_date) return openModal("warning", "데뷔날짜를 입력해주세요!");
    if (!artistInfo.fandom) return openModal("warning", "팬덤명을 입력해주세요!");

    createArtistSolo(artistInfo)
      .then(() => {
        openModal("success", "아티스트 정보가\n 성공적으로 저장되었습니다!");
        setTimeout(() => {
          nav("/artist-management");
        }, 1500);
      })
      .catch((error) => {
        console.error("Error creating artist:", error);
        openModal("error", "아티스트 정보 저장에 실패했습니다.");
      });
  };

  return (
    <div className="artist-management-page">
      <div className="title">아티스트 정보</div>
      <div className="sub-title">아티스트 정보를 입력해주세요 🙂</div>

      <div className="group-info">
        <div className="group-photo-container">
          <label>아티스트 사진</label>
          <div className="group-photo">
            {artistInfo.image_url && <img src={artistInfo.image_url} alt="Group" />}
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
          <label>아티스트명</label>
          <input
            type="text"
            placeholder="아티스트명을 입력하세요"
            value={artistInfo.artist_name}
            onChange={(e) => handleGroupChange("artist_name", e.target.value)}
          />
          <label>회사명</label>
          <input
            type="text"
            placeholder="회사명을 입력하세요"
            value={artistInfo.artist_agency}
            onChange={(e) => handleGroupChange("artist_agency", e.target.value)}
          />
          <label>데뷔날짜</label>
          <input
            type="date"
            value={artistInfo.debut_date}
            onChange={(e) => handleGroupChange("debut_date", e.target.value)}
          />
          <label>팬덤명</label>
          <input
            type="text"
            placeholder="팬덤명을 입력하세요"
            value={artistInfo.fandom}
            onChange={(e) => handleGroupChange("fandom", e.target.value)}
          />
          <label>인스타그램</label>
          <input
            type="text"
            placeholder="인스타그램 주소를 입력하세요"
            value={artistInfo.artist_insta}
            onChange={(e) => handleGroupChange("artist_insta", e.target.value)}
          />
        </div>
      </div>

      <button className="btn-primary bg-primary full-width" onClick={saveGroup}>
        입력 완료하기
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
              {modal.type === "success"
                ? "❤️"
                : modal.type === "error"
                ? "❌"
                : "⚠️"}
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

export default ArtistInfoSolo;