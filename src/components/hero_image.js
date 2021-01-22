import React from "react";
import styled from "styled-components";
import tlo1 from "../../images/tlo1.jpg";
//components
import ImportantInfoButton from "./important_info_button";
import HeroContact from "./hero_contact_info";

const StyledBackground = styled.section`
  height: 100vh;
`;
const FixedImg = styled.div`
  z-index: -1;
  background-image: url(${tlo1});
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 55% 00%;
  background-size: cover;
  background-attachment: cover;
`;

const StyledInfoDiv = styled.div`
  position: absolute;
  bottom: 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  @media (max-height: 300px) and (max-width: 500px) {
    bottom: 0%;
  }
`;

const StyledParagraph = styled.h1`
  font-size: 26px;
  font-weight: normal;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.1;
  @media (max-width: 760px) {
    margin-bottom: 24px;
  }
`;
const HeroImage = ({ address, phoneNumber, FBLink, eRegisterLink }) => {
  return (
    <StyledBackground background={tlo1} id="HOME">
      <FixedImg />
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
