import React from "react";
import useReadArtistGroups from "../../api/artist/useReadArtistGroups";
import "../../styles/ArtistManagementPage.css";

const CompletedInfo = ({ isAdded }) => {
  const { artistGroups = { artists: [], artist_groups: [] }, loading } =
    useReadArtistGroups();

  const [artist, setArtist] = React.useState(artistGroups?.artists);
  const [group, setGroup] = React.useState(artistGroups?.artist_groups);

  console.log("artistGroups:", artistGroups);
  console.log("artist:", artist);
  React.useEffect(() => {
    setArtist(artistGroups?.artists);
    setGroup(artistGroups?.artist_groups);
  }, [artistGroups, isAdded]);

  console.log("group:", group);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="artist-management-page">
      <h2>First Artist Group Information</h2>
      <pre>{JSON.stringify(artistGroups?.artist_groups, null, 2)}</pre>
      <h2>First Artist Information</h2>
      <pre>{JSON.stringify(artistGroups?.artists, null, 2)}</pre>
    </div>
  );
};

export default CompletedInfo;
