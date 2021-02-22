import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../services/authProvider";
import { firestore } from "../services/firebase_services";

//components

import SideNav from "./admin_panel/side_nav";
import Spinner from "./spinner";

import RightPanel from "./admin_panel/right_panel";
export const DataContext = React.createContext();

const StyledContainer = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100vh;
  & h1 {
    margin-top: 0;
  }
`;
const AdminPanel = () => {
  const [currentView, setCurrentView] = useState("new");
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsibscribe = firestore
      .collection("recepty")
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          let dataArray = [];
          snapshot.forEach((doc) => {
            dataArray.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setData(dataArray);
          setLoading(false);
          //console.log(dataArray);
        } else {
          console.log("empty collection");
          setData([]);
          setLoading(false);
        }
      });
    return () => {
      unsibscribe();
    };
  }, []);
  return (
    <DataContext.Provider value={data}>
      <StyledContainer>
        <SideNav
          currentUser={currentUser}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />

        {loading ? (
          <Spinner />
        ) : (
          <RightPanel currentView={currentView}> </RightPanel>
        )}
      </StyledContainer>
    </DataContext.Provider>
  );
};

export default AdminPanel;

// nowe
// zatwierdzone
// odrzucone
// oczekujące
