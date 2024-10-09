import React from "react";
import { Routes, Route } from "react-router-dom";
import { TitleBar } from "./../general-components/Title";
import { SplashScreen } from "../general-components/SplashScreen";
import { HomePage } from "./HomePage/HomePage";
import { QuestionDisplay } from "../general-components/QuestionDisplay";
import { ConstitutionTimeline } from "./ConstitutionTimeline";
import AboutUs from "./AboutUs";
import Signup from "./SignUp";
import SignIn from "./SignIn";
import { useTranslation } from "react-i18next";
// can add icons to timeline
// can add learn more button at end
import "./../../utils/i18n";
const NotSignedInSection = () => {
  // const location = useLocation();
  // const isUserRoute = location.pathname.startsWith("/user");

  // if (isUserRoute) {
  //   return <Navigate to="/signin" state={{ message: "Sign in to continue" }} />;
  // }
  const { t } = useTranslation();
  return (
    <>
      <SplashScreen text1={t("Sam")} text2={t("vidhan")} />
      <TitleBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<QuestionDisplay />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/timeline" element={<ConstitutionTimeline />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
};

export { NotSignedInSection };
