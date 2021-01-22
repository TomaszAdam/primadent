import React, { useState } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import { auth } from "../services/firebase_services";
import Spinner from "./spinner";
import { User, Key } from "@styled-icons/boxicons-solid";

import ResetPasswordModal from "./reset_password";
const StyledWrapper = styled.div`
  padding-bottom: 24px;
  width: fit-content;
  min-width: 350px;
  margin: auto;
  margin-top: 200px;
  box-shadow: 0 0 40px 10px #e1e1e1;
  display: flex;
  flex-direction: column;
  align-items: center;
  & h2 {
    padding: 32px 64px;
    background-color: #024e6c;
    width: 100%;
    color: white;
    margin: 0 0 16px 0;
  }

  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    p {
      margin: 8px 0;
      font-weight: bold;
    }
    & div {
      display: flex;
      align-items: center;
      transform: translateX(-20px);
    }

    & label {
      width: 35px;
      margin-right: 8px;

      svg {
        fill: #024e6c;
      }
    }
  }
`;

const StyledInput = styled.input`
  margin-top: 8px;
  padding: 8px 16px;
  width: 100%;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  outline: none;
  margin-bottom: 16px;
  position: relative;
`;

const StyledButton = styled.input`
  -webkit-appearance: none;
  align-self: flex-start;
  padding: 12px 24px;
  background-color: #2185d0;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  margin: 32px auto 0 auto;

  &:hover {
    background-color: #0a5471;
  }
`;

const StyledError = styled.p`
  color: red;
  font-weight: bold;
  width: 300px;
  text-align: center;
  margin: 16px auto 0 auto;
`;
const ResetLink = styled.p`
  color: #024e6c;
  margin-bottom: 0;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border-bottom: 1px solid #024e6c;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const handleSubmit = (event) => {
    setLoading(true);
    setError(null);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setLoading(false);

        //console.log(user);
        navigate("/panel/admin");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);

        switch (err.code) {
          case "auth/wrong-password":
            setError("Błędne hasło użytkownika,spróbuj ponownie");
            break;
          case "auth/invalid-email":
            setError("błędny email lub konto z takim email'em nie istnieje");
            break;
          default:
            setError("Złe dane logowania, sprawdź hasło i email");
        }
      });
    event.preventDefault();
  };

  return (
    <>
      {modal ? (
        <ResetPasswordModal closeModal={setModal} />
      ) : (
        <StyledWrapper>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {" "}
              <h2>E-recepty panel zarządzania</h2>
              <form
                method="post"
                onSubmit={(event) => {
                  handleSubmit(event);
                }}
              >
                <p>EMAIL</p>
                <div>
                  <label htmlFor="email">
                    <User />
                  </label>
                  <StyledInput
                    id="email"
                    type="text"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <p>HASŁO</p>
                <div>
                  <label htmlFor="password">
                    <Key />
                  </label>
                  <StyledInput
                    id="password"
                    type="password"
                    name="hasło"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>

                <StyledButton type="submit" value="Zaloguj się" />
                {error ? <StyledError>{error}</StyledError> : null}
              </form>
              <ResetLink onClick={() => setModal(true)}>
                Zapomniałem hasła
              </ResetLink>
            </>
          )}
        </StyledWrapper>
      )}
    </>
  );
};

export default Login;
