import axios from 'axios';
import { useState } from 'react';
import useUserStore from '../../store/userStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

export default function useReadArtistApi() {

    const { accessToken } = useUserStore();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(false);

    const readArtist = async ({ id }) => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/artists/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

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
        readArtist
    }
}