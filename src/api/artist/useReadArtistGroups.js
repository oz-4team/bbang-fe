import axios from 'axios';
import { useEffect, useState } from 'react';
import useUserStore from '../../store/userStore';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

const useReadArtistGroups = () => {

    const { accessToken } = useUserStore();
    const [artistGroups, setArtistGroups] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        const readArtistGroups = async () => {
            try {
                // 관리자가 등록한 아티스트 그룹 조회
                const response = await axios.get(`${API_BASE_URL}/staff/artist-and-groups/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log("response:", response);
                console.log("response.data:", response.data);
                const data = response.data;
                setArtistGroups(data);
            }
            catch (error) {
                console.error("Error reading artistssssss:", error);
            } finally {
                setLoading(false);
            }
        }
        readArtistGroups();
    }, []);

    return { artistGroups, loading }; // ✅ 추가됨
};




export default useReadArtistGroups;
