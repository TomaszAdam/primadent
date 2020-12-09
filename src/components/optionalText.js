import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.section`
  padding: 32px 0;
  display: flex;
  max-width: 1186px;
  align-items: center;
  justify-content: center;
`;

const OptionalText = ({ text }) => {
  return <StyledWrapper>{text}</StyledWrapper>;
};

export default OptionalText;
