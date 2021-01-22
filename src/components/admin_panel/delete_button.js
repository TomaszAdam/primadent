import React, { useState } from "react";
import { firestore } from "../../services/firebase_services";
import PopUp from "./pop_up_screen";
import styled from "styled-components";
import { toast } from "react-toastify";
const StyledButton = styled.button`
  background-color: #e0e1e2;
  padding: 12px 24px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  right: 16px;
  bottom: 32px;
  width: auto;
  height: auto;
  border-radius: 5px;
  transition: all 0.2s;
  align-self: flex-start;
  &:hover {
    background-color: #e86b5c;
  }
  @media (max-width: 800px) {
    position: initial;
    margin-top: 24px;
  }
`;

const DeleteButton = ({ receipt, setDisplay, setExpanded }) => {
  const [visible, setVisible] = useState(false);

  const deleteApplication = () => {
    firestore.collection("recepty").doc(receipt.id).delete();
    toast.error("wniosek usunięty", {
      hideProgressBar: false,
      autoClose: 2500,
    });
  };
  return (
    <>
      <StyledButton onClick={() => setVisible(true)}>usuń wniosek</StyledButton>
      {visible ? (
        <PopUp
          text="Usunąć wniosek ?"
          helperText="Danej operacji nie można cofnąć"
          onYesAction={() => deleteApplication(receipt.id)}
          onNoAction={() => setVisible(false)}
          yesText="Usuń"
          noText="Anuluj"
        />
      ) : null}
    </>
  );
};

export default DeleteButton;
