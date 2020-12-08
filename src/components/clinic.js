import React from "react";
import styled from "styled-components";
//components
import MenuItem from "./menu_item";
import RoomNumber from "./room_number";
import DayHours from "./day_hours";
import DoctorInfo from "./doctor_info";
const StyledWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  width: 100%;
  display: grid;
  grid-template-columns: 0 1fr 1fr 1fr;
  margin-top: 24px;
`;

const StyledImage = styled.img`
  max-width: 360px;
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
  & div {
    margin-right: 18px;
  }
`;
const Anchor = styled.div`
  width: 0;
  height: 0;
  transform: translateY(-200px);
`;

const StyledNamePart = styled.div``;
const StyledRoomPart = styled.div``;
const StyledHoursPart = styled.div``;
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
      <Anchor id={`${rodzajePoradni[0].poradnia}`}></Anchor>
      <StyledNamePart>
        {rodzajePoradni.map((poradnia, index) => (
          <strong key={index}>{poradnia.poradnia}</strong>
        ))}
        <ul>
          {opisPrzychodni.map((przychodnia, index) => (
            <li key={index}>{przychodnia.dziedzinaPrzychodni}</li>
          ))}
        </ul>
        <br />
        {eRejestracja ? (
          <MenuItem
            text="E-REJESTRACJA"
            link="https://primadent.optimed24.pl/olr/page/index.xhtml"
          />
        ) : null}
        {zdjeciePrzychodni == null ? null : (
          <StyledImage src={zdjeciePrzychodni.fluid.src} />
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
        {nfz ? <img src="nfz.jpg" /> : null}
        {wizytyPrywatne ? <img src="private.jpg" /> : null}
        {wizytyPrywatne && nfz ? (
          <StyledParagraph>
            Wizyty w ramach Narodowego Funduszu Zdrowia oraz wizyty prywatne.
          </StyledParagraph>
        ) : wizytyPrywatne ? (
          <StyledParagraph>Tylko wizyty prywatne.</StyledParagraph>
        ) : nfz ? (
          <StyledParagraph>
            Wizyty w ramach Narodowego Funduszu Zdrowia.
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
