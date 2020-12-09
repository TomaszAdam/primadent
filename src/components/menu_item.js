import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledMenuItem = styled.div`
  margin: 0 10px;
  & a {
    text-decoration: none;
    color: inherit;
    padding: 8px 16px;
    border: 1px solid black;
    transition: 0.8s;
    &:hover {
      background-color: rgba(205, 107, 93, 1);
    }
  }
`;
const MenuItem = ({ link, text }) => {
  let isLocal = true;
  if (link.search("/") === -1) {
    link = "#".concat(link);
    isLocal = true;
  } else {
    isLocal = false;
  }
  return (
    <StyledMenuItem>
      {isLocal ? <Link to={link}>{text}</Link> : <a href={link}>{text}</a>}
    </StyledMenuItem>
  );
};

export default MenuItem;
