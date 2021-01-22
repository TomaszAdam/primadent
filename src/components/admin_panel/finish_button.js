import React from "react";
import styled from "styled-components";
import { firestore } from "../../services/firebase_services";
import { toast } from "react-toastify";
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

const FinishButton = ({ receipt }) => {
  const finishOrder = () => {
    firestore.collection("recepty").doc(receipt.id).update({
      status: "finished",
    });
    toast.success("recepta zrealizowana", {
      autoClose: 2500,
    });
  };
  return <StyledButton onClick={finishOrder}>Zrealizuj receptę</StyledButton>;
};

export default FinishButton;
