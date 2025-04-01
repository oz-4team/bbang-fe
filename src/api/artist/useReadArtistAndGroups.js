import axios from 'axios';
import { useEffect, useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

const useReadArtistAndGroups = () => {
    const [artistAndGroups, setArtistAndGroups] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        const readAartistAndGroups = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/artists-and-groups/`);
                const data = response.data;
                setArtistAndGroups(data);
            }
            catch (error) {
                console.error("Error reading artistAndGroups:", error);
            } finally {
                setLoading(false);
            }
        }
        readAartistAndGroups();
    }, []);

    return { artistAndGroups, loading };
};




export default useReadArtistAndGroups;
