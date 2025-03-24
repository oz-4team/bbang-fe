import axios from 'axios';
import { useEffect, useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

const useReadArtist = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        const readArtists = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/artist-groups/2/`);
                console.log("response:", response);
                console.log("response.data:", response.data);
                const data = response.data;
                setArtists(data);
                console.log("data:", data);
                console.log("artistssssss:", artists);
            }
            catch (error) {
                console.error("Error reading artistssssss:", error);
            } finally {
                setLoading(false);
            }
        }
        readArtists();
    }, []);

    return { artists, loading }; // ✅ 추가됨
};




export default useReadArtist;
