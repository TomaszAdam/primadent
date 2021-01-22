import React from "react";
import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import CookieConsent from "react-cookie-consent";
if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]');
}
const GlobalStyle = createGlobalStyle`
   * {
     box-sizing:border-box;
   }
    body {
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family: 'Open Sans', sans-serif;
        /* overflow-x: hidden; */
        font-size:15px;
        scroll-behavior:smooth;
        height:100vh;
    }
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <Helmet>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <script src="https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js"></script>
    </Helmet>
    <CookieConsent
      style={{ background: "white", textAlign: "center", color: "black" }}
      buttonStyle={{ color: "white", background: "#0A5471" }}
      location="bottom"
      buttonText="Zgadzam się"
      declineButton="Odmawiam"
      cookieName="gatsby-gdpr-google-analytics"
    >
      W troce o jakość świadczonych usług strona korzysta z ciasteczek
      monitorując ruch użytkowników na stronie, nie zbieramy żadnych wrażliwych
      danych sosobowych
    </CookieConsent>
    {children}
  </>
);

export default Layout;
