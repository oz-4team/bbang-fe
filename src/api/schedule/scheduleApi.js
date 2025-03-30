import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";


/** 전체 일정 조회 */
export const fetchAllSchedules = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/schedules/`);
    return response.data;
  } catch (error) {
    console.error("❌ 전체 일정 조회 실패:", error);
    throw error;
  }
};

/** 아티스트 일정 조회 */
export const fetchArtistSchedules = async (artistId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/schedules/artist/${artistId}/`, {});
    return response.data;
  } catch (error) {
    console.error("❌ 아티스트 일정 조회 실패:", error);
    throw error;
  }
};

/** 그룹 일정 조회 */
export const fetchGroupSchedules = async (groupId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/schedules/artist-group/${groupId}/`, {});
    return response.data;
  } catch (error) {
    console.error("❌ 그룹 일정 조회 실패:", error);
    throw error;
  }
};

/** 일정 상세 정보 */
export const fetchScheduleDetail = async (scheduleId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/schedules/${scheduleId}/`, {});
    return response.data;
  } catch (error) {
    console.error("❌ 일정 상세 정보 조회 실패:", error);
    throw error;
  }
};


/** 즐겨찾기 일정 조회 */ 

export const fetchFavoriteSchedules = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/schedules/favorites/`, {});
    return response.data;
  } catch (error) {
    console.error("❌ 즐겨찾기 일정 조회 실패:", error);
    throw error;
  }
};


