import React from "react";
import ArtistInfoGroup from "../components/add-artist/ArtistInfoGroup";
import SelectArtistType from "../components/add-artist/SelectArtistType";

const ArtistManagementPage = () => {
  return (
    <>
      <div className="outlet-container">
        <div className="p-24">
          <SelectArtistType />
          <ArtistInfoGroup />
        </div>
      </div>
    </>
  );
};

export default ArtistManagementPage;
