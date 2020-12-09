import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
const StyledContainer = styled.footer`
  background-color: rgba(242, 242, 242, 1);
  padding: 60px 0;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & p {
    margin: 0 0 6px 0;
    font-size: 16px;
    line-height: 1.6;
  }
`;

const StyledEmail = styled.a`
  color: black;
  font-weight: 700;
`;

const IconContainer = styled.div`
  display: flex;
  padding-top: 24px;
`;

const StyledImage = styled.img`
  width: 38px;
  height: 38px;
  &:first-child {
    margin-right: 10px;
  }
`;

const StyledMap = styled.iframe`
  height: 350px;
  width: 80vw;
`;

const ContactSection = ({ address, phoneNumber, email, FBLink }) => {
  return (
    <StyledContainer id="CONTACT">
      <StyledContent>
        <p>
          <StyledMap
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2438.375087591527!2d17.563909716111496!3d52.32734117977816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4704e97b222d3989%3A0x81c8c6f4bb3ed7c3!2zU8SFZG93YSA2LCA2Mi0zMDIgV3J6ZcWbbmlh!5e0!3m2!1spl!2spl!4v1607261182124!5m2!1spl!2spl"
            frameBorder="0"
            styles="border:0;"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></StyledMap>
        </p>

        <p>Przychodnia Primadent Sp. z o.o.</p>
        <p>{address} 62-300, woj. wielkopolskie</p>
        <p>
          tel: {phoneNumber}, email:&nbsp;
          <StyledEmail href={`mailto:${email}`}> do rejestracji</StyledEmail>
        </p>
        <p>
          RODO &nbsp;
          <StyledEmail href="rodo_primadent.pdf">
            Obowiązek informacyjny dla pacjentów
          </StyledEmail>
        </p>
        <IconContainer>
          <a href={FBLink} target="blank">
            <StyledImage src="small_fb_icon.png" />
          </a>
          <a href={`mailto:${email}`}>
            <StyledImage src="small_mail_icon.png" />
          </a>
        </IconContainer>
      </StyledContent>
    </StyledContainer>
  );
};

export default ContactSection;
