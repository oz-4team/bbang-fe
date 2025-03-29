import React, { useEffect } from "react";
import useArtist from "../../api/artist/useArtist";
import useArtistGroups from "../../api/artist/useArtistGroups";
import useReadArtistGroups from "../../api/artist/useReadArtistGroups";
import ArtistInfoGroup from "../../components/add-artist/ArtistInfoGroup";
import ArtistInfoSolo from "../../components/add-artist/ArtistInfoSolo";
import SelectArtistType from "../../components/add-artist/SelectArtistType";

const SOLO = 2;
const GROUP = 1;
const INIT = 0;

const ArtistManagementPage = () => {
  const { artistGroups = { artists: [], artist_groups: [] }, loading } =
    useReadArtistGroups();
  const [isGroup, setIsGroup] = React.useState(INIT); //0 init ,1 : group, 2 : solo
  const [deleteId, setDeleteId] = React.useState(null);
  const [addedType, setAddedType] = React.useState(null);
  const [isAdded, setIsAdded] = React.useState(false);
  const { deleteArtist } = useArtist();
  const { deleteArtistGroup } = useArtistGroups();

  useEffect(() => {
    if (artistGroups?.artists?.length > 0) {
      setIsGroup(SOLO);
    } else if (artistGroups?.artist_groups?.length > 0) {
      setIsGroup(GROUP);
    } else {
      setIsGroup(INIT);
    }
  }, [artistGroups]);

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

  const renderContent = () => {
    if (INIT === isGroup) {
      return (
        <div className="artist-management-page">
          <>
            <SelectArtistType setArtistType={handleArtistTypeChange} />
            {artistType === "group" && <ArtistInfoGroup />}
            {artistType === "solo" && (
              <ArtistInfoSolo setIsAdded={setIsAdded} />
            )}
          </>
        </div>
      );
    }

    if (SOLO === isGroup) {
      return (
        <div className="artist-management-page">
          <h2>아티스트 그룹이 SOLO입니다.</h2>
          {artistGroups?.artists?.map((artist) => (
            <div key={artist.id}>
              <p>{artist.artist_name}</p>
            </div>
          ))}
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
        </div>
      );
    }

    if (GROUP === isGroup) {
      return (
        <div className="artist-management-page">
          <h2>아티스트 그룹이 GROUP입니다.</h2>
          {artistGroups?.artist_groups?.map((group) => (
            <div key={group.id}>
              <p>{group.group_name}</p>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <div className="outlet-container">
        <div className="inner p-24">{renderContent()}</div>
      </div>
    </>
  );
};

export default ArtistManagementPage;
