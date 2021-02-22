import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../admin_panel";
// components
import logo from "../../../images/logo.png";
import ReceiptList from "./receipt_list";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-left: 64px;

  @media (max-width: 1000px) {
    padding-left: 16px;
  }
`;

const TopBar = styled.div`
  padding: 32px 0 16px 0;
`;

const StyledLogo = styled.img`
  max-width: 200px;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const ListInfo = styled.div``;

const StyledTitle = styled.h2`
  color: #df6a5d;
  font-weight: 600;
`;
const RightPanel = ({ currentView }) => {
  const data = useContext(DataContext);
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    setCurrentList(data.filter((receipt) => receipt.status === currentView));
  }, [data, currentView]);
  const setTitle = () => {
    switch (currentView) {
      case "paid":
        return <span> OPłACONE E-RECEPTY</span>;
      case "accepted":
        return <span>E-RECEPTY ZAAKCEPTOWANE I OCZEKUJĄCE NA PŁATNOŚĆ</span>;
      case "rejected":
        return <span>E-RECEPTY ODRZUCONE</span>;
      case "finished":
        return <span>E-RECEPTY ZAKOŃCZONE I WYSTAWIONE PRZEZ LEKARZA</span>;
      case "new":
        return <span> NOWE E-RECEPTY OCZEKUJĄCE NA ROZPATRZENIE</span>;
      default:
        return null;
    }
  };
  return (
    <Wrapper>
      <TopBar>
        <StyledLogo src={logo} />
      </TopBar>
      <ListInfo>
        <StyledTitle>{setTitle()}</StyledTitle>
      </ListInfo>
      <ReceiptList currentView={currentView} data={currentList} />
    </Wrapper>
  );
};

export default RightPanel;
