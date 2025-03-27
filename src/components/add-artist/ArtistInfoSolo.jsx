import React, { useState } from "react";
import useCreateArtist from "../../api/artist/useCreateArist";
import useUserStore from "../../store/userStore";
import "../../styles/ArtistManagementPage.css";

const ArtistInfoSolo = () => {
  const { createArtist } = useCreateArtist();
  const { user, logout } = useUserStore();
  console.log("user:", user);
  const [artistInfo, setArtistInfo] = useState({
    artist_name: "",
    artist_agency: "",
    debut_date: "",
    fandom: "",
    photo: null,
    logo: null,
    artist_insta: "",
    image_url: "",
  });

  const [members, setMembers] = useState([
    { name: "", instagram: "", photo: null },
  ]);

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
    if (!artistInfo.artist_name) {
      alert("그룹명을 입력해주세요!");
      return;
    }
    if (!artistInfo.artist_agency) {
      alert("회사명을 입력해주세요!");
      return;
    }
    if (!artistInfo.debut_date) {
      alert("데뷔날짜를 입력해주세요!");
      return;
    }
    if (!artistInfo.fandom) {
      alert("팬덤명을 입력해주세요!");
      return;
    }
    alert("아티스트 정보가 저장되었습니다!");
    if (
      artistInfo.artist_name &&
      artistInfo.artist_agency &&
      artistInfo.debut_date &&
      artistInfo.fandom
    ) {
      console.log(
        "아티스트 정보 저장1111:",
        JSON.stringify(artistInfo, null, 2)
      );
      //   const artistInfo = JSON.stringify(artistInfo, null, 2);
      console.log("아티스트 정보 저장2222:", artistInfo);
      createArtist(artistInfo);
    }

    console.log("그룹 정보 저장333:", artistInfo);
  };

  return (
    <div className="artist-management-page">
      <div className="title">아티스트 정보</div>
      <div className="sub-title">아티스트 정보를 입력해주세요 🙂</div>

      <div className="group-info">
        <div className="group-photo-container">
          <label>아티스트 사진</label>
          <div className="group-photo">
            {artistInfo.photo && <img src={artistInfo.photo} alt="Group" />}
            <label className="upload-button">
              + 사진 업로드
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload(e, (img) => handleGroupChange("photo", img))
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

          {/* <div className="group-logo">
            {artistInfo.logo && <img src={artistInfo.logo} alt="Logo" />}
            <label className="upload-button">
              로고 업로드
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload(e, (img) => handleGroupChange("logo", img))
                }
                hidden
              />
            </label>
          </div> */}
          <label>데뷔날짜</label>
          <input
            type="date"
            placeholder="데뷔일"
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
      <div className="p-24"></div>
    </div>
  );
};

export default ArtistInfoSolo;
