import { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "../api/authApi";
import "../styles/ForgotPassword.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [cooldownEnd, setCooldownEnd] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);

  const COOLDOWN_DURATION = 10 * 60 * 1000; // 10분

  // 📦 이메일별 쿨타임 가져오기
  const getCooldownEndForEmail = (email) => {
    const allCooldowns =
      JSON.parse(localStorage.getItem("passwordResetCooldowns")) || {};
    return allCooldowns[email] || null;
  };

  // 🧠 이메일 변경 시 쿨타임 자동 확인
  useEffect(() => {
    if (!email) return;
    const end = getCooldownEndForEmail(email);
    if (end && Date.now() < end) {
      setCooldownEnd(end);
    } else {
      setCooldownEnd(null);
    }
  }, [email]);

  // ⏱️ 타이머 효과
  useEffect(() => {
    const interval = setInterval(() => {
      if (cooldownEnd) {
        const now = Date.now();
        const diff = cooldownEnd - now;
        if (diff <= 0) {
          setCooldownEnd(null);
          setRemainingTime(0);
        } else {
          setRemainingTime(diff);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownEnd]);

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 쿨타임 저장
  const saveCooldownForEmail = (email) => {
    const allCooldowns =
      JSON.parse(localStorage.getItem("passwordResetCooldowns")) || {};
    const end = Date.now() + COOLDOWN_DURATION;
    allCooldowns[email] = end;
    localStorage.setItem(
      "passwordResetCooldowns",
      JSON.stringify(allCooldowns)
    );
    setCooldownEnd(end);
  };

  // 포맷 함수
  const formatTime = (ms) => {
    const totalSec = Math.ceil(ms / 1000);
    const min = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const sec = String(totalSec % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleResetRequest = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    const cooldownUntil = getCooldownEndForEmail(email);
    if (cooldownUntil && Date.now() < cooldownUntil) {
      setCooldownEnd(cooldownUntil);
      setError("이메일 인증 요청은 10분에 한 번만 가능합니다.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(email);
      saveCooldownForEmail(email);
      setMessage("인증 링크를 이메일로 전송했습니다. 이메일을 확인해주세요.");
    } catch (err) {
      console.error("비밀번호 찾기 오류:", err.message);

      if (!navigator.onLine) {
        setError("인터넷 연결을 확인해주세요.");
      } else if (err.message.includes("가입한 사용자가 존재하지 않습니다")) {
        setError("등록되지 않은 이메일입니다.");
      } else {
        setError("요청 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCooldown = cooldownEnd && Date.now() < cooldownEnd;

  return (
    <>
      <div className="outlet-container">
        <div className="inner">
          <div className="page-wrapper">
            <div className="forgot-password-container">
              <h1>비밀번호 찾기</h1>
              <form onSubmit={handleResetRequest}>
                <label htmlFor="email">이메일 주소</label>
                <input
                  id="email"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={isSubmitting || isCooldown}>
                  {isCooldown
                    ? `다시 보내기 (${formatTime(remainingTime)})`
                    : isSubmitting
                    ? "전송 중..."
                    : "인증 링크 보내기"}
                </button>
              </form>
              {message && <p className="success-message">{message}</p>}
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
