import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { SignedInTitle } from "./SignedInTitle";
import { UserContext } from "../../context/UserContext";
import { UserProfile } from "./UserProfile";
import { SplashScreen } from "../general-components/SplashScreen";
import UserHomePage from "./UserHomepage"; // Ensure this path is correct
import { Leaderboard } from "./Leaderboard";
import AskAI from "../chatbotComponents/AskAI"; // Import AskAI component
import { leaderboardData } from "../dummy-data/dummy-data"; // Ensure this path is correct

const SignedInComponent = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <SplashScreen
        text1={"Welcome"}
        text2={", " + user.firstName + " " + user.lastName}
      />
      <ProtectedRoute>
        <SignedInTitle />
      </ProtectedRoute>
      {/* <Routes>
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard data={leaderboardData} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/askAI"
          element={
            <ProtectedRoute>
              <AskAI />
            </ProtectedRoute>
          }
        />
      </Routes> */}
    </>
  );
};

export { SignedInComponent };
