import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledMenuItem = styled.div`
  & a {
    text-decoration: none;
    color: inherit;
    margin: 0 10px;
    padding: 8px 16px;
    border: 1px solid black;
    transition: 0.8s;
    cursor: pointer;
    display: block;
    &:hover {
      background-color: rgba(205, 107, 93, 1);
    }
  }

  @media (max-width: 600px) {
    padding: 4px;
  }
`;
const MenuItem = ({ link, text, setExpanded, style = {} }) => {
  let isLocal = true;

  if (link.search("/") === -1) {
    link = "#".concat(link);
    isLocal = true;
  } else {
    isLocal = false;
  }
  return (
    <StyledMenuItem style={style} onClick={() => setExpanded(false)}>
      {isLocal ? (
        <Link to={link}>{text}</Link>
      ) : (
        <a target="_blank" href={link}>
          {text}
        </a>
      )}
    </StyledMenuItem>
  );
};

export default MenuItem;
