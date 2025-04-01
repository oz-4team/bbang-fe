import axios from 'axios';
import { useState } from 'react';
import useUserStore from '../../store/userStore';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

export default function useCreateArist() {
    const { user, logout } = useUserStore();
    const created_by = user.id;



    const { accessToken } = useUserStore();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(false);

    const createArtist = async (artistInfo) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/artists/`,
                { ...artistInfo, created_by },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = response.data;
            setArtist(data);
        }
        catch (error) {
            console.error("Error reading artistssssss:", error);
        } finally {
            setLoading(false);
        }
    };


    return {
        artist,
        loading,
        createArtist
    }
}