import axios from 'axios';
import { useState } from 'react';
import useUserStore from '../../store/userStore';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

export default function useArtistGroups() {
    const { user, logout } = useUserStore();
    const created_by = user.id;



    const { accessToken } = useUserStore();
    const [artistGroup, setArtistGroup] = useState(null);
    const [groupMembers, setGroupMembers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [artists, setArtists] = useState(null);
    const [artist, setArtist] = useState(null);

    const createArtistGroup = async (groupInfo) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/artist-groups/`,
                { ...groupInfo, created_by },
                {
                    headers: {
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







    const createArtistForGroup = async (id, artistInfo) => {
        try {
            setLoading(true);

            const response = await axios.post(`${API_BASE_URL}/artist-groups/${id}/members/create/`,
                { members: artistInfo },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = response.data;
            setGroupMembers(data);
        }
        catch (error) {
            console.error("Error reading artistssssss:", error);
        } finally {
            setLoading(false);
        }
    }


    const deleteArtistGroup = async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`${API_BASE_URL}/artist-groups/${id}/`,
                {
                    headers: {
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



    const deleteMember = async (groupid, artistid) => {
        try {
            setLoading(true);
            const response = await axios.delete(`${API_BASE_URL}/artist-groups/${groupid}/members/${artistid}/delete/`,
                {
                    headers: {
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
    const readArtists = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/artist-groups/${id}`, {
                headers: {
                },
            });

            const data = response.data;
            setArtist(data);
            setArtists(data.members);
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
        artistGroup,
        createArtistForGroup,
        deleteArtistGroup,
        deleteMember,
        readArtists,
        artists,
        artist

    }
}