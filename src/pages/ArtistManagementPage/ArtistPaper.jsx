import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useArtist from "../../api/artist/useArtist";
import "../../styles/ArtistManagementPage.css";
import useArtistManagementStore from "../admin/useArtistManagementStore";

const ArtistPaper = ({ artist }) => {
  const { deleteArtist, updateArtist } = useArtist();
  const { setRefresh } = useArtistManagementStore();
  const nav = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...artist });
  const [showSaveModal, setShowSaveModal] = useState(false);

  // ✅ 날짜를 '2024년 3월 31일' 형식으로 포맷하는 함수
  const formatKoreanDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const handleDeleteArtist = (groupId) => {
    if (
      !window.confirm(
        "정말로 아티스트 정보를 삭제하시겠습니까? 삭제된 정보는 복구할 수 없습니다."
      )
    ) {
      return;
    }

    deleteArtist(groupId)
      .then(() => {
        setRefresh(true);
        nav("/artist-add");
      })
      .catch((error) => {
        console.error(`Error deleting group with ID ${groupId}:`, error);
      });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const updateData = {
      artist_name: formData.artist_name,
      artist_agency: formData.artist_agency,
      debut_date: formData.debut_date,
      artist_fandom: formData.artist_fandom,
      artist_insta: formData.artist_insta,
    };

    updateArtist(formData.id, updateData)
      .then(() => {
        setRefresh(true);
        setEditMode(false);
        setShowSaveModal(true); // 모달 표시
      })
      .catch((error) => {
        console.error("Error updating artist:", error.response?.data || error);
      });
  };

  const handleCancel = () => {
    setFormData({ ...artist });
    setEditMode(false);
  };

  return (
    <div className="outlet-container">
      <div className="inner artist-item">
        <div className="artist-management-page">
          <div className="title">아티스트 정보</div>

          <div className="group-info">
            <div className="group-photo-container">
              <img
                src={formData.image_url || "/default-artist.png"}
                alt="아티스트 사진"
              />
            </div>

            <div className="group-details">
              <label>아티스트명</label>
              {editMode ? (
                <input
                  type="text"
                  value={formData.artist_name}
                  onChange={(e) =>
                    handleChange("artist_name", e.target.value)
                  }
                />
              ) : (
                <p className="text-view">{artist.artist_name}</p>
              )}

              <label>회사명</label>
              {editMode ? (
                <input
                  type="text"
                  value={formData.artist_agency}
                  onChange={(e) =>
                    handleChange("artist_agency", e.target.value)
                  }
                />
              ) : (
                <p className="text-view">{artist.artist_agency}</p>
              )}

              <label>데뷔날짜</label>
              {editMode ? (
                <input
                  type="date"
                  value={formData.debut_date}
                  onChange={(e) =>
                    handleChange("debut_date", e.target.value)
                  }
                />
              ) : (
                <p className="text-view">
                  {formatKoreanDate(artist.debut_date)}
                </p>
              )}

              <label>팬덤명</label>
              {editMode ? (
                <input
                  type="text"
                  value={formData.artist_fandom}
                  onChange={(e) =>
                    handleChange("artist_fandom", e.target.value)
                  }
                />
              ) : (
                <p className="text-view">{artist.artist_fandom}</p>
              )}

              <label>인스타그램</label>
              {editMode ? (
                <input
                  type="text"
                  value={formData.artist_insta}
                  onChange={(e) =>
                    handleChange("artist_insta", e.target.value)
                  }
                />
              ) : (
                <p className="text-view">{artist.artist_insta}</p>
              )}
            </div>
          </div>

          {!editMode ? (
            <div className="button-group">
              <button className="btn-primary" onClick={() => setEditMode(true)}>
                수정하기
              </button>
              <button
                className="btn-primary bg-none"
                onClick={() => handleDeleteArtist(artist.id)}
              >
                아티스트 정보 삭제하기
              </button>
            </div>
          ) : (
            <div className="button-group">
              <button className="btn-primary" onClick={handleSave}>
                저장
              </button>
              <button className="btn-secondary" onClick={handleCancel}>
                취소
              </button>
            </div>
          )}

          {/* 💕 저장 완료 모달 */}
          {showSaveModal && (
            <div className="modal-backdrop">
              <div className="modal modal-success">
                <div className="modal-icon">💕</div>
                <p className="modal-message">
                  아티스트 정보가<br />성공적으로 저장되었습니다!
                </p>
                <button
                  className="btn-primary modal-button"
                  onClick={() => setShowSaveModal(false)}
                >
                  확인
                </button>
              </div>
            </div>
          )}

          <div className="p-24"></div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPaper;
