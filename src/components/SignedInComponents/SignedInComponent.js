import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { SignedInTitle } from "./SignedInTitle";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { UserProfile } from "./UserProfile";
import { SplashScreen } from "../general-components/SplashScreen";

const SignedInComponent = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <SplashScreen
        text1={"Welcome"}
        text2={", " + user.firstName + " " + user.lastName}
      />
      {/* <Router> */}
      <ProtectedRoute>
        <SignedInTitle />
      </ProtectedRoute>
      <Routes>
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* </Router> */}
    </>
  );
};

export { SignedInComponent };
