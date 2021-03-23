import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  flex: 1;
  box-shadow: 0 0 40px 10px #e1e1e1;
  padding: 8px 36px;
  background: #3d4853;
`;

const StyledHeader = styled.h2`
  color: white;
  font-size: 16px;
`;

const StyledText = styled.p`
  color: #fff;
  opacity: 0.5;
`;

const HowItWorks = () => {
  return (
    <StyledContainer>
      <StyledHeader>Jak to działa?</StyledHeader>
      <StyledText>
        Aby zamówić e-receptę, należy wypełnić formularz on-line, po wysłaniu
        którego otrzymasz potwierdzenie złożenia zapotrzebowania, wraz z
        identyfikatorem zamówienia. Weryfikacji dokonuje w pierwszej kolejności
        personel pomocniczy, a następnie lekarz. W razie wątpliwości lub
        uzupełnienia informacji skontaktujemy się z Tobą telefonicznie lub
        poprzez e-mail. Jeśli wszystko jest w porządku, wyślemy Ci link
        umożliwiający dokonanie płatności za usługę. Po otrzymaniu płatności,
        lekarz wystawi e-receptę i na telefon komórkowy otrzymasz kod recepty,
        który wraz z nr PESEL posłuży do weryfikacji e-recepty i odbioru leku w
        dowolnej aptece.
      </StyledText>
      {/* <Line /> */}
      {/* <StyledHeader>Coś tu se wpisze</StyledHeader>
      <StyledText>
        Have my breakfast spaghetti yarn cereal boxes make for five star
        accommodation slap owner's face at 5am until human fills food dish jump
        on counter removed by human jump on counter again removed by human meow
        before jumping on counter this time to let the human know am coming back
        mark territory.
      </StyledText> */}
    </StyledContainer>
  );
};

export default HowItWorks;
