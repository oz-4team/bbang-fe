import { useState } from "react";
import { sendPasswordResetEmail } from "../api/authApi";

function ForgotPasswordPage () {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const handleResetRequest = async (e) => {
        e.preventDefault();

        console.log("🚀 비밀번호 재설정 요청 실행됨"); // (추가됨)
        console.log("🔹 입력된 이메일:", email); // (추가됨)

        try {
            await sendPasswordResetEmail(email);
            console.log("✅ 인증 링크 전송 완료"); //  (추가됨)
            
            setMessage("인증 링크를 이메일로 전송했습니다. 이메일을 확인해주세요")
            setError("")
        } catch (err) {
            console.error("❌ 비밀번호 찾기 오류:", err.message); // ➕ (추가됨)
            setError(err.message)
        }
    }

    return (
        <div className="forgot-password-container">
            <h1>비밀번호 찾기</h1>
            <form onSubmit={handleResetRequest}>
                <input
                   type="email"
                   placeholder="이메일을 입력해주세요"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                />
                <button type="submit">인증 링크 보내기</button> {/* 🔧 (수정됨) 오타 수정 */}
            </form>
            {message && <p className="success-message">{message}</p>} {/* 🔧 (수정됨) 오타 수정 */}
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}

export default ForgotPasswordPage