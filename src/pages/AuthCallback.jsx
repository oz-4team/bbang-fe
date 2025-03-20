import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { exchangeSocialToken } from "../api/socialAuthApi";
import useUserStore from "../store/userStore";

console.log("🚀 AuthCallback.jsx 실행됨");

const AuthCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useUserStore();
    const isProcessing = useRef(false); // ✅ 중복 실행 방지

    useEffect(() => {
        if (isProcessing.current) {
            console.warn("⚠️ 이미 로그인 요청 진행 중...");
            return;
        }

        const authCode = searchParams.get("code");
        const provider = searchParams.get("provider");

        console.log("🔍 인가 코드 확인:", authCode);
        console.log("🔍 provider 확인:", provider);

        if (!authCode) {
            console.error("🚨 인가 코드 또는 provider 없음!");
            alert("소셜 로그인 인가 코드가 없습니다. 다시 시도해주세요.");
            navigate("/login");
            return;
        }

        console.log(`✅ ${provider} 인가 코드:`, authCode);
        isProcessing.current = true; // ✅ 중복 요청 방지

        const fetchSocialLogin = async() => {
            const data = await exchangeSocialToken(provider, authCode)
            return data
        } 
        fetchSocialLogin()
            .then(response => {
                console.log("🎉 로그인 성공!", response);
                login(response.email,response.access_token, response.refresh_token);
                navigate("/");
            })
            .catch(error => {
                console.error("🚨 소셜 로그인 실패!", error);
                alert(`🚨 로그인 실패: ${error.response?.data?.detail || "알 수 없는 오류 발생!"}`);
                navigate("/login");
            });
    }, [searchParams, navigate, login]);

    return <p>소셜 로그인 중...</p>;
};

export default AuthCallback;