import axios from "axios";

// 🔥 백엔드 API 활성화 여부 (false면 목업 데이터 사용, true면 백엔드 API 사용)
const USE_BACKEND = false;  // ✅ 나중에 true로 변경하면 백엔드 연동됨

// 🔥 백엔드 API URL (백엔드 개발 완료 후 변경할 것)
const API_BASE_URL = "https://your-backend.com/api"; // ✅ 백엔드 URL 입력 필요

// ✅ [1] 로그인 (백엔드 API or 목업 데이터)
export const loginUser = async (email, password) => {
    if (USE_BACKEND) { // ✅ 백엔드 API 사용
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "로그인 실패");
        }
    }

    // ✅ 목업 데이터 (백엔드 없이 테스트)
    const storedPassword = localStorage.getItem(`mock_password_${email}`) || "qwer1234"; // ✅ (수정됨) 저장된 비밀번호 불러오기

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "test@naver.com" && password === storedPassword) { // ✅ (수정됨) 저장된 비밀번호 체크
                resolve({
                    token: "mock_token_user",
                    user: {
                        id: 1,
                        name: "테스트 사용자",
                        email: "test@naver.com",
                        isAdmin: false,
                    },
                });
            } else if (email === "admin@naver.com" && password === "admin1234") {
                resolve({
                    token: "mock_token_admin",
                    user: {
                        id: 99,
                        name: "관리자",
                        email: "admin@naver.com",
                        isAdmin: true,
                    },
                });
            } else {
                reject(new Error("이메일 또는 비밀번호가 올바르지 않습니다."));
            }
        }, 1000);
    });
};

// ✅ [2] 회원가입 (백엔드 API or 목업 데이터)
export const signupUser = async (userData) => {
    if (USE_BACKEND) { // ✅ 백엔드 API 사용
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "회원가입 실패");
        }
    }

    // ✅ 목업 데이터 (백엔드 없이 테스트)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                message: "회원가입 성공! 로그인하세요.",
                user: {
                    id: Math.floor(Math.random() * 1000), // 랜덤 ID 생성
                    ...userData,
                },
            });
        }, 1000);
    });
};

// ✅ [3] 비밀번호 찾기 (백엔드 API or 목업 데이터)
export const sendPasswordResetEmail = async (email) => {
    if (USE_BACKEND) { // ✅ 백엔드 API 사용
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "비밀번호 재설정 요청 실패");
        }
    }

    // ✅ 목업 데이터 (이메일 전송 없이 테스트 가능)
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockToken = `mock_reset_token_${email}`; // ✅ (수정됨) 유저별 토큰 저장
            console.log("✅ 테스트용 비밀번호 재설정 이메일 전송 완료"); 
            console.log(`🔹 인증 링크: http://localhost:5173/reset-password?token=${mockToken}`);
            resolve({ message: "비밀번호 재설정 이메일이 전송되었습니다. (콘솔 확인)", token: mockToken });
        }, 1000);
    });
};

// ✅ [4] 비밀번호 재설정 (백엔드 API or 목업 데이터)
export const resetPassword = async (token, newPassword) => {
    if (USE_BACKEND) { // ✅ 백엔드 API 사용
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
                token,
                newPassword,
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "비밀번호 변경 실패");
        }
    }

    // ✅ 목업 데이터 (테스트용)
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("✅ 목업 데이터에서 비밀번호 재설정 완료"); 
            console.log(`🔹 변경된 비밀번호: ${newPassword}`); 

            // 새 비밀번호를 localStorage에 저장 (이메일별로 저장)
            const email = token.replace("mock_reset_token_", ""); // (수정됨) 토큰에서 이메일 추출
            localStorage.setItem(`mock_password_${email}`, newPassword);

            resolve({ message: "비밀번호가 성공적으로 변경되었습니다." });
        }, 1000);
    });
};