import axios from 'axios';
import { useState } from 'react';
import useUserStore from '../../store/userStore';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

const useReadArtistGroups = () => {

    const { accessToken } = useUserStore();

    const [initiated, setInitiated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); ``

    const [artists, setArtists] = useState([]);
    const [groups, setGroups] = useState([]);

    /** 관리자가 등록한 아티스트 그룹 조회 */
    const readArtistGroups = async () => {
        setLoading(true);
        setError(null);
        setArtists([]);
        setGroups([]);

        if (!accessToken) {
            console.error("Access token is not available.");
            setLoading(false);
            return;
        }

        try {
            const url = `${API_BASE_URL}/staff/artist-and-groups/`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data;
            const artists = data.artists;
            const groups = data.artist_groups;
            setArtists(artists);
            setGroups(groups);
            setInitiated(true);
        }
        catch (error) {
            setError(error);
            console.error("Error reading artistssssss:", error);
        } finally {
            setLoading(false);
        }
    }

    return { error, loading, initiated, artists, groups, readArtistGroups };
};




export default useReadArtistGroups;
