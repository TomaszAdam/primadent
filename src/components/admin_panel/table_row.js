import styled from "styled-components";

const TableRow = styled.div`
  display: ${({ hide }) => (hide ? "none" : "grid")};
  grid-template-columns: 0.5fr 0.7fr repeat(4, minmax(0, 1fr));
  width: 100%;
  word-wrap: break-word;
  word-break: break-word;
  background: ${({ expanded }) => (expanded ? "#E2E2E3" : "transparent")};

  @media (max-width: 1000px) {
    grid-template-columns: 0.7fr repeat(3, minmax(0, 1fr));
  }
`;

export default TableRow;
