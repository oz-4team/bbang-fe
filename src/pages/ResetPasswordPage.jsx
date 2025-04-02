import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import "../styles/ResetPassword.css";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
      await resetPassword(token, newPassword);
      setMessage("비밀번호가 성공적으로 변경되었습니다.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("비밀번호 재설정 오류:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="reset-password-container">
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
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
