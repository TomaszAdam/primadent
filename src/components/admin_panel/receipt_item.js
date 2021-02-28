import React, { useState, useRef } from "react";
import styled from "styled-components";

import { NotificationImportant } from "@styled-icons/material-sharp/NotificationImportant";
//components
import RejectButton from "./reject_button";
import AcceptButton from "./accept_button";
import DeleteButton from "./delete_button";
import AcceptPaymentButton from "./accept_payment_button";

import FinishButton from "./finish_button";
import TableCell from "./table_cell";
import TableRow from "./table_row";
import { convertDate, diffDays } from "./functions/convert_date";

const StyledRow = styled(TableRow)`
  transition: all 0.2s;
  position: relative;
  bottom: 0;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const MoreInfo = styled.div`
  position: relative;
  display: ${({ expanded }) => (expanded ? "grid" : "none")};
  grid-column: 1 / span 6;
  width: 100%;
  background-color: #efefef;
  padding: 16px;
  padding-bottom: 32px;
`;

const StyledTextWrapper = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-right: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TextLabel = styled.span`
  color: black;
  font-size: 15px;
  margin-bottom: 8px;
  font-weight: bold;
`;
const StyledRichTekst = styled.p`
  font-size: 16px;
  font-weight: normal;
  margin-top: -3px;
`;

const DateCell = styled(TableCell)`
  color: ${({ urgent }) => (urgent ? "#DF6A5D" : "inherit")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  & svg {
    width: 20px;
    display: ${({ urgent }) => (urgent ? "inline" : "none")};
  }
`;

const ButtonRow = styled.div`
  margin-top: 16px;
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
const MobileInfo = styled(StyledTextWrapper)`
  display: none;
  & p {
    font-weight: normal;
    margin: 2px 0;
    &:last-child {
      margin-bottom: 8px;
    }
  }
  @media (max-width: 1000px) {
    display: block;
  }
`;
const PhoneCell = styled(TableCell)`
  @media (max-width: 1000px) {
    display: none;
  }
`;

const PeselCell = styled(TableCell)`
  @media (max-width: 1000px) {
    display: none;
  }
`;

const ReceiptItem = ({ receipt, currentView, showUrgent }) => {
  const ref = useRef();
  const [expanded, setExpanded] = useState(false);
  const isUrgent = diffDays(receipt.createdAt) >= 3;
  const scroll = () => {
    ref && ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const setActionButtons = () => {
    switch (currentView) {
      case "new":
        return (
          <ButtonRow ref={ref}>
            <AcceptButton receipt={receipt} />
            <RejectButton receipt={receipt} />
            <DeleteButton receipt={receipt} />
          </ButtonRow>
        );
      case "accepted":
        return (
          <ButtonRow>
            <AcceptPaymentButton receipt={receipt} />

            <DeleteButton receipt={receipt} />
          </ButtonRow>
        );
      case "paid":
        return (
          <ButtonRow>
            <FinishButton receipt={receipt} />
            <DeleteButton receipt={receipt} />
          </ButtonRow>
        );
      case "finished":
        return (
          <ButtonRow>
            <DeleteButton receipt={receipt} />
          </ButtonRow>
        );
      case "rejected":
        return (
          <ButtonRow>
            <DeleteButton receipt={receipt} />
          </ButtonRow>
        );
      case "deleted":
        return <ButtonRow></ButtonRow>;
      default:
        return null;
    }
  };
  return (
    <StyledRow expanded={expanded} hide={showUrgent ? !isUrgent : false}>
      <TableCell
        onClick={() => {
          scroll();
          setExpanded(!expanded);
        }}
      >
        {receipt.internalId}
      </TableCell>
      <DateCell
        onClick={() => setExpanded(!expanded)}
        urgent={currentView === "new" ? isUrgent : false}
      >
        {convertDate(receipt.createdAt)} <NotificationImportant />
      </DateCell>
      <TableCell onClick={() => setExpanded(!expanded)}>
        {receipt.name}
      </TableCell>
      <TableCell onClick={() => setExpanded(!expanded)}>
        {receipt.email}
      </TableCell>
      <PhoneCell onClick={() => setExpanded(!expanded)}>
        {receipt.phone}
      </PhoneCell>
      <PeselCell onClick={() => setExpanded(!expanded)}>
        {receipt.pesel}
      </PeselCell>

      <MoreInfo expanded={expanded}>
        <MobileInfo>
          <TextLabel>Telefon</TextLabel>
          <p>{receipt.phone}</p>
          <TextLabel>Pesel</TextLabel>
          <p>{receipt.pesel}</p>
        </MobileInfo>
        <StyledTextWrapper>
          <TextLabel>Potrzebne lekarstwa</TextLabel>
          <StyledRichTekst>{receipt.medicines}</StyledRichTekst>
        </StyledTextWrapper>

        {receipt.status === "rejected" ? (
          <StyledTextWrapper>
            <TextLabel>Powód odrzucenia</TextLabel>
            <StyledRichTekst>{receipt.reason}</StyledRichTekst>
            <TextLabel>Data odrzucenia</TextLabel>
            <StyledRichTekst>{convertDate(receipt.rejectDate)}</StyledRichTekst>
          </StyledTextWrapper>
        ) : null}
        {receipt.status === "accepted" ? (
          <StyledTextWrapper>
            <TextLabel>Data zaakceptowania</TextLabel>
            <StyledRichTekst>{convertDate(receipt.acceptDate)}</StyledRichTekst>
            <TextLabel>kwota do zapłacenia</TextLabel>
            <StyledRichTekst>{receipt.amount} zł</StyledRichTekst>
          </StyledTextWrapper>
        ) : null}
        {receipt.status === "paid" || receipt.status === "finished" ? (
          <StyledTextWrapper>
            <TextLabel>Data opłacenia</TextLabel>
            <StyledRichTekst>{convertDate(receipt.paidDate)}</StyledRichTekst>
            <TextLabel>zapłacona kwota</TextLabel>
            <StyledRichTekst>{receipt.amount} zł</StyledRichTekst>
          </StyledTextWrapper>
        ) : null}
        {receipt.status === "deleted" ? (
          <StyledTextWrapper>
            <TextLabel>Data usunięcia</TextLabel>
            <StyledRichTekst>{convertDate(receipt.deleteDate)}</StyledRichTekst>
            <TextLabel>powód usunięcia</TextLabel>
            <StyledRichTekst>
              {receipt.deleteReason || "brak powodu"}{" "}
            </StyledRichTekst>
          </StyledTextWrapper>
        ) : null}

        {setActionButtons()}
      </MoreInfo>
    </StyledRow>
  );
};

export default ReceiptItem;

// STATUS NOWE : zatwierdź,odrzuć
