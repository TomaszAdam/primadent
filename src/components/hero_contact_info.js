import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
const StyledContainer = styled.div`
  display: flex;
  max-width: 1180px;
  width: 100%;
  justify-content: space-between;
`;
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  & img {
    margin-right: 40px;
    width: 75px;
    height: 75px;
  }

  & h3 {
    font-size: 25px;
    font-weight: normal;
  }
`;

const StyledPhoneNumber = styled.a`
  font-weight: 800;
  color: black;
  text-decoration: none;
  transition: all 0.3s;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledRegisterLink = styled.a`
  font-weight: 700;
  color: rgba(208, 59, 37, 1);
  text-decoration-color: black;
  &:hover {
    text-decoration-color: rgba(208, 59, 37, 1);
  }
`;
const HeroContact = ({ address, phoneNumber, eRegisterLink }) => {
  console.log(eRegisterLink);
  return (
    <StyledContainer>
      <ContactItem>
        <img src="telephone_icon.png" />
        <h3>
          Zadzwoń
          <br />{" "}
          <StyledPhoneNumber href={`tel:${phoneNumber}`}>
            {phoneNumber}{" "}
          </StyledPhoneNumber>
        </h3>
      </ContactItem>
      <ContactItem>
        <img src="email_icon.png" />
        <h3>
          Wejdź na <br></br>
          <StyledRegisterLink target="blank" href={eRegisterLink}>
            e-rejestracja
          </StyledRegisterLink>
        </h3>
      </ContactItem>
      <ContactItem>
        <img src="person_icon.png" />
        <h3>
          Odwiedź nas <br></br> <strong>{address}</strong>
        </h3>
      </ContactItem>
    </StyledContainer>
  );
};

export default HeroContact;
