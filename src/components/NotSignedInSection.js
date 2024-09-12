import React from "react";
import "./../App.css";
import { TitleBar } from "./general-components/Title.js";
import { SplashScreen } from "./SplashScreen";
import { HomePage } from "./HomePage/HomePage.js";
import { QuestionDisplay } from "./QuestionDisplay"; // Import your QuestionDisplay component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConstitutionTimeline } from "./ConstitutionTimeline";
import AboutUs from "./AboutUs";
import Signup from "./SignUp.js";
import SignIn from "./SignIn.js";

const NotSignedInSection = () => {
  const UserProfile = null;
  return (
    <Router>
      <div>
        <SplashScreen />
        <TitleBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/demo" element={<QuestionDisplay />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/timeline" element={<ConstitutionTimeline />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
};

export { NotSignedInSection };
