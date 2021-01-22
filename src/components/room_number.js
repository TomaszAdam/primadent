import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  font-size: 20px;
  background-color: rgba(205, 107, 93, 1);
  padding: 22px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RoomNumber = ({ number }) => {
  return <StyledWrapper>{number}</StyledWrapper>;
};

export default RoomNumber;
