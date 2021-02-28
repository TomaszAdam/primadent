import React, { useState } from "react";
import { firestore } from "../../services/firebase_services";
import PopUp from "./pop_up_screen";
import styled from "styled-components";
import { toast } from "react-toastify";
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 16px;
  /* position: absolute;
  right: 16px;
  bottom: 32px; */
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

const ActionText = styled.textarea`
  height: 50px;
  font-family: "Open Sans", sans-serif;
  width: 100%;
  border: none;
  padding: 8px 16px;
  margin: 0;
  font-size: 15px;
`;

const StyledButton = styled.button`
  background-color: #e0e1e2;
  padding: 12px 24px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  margin-top: 32px;
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
  const [text, setText] = useState("");
  const deleteApplication = () => {
    firestore.collection("recepty").doc(receipt.id).update({
      status: "deleted",
      deleteDate: new Date().toDateString(),
      deleteReason: text,
    });
    toast.error("wniosek usunięty", {
      hideProgressBar: false,
      autoClose: 2500,
    });
  };
  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        setVisible(true);
      }}
    >
      <p>Podaj powód usunięcia wniosku</p>
      <ActionText
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="podaj powód usunięcia"
      ></ActionText>
      <StyledButton type="submit">usuń wniosek</StyledButton>
      {visible ? (
        <PopUp
          text="Usunąć wniosek ?"
          helperText="Danej operacji nie można cofnąć"
          onYesAction={() => deleteApplication()}
          onNoAction={() => setVisible(false)}
          yesText="Usuń"
          noText="Anuluj"
        />
      ) : null}
    </StyledForm>
  );
};

export default DeleteButton;
