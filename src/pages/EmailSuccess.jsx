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

        setStatus("success");
        setTimeout(() => {
          window.close();
        }, 3000); // 3초 후 창 닫기
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

  return (
    <Container>
      {status === "loading" && <Text>이메일 인증 중...</Text>}
      {status === "fail" && (
        <Text>❌ 이메일 인증에 실패했습니다. 링크가 만료되었거나 잘못된 링크입니다.</Text>
      )}
      {status === "success" && (
        <>
          <Title>✅ 이메일 인증이 완료되었습니다!</Title>
          <Text>잠시 후 창이 자동으로 닫힙니다.</Text>
        </>
      )}
    </Container>
  );
}

export default EmailSuccess;