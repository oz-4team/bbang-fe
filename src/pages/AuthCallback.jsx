import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { exchangeSocialToken } from "../api/socialAuthApi";
import useUserStore from "../store/userStore";

const AuthCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useUserStore();

    useEffect(() => {
        const handleAuth = async () => {
            const code = searchParams.get("code");

            // provider 감지 (안전한 방식)
            const pathSegments = window.location.pathname.split("/");
            const provider = pathSegments.includes("kakao")
                ? "kakao"
                : pathSegments.includes("naver")
                ? "naver"
                : "google";

            if (!code) {
                console.error("인가 코드 없음 - 로그인 페이지로 이동");
                navigate("/login");
                return;
            }

            console.log(`${provider} 인가 코드:`, code);

            try {
                // 인가 코드를 백엔드로 POST 요청
                const response = await exchangeSocialToken(provider, code, navigate);
                if (response) {
                    console.log("로그인 성공!", response);

                    // 토큰과 사용자 정보 저장
                    login(response.user, response.access_token, response.refresh_token);
                    navigate("/"); 
                }
            } catch (error) {
                console.error("소셜 로그인 실패!", error);
                alert("소셜 로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
                navigate("/login");
            }
        };

        handleAuth();
    }, [searchParams, navigate, login]);

    return <p>소셜 로그인 중입니다...</p>;
};

export default AuthCallback;