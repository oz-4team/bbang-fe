import axios from 'axios';
import { useEffect, useState } from 'react';
import useUserStore from '../../store/userStore';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

const useReadSchedules = () => {

    const accessToken = localStorage.getItem("authToken");
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useUserStore();

    const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
    useEffect(() => {
        setLoading(true);
        const readSchedules = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/schedules/`, {
                    headers: {
                        ...headers,
                    },
                });

                const data = response.data;
                setSchedules(data);

            }
            catch (error) {
                console.error("Error reading artist:", error);
            } finally {
                setLoading(false);
            }
        }
        readSchedules();
    }, [accessToken, logout]);

    return { schedules, loading }; // ✅ 추가됨
};




export default useReadSchedules;
