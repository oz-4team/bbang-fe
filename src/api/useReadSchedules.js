import axios from 'axios';
import { useEffect, useState } from 'react';
import useUserStore from '../store/userStore';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

const useReadSchedules = () => {
    const { accessToken } = useUserStore();
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        const readSchedules = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/schedules/`);
                console.log("response:", response);
                console.log("response.data:", response.data);
                const data = response.data;
                setSchedules(data);
                console.log("API Scheduel data:", data);
                console.log("API schedules:", schedules);
            }
            catch (error) {
                console.error("Error reading artist:", error);
            } finally {
                setLoading(false);
            }
        }
        readSchedules();
    }, []);

    return { schedules, loading }; // ✅ 추가됨
};




export default useReadSchedules;
