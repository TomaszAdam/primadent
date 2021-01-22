import React, { useContext } from "react";
import { navigate } from "gatsby";

import { AuthContext } from "../services/authProvider";
const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // console.log("user undefined");
    navigate("/panel/login");
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
// && location.pathname !== "/panel/login"
