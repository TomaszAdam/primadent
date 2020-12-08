import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  & p {
    margin: 3px 0;
  }
`;
const DayHours = ({ day, open, close }) => {
  const convertDay = (day) => {
    switch (day) {
      case "poniedzialek":
      case "poniedziałek":
      case "pon":
        return "Pon";

      case "wtorek":
      case "wt":
        return "Wt";
      case "środa":
      case "sroda":
      case "sr":
      case "śr":
        return "Śr";
      case "czwartek":
      case "czw":
        return "Czw";
      case "piątek":
      case "piatek":
      case "pt":
        return "Pt";
      case "nd":
      case "niedziela":
        return "nd";
      case "sobota":
      case "sb":
        return "sb";
      default:
        return;
    }
  };
  return (
    <StyledWrapper>
      <p>{convertDay(day.toLowerCase())}</p>
      <p>{open ? open.toFixed(2) : null}</p>
      <p>{close ? close.toFixed(2) : null}</p>
    </StyledWrapper>
  );
};

export default DayHours;
