import React, { useState } from "react";
import styled from "styled-components";
import { firestore } from "../../services/firebase_services";
import axios from "axios";
import { toast } from "react-toastify";
import PopUp from "./pop_up_screen";

import ErrorMessage from "../error_message";
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 16px;
  max-width: 300px;
  width: 100%;
  &:first-child {
    margin-left: 0;
  }
`;
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
const ActionText = styled.textarea`
  width: 200px;
  padding: 8px 16px;
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  border: none;
  width: 100%;
  height: 50px;
`;
const HelperText = styled.p`
  color: black;
  font-size: 14px;
  margin: 6px 0;
`;

const AcceptButton = ({ receipt }) => {
  const [amount, setAmount] = useState("");
  const [display, setDisplay] = useState({ visible: false });
  const [error, setError] = useState(null);

  const makePayUCall = () => {
    toast.info("Wysyłnie linku", {
      autoClose: 2500,
    });
    axios({
      method: "GET",
      url:
        " https://us-central1-primadent-d96de.cloudfunctions.net/webApi/primadent/authPayU",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        // WE HAVE A TOKEN

        axios({
          method: "POST",
          url:
            "https://us-central1-primadent-d96de.cloudfunctions.net/webApi/primadent/newOrder",
          headers: {
            "Content-type": "application/json",
          },
          data: {
            receiptID: receipt.id,
            name: receipt.name,
            email: receipt.email,
            amount: `${amount * 100}`,
            phone: receipt.phone,
            token: res.data,
            pesel: receipt.pesel,
            internalId: receipt.internalId,
          },
        })
          .then((res) => {
            firestore
              .collection("recepty")
              .doc(receipt.id)
              .update({
                status: "accepted",
                acceptDate: new Date().toDateString(),
                amount: parseFloat(amount),
              });
            toast.success("Wysłano link do płatności", {
              autoClose: 2500,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const acceptReceipt = () => {
    firestore
      .collection("recepty")
      .doc(receipt.id)
      .update({
        status: "paid",
        paidDate: new Date().toDateString(),
        amount: parseFloat(amount),
      })
      .then(() => {
        toast.success("Wniosek zaakceptowany", {
          autoClose: 2500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (e) => {
    if (!amount) {
      setError(
        "Proszę podać kwote do zapłacenia, w przypadku wniosku bez płatności proszę wpisać 0"
      );
      e.preventDefault();
      return null;
    }
    if (isNaN(amount)) {
      setError(
        "Proszę podać samą kwote bez waluty oraz innych znaków (np. 10 lub 10.00)"
      );
      e.preventDefault();
      return null;
    }

    // if amount eqals to "0"
    if (amount === "0") {
      setDisplay({
        visible: true,
        text: "Akceptacja wniosku z kwotą 0 zł",
        helperText: "Chcesz zaakceptować wniosek bez żądania zapłaty ?",
        onNoAction: () => setDisplay({ visible: false }),
        onYesAction: () => acceptReceipt(),
        yesText: "Zaakceptuj",
        noText: "Anuluj",
      });
      e.preventDefault();
      return null;
    }
    // if amount starts with "0"
    if (amount[0] === "0" && amount.length >= 2) {
      setDisplay({
        visible: true,
        text: `Błędna kwota "${amount}" zł`,
        helperText: `Zaakceptować wniosek z kwotą ${parseFloat(amount)}zł ?`,
        onNoAction: () => setDisplay({ visible: false }),
        onYesAction: () => makePayUCall(),
        yesText: "Zaakceptuj",
        noText: "Anuluj",
      });
      e.preventDefault();
      return null;
    }
    makePayUCall();

    e.preventDefault();
    return null;
  };
  return (
    <StyledForm onSubmit={handleClick}>
      <HelperText>Kwota do zapłaty</HelperText>
      <ActionText
        placeholder="0.00 zł"
        type="text"
        onChange={(event) => {
          setError("");
          setAmount(event.target.value);
        }}
      ></ActionText>
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <StyledButton type="submit">Zaakceptuj</StyledButton>
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
    </StyledForm>
  );
};

export default AcceptButton;
