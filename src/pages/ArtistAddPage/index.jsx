import React from "react";
import ArtistInfoGroup from "../../components/add-artist/ArtistInfoGroup";
import ArtistInfoSolo from "../../components/add-artist/ArtistInfoSolo";
import SelectArtistType from "../../components/add-artist/SelectArtistType";

const ArtistAddPage = () => {
  const [artistType, setArtistType] = React.useState(null);
  const handleArtistTypeChange = (type) => {
    setArtistType(type);
    console.log("아티스트 타입 변경aaaa:", artistType);
  };

  return (
    <div className="outlet-container">
      <div className="inner p-24">
        <SelectArtistType setArtistType={handleArtistTypeChange} />
        {artistType === "group" && <ArtistInfoGroup />}
        {artistType === "solo" && <ArtistInfoSolo />}
      </div>
    </div>
  );
};

export default ArtistAddPage;
