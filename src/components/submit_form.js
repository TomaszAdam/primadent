import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  grid-column: 2 / span 1;
  grid-row: 1 /2;
  border-radius: 30px;
  box-shadow: 0 0 40px 10px #e1e1e1;
  padding: 8px 24px;
`;

const SubmitForm = () => {
  return (
    <StyledContainer>
      <h2>podsumowanie</h2>
    </StyledContainer>
  );
};

export default SubmitForm;
