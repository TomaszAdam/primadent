import React from "react";
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
`;

const LogoImg = styled.img`
  width: 200px;
  height: 40px;
`;

const StyledMenu = styled.ul`
  display: flex;
  list-style: none;
  margin-right: 50px;
`;

const NavBar = ({ links }) => {
  console.log(links);
  return (
    <Navbar>
      <LogoImg src={"logo.png"} />
      <StyledMenu>
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
