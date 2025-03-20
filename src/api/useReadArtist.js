import axios from 'axios';
import { useEffect, useState } from 'react';

const useReadArtist = () => {
    const [artist, setArtist] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        const readArtist = async () => {
            try {
                const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key=a0edf990bd69f812e893d43caa06b542&format=json`);
                console.log("response:", response);
                console.log("response.data:", response.data);
                const data = response.data.topalbums.album;
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
