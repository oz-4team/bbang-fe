import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #16a34a;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.125rem;
  color: #374151;
  margin-bottom: 1.5rem;
`;

const StyledButton = styled.button`
  background-color: #22c55e;
  color: white;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: #16a34a;
  }
`;

function EmailSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");

  const token = searchParams.get("token"); // 이메일 인증 링크에서 토큰 가져오기

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`https://seonhm.kr/verify-email/`, {
          params: { token },
        });

        console.log("✅ 이메일 인증 성공:", response.data);
        setStatus("success");
      } catch (error) {
        setStatus("fail");
      }
    };

    if (token) {
      verifyEmail(); // 이메일 인증 요청
    } else {
      setStatus("fail");
    }
  }, [token]);

  const handleLoginRedirect = async () => {
    try {
      const response = await axios.get(`https://seonhm.kr/verify-email/`, {
        params: { token },
      });

      console.log("📨 이메일 인증 상태 확인 성공:", response.data);
      navigate("/login"); // ✅ 성공 시 로그인 페이지로 이동
    } catch (error) {
      console.error("⚠️ 이메일 인증 상태 확인 실패:", error);
      alert("이메일 인증을 다시 확인해주세요.");
    }
  };

  return (
    <Container>
      {status === "loading" && <Text>이메일 인증 중...</Text>}
      {status === "fail" && (
        <Text>❌ 이메일 인증에 실패했습니다. 링크가 만료되었거나 잘못된 링크입니다.</Text>
      )}
      {status === "success" && (
        <>
          <Title>✅ 이메일 인증이 완료되었습니다!</Title>
          <Text>이제 로그인하실 수 있어요.</Text>
          <StyledButton onClick={handleLoginRedirect}>로그인하러 가기</StyledButton>
        </>
      )}
    </Container>
  );
}

export default EmailSuccess;