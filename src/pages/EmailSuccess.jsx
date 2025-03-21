import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh; /* 화면 전체 높이 */
  max-width: 600px; /* 가로 최대 너비 */
  margin: 0 auto; /* 가운데 정렬 */
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #16a34a; /* Tailwind: green-600 */
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.125rem;
  color: #374151; /* Tailwind: gray-700 */
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
  return (
    <Container>
      <Title>✅ 이메일 인증이 완료되었습니다!</Title>
      <Text>이제 로그인하실 수 있어요.</Text>
      <Link to="/login">
        <StyledButton>로그인하러 가기</StyledButton>
      </Link>
    </Container>
  );
}

export default EmailSuccess;