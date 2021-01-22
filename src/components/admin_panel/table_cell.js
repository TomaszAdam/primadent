import styled from "styled-components";

const TableCell = styled.div`
  cursor: pointer;
  padding: 12px 16px;
  background-color: ${({ header }) => (header ? "#F9FAFB" : "transparent")};
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export default TableCell;
