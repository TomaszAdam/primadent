import React from "react";
import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]');
}
const GlobalStyle = createGlobalStyle`
   
    body {
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family: 'Open Sans', sans-serif;
        /* overflow-x: hidden; */
        font-size:15px;
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
    </Helmet>
    {children}
  </>
);

export default Layout;
