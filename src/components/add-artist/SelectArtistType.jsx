import React from "react";
import { FaCheck } from "react-icons/fa6";
import { TbUser, TbUsersGroup } from "react-icons/tb";
import styled from "styled-components";

const ArtistTypeButton = styled.button`
  width: 100%;
  min-height: 100px;
  font-size: 24px;
  font-weight: bold;
  border: 1px solid #d4d4d4;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  color: #222222;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  &:not(:hover) {
    transform: scale(1);
  }

  p {
    font-size: 16px;
    font-weight: normal;
  }
  .logo-container {
    font-size: 4rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
`;

const CheckIconContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const TitleType = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
`;

const TypeSelectArea = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const SelectArtistType = ({ setArtistType }) => {
  const [selectedType, setSelectedType] = React.useState(null);

  React.useEffect(() => {
    setArtistType(selectedType);
  }, [selectedType]);

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  return (
    <div>
      <TitleType>솔로인가요? 그룹인가요?</TitleType>
      <TypeSelectArea>
        <ArtistTypeButton
          onClick={() => handleSelect("solo")}
          style={{
            borderColor: selectedType === "solo" ? "#6200ea" : "#dbdbdb",
            color: selectedType === "solo" ? "#6200ea" : "#222222",
          }}
        >
          <CheckIconContainer
            style={{ display: selectedType === "solo" ? "block" : "none" }}
          >
            <FaCheck />
          </CheckIconContainer>
          <div className="logo-container">
            <TbUser />
          </div>
          <h3>솔로</h3>
          <p>멤버가 한 명일 때</p>
        </ArtistTypeButton>
        <ArtistTypeButton
          onClick={() => handleSelect("group")}
          style={{
            borderColor: selectedType === "group" ? "#6200ea" : "#dbdbdb",
            color: selectedType === "group" ? "#6200ea" : "#222222",
          }}
        >
          <CheckIconContainer
            style={{ display: selectedType === "group" ? "block" : "none" }}
          >
            <FaCheck />
          </CheckIconContainer>
          <div className="logo-container">
            <TbUsersGroup />
          </div>
          <h3>그룹</h3>
          <p>멤버가 두 명 이상 일 때</p>
        </ArtistTypeButton>
      </TypeSelectArea>
    </div>
  );
};

export default SelectArtistType;
