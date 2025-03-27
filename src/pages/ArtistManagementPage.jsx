import React, { useEffect } from "react";
import useReadArtistGroups from "../api/artist/useReadArtistGroups";
import ArtistInfoGroup from "../components/add-artist/ArtistInfoGroup";
import ArtistInfoSolo from "../components/add-artist/ArtistInfoSolo";
import SelectArtistType from "../components/add-artist/SelectArtistType";

const ArtistManagementPage = () => {
  const { artistGroups } = useReadArtistGroups();
  console.log("artistGroups:", artistGroups);
  const [artistType, setArtistType] = React.useState(null);
  const handleArtistTypeChange = (type) => {
    setArtistType(type);
    console.log("아티스트 타입 변경aaaa:", artistType);
  };
  useEffect(() => {
    console.log("아티스트 타입 변경:", artistType);
  }, [artistType]);

  return (
    <>
      <div className="outlet-container">
        <div className="inner p-24">
          <SelectArtistType setArtistType={handleArtistTypeChange} />
          {artistType === "group" && (
            <ArtistInfoGroup artistType={artistType} />
          )}
          {artistType === "solo" && <ArtistInfoSolo artistType={artistType} />}
        </div>
      </div>
    </>
  );
};

export default ArtistManagementPage;
