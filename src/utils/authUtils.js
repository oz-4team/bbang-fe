import axios from "axios";

// ✅ [1] 토큰 저장
export const saveToken = (token) => {
    localStorage.setItem("authToken", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // ✅ 자동 헤더 설정
};

// ✅ [2] 저장된 토큰 가져오기
export const getToken = () => {
    return localStorage.getItem("authToken");
};

// ✅ [3] 토큰 삭제 (로그아웃 시 사용)
export const removeToken = () => {
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common["Authorization"];
};