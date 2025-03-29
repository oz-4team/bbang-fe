import React, { useEffect } from "react";
import useArtist from "../api/artist/useArtist";
import useArtistGroups from "../api/artist/useArtistGroups";
import useReadArtistGroups from "../api/artist/useReadArtistGroups";
import ArtistInfoGroup from "../components/add-artist/ArtistInfoGroup";
import ArtistInfoSolo from "../components/add-artist/ArtistInfoSolo";
import CompletedInfo from "../components/add-artist/CompletedInfo";
import SelectArtistType from "../components/add-artist/SelectArtistType";

const ArtistManagementPage = () => {
  const { artistGroups = { artists: [], artist_groups: [] }, loading } =
    useReadArtistGroups();

  const [deleteId, setDeleteId] = React.useState(null);
  const [addedType, setAddedType] = React.useState(null);
  const [isAdded, setIsAdded] = React.useState(false);
  const { deleteArtist } = useArtist();
  const { deleteArtistGroup } = useArtistGroups();

  useEffect(() => {
    if (!loading) {
      const isAdded =
        artistGroups.artists.some((artist) => artist !== null) ||
        artistGroups.artist_groups.some((group) => group !== null);

      console.log("Is Added:", isAdded);

      if (isAdded) {
        const type = artistGroups.artists.length > 0 ? "solo" : "group";
        setAddedType(type);

        const id =
          type === "solo"
            ? artistGroups.artists[0]?.id
            : artistGroups.artist_groups[0]?.id;
        setDeleteId(id);

        console.log("addedType:", type);
        console.log("deleteId:", id);
      } else {
        console.log("아티스트가 추가되지 않았습니다.");
      }
    }
  }, [loading, artistGroups]);

  const handleDeleteArtist = async (deleteId) => {
    deleteArtist(deleteId);
    console.log("삭제하기 클릭");
    console.log("clicked 🌝deleteId:", deleteId);
  };

  const [artistType, setArtistType] = React.useState(null);
  const handleArtistTypeChange = (type) => {
    setArtistType(type);
    console.log("아티스트 타입 변경aaaa:", artistType);
  };

  useEffect(() => {
    console.log("아티스트 타입 변경:", artistType);
  }, [artistType]);

  useEffect(() => {
    console.log("isAdded 상태 변경:", isAdded);
  }, [isAdded]);

  useEffect(() => {
    if (!loading) {
      const added =
        artistGroups.artists.some((artist) => artist !== null) ||
        artistGroups.artist_groups.some((group) => group !== null);
      setIsAdded(added);
      console.log("Is Added:", added);
    }
  }, [loading, artistGroups]);

  return (
    <>
      <div className="outlet-container">
        <div className="inner p-24">
          {isAdded && (
            <>
              <CompletedInfo isAdded={isAdded} />
              <button
                onClick={async () => {
                  console.log("삭제하기 클릭");
                  console.log("clicked 🌝deleteId:", deleteId);
                  console.log("addedType:", addedType);
                  if (addedType === "solo") {
                    await deleteArtist(deleteId);
                  } else if (addedType === "group") {
                    await deleteArtistGroup(deleteId);
                  }
                  setIsAdded(false); // Trigger re-render by updating state
                }}
              >
                삭제하기
              </button>
            </>
          )}
          {!isAdded && (
            <>
              <SelectArtistType setArtistType={handleArtistTypeChange} />
              {artistType === "group" && <ArtistInfoGroup />}
              {artistType === "solo" && (
                <ArtistInfoSolo setIsAdded={setIsAdded} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ArtistManagementPage;
