import axios from 'axios';
import { useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const useLikes = () => {
    const accessToken = localStorage.getItem("authToken");
    const [loading, setLoading] = useState(true);
    const [like, setLike] = useState([]);



    const readLike = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${API_BASE_URL}/Alllike/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

            const data = response.data;
            setLike(data);
            console.log("data:", data);
            console.log("like:", like);

        }
        catch (error) {
            console.error("Error reading readLike:", error);
            // console.log("accessToken:", accessToken);

        } finally {
            setLoading(false);
        }
    }




    const addLikeArtist = async (id) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/like/`,
                { "artist_id": id },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

            const data = response.data;
            setLike(data);
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

    const addLikeArtistGroup = async (id) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/like/`,
                { "artist_group_id": id },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

            const data = response.data;
            setLike(data);
        }
        catch (error) {
            console.error("Error reading schedule:", error);

        } finally {
            setLoading(false);
        }
    }

    const deleteLikeArtist = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/like/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    data: { "artist_id": id }
                })
            const data = response.data;
            setLike(data);



        }
        catch (error) {
            console.error("Error reading schedule:", error);

        } finally {
            setLoading(false);
        }
    }

    const deleteLikeArtistGroup = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/like/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    data: { "artist_group_id": id }
                })

            const data = response.data;
            setLike(data);

        }
        catch (error) {
            console.error("Error reading schedule:", error);

        } finally {
            setLoading(false);
        }
    }







    return { loading, addLikeArtist, addLikeArtistGroup, readLike, like, deleteLikeArtistGroup, deleteLikeArtist }; // ✅ 추가됨

};




export default useLikes;
