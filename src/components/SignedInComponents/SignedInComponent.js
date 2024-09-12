import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { SignedInTitle } from "./SignedInTitle";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const SignedInComponent = () => {
  return (
    <Router>
      <ProtectedRoute>
        <SignedInTitle />
      </ProtectedRoute>
      <Routes></Routes>
    </Router>
  );
};

export { SignedInComponent };
