import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Layout from "../components/layout.js";
import logo from "../../images/logo.png";
import tlo1 from "../../images/tlo1.jpg";

const StyledWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  & h1 {
    font-size: 60px;
    margin: 8px 0;
  }

  & p {
    margin-bottom: 48px;
    font-size: 16px;

    & a {
      text-decoration: none;
      color: #024e6c;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const StyledImage = styled.img``;

const StyledButton = styled(Link)`
  padding: 12px 24px;
  display: block;
  width: min-content;
  border: 1px solid black;
  white-space: nowrap;
  color: black;
  text-decoration: none;
  transition: all 0.2s;
  &:hover {
    background-color: rgba(205, 107, 93, 1);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
const Page404 = () => {
  return (
    <StyledWrapper>
      <Layout />
      <StyledImage src={logo} alt="logo primadent" />
      <h1>404</h1>
      <p>
        Strona o podanym adresie nie istnieje,prosimy o sprawdzenie poprawności
        adresu strony, w przypadku pytań zapraszamy do
        <Link to="/#CONTACT"> kontaktu</Link>
      </p>
      <ButtonRow>
        <StyledButton to="/">Strona główna</StyledButton>
        <StyledButton to="/e-recepta">Formularz E-recepty</StyledButton>
      </ButtonRow>
    </StyledWrapper>
  );
};

export default Page404;
