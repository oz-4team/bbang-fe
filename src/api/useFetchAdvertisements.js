import axios from 'axios';
import { useState, useEffect } from 'react';

// 환경 변수에서 API 기본 URL 가져오거나 기본값 사용
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000/";

export default function useFetchAdvertisements() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdvertisements = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE_URL}/advertisement/list/`);
      setAds(response.data);

    } catch (err) {
      console.error("Error fetching advertisements:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  return {
    ads,
    loading,
    error,
    fetchAdvertisements,
  };
}
