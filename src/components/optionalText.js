import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
const StyledWrapper = styled.section`
  padding: 32px 0;
  display: flex;
  max-width: 800px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
`;

const OptionalText = ({ text }) => {
  return (
    <StyledWrapper>
      <ReactMarkdown>{text}</ReactMarkdown>
    </StyledWrapper>
  );
};

export default OptionalText;
