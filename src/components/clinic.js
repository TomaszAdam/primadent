import React from "react";
import styled from "styled-components";
//components

import RoomNumber from "./room_number";
import DayHours from "./day_hours";
import DoctorInfo from "./doctor_info";
const StyledWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  width: 100%;
  display: grid;
  display: -ms-grid;
  grid-template-columns: 1fr 1fr 1fr;
  -ms-grid-columns: 1fr 1fr 1fr;
  margin-top: 24px;
  position: relative;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    & div {
      margin-top: 20px;
    }
  }
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;

  @media (max-width: 800px) {
    max-width: 50%;
  }
`;

const RoomList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 30px;
  max-width: 270px;
  & div {
    margin-right: 10px;
    margin-bottom: 10px;
  }
`;

const StyledParagraph = styled.p`
  max-width: 266px;
  margin-top: 0px;
`;

const OpenHoursTab = styled.div`
  display: flex;
  margin-bottom: 24px;
  margin-top: 8px;
  & div {
    margin-right: 18px;
  }
`;
const Anchor = styled.a`
  position: absolute;
  top: -100px;
`;

const StyledNamePart = styled.div`
  flex-shrink: 1;
  text-align: left;
  -ms-grid-column: 1;
  grid-column: 1;
  ul {
    margin-bottom: 48px;
  }
`;
const StyledRoomPart = styled.div`
  flex-shrink: 2;
  -ms-grid-column: 2;
  grid-column: 2;
`;
const StyledHoursPart = styled.div`
  flex-shrink: 3;
  -ms-grid-column: 3;
  grid-column: 3;
`;

const StyledMenuItem = styled.a`
  padding: 8px 16px;
  border: 1px solid rgba(205, 107, 93, 1);
  transition: 0.8s;
  cursor: pointer;
  text-decoration: none;
  color: rgba(205, 107, 93, 1);
  display: block;
  width: 135px;
  white-space: nowrap;

  &:hover {
    background-color: rgba(205, 107, 93, 1);
    color: black;
  }
`;
const ClinicTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & strong {
    margin-bottom: 16px;
  }
`;
const Clinic = ({
  clinicData: {
    node: {
      dniOtwarcia,
      eRejestracja,
      gabinety,
      lekarze,
      nfz,
      opisPrzychodni,
      rodzajePoradni,
      wizytyPrywatne,
      zdjeciePrzychodni,
    },
  },
}) => {
  return (
    <StyledWrapper>
      <Anchor id={`${rodzajePoradni[0].poradnia}`} />
      <StyledNamePart>
        <ClinicTitle>
          {rodzajePoradni.map((poradnia, index) => (
            <strong key={index}>{poradnia.poradnia}</strong>
          ))}
        </ClinicTitle>
        <ul>
          {opisPrzychodni.length > 0
            ? opisPrzychodni.map((przychodnia, index) => (
                <li key={index}>{przychodnia.dziedzinaPrzychodni}</li>
              ))
            : null}
        </ul>
        <br />
        {eRejestracja ? (
          <StyledMenuItem
            href="https://rejestracja.przychodnia-primadent.pl"
            rel="_nofollow"
            target="_blank"
          >
            PORTAL PACJENTA{" "}
          </StyledMenuItem>
        ) : null}
        {zdjeciePrzychodni == null ? null : (
          <StyledImage
            alt="zdjecie przychodni"
            src={zdjeciePrzychodni.fluid.src}
          />
        )}
      </StyledNamePart>
      <StyledRoomPart>
        <strong>GABINETY</strong>
        <RoomList>
          {gabinety
            ? gabinety.map((gabinet, index) => (
                <RoomNumber
                  key={index}
                  number={gabinet.nrGabinetu}
                ></RoomNumber>
              ))
            : null}
        </RoomList>
        {nfz ? <img alt="nfz logo" src="nfz.jpg" /> : null}
        {wizytyPrywatne ? (
          <img alt="wizyty prywatne ikona" src="private.jpg" />
        ) : null}
        {wizytyPrywatne && nfz ? (
          <StyledParagraph>
            Wizyty w ramach Narodowego Funduszu Zdrowia oraz wizyty prywatne.
          </StyledParagraph>
        ) : wizytyPrywatne ? (
          <StyledParagraph>Tylko wizyty prywatne.</StyledParagraph>
        ) : nfz ? (
          <StyledParagraph>
            Wizyty w ramach Narodowego Funduszu Zdrowia. Rejestracja
            telefoniczna lub w miejscu udzielania świadczeń.
          </StyledParagraph>
        ) : null}
      </StyledRoomPart>
      <StyledHoursPart>
        <strong>GODZINY PRZYJĘĆ</strong>

        <OpenHoursTab>
          {dniOtwarcia
            ? dniOtwarcia.map(
                ({ dzienTyogdnia, otwarcie, zamkniecie }, index) => (
                  <DayHours
                    key={index}
                    day={dzienTyogdnia}
                    open={otwarcie}
                    close={zamkniecie}
                  ></DayHours>
                )
              )
            : null}
        </OpenHoursTab>
        <strong>LEKARZE</strong>
        <p></p>
        {lekarze.map((lekarz, index) => (
          <DoctorInfo
            key={index}
            title={lekarz.specjalizacjaLekarza}
            name={lekarz.imieINazwisko}
          />
        ))}
      </StyledHoursPart>
    </StyledWrapper>
  );
};

export default Clinic;
