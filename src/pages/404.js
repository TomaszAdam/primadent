import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Layout from "../components/layout.js";
import logo from "../../images/logo.png";

const bowser = typeof window !== "undefined" && window;

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

const Page404 = () => {
  return (
    bowser && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Layout />
        <StyledImage src={logo} alt="logo primadent" />
        <h1>404</h1>
        <p>
          Strona o podanym adresie nie istnieje,prosimy o sprawdzenie
          poprawności adresu strony, w przypadku pytań zapraszamy do
          <Link to="/#CONTACT"> kontaktu</Link>
        </p>

        <StyledButton to="/">Strona główna</StyledButton>
      </div>
    )
  );
};

export default Page404;
