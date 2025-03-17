import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authApi"; //  백엔드 API 호출

function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); //  URL에서 토큰 가져오기
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    console.log("🔹 현재 토큰 값:", token);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setError("잘못된 접근입니다. 비밀번호 재설정 링크를 확인해주세요.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            console.log("🚀 비밀번호 재설정 요청 실행"); // 요청 확인용 콘솔 로그
            console.log("🔹 보낼 데이터:", { token, newPassword }); // 보낼 데이터 확인

            await resetPassword(token, newPassword); //  비밀번호 변경 요청

            console.log("✅ 비밀번호 변경 성공!"); // 성공 로그
            setMessage("비밀번호가 성공적으로 변경되었습니다.");
            
            setTimeout(() => {
                navigate("/login"); //  2초 후 로그인 페이지로 이동
            }, 2000);
        } catch (err) {
            console.error(" 비밀번호 재설정 오류:", err.message); // 오류 로그 출력
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>비밀번호 재설정</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="새 비밀번호 입력"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="새 비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">완료</button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default ResetPasswordPage;