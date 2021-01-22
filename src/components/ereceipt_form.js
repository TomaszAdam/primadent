import React, { useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import SubmitMessage from "./submit_message";
import Spinner from "./spinner";
import { firestore } from "../services/firebase_services";

import ErrorMessage from "./error_message";
const StyledWrapper = styled.div`
  flex: 3;
  position: relative;

  box-shadow: 0 0 40px 10px #e1e1e1;
  padding: 8px 24px;
  background-color: ${({ message, error }) =>
    message ? (error ? "#F5CFCB" : "rgba(141,247,154,0.6)") : "white"};
`;

const StyledForm = styled.form``;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;

  font-weight: bold;
  p {
    margin-top: 0;
    margin-bottom: 5px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  grid-gap: 24px;
  margin: 24px 0;
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(${({ col }) => col}, 1fr);
  }
`;

const inputStyles = css`
  padding: 8px 16px;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
  font-family: "Open Sans", sans-serif;
  &:focus {
    box-shadow: 0 0 0 5px rgba(43, 237, 95, 0.3);
  }
`;
const StyledInput = styled.input(inputStyles);
const StyledTextArea = styled.textarea(inputStyles);

const SubmitInput = styled.input`
  text-align: center;
  border: 1px solid black;
  color: black;
  font-size: 18px;
  padding: 12px 0;
  background: transparent;
  margin-top: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: rgba(205, 107, 93, 1);
  }
`;

const RequiredField = styled.span`
  font-size: 15px;
  color: black;
  opacity: 0.6;
  font-weight: 400;
  margin-right: 0;
