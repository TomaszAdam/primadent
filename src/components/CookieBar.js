import React, { useState } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
const StyledContainer = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background: white;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.3);

  p {
    max-width: 800px;
    margin: 16px auto;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin: 16px auto;
  justify-content: space-around;
`;

const StyledButton = styled.button`
  color: white;
  font-size: 16px;
  border-radius: 5px;
  padding: 8px 16px;
  text-decoration: none;
  border: none;
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;
  a {
    text-decoration: none;
    color: white;
  }
`;
const CookieBar = () => {
  const [cookies, setCookie] = useCookies(["User"]);
  const [cookie, handleCookie] = useState(cookies.user);

  return cookie ? null : (
    <StyledContainer>
      <p>
        W celu zapewnienia maksymalnej wygody użytkowników przy korzystaniu z
        witryny ta strona stosuje pliki cookies. Kliknij 'Zgadzam się', aby ta
        informacja nie wyświetlała się więcej.
      </p>
      <ButtonContainer>
        <StyledButton bgColor="black">
          <a href="https://wszystkoociasteczkach.pl/">Dowiedz się więcej</a>
        </StyledButton>
        <StyledButton
          bgColor="#0039a3"
          onClick={() => {
            setCookie("user", "1", {
              sameSite: true,
            });
            handleCookie(cookies.user);
          }}
        >
          Zgadzam się
        </StyledButton>
      </ButtonContainer>
    </StyledContainer>
  );
};

export default CookieBar;
