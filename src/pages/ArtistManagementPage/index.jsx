import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useReadArtistGroups from "../../api/artist/useReadArtistGroups";

const ArtistManagementPage = () => {
  const { error, loading, initiated, artists, groups, readArtistGroups } =
    useReadArtistGroups();

  useEffect(() => {
    readArtistGroups();
  }, []);

  const navigate = useNavigate();

  /**
   * 아티스트나 그룹이 없을 때 /artist-add로 이동
   */
  useEffect(() => {
    if (!initiated) return;
    if (artists.length === 0 && groups.length === 0) {
      navigate("/artist-add");
    }
  }, [initiated, artists, groups]);

  return <>hello</>;
};

export default ArtistManagementPage;
