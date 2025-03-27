import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
`;

const ModalDescription = styled.p`
  margin: 2rem 0;
  font-size: 1rem;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PrimaryButton = styled(Button)`
  background-color: #007bff;
  background: none;
  color: #007bff;
  font-weight: bold;
`;

const SecondaryButton = styled(Button)`
  background: none;
  color: black;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 2rem 0 1rem 0;
`;

const Modal = ({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <ModalContainer>
      <ModalContent>
        {title && <ModalTitle>{title}</ModalTitle>}
        {description && <ModalDescription>{description}</ModalDescription>}
        <HorizontalLine />
        <ButtonContainer>
          {secondaryButtonText && (
            <button className="btn-secondary" onClick={onSecondaryClick}>
              {secondaryButtonText}
            </button>
          )}
          {primaryButtonText && (
            <button className="btn-primary bg-none" onClick={onPrimaryClick}>
              {primaryButtonText}
            </button>
          )}
        </ButtonContainer>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
