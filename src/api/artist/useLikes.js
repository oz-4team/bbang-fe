import axios from 'axios';
import { useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const useLikes = () => {
    const accessToken = localStorage.getItem("authToken");
    const [loading, setLoading] = useState(true);
    const [like, setLike] = useState([]);
    const [likes, setLikes] = useState([]);


    //사용자가 좋아요한 아티스트 목록 조회
    const readAllLikes = async () => {
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
            setLikes(data);
            console.log("data:", data);
            console.log("likes:", likes);

        }
        catch (error) {
            console.error("Error reading readLike:", error);
            // console.log("accessToken:", accessToken);

        } finally {
            setLoading(false);
        }
    }



    // 아티스트 솔로 좋아요 누르기
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
    // 아티스트 그룹 좋아요 누르기
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

    // 아티스트 솔로 좋아요 취소
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

    // 아티스트 그룹 좋아요 취소
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







    return { loading, addLikeArtist, addLikeArtistGroup, readAllLikes, like, deleteLikeArtistGroup, deleteLikeArtist, likes }; // ✅ 추가됨

};




export default useLikes;
