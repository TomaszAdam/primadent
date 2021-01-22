import React, { useState } from "react";
import styled from "styled-components";
import PopUp from "./pop_up_screen";
import { firestore } from "../../services/firebase_services";
const StyledButton = styled.button`
  align-self: flex-start;
  padding: 12px 24px;
  background-color: #2185d0;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  margin-top: 32px;
  &:hover {
    background-color: #0a5471;
  }
`;
const AcceptPaymentButton = ({ receipt }) => {
  const [display, setDisplay] = useState({ visible: false });
  const acceptPayment = () => {
    firestore.collection("recepty").doc(receipt.id).update({
      status: "paid",
      paidDate: new Date().toDateString(),
    });
  };
  const handleAction = () => {
    setDisplay({
      visible: true,
      text: "Akceptacja wniosku z kwotą 0 zł",
      helperText: "Chcesz zaakceptować wniosek bez żądania zapłaty ?",
      onNoAction: () => setDisplay({ visible: false }),
      onYesAction: () => acceptPayment(),
      yesText: "Zaakceptuj",
      noText: "Anuluj",
    });
  };
  return (
    <>
      <StyledButton onClick={handleAction}>
        zatwierdź płatność ręcznie
      </StyledButton>
      {display.visible ? (
        <PopUp
          text={display.text}
          helperText={display.helperText}
          onYesAction={display.onYesAction}
          onNoAction={display.onNoAction}
          yesText={display.yesText}
          noText={display.noText}
        />
      ) : null}
    </>
  );
};

export default AcceptPaymentButton;
