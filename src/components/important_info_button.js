import React from "react";
import styled from "styled-components";

const InfoButton = styled.a`
  text-decoration: none;
  color: white;
  padding: 10px 25px;
  background-color: rgba(0, 0, 0, 0.7);
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

  @media (max-width: 1000px) and (max-height: 600px) {
    margin-bottom: 0;
  }
  @media (max-width: 450px) {
    margin: 0 8px;
    width: 70%;
    text-align: center;
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
