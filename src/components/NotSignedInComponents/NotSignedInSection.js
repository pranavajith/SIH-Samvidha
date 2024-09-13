import React from "react";
import "./../../App.css";
import { TitleBar } from "./../general-components/Title.js";
import { SplashScreen } from "../general-components/SplashScreen.js";
import { HomePage } from "./HomePage/HomePage.js";
import { QuestionDisplay } from "../general-components/QuestionDisplay.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConstitutionTimeline } from "./ConstitutionTimeline.js";
import AboutUs from "./AboutUs.js";
import Signup from "./SignUp.js";
import SignIn from "./SignIn.js";
import { UserProfile } from "../SignedInComponents/UserProfile.js";
import { ProtectedRoute } from "../SignedInComponents/ProtectedRoute.js";

const NotSignedInSection = () => {
  return (
    <>
      <SplashScreen text1={"Sam"} text2={"vidhan."} />
      <Router>
        <div>
          <TitleBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demo" element={<QuestionDisplay />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/timeline" element={<ConstitutionTimeline />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/user/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export { NotSignedInSection };