`;
const EReceiptForm = ({ extraFields }) => {
  const [phone, setPhone] = useState("");
  const [pesel, setPesel] = useState("");
  const [showMessage, setMessage] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [extraData, setExtraData] = useState([{ name: "", value: "" }]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");

  const [medicines, setMedicines] = useState("");
  const [error, setError] = useState({});

  // const handleExtraData = (index, event) => {
  //   const values = [...extraData];
  //   values[index].name = event.target.id;
  //   values[index].value = event.target.value;
  //   setExtraData(values);
  // };
  const SubmitForm = async (event) => {
    if (firstName === "" || !firstName.match(/^[\s\p{L}]+$/u)) {
      setError({ firstName: "proszę podać poprawne imię" });

      window.scrollTo(0, event.target[0].offsetTop + 100);
      return null;
    } else {
      setError({ firstName: "" });
    }
    if (lastName === "" || !lastName.replace("-", "").match(/^[\s\p{L}]+$/u)) {
      setError({ lastName: "proszę podać nazwisko" });
      window.scrollTo(0, event.target[1].offsetTop + 100);
      return null;
    } else {
      setError({ lastName: "" });
    }

    if (
      email === "" ||
      !email.match(
        /^[a-zA-Z-.-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      )
    ) {
      setError({ email: "proszę podać poprawny adres email" });
      window.scrollTo(0, event.target[2].offsetTop + 100);
      return null;
    } else {
      setError({ lastName: "" });
    }

    if (phone === "" || !phone.match(/^(?:[+\d].*\d|\d)$/)) {
      setError({ phone: "Nr telefonu może zawierać tylko cyfry" });
      window.scrollTo(0, event.target[3].offsetTop + 100);
      return null;
    } else {
      setError({});
    }

    if (pesel === "" || !pesel.match(/^[0-9]+$/) || pesel.length !== 11) {
      setError({
        pesel: "Pesel musi zawierać same cyfry i miec długość 11 znaków",
      });
      window.scrollTo(0, event.target[4].offsetTop + 100);
      return null;
    } else {
      setError({});
    }
    if (medicines === "") {
      setError({ medicines: "proszę podać potrzebne leki" });
      window.scrollTo(0, event.target[5].offsetTop + 100);
      return null;
    } else {
      setError({ medicines: "" });
    }

    const data = {
      phone,
      pesel,
      name: `${firstName} ${lastName}`,
      email: email,
      medicines: medicines,
      status: "new",
      createdAt: new Date().toDateString(),
      internalId: `${lastName.slice(0, 3).toUpperCase()} ${pesel.slice(
        6,
        10
      )}${new Date().getSeconds()} `,
    };

    setLoading(true);
    const newReceiptRef = await firestore.collection("recepty").doc();
    newReceiptRef
      .set(data)
      .then(() => {
        axios({
          method: "POST",
          url:
            "https://us-central1-primadent-d96de.cloudfunctions.net/webApi/primadent/sendConfirmEmail",
          headers: {
            "Content-Type": "Application/json",
          },
          data: {
            name: data.name,
            email: data.email,
            medicines: data.medicines,
            pesel: data.pesel,
            phone: data.phone,
            internalId: data.internalId,
          },
        })
          .then((res) => {
            setLoading(false);
            setMessage(true);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        setMessage(true);
        setSubmitError(true);
      });
  };

  return (
    <StyledWrapper message={showMessage} error={submitError}>
      {isLoading ? (
        <Spinner />
      ) : showMessage ? (
        <SubmitMessage error={submitError} />
      ) : (
        <>
          <h2>Zamów e-receptę</h2>
          <StyledForm
            onSubmit={(e) => {
              SubmitForm(e);
              e.preventDefault();
            }}
          >
            <FormRow col={2}>
              <StyledLabel htmlFor="name">
                <p>
                  IMIĘ <RequiredField>*</RequiredField>{" "}
                </p>
                <StyledInput
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setError({});
                  }}
                  name="firstname"
                  type="text"
                  id="name"
                  value={firstName}
                />
                {error.firstName ? (
                  <ErrorMessage>{error.firstName}</ErrorMessage>
                ) : null}
              </StyledLabel>
              <StyledLabel htmlFor="name">
                <p>
                  NAZWISKO <RequiredField>*</RequiredField>
                </p>
                <StyledInput
                  onChange={(e) => {
                    setlastName(e.target.value);
                    setError({});
                  }}
                  name="lastname"
                  type="text"
                  id="name"
                  value={lastName}
                />
                {error.lastName ? (
                  <ErrorMessage>{error.lastName}</ErrorMessage>
                ) : null}
              </StyledLabel>
            </FormRow>

            <FormRow col={1}>
              <StyledLabel htmlFor="email">
                <p>
                  ADRES E-MAIL <RequiredField>*</RequiredField>
                </p>
                <StyledInput
                  value={email}
                  name="email"
                  type="text"
                  id="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError({});
                  }}
                />
              </StyledLabel>
            </FormRow>
            {error.email ? <ErrorMessage>{error.email}</ErrorMessage> : null}
            <FormRow>
              <StyledLabel htmlFor="telefon">
                <p>
                  TELEFON <RequiredField>*</RequiredField>
                </p>
                <StyledInput
                  value={phone}
                  name="phone"
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setError({});
                  }}
                  type="tel"
                  id="telefon"
                />
              </StyledLabel>
            </FormRow>
            {error.phone ? <ErrorMessage>{error.phone}</ErrorMessage> : null}
            <FormRow col={1}>
              <StyledLabel htmlFor="pesel">
                <p>
                  PESEL <RequiredField>*</RequiredField>
                </p>
                <StyledInput
                  value={pesel}
                  name="pesel"
                  onChange={(e) => {
                    setPesel(e.target.value);
                    setError({});
                  }}
                  type="text"
                  id="pesel"
                />
              </StyledLabel>
            </FormRow>
            {error.pesel ? <ErrorMessage>{error.pesel}</ErrorMessage> : null}
            <FormRow col={1}>
              <StyledLabel id="medicines">
                <p>
                  POTRZEBNE LEKI <RequiredField>*</RequiredField>
                </p>
                <StyledTextArea
                  onChange={(e) => {
                    setMedicines(e.target.value);
                    setError({});
                  }}
                  name="medicines"
                  placeholder="wypisz leki jakie potrzebujesz"
                  id="medicines"
                ></StyledTextArea>
              </StyledLabel>
              {error.medicines ? (
                <ErrorMessage>{error.medicines}</ErrorMessage>
              ) : null}
              <StyledLabel>
                <RequiredField>* pole wymagane</RequiredField>
              </StyledLabel>
            </FormRow>

            {/* {extraFields.map(
              ({ wymagane, fieldName, helperText, duzePole }, index) => {
                if (duzePole) {
                  return (
                    <FormRow key={index}>
                      <StyledLabel htmlFor={fieldName}>
                        <p>{fieldName}</p>
                        <StyledTextArea
                          onChange={(event) => handleExtraData(index, event)}
                          required={wymagane}
                          id={fieldName}
                          placeholder={helperText}
                        ></StyledTextArea>
                      </StyledLabel>
                    </FormRow>
                  );
                }
                return (
                  <FormRow key={index}>
                    <StyledLabel htmlFor={fieldName}>
                      <p>{fieldName}</p>
                      <StyledInput
                        onChange={(event) => handleExtraData(index, event)}
                        required={wymagane}
                        id={fieldName}
                        placeholder={helperText}
                      ></StyledInput>
                    </StyledLabel>
                  </FormRow>
                );
              }
            )} */}

            <FormRow>
              <SubmitInput type="Submit" defaultValue="Wyślij" />
            </FormRow>
          </StyledForm>
        </>
      )}
    </StyledWrapper>
  );
};

export default EReceiptForm;

// /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
