import axios from 'axios';
import { useEffect, useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

const useReadArtist = () => {
    const [artist, setArtist] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        const readArtist = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/schedules/`);
                console.log("response:", response);
                console.log("response.data:", response.data);
                const data = response.data;
                setArtist(data);
                console.log("data:", data);
                console.log("artist:", artist);
            }
            catch (error) {
                console.error("Error reading artist:", error);
            } finally {
                setLoading(false);
            }
        }
        readArtist();
    }, []);

    return { artist, loading }; // ✅ 추가됨
};




export default useReadArtist;
