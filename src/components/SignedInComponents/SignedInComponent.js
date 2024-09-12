import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { SignedInTitle } from "./SignedInTitle";

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
