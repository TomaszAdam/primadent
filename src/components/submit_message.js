import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledWrapper = styled.div`
  width: 90%;

  padding: 8px 16px;
`;

const StyledLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  position: relative;

  &:after {
    content: "";
    display: block;
    width: 0%;
    position: absolute;
    bottom: -4px;
    height: 2px;
    background-color: black;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.2s;
  }
  &:hover:after {
    width: 90%;
  }
`;
const SubmitMessage = ({ error }) => {
  return (
    <StyledWrapper>
      {error ? (
        <>
          <h2>Wystąpił błąd podczas wysyłania wniosku</h2>
          <p>
            Prosimy o ponowne wypełnienie formularza oraz sprawdzenie czy mają
            państwo połączenie z internetem
          </p>
        </>
      ) : (
        <>
          <h2>Twój wniosek został wysłany</h2>{" "}
          <p>
            Sprawdzimy twoje dane i w ciągu 48 godzin od wysłania wniosku
            poinformujemy Pana/Panią mailowo o rozpatrzeniu wniosku.
          </p>
          <p>
            {" "}
            Jeśli wniosek zostanie rozpatrzony pozytywnie wyślemy email z
            linkiem do opłacenia e-recepty,po opłaceniu dostanie Pan/Pani
            wiadomość SMS z kodem e-recepty,który można zrealizować w aptece
          </p>
          <p>
            <StyledLink to="/">Powrót na stronę główną</StyledLink>
          </p>{" "}
        </>
      )}
    </StyledWrapper>
  );
};

export default SubmitMessage;
