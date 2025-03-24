import axios from 'axios';
import { useEffect, useState } from 'react';
import useUserStore from "../store/userStore";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

const useReadArtists = () => {
    const { accessToken } = useUserStore();
    console.log("🔑 artists token:", accessToken);
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
                console.log("response:", response);
                // console.log("response:", token);
                console.log("response.data:", response.data);
                const data = response.data;
                setArtists(data);
                console.log("data:", data);
                console.log("aaaaaartist:", artist);
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
