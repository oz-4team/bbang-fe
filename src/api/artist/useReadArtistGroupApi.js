import axios from 'axios';
import { useState } from 'react';
import useUserStore from '../../store/userStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

export default function useReadArtistGroupApi() {

    const { accessToken } = useUserStore();
    const [artistGroups, setArtistGroups] = useState(null);
    const [loading, setLoading] = useState(false);

    const readArtistGroup = async ({ id }) => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/artist-groups/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const data = response.data;
            setArtistGroups(data);


        }
        catch (error) {
            console.error("Error reading artistssssss:", error);
        } finally {
            setLoading(false);
        }
    };


    return {

        loading,
        readArtistGroup,
        artistGroups
    }
}