import React from "react";
import ArtistInfoGroup from "./ArtistInfoGroup";
import ArtistInfoSolo from "./ArtistInfoSolo";
import SelectArtistType from "./SelectArtistType";

const ArtistAddPage = () => {
  const [artistType, setArtistType] = React.useState(null);
  const handleArtistTypeChange = (type) => {
    setArtistType(type);
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
