
/** 스태프가 생성한 아티스트 및 그룹 조회 */
export const staffAllSchedules = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/staff/artist-and-groups/`);
      return response.data;
    } catch (error) {
      console.error("❌ 직원 일정 조회 실패:", error);
      throw error;
    }
  };

  // 아티스트 일정 생성(관리자)
export const createArtistSchedule = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/schedules/artist/manage/`, data, {});
      return response.data;
    } catch (error) {
      console.error("❌ 아티스트 일정 생성 실패:", error);
      throw error;
    }
  };
  
  // 아티스트 일정 수정(관리자)
  export const updateArtistSchedule = async (scheduleId, data) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/schedules/artist/manage/${scheduleId}/`, data, {});
      return response.data;
    } catch (error) {
      console.error("❌ 아티스트 일정 수정 실패:", error);
      throw error;
    }
  };
  
  // 아티스트 일정 삭제(관리자)
  export const deleteArtistSchedule = async (scheduleId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/schedules/artist/manage/${scheduleId}/`, {});
      return response.data;
    } catch (error) {
      console.error("❌ 아티스트 일정 삭제 실패:", error);
      throw error;
    }
  };
  
  // 그룹 일정 생성(관리자)
  export const createGroupSchedule = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/schedules/artist-group/manage/`, data, {});
      return response.data;
    } catch (error) {
      console.error("❌ 그룹 일정 생성 실패:", error);
      throw error;
    }
  };
  
  // 그룹 일정 수정(관리자)
  export const updateGroupSchedule = async (scheduleId, data) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/schedules/artist-group/manage/${scheduleId}/`, data, {});
      return response.data;
    } catch (error) {
      console.error("❌ 그룹 일정 수정 실패:", error);
      throw error;
    }
  };
  
  // 그룹 일정 삭제(관리자)
  export const deleteGroupSchedule = async (scheduleId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/schedules/artist-group/manage/${scheduleId}/`, {});
      return response.data;
    } catch (error) {
      console.error("❌ 그룹 일정 삭제 실패:", error);
      throw error;
    }
  };
  