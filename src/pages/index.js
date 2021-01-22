import "react-app-polyfill/ie11";
import * as React from "react";
import { graphql } from "gatsby";
import { CookiesProvider } from "react-cookie";
import styled from "styled-components";
// components
import Layout from "../components/layout.js";
import NavBar from "../components/navbar.js";
import HeroImage from "../components/hero_image";
import PlaceDescription from "../components/place_description";
import ContactSection from "../components/contact_section";
import ClinicList from "../components/clinic_list";
import UpArrow from "../components/up_arrow";
import OptionalText from "../components/optionalText";
// import CookieBar from "../components/CookieBar";
// markup

const Content = styled.div`
  width: 100%;
  background-color: white;
`;

const StyledMain = styled.main``;
const IndexPage = ({
  data: {
    allDatoCmsKontakt: { nodes },
    allDatoCmsPoradnie: { edges: clinicList },
    allDatoCmsMenu: { nodes: menuList },
  },
}) => {
  const contactData = nodes[0];
  const {
    adres: address,
    telefon: phoneNumber,
    mail: email,
    opisPrzychodni: description,
    linkFb,
    eRejestracjaLink: eRegisterLink,
    optionalText,
  } = contactData;

  return (
    <CookiesProvider>
      <StyledMain>
        <Layout></Layout>
        <NavBar links={menuList} isMainPage={true} />
        <HeroImage
          address={address}
          phoneNumber={phoneNumber}
          FBLink={linkFb}
          eRegisterLink={eRegisterLink}
        />
        <Content>
          {optionalText ? <OptionalText text={optionalText} /> : null}
          <PlaceDescription description={description} />
          <ClinicList clinicList={clinicList} />
          <ContactSection
            FBLink={linkFb}
            phoneNumber={phoneNumber}
            email={email}
            address={address}
          />
          {/* <CookieBar /> */}
          <UpArrow />
        </Content>
      </StyledMain>
    </CookiesProvider>
  );
};

export default IndexPage;

export const query = graphql`
  {
    allDatoCmsMenu(sort: { fields: kolejnosc, order: ASC }) {
      nodes {
        nazwaMenu
        linkMenu
        kolejnosc
      }
    }
    allDatoCmsPoradnie(sort: { fields: order, order: ASC }) {
      edges {
        node {
          eRejestracja
          gabinety {
            nrGabinetu
          }
          nfz
          wizytyPrywatne
          zdjeciePrzychodni {
            fluid {
              src
            }
          }
          rodzajePoradni {
            poradnia
          }
          opisPrzychodni {
            dziedzinaPrzychodni
          }
          lekarze {
            imieINazwisko
            specjalizacjaLekarza
          }
          dniOtwarcia {
            dzienTyogdnia
            otwarcie
            zamkniecie
          }
        }
      }
    }
    allDatoCmsKontakt {
      nodes {
        adres
        linkFb
        mail
        opisPrzychodni
        telefon
        eRejestracjaLink
        optionalText
      }
    }
  }
`;
