import axios from 'axios';
import { useEffect, useState } from 'react';

const useReadArtist = () => {
    const [artist, setArtist] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        const readArtist = async () => {
            try {
                const response = await axios.get(`http://seonhm.kr/artists/`);
                console.log("response:", response);
                console.log("response.data:", response.data);
                const data = response.data;
                setArtist(data);
                console.log("data:", data);
                console.log("artist:", artist);
            }
            catch (error) {
                console.error("Error reading artist:", error);
            } finally {
                setLoading(false);
            }
        }
        readArtist();
    }, []);

    return { artist, loading }; // ✅ 추가됨
};




export default useReadArtist;
