import React, { useContext } from "react";
import { NotSignedInSection } from "./components/NotSignedInComponents/NotSignedInSection";
import { SignedInComponent } from "./components/SignedInComponents/SignedInComponent";
import { UserContext } from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);
  return <>{user ? <SignedInComponent /> : <NotSignedInSection />}</>;
}

export default App;
