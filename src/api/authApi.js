import axios from "axios";
import { saveToken, removeToken } from "../utils/authUtils";
import useUserStore from "../store/userStore";

// 환경 변수에서 백엔드 API URL 가져오기
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000"; 
const USE_BACKEND = true; // 백엔드 활성화 여부 (false면 목업 데이터 사용)

// [1] 로그인 (백엔드 API or 목업 데이터)
export const loginUser = async (email, password) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/login/`, { email, password });

            if (response.data.access && response.data.refresh) {
                // 액세스 + 리프레시 토큰 저장
                saveToken(response.data.access, response.data.refresh);

                // 유저 상태 업데이트
                if (response.data.user) {
                    useUserStore.getState().login(response.data.user);
                }

                return response.data;
            }

        } catch (error) {
            throw new Error(error.response?.data?.message || "로그인 실패");
        }
    }

    // 목업 데이터 유지 (테스트 가능)
    const storedPassword = localStorage.getItem(`mock_password_${email}`) || "qwer1234";

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "test@naver.com" && password === storedPassword) {
                resolve({
                    access: "mock_access_token_user",
                    refresh: "mock_refresh_token_user",
                    user: { id: 1, name: "테스트 사용자", email, isAdmin: false },
                });
            } else if (email === "admin@naver.com" && password === storedPassword) {
                resolve({
                    access: "mock_access_token_admin",
                    refresh: "mock_refresh_token_admin",
                    user: { id: 99, name: "관리자", email, isAdmin: true },
                });
            } else {
                reject(new Error("이메일 또는 비밀번호가 올바르지 않습니다."));
            }
        }, 1000);
    });
};

// [로그아웃 (백엔드 API 요청)]
export const logoutUser = async () => {
    if (USE_BACKEND) {
        try {
            await axios.post(`${API_BASE_URL}/logout/`);
            useUserStore.getState().logout(); // 상태 초기화
        } catch (error) {
            throw new Error(error.response?.data?.message || "로그아웃 실패");
        }
    }
    useUserStore.getState().logout(); // 목업 데이터도 로그아웃 가능
};

//[2] 회원가입 (백엔드 API or 목업 데이터)
export const signupUser = async (userData) => {
    if (USE_BACKEND) {
        try {
            const formData = new FormData();
            formData.append("email", userData.email);
            formData.append("password", userData.password);
            formData.append("nickname", userData.nickname);
            formData.append("gender", userData.gender);
            formData.append("birthYear", userData.birthYear);
            
            if (userData.profileImage) {
                formData.append("profileImage", userData.profileImage);
            }

            // 백엔드 회원가입 요청
            const response = await axios.post(`${API_BASE_URL}/register/`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return response.data;

        } catch (error) {
            throw new Error(error.response?.data?.message || "회원가입 실패");
        }
    }

    // 목업 데이터 
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
                    profileImage: userData.profileImage ? URL.createObjectURL(userData.profileImage) : null,
                    is_active: true, 
                },
            });
        }, 1000);
    });
};

//[3] 비밀번호 찾기 (백엔드 API or 목업 데이터)
export const sendPasswordResetEmail = async (email) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/password-reset/request/`, { email });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "비밀번호 재설정 요청 실패");
        }
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            const mockToken = `mock_reset_token_${email}`;
            console.log(`테스트용 인증 링크: http://localhost:5173/reset-password?token=${mockToken}`);
            resolve({ message: "비밀번호 재설정 이메일이 전송되었습니다.", token: mockToken });
        }, 1000);
    });
};

// [4] 비밀번호 재설정 (백엔드 API or 목업 데이터)
export const resetPassword = async (token, newPassword) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/password-reset/reset/`, { token, newPassword });

            // 비밀번호 변경 후 자동 로그아웃
            removeToken();
            useUserStore.getState().logout();

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "비밀번호 변경 실패");
        }
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ message: "비밀번호가 성공적으로 변경되었습니다." });
        }, 1000);
    });
};

// [프로필 조회]
export const fetchUserProfile = async () => {
    if (USE_BACKEND) {
        try {
            const response = await axios.get(`${API_BASE_URL}/profile/`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "프로필 정보 가져오기 실패");
        }
    }
    return null; // 목업 데이터 미사용
};

// [프로필 수정]
export const updateUserProfile = async (userData) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.patch(`${API_BASE_URL}/profile/`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "프로필 업데이트 실패");
        }
    }
    return null; // 목업 데이터 미사용
};

// [프로필 삭제]
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