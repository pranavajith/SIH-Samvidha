import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!user) {
      setShouldRedirect(true);
    }
  }, [user]);
  if (shouldRedirect) {
    return <Navigate to="/signin" state={{ message: "Sign In to Continue" }} />;
  }

  return (
    <>
      {user ? (
        children
      ) : (
        <Navigate to="/signin" state={{ message: "Sign In to Continue" }} />
      )}
    </>
  );
};

export { ProtectedRoute };
