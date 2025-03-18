import axios from "axios";
import { saveToken, removeToken } from "../utils/authUtils";
import useUserStore from "../store/userStore"

// 🔥 환경 변수에서 백엔드 API URL 가져오기
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://your-backend.com/api"; 
const USE_BACKEND = false; // ✅ 백엔드 활성화 여부

// ✅ [1] 로그인 (백엔드 API or 목업 데이터)
export const loginUser = async (email, password) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

            if (response.data.token) {
                saveToken(response.data.token);
                useUserStore.getState().login(response.data.user);
            }

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "로그인 실패");
        }
    }

    // ✅ 목업 데이터 (테스트용)
    const storedPassword = localStorage.getItem(`mock_password_${email}`) || "qwer1234";

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "test@naver.com" && password === storedPassword) {
                resolve({
                    token: "mock_token_user",
                    user: { id: 1, name: "테스트 사용자", email, isAdmin: false },
                });
            } else if (email === "admin@naver.com" && password === storedPassword) {
                resolve({
                    token: "mock_token_admin",
                    user: { id: 99, name: "관리자", email, isAdmin: true },
                });
            } else {
                reject(new Error("이메일 또는 비밀번호가 올바르지 않습니다."));
            }
        }, 1000);
    });
};

// ✅ [2] 회원가입 (백엔드 API or 목업 데이터)
export const signupUser = async (userData) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);

            if (response.data.token) {
                saveToken(response.data.token);
                useUserStore.getState().login(response.data.user);
            }

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "회원가입 실패");
        }
    }

    // ✅ 목업 데이터 (테스트용)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                message: "회원가입 성공! 로그인하세요.",
                user: { id: Math.floor(Math.random() * 1000), ...userData },
            });
        }, 1000);
    });
};

// ✅ [3] 비밀번호 찾기 (백엔드 API or 목업 데이터)
export const sendPasswordResetEmail = async (email) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "비밀번호 재설정 요청 실패");
        }
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            const mockToken = `mock_reset_token_${email}`;
            console.log(`🔹 테스트용 인증 링크: http://localhost:5173/reset-password?token=${mockToken}`);
            resolve({ message: "비밀번호 재설정 이메일이 전송되었습니다.", token: mockToken });
        }, 1000);
    });
};

// ✅ [4] 비밀번호 재설정 (백엔드 API or 목업 데이터)
export const resetPassword = async (token, newPassword) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, { token, newPassword });

            removeToken();
            useUserStore.getState().logout();

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "비밀번호 변경 실패");
        }
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            const email = token.replace("mock_reset_token_", "");
            localStorage.setItem(`mock_password_${email}`, newPassword);
            resolve({ message: "비밀번호가 성공적으로 변경되었습니다." });
        }, 1000);
    });
};