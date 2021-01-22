import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UpArrowAlt } from "@styled-icons/boxicons-regular";
import { Link } from "gatsby";

const arrowRef = React.createRef();

const StyledContainer = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 100000;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s;
  transform: ${({ visible }) => (visible ? "scale(1)" : "scale(0)")};
  cursor: pointer;
  &:hover {
    background-color: #cd6b5d;

    & svg {
      transform: scale(1.1);
    }
  }
`;
const StyledArrow = styled(UpArrowAlt)`
  width: 50px;
  height: 50px;
  transition: all 0.3s;
  fill: black;
`;

const UpArrow = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e) => {
    if (window.scrollY > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  return (
    <StyledContainer visible={visible} ref={arrowRef}>
      <Link to="#HOME">
        <StyledArrow />
      </Link>
    </StyledContainer>
  );
};

export default UpArrow;
