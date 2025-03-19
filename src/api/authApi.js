import axios from "axios";
import { saveToken, removeToken } from "../utils/authUtils";
import useUserStore from "../store/userStore";

// 환경 변수에서 백엔드 API URL 가져오기
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://your-backend.com/api"; 
const USE_BACKEND = false; // 백엔드 활성화 여부 (false면 목업 데이터 사용)

// [1] 로그인 (백엔드 API or 목업 데이터)
export const loginUser = async (email, password) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

            if (response.data.token) {
                saveToken(response.data.token);

                // 로그인 후 유저 상태 저장
                if (response.data.user) {
                    useUserStore.getState().login(response.data.user);
                }

                return response.data;
            }

        } catch (error) {
            throw new Error(error.response?.data?.message || "로그인 실패");
        }
    }

    // 목업 데이터 (테스트용)
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

// [2] 회원가입 (백엔드 API or 목업 데이터)
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

            //  백엔드에 회원가입 요청
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const user = response.data.user;

            // 프로필 이미지 URL이 존재하면 절대 경로로 변환
            if (user && user.profileImage) {
                user.profileImage = `${API_BASE_URL}/${user.profileImage}`;
            }

            return response.data; // "이메일 인증을 완료해야 회원가입이 완료됩니다." 메시지 반환

        } catch (error) {
            throw new Error(error.response?.data?.message || "회원가입 실패");
        }
    }

    // 목업 데이터 (테스트용)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                message: "회원가입 성공! 이메일 인증을 완료하세요.",
                user: {
                    id: Math.floor(Math.random() * 1000),
                    email: userData.email,
                    nickname: userData.nickname,
                    gender: userData.gender,
                    birthYear: userData.birthYear,
                    profileImage: userData.profileImage ? URL.createObjectURL(userData.profileImage) : null, // ✅ 프로필 이미지 포함
                    is_active: true, //  이메일 인증 후 계정 활성화
                },
            });
        }, 1000);
    });
};

// [3] 비밀번호 찾기 (백엔드 API or 목업 데이터)
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
            console.log(`테스트용 인증 링크: http://localhost:5173/reset-password?token=${mockToken}`);
            resolve({ message: "비밀번호 재설정 이메일이 전송되었습니다.", token: mockToken });
        }, 1000);
    });
};

// [4] 비밀번호 재설정 (백엔드 API or 목업 데이터)
export const resetPassword = async (token, newPassword) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, { token, newPassword });

            // 토큰 삭제 후 로그아웃 처리
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