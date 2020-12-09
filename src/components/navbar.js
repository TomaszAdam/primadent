import React, { useState } from "react";
import styled from "styled-components";

//components
import MenuItem from "./menu_item";
const Navbar = styled.nav`
  padding: 12px;

  box-shadow: 3px 0 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;

  top: 0;
  left: 0;
  background-color: white;
  width: 100vw;
  z-index: 999999;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const LogoImg = styled.img`
  width: 200px;
  height: 40px;
  margin-left: 48px;
  align-self: flex-start;

  @media (max-width: 600px) {
    margin-left: 10px;
  }
`;

const StyledMenu = styled.ul`
  display: flex;
  list-style: none;
  margin-right: 50px;

  @media (max-width: 990px) {
    & a {
      display: inline-block;
      width: 100%;
      text-align: right;
      flex-wrap: wrap;
    }
    flex-direction: column;
    width: 50%;
    margin-top: 60px;
    display: ${({ isExpanded }) => (isExpanded ? "flex" : "none")};
    transition: all 0.2s;
  }
  @media (max-width: 600px) {
    width: 80%;
    padding-left: 0;
    margin: 20px auto 0 5px;
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  width: 44px;
  height: 25px;
  padding: 6px 0;
  position: absolute;
  right: 40px;
  top: 10px;
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
      transform:rotate(45deg) translate(5px,5px);
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
  @media (max-width: 990px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

const NavBar = ({ links }) => {
  const [isExpanded, setExpanded] = useState(false);
  console.log(links);
  return (
    <Navbar>
      <LogoImg src={"logo.png"} />
      <HamburgerIcon
        onClick={() => setExpanded(!isExpanded)}
        isExpanded={isExpanded}
      >
        <div></div>
        <div></div>
        <div></div>
      </HamburgerIcon>
      <StyledMenu isExpanded={isExpanded}>
        <MenuItem link="HOME" text="HOME" />

        {links
          ? links.map(({ nazwaMenu, linkMenu }, index) => (
              <MenuItem key={index} link={linkMenu} text={nazwaMenu} />
            ))
          : null}
        <MenuItem link="CONTACT" text="KONTAKT" />
        <MenuItem link="" text="E-RECEPTA" />
      </StyledMenu>
    </Navbar>
  );
};

export default NavBar;
