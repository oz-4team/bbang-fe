import React from "react";
import ArtistInfoGroup from "./ArtistInfoGroup";
import ArtistInfoSolo from "./ArtistInfoSolo";
import SelectArtistType from "./SelectArtistType";

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
