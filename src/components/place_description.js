import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
const StyledContainer = styled.div`
  padding: 60px 0;
  background-color: rgba(205, 107, 93, 1);
`;

const StyledContent = styled.div`
  max-width: 1186px;
  margin: 0 auto;
  padding: 0 16px;
  & h2 {
    text-align: center;
    font-weight: normal;
    font-size: 28px;
  }
  & p {
    font-size: 16px;
  }
`;

const PlaceDescription = ({ description }) => {
  return (
    <StyledContainer>
      <StyledContent>
        <h2>PRZYCHODNIA</h2>

        <ReactMarkdown>{description}</ReactMarkdown>
      </StyledContent>
    </StyledContainer>
  );
};

export default PlaceDescription;
