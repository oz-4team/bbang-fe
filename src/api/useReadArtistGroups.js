import axios from 'axios';
import { useEffect, useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

const useReadArtistGroups = () => {
    const [artistGroups, setArtistGroups] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        const readArtistGroups = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/artists-and-groups/`);
                console.log("response:", response);
                console.log("response.data:", response.data);
                const data = response.data;
                setArtistGroups(data);
                console.log("data:", data);
                console.log("artistssssss:", artists);
            }
            catch (error) {
                console.error("Error reading artistssssss:", error);
            } finally {
                setLoading(false);
            }
        }
        readArtistGroups();
    }, []);

    return { artistGroups, loading }; // ✅ 추가됨
};




export default useReadArtistGroups;
