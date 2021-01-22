import React from "react";
import styled from "styled-components";
const StyledContainer = styled.div`
  display: flex;
  max-width: 1180px;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
    width: fit-content;
    margin: 0 auto;
    padding: 0 8px;
  }
`;
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  & img {
    margin-right: 40px;
    width: 75px;
    height: 75px;

    @media (max-width: 760px) {
      width: 50px;
      height: 50px;
    }
  }

  & h3 {
    font-size: 22px;
    font-weight: normal;

    @media (max-width: 760px) {
      font-size: 18px;
    }
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
        <img alt="telefon ikona" src="telephone_icon.png" />
        <h3>
          Zadzwoń
          <br />{" "}
          <StyledPhoneNumber href={`tel:${phoneNumber}`}>
            {phoneNumber}{" "}
          </StyledPhoneNumber>
        </h3>
      </ContactItem>
      <ContactItem>
        <img alt="email ikona" src="email_icon.png" />
        <h3>
          Wejdź na <br></br>
          <StyledRegisterLink target="blank" href={eRegisterLink}>
            e-rejestracja
          </StyledRegisterLink>
        </h3>
      </ContactItem>
      <ContactItem>
        <img alt="człowiek ikona" src="person_icon.png" />
        <h3>
          Odwiedź nas <br></br> <strong>{address}</strong>
        </h3>
      </ContactItem>
    </StyledContainer>
  );
};

export default HeroContact;
