import axios from "axios";
import useUserStore from "../store/userStore";
import { removeToken, saveToken } from "../utils/authUtils";

// 백엔드 API URL 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://3.35.108.208:8000";
const USE_BACKEND = true; // 백엔드 활성화 여부 (false면 목업 데이터 사용)

// [1] 로그인 (백엔드 API or 목업 데이터)
export const loginUser = async (email, password) => {
    if (USE_BACKEND) {
        try {
            const response = await axios.post(`${API_BASE_URL}/login/`, { email, password });

            if (response.data.access && response.data.refresh) {
                saveToken(response.data.access, response.data.refresh);

                // 유저 정보 수동 추출
                const userInfo = {
                    email: response.data.email,
                    nickname: response.data.nickname,
                    is_staff: response.data.is_staff,
                    image_url: response.data.image_url,
                    id: response.data.id,
                };

                // ✅ Store tokens and user info in localStorage
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);
                localStorage.setItem("user_info", JSON.stringify(userInfo));

                // Zustand에 로그인 상태 저장
                useUserStore.getState().login(userInfo, response.data.access, response.data.refresh);

                return {
                    user: userInfo,
                    access: response.data.access,
                    refresh: response.data.refresh,
                };
            }
        } catch (error) {
            console.error("❌ 전체 에러 객체:", error);
            console.error("❌ error.response:", error.response);
            console.error("❌ error.response.data:", error.response?.data);
            throw new Error(error.response?.data?.message || "로그인 실패");
          }
    }
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
        console.log("📤 회원가입 요청 데이터:", userData);
        try {
            console.log("📤 회원가입 요청 데이터:", userData);
            const response = await axios.post(`${API_BASE_URL}/register/`, userData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return response.data;
        } catch (error) {
            console.error("❌ 회원가입 실패 응답:", error.response?.data);

            if (error.response?.data?.email) {
                const emailError = error.response.data.email[0];
                throw new Error(emailError || "이미 가입된 이메일입니다.");
            }

            throw new Error(
                error.response?.data?.message ||
                error.response?.data?.detail ||
                error.message ||
                "회원가입 실패"
            );
        }
    }
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
};
// [5] 비밀번호 재설정
export const resetPassword = async (token, newPassword) => {
    if (USE_BACKEND) {
      try {
        const payload = {
          token: token,
          password: newPassword, // 여기 수정
        };
  
        console.log("🚀 실제 보낼 payload:", payload);
  
        const response = await axios.post(
          `${API_BASE_URL}/password-reset/reset/`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        removeToken();
  
        return response.data;
      } catch (error) {
        console.error("❌ 비밀번호 재설정 오류 응답:", error.response?.data);
        throw new Error(
          error.response?.data?.error ||
          error.response?.data?.message ||
          "비밀번호 변경 실패"
        );
      }
    }
  };
// [6] 프로필 조회
export const fetchUserProfile = async () => {
    if (USE_BACKEND) {
      try {
        const response = await axios.get(`${API_BASE_URL}/profile/`);
        return response.data;
      } catch (error) {
        console.error("❌ 프로필 가져오기 실패:", error);
        throw new Error(error.response?.data?.message || "프로필 정보 가져오기 실패");
      }
    }
    return null;
  };


// [7] 프로필 수정
export const updateUserProfile = async (userData) => {
    if (USE_BACKEND) {
        try {
            let response;

            if (userData.image_url) {
                const formData = new FormData();
                
 
                if (userData.image_url) {
                    formData.append("image_url", userData.image_url);
                }
 
                if (userData.password) {
                    formData.append("password", userData.password);
                }

                if (userData.nickname) {
                    formData.append("nickname", userData.nickname);
                }

                response = await axios.patch(`${API_BASE_URL}/profile/`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                const jsonData = {
                    nickname: userData.nickname,
                    password: userData.password || undefined,
                };

                response = await axios.patch(`${API_BASE_URL}/profile/`, jsonData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }

            if (response.status !== 200 && response.status !== 204) {
                console.error("❌ 응답 상태코드 문제:", response.status);
                throw new Error("서버 응답 오류: 프로필 수정 실패");
            }

            console.log("✅ 프로필 업데이트 성공:", response.data);
            return response.data;
        } catch (error) {
            console.error("❌ 프로필 업데이트 실패:", error.response?.data);
            throw new Error(error.response?.data?.message || "프로필 업데이트 실패");
        }
    }
    return null;
};

// [8] 프로필 삭제
export const deleteUserProfile = async (token) => {
    if (USE_BACKEND) {
      try {
        // 요청에 Authorization 헤더를 추가
        const response = await axios.delete(`${API_BASE_URL}/profile/`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || "프로필 삭제 실패");
      }
    }
  }