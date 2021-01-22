import React, { useEffect } from "react";

import { Router } from "@reach/router";
import Layout from "../components/layout";
import Login from "../components/login";
import AdminPanel from "../components/admin_panel";
import PrivateRoute from "../components/privateRoute";
import { AuthProvider } from "../services/authProvider";
const Panel = () => {
  useEffect(() => {});

  return (
    <>
      <Layout />
      <AuthProvider>
        <Router>
          <PrivateRoute path="/panel/admin" component={AdminPanel} />

          <Login path="/panel/login" />
        </Router>
      </AuthProvider>
    </>
  );
};

export default Panel;
