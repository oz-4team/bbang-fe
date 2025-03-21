import axios from "axios";
import { saveToken, removeToken } from "../utils/authUtils";
import useUserStore from "../store/userStore";

// 백엔드 API URL 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";
const USE_BACKEND = false; // 백엔드 활성화 여부 (false면 목업 데이터 사용)

// [1] 로그인 (백엔드 API or 목업 데이터)
export const loginUser = async (email, password) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/login/`, { email, password });

            if (response.data.access && response.data.refresh) {
                saveToken(response.data.access, response.data.refresh);
                if (response.data.user) {
                    useUserStore.getState().login(response.data.user, response.data.access, response.data.refresh);
                }
                return {
                    user: response.data.user,
                    access: response.data.access,
                    refresh: response.data.refresh,
                  };
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "로그인 실패");
        }
    }

    // ✅ 목업 데이터 - 변경된 비밀번호 반영 (localStorage에서 가져오기)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const storedPassword = localStorage.getItem(`mock_password_${email}`) || "qwer1234"; // 저장된 비밀번호 가져오기

            if (email === "test@naver.com" && password === storedPassword) {
                const mockUser = {
                    id: 1,
                    name: "테스트 사용자",
                    email,
                    isAdmin: false,
                };

                useUserStore.getState().login(mockUser, "mock_access_token_user", "mock_refresh_token_user");

                resolve({
                    access: "mock_access_token_user",
                    refresh: "mock_refresh_token_user",
                    user: mockUser,
                });

            } else if (email === "admin@naver.com" && password === storedPassword) {
                const mockAdmin = {
                    id: 99,
                    name: "관리자",
                    email,
                    isAdmin: true,
                };

                useUserStore.getState().login(mockAdmin, "mock_access_token_admin", "mock_refresh_token_admin");

                resolve({
                    access: "mock_access_token_admin",
                    refresh: "mock_refresh_token_admin",
                    user: mockAdmin,
                });

            } else {
                reject(new Error("이메일 또는 비밀번호가 올바르지 않습니다."));
            }
        }, 1000);
    });
};

// [2] 로그아웃
export const logoutUser = async () => {
    if (USE_BACKEND) {
        try {
            await axios.post(`${API_BASE_URL}/logout/`);
            useUserStore.getState().logout();
        } catch (error) {
            throw new Error(error.response?.data?.message || "로그아웃 실패");
        }
    }
    useUserStore.getState().logout();
};

// [3] 회원가입 (백엔드 API or 목업 데이터)
export const signupUser = async (userData) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/register/`, userData, {
                headers: { "Content-Type": "application/json" },
            });

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "회원가입 실패");
        }
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                message: "회원가입 성공! 이메일 인증 후 로그인하세요.",
                user: {
                    id: Math.floor(Math.random() * 1000),
                    email: userData.email,
                    nickname: userData.nickname,
                    gender: userData.gender,
                    birthYear: userData.birthYear,
                    is_active: true,
                },
            });
        }, 1000);
    });
};
// [4] 비밀번호 찾기 (백엔드 API or 목업 데이터)
export const sendPasswordResetEmail = async (email) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/password-reset/request/`, { email });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "비밀번호 재설정 요청 실패");
        }
    }

    // 목업 데이터 - 콘솔창에 재설정 링크 출력
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockToken = `mock_reset_token_${email}`;
            const resetLink = `http://localhost:5173/reset-password?token=${mockToken}`;
            
            console.log("테스트용 비밀번호 재설정 링크:", resetLink);
            
            resolve({
                message: "비밀번호 재설정 이메일이 전송되었습니다. (목업 환경)",
                token: mockToken,
                resetLink: resetLink, // UI에서 표시할 수 있도록 반환
            });
        }, 1000);
    });
};

// [5] 비밀번호 재설정
export const resetPassword = async (token, newPassword) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/password-reset/reset/`, { token, newPassword });

            removeToken();
            useUserStore.getState().logout();

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "비밀번호 변경 실패");
        }
    }

    // ✅ 목업 데이터 - 기존 저장된 이메일의 비밀번호를 새로운 값으로 변경
    return new Promise((resolve) => {
        setTimeout(() => {
            const email = token.replace("mock_reset_token_", ""); // 토큰에서 이메일 추출

            console.log(`🔹 기존 비밀번호 업데이트 (이메일: ${email})`);
            localStorage.setItem(`mock_password_${email}`, newPassword); // 새로운 비밀번호 저장

            console.log(`✅ 목업 환경에서 비밀번호 변경 완료! (새 비밀번호: ${newPassword})`);
            resolve({ message: "비밀번호가 성공적으로 변경되었습니다." });
        }, 1000);
    });
};

// [6] 프로필 조회
export const fetchUserProfile = async () => {
    if (USE_BACKEND) {
        try {
            const response = await axios.get(`${API_BASE_URL}/profile/`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "프로필 정보 가져오기 실패");
        }
    }
    return null;
};

// [7] 프로필 수정
export const updateUserProfile = async (userData) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.patch(`${API_BASE_URL}/profile/`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "프로필 업데이트 실패");
        }
    }
    return null;
};

// [8] 프로필 삭제
export const deleteUserProfile = async () => {
    if (USE_BACKEND) {
        try {
            await axios.delete(`${API_BASE_URL}/profile/`);
            useUserStore.getState().logout();
        } catch (error) {
            throw new Error(error.response?.data?.message || "프로필 삭제 실패");
        }
    }
};