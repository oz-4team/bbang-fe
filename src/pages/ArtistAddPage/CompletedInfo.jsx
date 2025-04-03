import React, { useEffect } from "react";
import useReadArtistGroups from "../../api/artist/useReadArtistGroups";
import "../../styles/ArtistManagementPage.css";

const SOLO = 2;
const GROUP = 1;
const INIT = 0;

// const ArtistPaper = ({ artist }) => {})

const CompletedInfo = ({ isAdded }) => {
  const { artistGroups = { artists: [], artist_groups: [] }, loading } =
    useReadArtistGroups();

  const [isGroup, setIsGroup] = React.useState(INIT); //0 init ,1 : group, 2 : solo

  useEffect(() => {
    if (artistGroups?.artists?.length > 0) {
      setIsGroup(SOLO);
    } else if (artistGroups?.artist_groups?.length > 0) {
      setIsGroup(GROUP);
    } else {
      setIsGroup(INIT);
    }
  }, [artistGroups]);

  if (loading) {
    return (
      <div className="artist-management-page">
        <h2>아티스트 정보를 불러오고 있어요 ⭐️</h2>
      </div>
    );
  }

  if (INIT === isGroup) {
    return (
      <div className="artist-management-page">
        <h2>아티스트 그룹이 없습니다.</h2>
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

  // const [artist, setArtist] = React.useState(artistGroups?.artists);
  // const [group, setGroup] = React.useState(artistGroups?.artist_groups);

  // console.log("artistGroups:", artistGroups);
  // console.log("artist:", artist);
  // React.useEffect(() => {
  //   setArtist(artistGroups?.artists);
  //   setGroup(artistGroups?.artist_groups);
  // }, [artistGroups, isAdded]);

  // console.log("group:", group);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // return (
  //   <div className="artist-management-page">
  //     <h2>First Artist Group Information</h2>
  //     <pre>{JSON.stringify(artistGroups?.artist_groups?., null, 2)}</pre>
  //     <h2>First Artist Information</h2>
  //     <pre>{JSON.stringify(artistGroups?.artists, null, 2)}</pre>

  //     <p>{artist_name}</p>
  //     <p>{artist_name}</p>
  //     <p>{artist_name}</p>
  //     <p>{artist_name}</p>
  //     <p>{artist_name}</p>
  //   </div>
  // );
};

export default CompletedInfo;
