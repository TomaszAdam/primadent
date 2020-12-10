import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  height: 100%;
  grid-column: 1 / 2;
  grid-row: 1 /4;
  border-radius: 30px;
  box-shadow: 0 0 40px 10px #e1e1e1;
  padding: 8px 24px;
`;

const StyledForm = styled.form``;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;

  font-weight: bold;
  p {
    margin-top: 0;
    margin-bottom: 5px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  grid-gap: 24px;
  margin: 24px 0;
`;

const StyledInput = styled.input`
  padding: 8px 16px;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
  &:focus {
    box-shadow: 0 0 0 5px rgba(43, 237, 95, 0.3);
  }
`;
const EReceiptForm = () => {
  return (
    <StyledWrapper>
      <h2>Karta pacjenta</h2>

      <StyledForm>
        <FormRow col={2}>
          <StyledLabel for="name">
            <p>IMIĘ </p>
            <StyledInput type="text" id="name" />
          </StyledLabel>
          <StyledLabel for="name">
            <p>NAZWISKO</p>
            <StyledInput type="text" id="name" />
          </StyledLabel>
        </FormRow>
        <FormRow col={1}>
          <StyledLabel for="email">
            <p>ADRES E-MAIL</p>
            <StyledInput type="email" id="email" />
          </StyledLabel>
        </FormRow>
        <FormRow col={1}>
          <StyledLabel for="pesel">
            <p>PESEL</p>
            <StyledInput type="text" id="pesel" />
          </StyledLabel>
        </FormRow>
      </StyledForm>
    </StyledWrapper>
  );
};

export default EReceiptForm;
