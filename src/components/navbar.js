import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../images/logo.png";
import { navigate } from "gatsby";
//components
import MenuItem from "./menu_item";
const Navbar = styled.nav`
  padding: 5px;
  box-shadow: 3px 0 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  height: auto;
  top: 0;
  left: 0;
  background-color: white;
  max-width: 100vw;
  z-index: 999999;
  width: 100%;

  overflow-x: hidden;
  @media (max-width: 1000px) {
    flex-direction: column;
    bottom: ${({ isExpanded }) => (isExpanded ? "0" : "initial")};
    flex-wrap: nowrap;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;

const LogoImg = styled.img`
  width: 200px;
  height: 40px;
  margin-left: 48px;
  ${({ isExpanded }) =>
    isExpanded &&
    `
      position:absolute;
      top:16px;
      left:16px;
    `}
  @media (max-width: 1000px) {
    margin-left: 10px;
    align-self: flex-start;
  }
`;

const StyledMenu = styled.ul`
  display: flex;
  list-style: none;
  margin-right: 50px;
  flex-wrap: wrap;
  a {
    white-space: nowrap;
  }

  @media (max-width: 1000px) {
    width: 80%;
    padding-left: 0;
    padding-top: 50px;
    margin: 20px auto 0 auto;
    min-height: 100vh;
    flex-direction: column;
    display: ${({ isExpanded }) => (isExpanded ? "flex" : "none")};
    transition: all 0.2s;
    overflow: scroll;
    flex-wrap: nowrap;
    & a,
    div {
      display: inline-block;
      width: 100%;
      text-align: center;
      flex-wrap: nowrap;
      border: none;

      margin: 3px 0;
    }
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  width: 44px;
  height: 35px;
  padding: 6px 0;
  position: absolute;
  right: 40px;
  top: 8px;
  cursor: pointer;
  background-color: #ddd;
  & div {
    width: 70%;
    margin: 0 auto;
    height: 3px;
    background-color: #888;
    border-radius: 10px;
    transition: all 0.3s;
  }
  & div:first-child {
    display: ${({ isExpanded }) => (isExpanded ? "none" : "block")};
  }
  & div:nth-child(2) {
    ${({ isExpanded }) =>
      isExpanded &&
      `
      height:4px;
      transform:rotate(45deg) translate(3px,5px);
    `}
  }
  & div:nth-child(3) {
    ${({ isExpanded }) =>
      isExpanded &&
      `
      height:4px;
      transform:rotate(-45deg) translate(3px,-5px);
    `}
  }
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  @media (max-width: 400px) {
    right: 12px;
  }
`;

const NavBar = ({ links, isMainPage }) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <Navbar isExpanded={isExpanded}>
      <LogoImg
        isExpanded={isExpanded}
        src={logo}
        alt="primadent logo"
        onClick={() => navigate("/")}
      />
      <HamburgerIcon
        onClick={() => setExpanded(!isExpanded)}
        isExpanded={isExpanded}
      >
        <div></div>
        <div></div>
        <div></div>
      </HamburgerIcon>
      <StyledMenu isExpanded={isExpanded}>
        <MenuItem
          setExpanded={setExpanded}
          link={isMainPage ? "HOME" : "/"}
          text="STRONA GŁÓWNA"
        />

        {links
          ? links.map(({ nazwaMenu, linkMenu }, index) => (
              <MenuItem
                setExpanded={setExpanded}
                key={index}
                link={isMainPage ? linkMenu : `/#${linkMenu}`}
                text={nazwaMenu}
              />
            ))
          : null}

        <MenuItem
          setExpanded={setExpanded}
          link={isMainPage ? "CONTACT" : "/#CONTACT"}
          text="KONTAKT"
        />
        <MenuItem
          style={{
            border: "1px solid rgba(205, 107, 93, 1)",
            color: "rgba(205, 107, 93, 1)",
          }}
          setExpanded={setExpanded}
          link="https://rejestracja.przychodnia-primadent.pl"
          text="PORTAL PACJENTA"
        />
      </StyledMenu>
    </Navbar>
  );
};

export default NavBar;
