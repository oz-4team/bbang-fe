

// 토큰 저장 (localStorage 사용)
export const saveToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  
  // 저장된 토큰 가져오기
  export const getToken = () => {
    return localStorage.getItem("authToken");
  };
  
  // 토큰 삭제 (로그아웃 시 사용)
  export const removeToken = () => {
    localStorage.removeItem("authToken");
  };