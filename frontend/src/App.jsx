import React, { useContext } from "react";
import { NotSignedInSection } from "./components/NotSignedInComponents/NotSignedInSection";
import { SignedInComponent } from "./components/SignedInComponents/SignedInComponent";
import { UserContext } from "./context/UserContext";
// import { useTranslation } from "react-i18next";
// can add icons to timeline
// can add learn more button at end
import "./utils/i18n";

function App() {
  const { user } = useContext(UserContext);
  return <>{user ? <SignedInComponent /> : <NotSignedInSection />}</>;
}

export default App;