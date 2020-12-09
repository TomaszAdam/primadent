import React from "react";
import styled from "styled-components";

//components
import ImportantInfoButton from "./important_info_button";
import HeroContact from "./hero_contact_info";

const StyledBackground = styled.section`
  background-image: url("tlo1.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  height: 100vh;
  width: 100vw;
  position: relative;
  background-attachment: fixed;
`;

const StyledInfoDiv = styled.div`
  position: absolute;
  bottom: 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const StyledParagraph = styled.h1`
  font-size: 26px;
  font-weight: normal;
  margin-bottom: 40px;
  line-height: 1.1;
`;
const HeroImage = ({ address, phoneNumber, FBLink, eRegisterLink }) => {
  return (
    <StyledBackground id="HOME">
      <StyledInfoDiv>
        <ImportantInfoButton link={FBLink} />
        <StyledParagraph>UMÓW SIĘ NA WIZYTĘ</StyledParagraph>
        <HeroContact
          phoneNumber={phoneNumber}
          address={address}
          eRegisterLink={eRegisterLink}
        />
      </StyledInfoDiv>
    </StyledBackground>
  );
};

export default HeroImage;
