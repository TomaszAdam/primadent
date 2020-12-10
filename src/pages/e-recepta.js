import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";

// components
import NavBar from "../components/navbar";
import EReceiptForm from "../components/ereceipt_form";

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  padding-top: 120px;
  margin: 0 auto;
  max-width: 1110px;
`;
const EReceiptPage = () => {
  return (
    <StyledWrapper>
      <Layout />
      <NavBar isMainPage={false} />
      <EReceiptForm />
    </StyledWrapper>
  );
};

export default EReceiptPage;
