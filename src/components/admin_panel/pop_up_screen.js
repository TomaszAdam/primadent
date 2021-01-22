import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  position: fixed;
  left: 40%;
  top: 40%;
  display: block;
  text-align: center;
  z-index: 100000;
  max-width: 500px;
  width: 100%;
  background-color: white;
  pointer-events: auto;

  h3 {
    width: 100%;
    margin: 0;
    padding: 24px;
    background-color: #024e6c;
    color: white;
  }
  p {
    margin: 16px;
  }
  @media (max-width: 1000px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;
const StyledBackground = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.3);
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 32px 16px 16px 16px;
`;

const StyledYesButton = styled.button`
  padding: 12px 24px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  color: white;
  transition: all 0.2s;
  font-size: 14px;
  background-color: #2185d0;
  &:hover {
    background-color: #0a5471;
  }
`;

const StyledNoButton = styled.button`
  padding: 12px 24px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s;
  font-size: 14px;
  &:hover {
    background-color: #e86b5c;
  }
`;

const PopUp = ({
  text,
  helperText,
  onYesAction,
  onNoAction,
  yesText,
  noText,
}) => {
  return (
    <StyledBackground onClick={() => onNoAction()}>
      <StyledWrapper>
        <h3>{text}</h3>
        <p>{helperText}</p>
        <ButtonRow>
          <StyledYesButton
            onClick={() => {
              onYesAction();
            }}
          >
            {yesText}
          </StyledYesButton>
          <StyledNoButton color={"#e86b5c"} onClick={() => onNoAction()}>
            {noText}
          </StyledNoButton>
        </ButtonRow>
      </StyledWrapper>
    </StyledBackground>
  );
};

export default PopUp;
