import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { SignedInTitle } from "./SignedInTitle";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { UserProfile } from "./UserProfile";
import { SplashScreen } from "../general-components/SplashScreen";
import { UserProgress } from "./UserProgress";
import TypeGame from "./TypeGame";
import { leaderboardData, TypeGameData } from "../dummy-data/dummy-data";
import UserHomePage from "./UserHomepage";
import { Leaderboard } from "./Leaderboard";

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
      <Routes>
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
      </Routes>
    </>
  );
};

export { SignedInComponent };
