import axios from 'axios';
import { useState } from 'react';
import useUserStore from '../../store/userStore';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

const useFavorites = () => {
    const { accessToken } = useUserStore();
    const [favorite, setFavorite] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favoriteIds, setFavoriteIds] = useState();



    const addFavorite = async ({ id }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/favorite/`,
                { schedule_id: id },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

            const data = response.data;
            setFavorite(data);
            console.log("data:", data);
            console.log("favorite:", favorite);

        }
        catch (error) {
            console.error("Error reading schedule:", error);
            console.log("accessToken:", accessToken);

        } finally {
            setLoading(false);
        }
    }



    const readFavorite = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/Allfavorite/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const data = response.data;
            setFavoriteIds(data);
            console.log("favouserfavoriteuserfavoriteuserfavoriteuserfavoriterite:", data);
            console.log("favouserfavoriteuserfavoriteuserfavoriteuserfavoriterite:", favoriteIds);

        }
        catch (error) {
            console.error("Error reading schedule:", error);

        } finally {
            setLoading(false);
        }
    }


    return { favorite, loading, addFavorite, readFavorite };

};




export default useFavorites;
