import axios from 'axios';
import { useState } from 'react';
import useUserStore from '../../store/userStore';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

export default function useArtist() {
    const { user, logout } = useUserStore();
    const created_by = user.id;



    const { accessToken } = useUserStore();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(false);



    const createArtistSolo = async (artistInfo) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/artists/`,
                { ...artistInfo, created_by },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = response.data;
            setArtist(data);
            console.log("artistInfo:", data);
            console.log("artiartistInfost:", artist);

        }
        catch (error) {
            console.error("Error reading artistssssss:", error);
        } finally {
            setLoading(false);
        }
    };



    const createArtistForGroup = async (artistInfo) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/artists/`,
                { ...artistInfo, created_by },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = response.data;
            setArtist(data);
            console.log("artistInfo:", data);
            console.log("artiartistInfost:", artist);

        }
        catch (error) {
            console.error("Error reading artistssssss:", error);
        } finally {
            setLoading(false);
        }
    }

    const deleteArtist = async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`${API_BASE_URL}/artists/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = response.data;
            console.log("delete artist:", data);

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
        createArtistSolo,
        createArtistForGroup,
        deleteArtist,

    }
}