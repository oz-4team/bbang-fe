import axios from 'axios';
import { useState } from 'react';
import useUserStore from '../../store/userStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

export default function useArtist() {
  const { user, logout, accessToken } = useUserStore();
  const created_by = user.id;

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(false);

  const createArtistSolo = async (artistInfo) => {
    try {
      setLoading(true);
  
      const payload = {
        ...artistInfo,
        artist_fandom: artistInfo.fandom, // ✅ 이름 변경
        created_by,
      };
      delete payload.fandom; // ❌ 더 이상 필요 없는 필드 제거
  
      const response = await axios.post(
        `${API_BASE_URL}/artists/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = response.data;
      setArtist(data);
      console.log("artistInfo:", data);
    } catch (error) {
      console.error("Error creating solo artist:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const createArtistForGroup = async (artistInfo) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/artists/`,
        { ...artistInfo, created_by },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = response.data;
      setArtist(data);
      console.log("group artistInfo:", data);
    } catch (error) {
      console.error("Error creating group artist:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteArtist = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${API_BASE_URL}/artists/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = response.data;
      console.log("Deleted artist:", data);
    } catch (error) {
      console.error("Error deleting artist:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateArtist = async (id, updatedData) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${API_BASE_URL}/artists/${id}/`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = response.data;
      console.log("Updated artist:", data);
      return data;
    } catch (error) {
      console.error("Error updating artist:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    artist,
    loading,
    createArtistSolo,
    createArtistForGroup,
    deleteArtist,
    updateArtist,
  };
}
