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
    day = day.toLowerCase();

    switch (day) {
      case "poniedzialek":
      case "poniedziałek":
      case "pon":
        return "pon";

      case "wtorek":
      case "wt":
        return "wt";
      case "środa":
      case "sroda":
      case "sr":
      case "śr":
        return "śr";
      case "czwartek":
      case "czw":
        return "czw";
      case "piątek":
      case "piatek":
      case "pt":
        return "pt";
      case "nd":
      case "niedziela":
        return "nd";
      case "sobota":
      case "sb":
        return "sb";
      default:
        return day;
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
