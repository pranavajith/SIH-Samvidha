import React, { useContext } from "react";
import { NotSignedInSection } from "./components/NotSignedInComponents/NotSignedInSection";
import { SignedInComponent } from "./components/SignedInComponents/SignedInComponent";
import { UserContext } from "./context/UserContext";
import { SplashScreen } from "./components/general-components/SplashScreen";

function App() {
  const UserProfile = null;

  const { user } = useContext(UserContext);

  return (
    <>
      {/* <SplashScreen /> */}
      {user ? <SignedInComponent /> : <NotSignedInSection />}
    </>
  );
}

export default App;
