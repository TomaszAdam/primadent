import * as React from "react";
import { graphql } from "gatsby";
// components
import Layout from "../components/layout.js";
import NavBar from "../components/navbar.js";
import HeroImage from "../components/hero_image";
import PlaceDescription from "../components/place_description";
import ContactSection from "../components/contact_section";
import ClinicList from "../components/clinic_list";
// markup
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
  } = contactData;
  console.log(eRegisterLink);
  return (
    <main>
      <Layout></Layout>
      <NavBar links={menuList} />
      <HeroImage
        address={address}
        phoneNumber={phoneNumber}
        FBLink={linkFb}
        eRegisterLink={eRegisterLink}
      />
      <PlaceDescription description={description} />
      <ClinicList clinicList={clinicList} />
      <ContactSection
        FBLink={linkFb}
        phoneNumber={phoneNumber}
        email={email}
        address={address}
      />
    </main>
  );
};

export default IndexPage;

export const query = graphql`
  {
    allDatoCmsMenu {
      nodes {
        nazwaMenu
        linkMenu
      }
    }
    allDatoCmsPoradnie {
      edges {
        node {
          dniOtwarcia {
            dzienTyogdnia
            otwarcie
            zamkniecie
          }
          eRejestracja
          gabinety {
            nrGabinetu
          }
          lekarze {
            imieINazwisko
            specjalizacjaLekarza
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
      }
    }
  }
`;
