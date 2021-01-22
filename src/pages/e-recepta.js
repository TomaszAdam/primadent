import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";

// components
import NavBar from "../components/navbar";
import EReceiptForm from "../components/ereceipt_form";
import HowItWorks from "../components/how_it_works";

const StyledWrapper = styled.div`
  padding-top: 120px;
  margin: 0 auto;
  max-width: 1110px;
`;
const StyledContent = styled.div`
  display: flex;
  align-items: flex-start;
  grid-gap: 32px;
  width: 100%;
  @media (max-width: 760px) {
    flex-direction: column;
    align-items: stretch;
    & div {
      border-radius: 0px;
    }
  }
`;

const EReceiptPage = ({
  data: {
    allDatoCmsMenu: { nodes: menuList },
  },
}) => {
  return (
    <StyledWrapper>
      <StyledContent>
        <Layout />
        <NavBar links={menuList} isMainPage={false} />
        <HowItWorks />
        <EReceiptForm />
      </StyledContent>
    </StyledWrapper>
  );
};

export const query = graphql`
  {
    allDatoCmsMenu(sort: { fields: kolejnosc, order: ASC }) {
      nodes {
        nazwaMenu
        linkMenu
      }
    }
  }
`;

export default EReceiptPage;
