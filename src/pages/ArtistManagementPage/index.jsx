import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useReadArtistGroups from "../../api/artist/useReadArtistGroups";
import ArtistPaper from "./ArtistPaper";
import GroupPaper from "./components/GroupPaper";

const ArtistManagementPage = () => {
  const { error, loading, artists, groups, readArtistGroups } =
    useReadArtistGroups();

  useEffect(() => {
    readArtistGroups();
  }, []);

  const navigate = useNavigate();

  /**
   * 아티스트나 그룹이 없을 때 /artist-add로 이동
   */
  useEffect(() => {
    // 초기화가 됐는지 확인하기
    if (!artists || !groups) return;

    if (artists.length === 0 && groups.length === 0) {
      navigate("/artist-add");
    }
  }, [artists, groups]);

  if (groups?.length > 0) return <GroupPaper group={groups[0]} />;
  if (artists?.length > 0) return <ArtistPaper artist={artists[0]} />;
};

export default ArtistManagementPage;
