import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  margin-bottom: 24px;
  & p {
    margin: 0;
  }
`;
const Title = styled.p`
  color: #999999;
`;
const DoctorInfo = ({ name, title }) => {
  return (
    <StyledWrapper>
      <p>{name}</p>
      <Title>{title}</Title>
    </StyledWrapper>
  );
};

export default DoctorInfo;
