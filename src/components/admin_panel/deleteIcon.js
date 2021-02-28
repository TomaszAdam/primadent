import styled from "styled-components";
import React from "react";
import { DeleteForever } from "@styled-icons/material/DeleteForever";
import { firestore } from "../../services/firebase_services";
import { toast } from "react-toastify";
const Icon = styled(DeleteForever)`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 30px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    color: #e86b5c;
  }
`;

const DeleteIcon = ({ id }) => {
  const deleteReceipt = () => {
    firestore.collection("recepty").doc(id).delete();
    toast.error("wniosek usunięty", {
      hideProgressBar: false,
      autoClose: 2500,
    });
  };
  return <Icon onClick={deleteReceipt} />;
};

export default DeleteIcon;
