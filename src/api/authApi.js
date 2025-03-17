export const loginUser = async (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 테스트용 일반 사용자
            if (email === "test@naver.com" && password === "qwer1234") {
                resolve({
                    token: "mock_token_user",
                    user: {
                        id: 1,
                        name: "테스트 사용자",
                        email: "test@naver.com",
                        isAdmin: false, // 일반 사용자
                    },
                });
            } 
            // 테스트용 관리자 계정
            else if (email === "admin@naver.com" && password === "admin1234") {
                resolve({
                    token: "mock_token_admin",
                    user: {
                        id: 99,
                        name: "관리자",
                        email: "admin@naver.com",
                        isAdmin: true, // 관리자 계정
                    },
                });
            } 
            // 로그인 실패 시 에러 메시지 반환
            else {
                reject(new Error("이메일 또는 비밀번호가 올바르지 않습니다ㅋ"));
            }
        }, 1000); // 1초 후 응답 (로딩 시뮬레이션)
    });
};