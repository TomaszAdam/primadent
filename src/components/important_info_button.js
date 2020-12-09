import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
const InfoButton = styled.a`
  text-decoration: none;
  color: white;
  padding: 10px 25px;
  background-color: black;
  font-size: 15px;
  font-weight: 400;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid black;
  transition: all 0.5s;
  margin-bottom: 68px;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    color: black;
  }
`;

const ImportantInfoButton = ({ link }) => {
  return (
    <InfoButton href={link} target="_blank">
      WAŻNE I AKTUALNE INFORMACJE DLA PACJENTÓW
    </InfoButton>
  );
};

export default ImportantInfoButton;
