import axios from 'axios';
import { useState } from 'react';
import useUserStore from '../../store/userStore';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

export default function useCreateArtistGroup() {
    const { user, logout } = useUserStore();
    const created_by = user.id;



    const { accessToken } = useUserStore();
    const [artistGroup, setArtistGroup] = useState(null);
    const [loading, setLoading] = useState(false);

    const createArtistGroup = async (groupInfo) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/artist-groups/`,
                { ...groupInfo, created_by },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = response.data;
            setArtistGroup(data);
            console.log("artist Group Info:", data);
            console.log("artiartistInfost:", artistGroup);

        }
        catch (error) {
            console.error("Error reading artistssssss:", error);
        } finally {
            setLoading(false);
        }
    };


    return {

        loading,
        createArtistGroup,
        artistGroup
    }
}