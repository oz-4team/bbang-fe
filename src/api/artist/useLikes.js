import axios from 'axios';
import { useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const useLikes = () => {
    const accessToken = localStorage.getItem("authToken");

    const [favorite, setFavorite] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [favoriteIds, setFavoriteIds] = useState();



    const addLike = async ({ id }) => {
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

    const deleteLike = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/favorite/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    data: { schedule_id: id }
                })

            const data = response.data;
            setFavorite(data)
            console.log("delete datadelete datadelete data:", data);
            // setFavorite(data);


        }
        catch (error) {
            console.error("Error reading schedule:", error);

        } finally {
            setLoading(false);
        }
    }


    // const readFavorite = async () => {
    //     try {
    //         const response = await axios.get(`${API_BASE_URL}/Allfavorite/`, {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //         });

    //         const data = response.data;
    //         setFavoriteIds(data);
    //         console.log("AlllikeAlllikeAlllikeAlllike:", data);
    //         console.log("favouserfavoriteuserfavoriteuserfavoriteuserfavoriterite:", favoriteIds);

    //     }
    //     catch (error) {
    //         console.error("Error reading schedule:", error);

    //     } finally {
    //         setLoading(false);
    //     }
    // }



    return { favorite, loading, addLike, deleteLike };

};




export default useLikes;
