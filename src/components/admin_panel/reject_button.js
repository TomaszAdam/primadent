import React, { useState } from "react";
import styled from "styled-components";
import { firestore } from "../../services/firebase_services";
import axios from "axios";
import { toast } from "react-toastify";

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
  & p {
    margin: 6px 0;
  }
  @media (max-width: 800px) {
    margin: 16px 0;
  }
`;

const StyledButton = styled.button`
  padding: 12px 24px;
  background-color: #e0e1e2;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  color: black;
  font-weight: bold;
  border-radius: 5px;
  margin-top: 32px;
  &:hover {
    background-color: #e86b5c;
  }
`;

const ActionText = styled.textarea`
  height: 50px;
  font-family: "Open Sans", sans-serif;
  width: 100%;
  border: none;
  padding: 8px 16px;
  margin: 0;
  font-size: 15px;
`;
const RejectButton = ({ receipt }) => {
  const [text, setText] = useState("");
  const rejectApplication = (e) => {
    if (text.trim() === "") {
      setText({
        error: "Podaj powód odrzucenia wniosku",
      });
      e.preventDefault();
      return null;
    }
    toast.info("odrzucam wniosek", {
      autoClose: 2000,
    });
    axios({
      method: "POST",
      url:
        "https://us-central1-primadent-d96de.cloudfunctions.net/webApi/primadent/rejectReceipt",
      headers: {
        "Content-type": "application/json",
      },
      data: {
        email: receipt.email,
        reason: text,
        name: receipt.name,
        phone: receipt.phone,
        pesel: receipt.pesel,
        medicines: receipt.medicines,
        internalId: receipt.internalId,
      },
    })
      .then((res) => {
        firestore.collection("recepty").doc(receipt.id).update({
          status: "rejected",
          reason: text,
          rejectDate: new Date().toDateString(),
        });

        toast.error("wniosek odrzucony", {
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };
  return (
    <StyledForm onSubmit={rejectApplication}>
      <p>Powód odrzucenia e-recepty</p>

      <ActionText
        placeholder="podaj powód odrzucenia"
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text.error ? "" : text}
      ></ActionText>
      {text.error ? <ErrorMessage>{text.error}</ErrorMessage> : null}
      <StyledButton type="submit">odrzuć wniosek</StyledButton>
    </StyledForm>
  );
};

export default RejectButton;
