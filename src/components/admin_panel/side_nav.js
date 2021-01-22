import React, { useState } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import { auth } from "../../services/firebase_services";
import { FolderOpen, Folder } from "@styled-icons/boxicons-solid/";
import { Menu } from "@styled-icons/boxicons-regular/";
import { Close } from "@styled-icons/ionicons-solid/Close";
const StyledWrapper = styled.div`
  height: 100%;
  overflow-y: hidden;
  padding: 32px 80px 0;
  background-color: #004e6c;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  @media (max-width: 1200px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    position: fixed;
    z-index: 100;
    height: initial;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom: 24px;
  }
`;
const CloseIcon = styled(Close)`
  fill: white;
`;
const HamburgerMenu = styled.div`
  position: fixed;
  top: 16px;
  left: 16px;
  display: none;
  z-index: 200;
  cursor: pointer;
  & svg {
    width: 30px;
  }
  @media (max-width: 1200px) {
    display: block;
  }
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  align-items: flex-start;
  margin-top: 0;
  width: 100%;
  padding: 0;
`;

const StyledItemList = styled.li`
  margin: 12px 0;
  width: 100%;
  color: ${({ active }) => (active ? "white" : "rgba(255, 255, 255, 0.8)")};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1rem;
  position: relative;
  svg {
    width: 40px;
    fill: white;

    margin-right: 8px;
  }
  &:hover {
    opacity: 1;
    color: white;
    & svg {
      fill: white;
      opacity: 1;
      transition: all 0.2s;
    }
  }
`;

const StyledLogoutButton = styled.button`
  font-size: 16px;
  background: none;
  border: none;
  color: white;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: #cd6b5d;
  }
`;

const StyledParagraph = styled.p`
  color: #df6a5d;
  font-size: 16px;
  line-height: 18px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const StyledLine = styled.hr`
  width: 80%;
  color: #cd6b5d;
  margin-left: 0;
  color: white;
  margin: 32px 0;
  @media (max-width: 600px) {
    margin: 8px 0;
  }
`;
const StyledEmail = styled.p`
  color: white;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  position: relative;
`;

const StyledFolder = styled(FolderOpen)`
  opacity: 1;
`;

const ClosedFolder = styled(Folder)`
  opacity: 0.7;
`;
const SideNav = ({ currentUser, currentView, setCurrentView }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (view) => {
    setCurrentView(view);
    setOpen(false);
  };
  return (
    <>
      {open ? (
        <HamburgerMenu onClick={() => setOpen(false)}>
          <CloseIcon />
        </HamburgerMenu>
      ) : (
        <HamburgerMenu onClick={() => setOpen(true)}>
          {" "}
          <Menu />{" "}
        </HamburgerMenu>
      )}
      <StyledWrapper open={open}>
        <StyledEmail>{currentUser.email}</StyledEmail>
        <StyledLine />
        <div>
          <StyledParagraph>E-RECEPTY</StyledParagraph>

          <StyledList>
            <StyledItemList
              active={currentView === "new"}
              onClick={() => {
                handleClick("new");
              }}
            >
              {currentView === "new" ? <StyledFolder /> : <ClosedFolder />}
              nowe
            </StyledItemList>
            <StyledItemList
              active={currentView === "accepted"}
              onClick={() => {
                handleClick("accepted");
              }}
            >
              {currentView === "accepted" ? <StyledFolder /> : <ClosedFolder />}
              zaakceptowane
            </StyledItemList>

            <StyledItemList
              active={currentView === "paid"}
              onClick={() => {
                handleClick("paid");
              }}
            >
              {currentView === "paid" ? <StyledFolder /> : <ClosedFolder />}
              opłacone
            </StyledItemList>
            <StyledItemList
              active={currentView === "finished"}
              onClick={() => {
                handleClick("finished");
              }}
            >
              {currentView === "finished" ? <StyledFolder /> : <ClosedFolder />}
              zrealizowane
            </StyledItemList>
            <StyledItemList
              active={currentView === "rejected"}
              onClick={() => {
                handleClick("rejected");
              }}
            >
              {currentView === "rejected" ? <StyledFolder /> : <ClosedFolder />}
              odrzucone
            </StyledItemList>
          </StyledList>
        </div>
        <StyledLine />
        <StyledLogoutButton
          onClick={() => {
            auth.signOut().then(() => {
              navigate("/panel/login");
            });
          }}
        >
          wyloguj
        </StyledLogoutButton>
      </StyledWrapper>
    </>
  );
};

export default SideNav;
