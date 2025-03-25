import axios from 'axios';
import { useState } from 'react';
import useUserStore from '../../store/userStore';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";

const useReadScheduleApi = () => {
    const { accessToken } = useUserStore();
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);



    const readSchedule = async ({ id }) => {
        try {
            // const scheduleId = typeof id === 'object' ? JSON.stringify(id) : id;
            const response = await axios.get(`${API_BASE_URL}/schedules/${id}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const data = response.data;
            setSchedule(data);

        }
        catch (error) {
            console.error("Error reading schedule:", error);

        } finally {
            setLoading(false);
        }
    }


    return { schedule, loading, readSchedule }; // ✅ 추가됨
};




export default useReadScheduleApi;
