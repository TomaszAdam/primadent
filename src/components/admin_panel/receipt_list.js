import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SearchAlt2 } from "@styled-icons/boxicons-regular/SearchAlt2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components

import {
  ArrowIosUpwardOutline,
  ArrowIosDownwardOutline,
} from "@styled-icons/evaicons-outline";
import ReceiptItem from "./receipt_item";
import { exportFile } from "./functions/exportFile";
import TableCell from "./table_cell";
import TableRow from "./table_row";
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
`;

const StyledTable = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-rows: auto;
  max-width: 1400px;
  padding-left: 0;
  width: 95%;
  grid-template-columns: 100%;
  overflow-y: scroll;
  flex-grow: 1;
  max-height: 60vh;
`;

const StyledFilterWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  margin: 16px 0;
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
const DateCell = styled(TableCell)`
  display: flex;
  align-items: flex-start;
  position: relative;
  justify-content: space-between;

  & span {
    display: flex;
  }
  & svg {
    transition: all 0.2s;
    width: 20px;
    transform: ${({ rotate }) => (rotate ? "rotate(180deg);" : "rotate(0);")};

    /* @media (max-width: 1500px) {
      position: absolute;
      right: 5px;
      bottom: 5px;
    } */
    @media (max-width: 1200px) {
      display: none;
    }
  }
`;

const ExportButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  background-color: #2185d0;
  transition: all 0.2s;
  margin-top: 24px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #0a5471;
  }
`;

const StyledCheckbox = styled.input`
  appearance: none;
  border: 1px solid #2185d0;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  outline: none;
  margin-right: 8px;
  transition: all 0.2s;
  &:hover {
    box-shadow: 0 0 0 6px rgba(33, 133, 208, 0.2);
  }
  &:checked {
    background: radial-gradient(
      circle,
      rgba(33, 133, 208, 1) 80%,
      rgba(255, 255, 255, 1) 100%
    );
    border: 1px solid #2185d0;
    box-shadow: 0 0 0 3px rgba(33, 133, 208, 0.2);
  }
  & + label {
    cursor: pointer;
  }
`;

const StyledForm = styled.form`
  & label svg {
    width: 25px;
    opacity: 0.5;
    transform: translate(-35px, -2px);
    transition: all 0.2s;
  }
  & input {
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    margin: 0 0 0 8px;
    font-size: 15px;
    padding: 10px 16px;
    position: relative;
    width: 260px;
    outline: none;
  }
  & input:focus + label svg {
    opacity: 0;
  }

  @media (max-width: 1450px) {
    margin-top: 16px;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const ReceiptList = ({ data, currentView }) => {
  const [list, setListData] = useState([]);
  const [filter, setFilter] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [sortType, setSortType] = useState("desc");

  console.log(list);
  const setList = () => {
    return data
      ? data.map((receipt) => {
          return (
            <ReceiptItem
              showUrgent={urgent}
              currentView={currentView}
              key={receipt.id}
              receipt={receipt}
            />
          );
        })
      : null;
  };

  const sortByDate = (a, b) => {
    if (sortType === "asc")
      return new Date(a.createdAt) - new Date(b.createdAt);
    else return new Date(b.createdAt) - new Date(a.createdAt);
  };

  const filterItems = (array) => {
    return array.filter((receipt) => {
      let receiptCopy = Object.assign({}, receipt);
      delete receiptCopy.id;
      const receiptArr = Object.values(receiptCopy).join().toLowerCase();

      return receiptArr.includes(filter.toLowerCase());
    });
  };

  useEffect(() => {
    let helperArr = [];

    if (data) {
      // 2.get ordered list
      data = data.sort(sortByDate);

      // 3.get filtered list
      if (data && filter !== "") {
        console.log(data);
        data = filterItems(data);
      }
    }
    // 1.get full list

    helperArr = setList();

    setListData(helperArr);
  }, [data, sortType, filter, currentView, urgent]);

  return (
    <StyledWrapper>
      <ToastContainer />

      <StyledFilterWrapper>
        <StyledForm>
          <input
            placeholder="Szukaj"
            type="text"
            id="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <label htmlFor="search">
            <SearchAlt2 />
          </label>
        </StyledForm>
        {currentView === "new" ? (
          <CheckboxWrapper>
            {" "}
            <StyledCheckbox
              onChange={(e) => {
                setUrgent(e.target.checked);
              }}
              type="checkbox"
              id="urgent"
              name="urgent"
            />
            <label htmlFor="urgent">
              Pokaż tylko pilne wnioski &nbsp; &nbsp; &nbsp;
            </label>
          </CheckboxWrapper>
        ) : null}
      </StyledFilterWrapper>

      <StyledTable>
        <TableRow hide={false}>
          <TableCell header>ID</TableCell>
          <DateCell
            onClick={
              sortType === "desc"
                ? () => setSortType("asc")
                : () => setSortType("desc")
            }
            rotate={sortType === "desc"}
            header
          >
            Data zapytania{" "}
            <span>
              <ArrowIosDownwardOutline /> <ArrowIosUpwardOutline />
            </span>
          </DateCell>
          <TableCell header>Imię i Nazwisko</TableCell>
          <TableCell header>E-mail</TableCell>
          <PhoneCell header>Telefon</PhoneCell>
          <PeselCell header>PESEL</PeselCell>
        </TableRow>
        {list}
      </StyledTable>
      <ExportButton onClick={() => exportFile(data, currentView)}>
        Eksport do pliku CSV
      </ExportButton>
    </StyledWrapper>
  );
};

export default ReceiptList;
