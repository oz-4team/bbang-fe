import React, { useState } from "react";
import useArtistGroups from "../../../../api/artist/useArtistGroups";
import useArtistManagementStore from "../../../admin/useArtistManagementStore";

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose} className="btn-primary">
          확인
        </button>
      </div>
    </div>
  );
};

const ToAddMemeberCard = () => {
  const { group, setRefresh } = useArtistManagementStore();

  const initialToAddMember = {
    artist_name: "",
    artist_agency: group.artist_agency,
    group_insta: group.group_insta,
    artist_group_fandom: group.group_fandom,
    debut_date: group.debut_date,
    solomembers: false,
    image_url: null,
    artist_insta: "",
  };

  const [groupId] = useState(group.id);
  const [toAddMember, setToAddMember] = useState(initialToAddMember);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { createArtistForGroup } = useArtistGroups();

  const handleImageUpload = (event, callback) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => callback(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddMember = () => {
    if (!toAddMember.artist_name.trim()) {
      setModalMessage("이름을 입력해주세요.");
      setShowModal(true);
      return;
    }

    createArtistForGroup(groupId, [toAddMember])
      .then(() => {
        setRefresh(true);
        setToAddMember(initialToAddMember);
      })
      .catch((error) => {
        console.error("Error adding member:", error);
        setModalMessage("멤버 추가에 실패했습니다.");
        setShowModal(true);
      });
  };

  return (
    <>
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}

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

        <input
          type="text"
          placeholder="멤버 이름"
          value={toAddMember.artist_name}
          onChange={(e) =>
            setToAddMember({ ...toAddMember, artist_name: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="멤버 인스타그램 링크"
          value={toAddMember.artist_insta}
          onChange={(e) =>
            setToAddMember({ ...toAddMember, artist_insta: e.target.value })
          }
        />

        <button className="btn-primary bg-none" onClick={handleAddMember}>
          추가하기
        </button>
      </div>
    </>
  );
};

export default ToAddMemeberCard;
