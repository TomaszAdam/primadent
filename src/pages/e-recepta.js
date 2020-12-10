import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";

// components
import NavBar from "../components/navbar";
import EReceiptForm from "../components/ereceipt_form";
import SubmitForm from "../components/submit_form";
import HowItWorks from "../components/how_it_works";

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 32px;
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
      <SubmitForm />
      <HowItWorks />
    </StyledWrapper>
  );
};

export default EReceiptPage;
