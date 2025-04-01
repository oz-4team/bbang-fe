import axios from 'axios';
import { useEffect, useState } from 'react';
import useUserStore from "../../store/userStore";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://3.35.108.208:8000";

const useReadArtists = () => {
    const { accessToken } = useUserStore();
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        const readArtists = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/artists/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                const data = response.data;
                setArtists(data);
            }
            catch (error) {
                console.error("Error reading artist:", error);
            } finally {
                setLoading(false);
            }
        }
        readArtists();
    }, []);

    return { artists, loading }; // ✅ 추가됨
};




export default useReadArtists;
