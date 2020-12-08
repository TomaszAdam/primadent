import React from "react";
import styled from "styled-components";

//components
import Clinic from "./clinic";
const StyledWrapper = styled.section`
  padding: 30px 0 0 0;
  margin-bottom: 30px;
`;

const StyledH2 = styled.h2`
  font-weight: normal;
  font-size: 26px;
  margin-bottom: 20px;
`;

const StyledContent = styled.div`
  max-width: 1186px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ClinicList = ({ clinicList }) => {
  return (
    <StyledWrapper>
      <StyledContent>
        <StyledH2>PORADNIE</StyledH2>
        {clinicList.map((clinic, index) => (
          <Clinic clinicData={clinic} key={index} />
        ))}
      </StyledContent>
    </StyledWrapper>
  );
};

export default ClinicList;
