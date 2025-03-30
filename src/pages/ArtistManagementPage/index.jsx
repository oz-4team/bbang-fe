import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useReadArtistGroups from "../../api/artist/useReadArtistGroups";
import useArtistManagementStore from "../admin/useArtistManagementStore";
import ArtistPaper from "./ArtistPaper";
import GroupPaper from "./components/GroupPaper";

const ArtistManagementPage = () => {
  const { error, loading, artists, groups, readArtistGroups } =
    useReadArtistGroups();
  const { artist, group, setArtist, setGroup, refresh, setRefresh } =
    useArtistManagementStore();
  useEffect(() => {
    readArtistGroups();
  }, [refresh]);

  useEffect(() => {
    if (refresh) {
      readArtistGroups().finally(() => {
        setRefresh(false);
      });
    }
  }, [refresh]);

  useEffect(() => {
    if (artists && artists.length > 0) {
      setArtist(artists[0]);
    }
  }, [artists]);

  useEffect(() => {
    if (groups && groups.length > 0) {
      setGroup(groups[0]);
    }
  }, [groups]);

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

  if (group) return <GroupPaper group={group} />;
  if (artist) return <ArtistPaper artist={artist} />;
};

export default ArtistManagementPage;
