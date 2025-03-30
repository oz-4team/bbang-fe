import axios from 'axios';
import { useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const useFavorites = () => {
    const accessToken = localStorage.getItem("accessToken");

    const [favorite, setFavorite] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favoriteIds, setFavoriteIds] = useState();



    const addFavorite = async (id) => {
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
            console.log("add favorite!!!!");
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

    const deleteFavorite = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/favorite/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    schedule_id: id,
                },
            });

            const data = response.data;
            setFavorite(data);
            console.log("✅ 즐겨찾기 삭제 성공:", data);
        } catch (error) {
            console.error("❌ 즐겨찾기 삭제 실패:", error);
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
            console.log("AlllikeAlllikeAlllikeAlllike:", data);
            console.log("favouserfavoriteuserfavoriteuserfavoriteuserfavoriterite:", favoriteIds);

        }
        catch (error) {
            console.error("Error reading schedule:", error);

        } finally {
            setLoading(false);
        }
    }



    return { favorite, loading, addFavorite, readFavorite, deleteFavorite };

};

export default useFavorites;
