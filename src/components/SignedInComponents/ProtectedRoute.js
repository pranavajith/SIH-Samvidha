import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ProtectedRoute = ({ children }) => {
  // const { user } = useContext(UserContext);
  // const [shouldRedirect, setShouldRedirect] = useState(false);

  // useEffect(() => {
  //   if (!user) {
  //     setShouldRedirect(true);
  //   }
  // }, [user]);

  // if (shouldRedirect) {
  //   return (
  //     <Navigate to="/signin" state={{ from: "protected", showBanner: true }} />
  //   );
  // }

  return children;
};

export { ProtectedRoute };
