import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { auth } from "../services/firebase_services";

import ErrorMessage from "./error_message";
const StyledBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;
const StyledWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  box-shadow: 0 0 40px 10px #e1e1e1;
  background-color: white;

  padding-bottom: 32px;
`;

const Header = styled.h2`
  padding: 32px 16px;
  background-color: #024e6c;
  width: 100%;

  color: white;
  margin: 0 0 16px 0;
`;

const StyledInput = styled.input`
  margin-top: 8px;
  padding: 8px 16px;
  width: 90%;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  outline: none;
  margin: 0 auto 16px 16px;
`;

const StyledButton = styled.button`
  align-self: flex-start;
  padding: 12px 24px;
  background-color: #2185d0;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  margin: 8px auto 0 16px;

  &:hover {
    background-color: #0a5471;
  }
`;

const ExitButton = styled.button`
  background-color: #e0e1e2;
  padding: 12px 24px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  margin-left: 16px;
  width: auto;
  height: auto;
  border-radius: 5px;
  transition: all 0.2s;
  &:hover {
    background-color: #e86b5c;
  }
`;

const InfoText = styled.p`
  margin-left: 16px;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin: -4px 0 4px 16px;
`;

const SubmitText = styled.p`
  margin: 0 0 24px 16px;
`;

const StyledLink = styled.span`
  cursor: pointer;
  margin: 16px 0 0 16px;
  font-weight: bold;
  color: #024e6c;
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.2s;
  &:hover {
    border-bottom: 1px solid #024e6c;
  }
`;
const ResetPasswordModal = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [submit, showSubmit] = useState(false);
  const [error, setError] = useState("");
  //TO DO:
  // 1. error handling
  // 2. submit message styling
  // 3. testing
  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (email === "" || !email.includes("@")) {
      setError("Proszę podać poprawny email");
      return null;
    }
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        showSubmit(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <StyledBackground>
      <StyledWrapper>
        <Header>Resetowanie hasła</Header>

        {submit ? (
          <>
            <SubmitText>
              Link do resetowania hasła został wysłany, sprawdź swoją skrzynkę
              pocztową a następnie zaloguj się ponownie używając nowego hasła
            </SubmitText>
            <StyledLink onClick={() => closeModal(false)}>
              Powrót do logowania
            </StyledLink>
          </>
        ) : (
          <>
            <form onSubmit={handlePasswordReset}>
              <StyledInput
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
              {error ? <StyledErrorMessage>{error}</StyledErrorMessage> : null}
              <StyledButton type="submit">Wyślij </StyledButton>
              <ExitButton onClick={() => closeModal(false)}>Anuluj</ExitButton>
            </form>
            <InfoText>
              Jeśli podany email jest przypisany do istniejącego konta,otrzymasz
              link służący do zresetowania hasła
            </InfoText>
          </>
        )}
      </StyledWrapper>
    </StyledBackground>
  );
};

export default ResetPasswordModal;
