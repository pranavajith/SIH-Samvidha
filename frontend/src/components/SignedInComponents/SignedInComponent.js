import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { SignedInTitle } from "./SignedInTitle";
import { UserContext } from "../../context/UserContext";
import { UserProfile } from "./UserProfile";
import { SplashScreen } from "../general-components/SplashScreen";
import { SoloGamePlay } from "./SoloGamePlay"; // Ensure this path is correct
import { Leaderboard } from "./Leaderboard";
import AskAI from "../chatbotComponents/AskAI"; // Import AskAI component
import Dashboard from "./Dashboard";
import MultiGamePlay from "./MultiGamePlay";
import CreateLobby from "./CreateLobby";
import { WaitingLobby } from "./WaitingLobby";
import JoinLobby from "./JoinLobby";
import { GameLobby } from "./GameLobby";

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
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/singleplayer"
          element={
            <ProtectedRoute>
              <SoloGamePlay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createlobby"
          element={
            <ProtectedRoute>
              <CreateLobby />
            </ProtectedRoute>
          }
        />
        <Route
          path="/waitinglobby"
          element={
            <ProtectedRoute>
              <WaitingLobby />
            </ProtectedRoute>
          }
        />
        <Route
          path="/joinlobby"
          element={
            <ProtectedRoute>
              <JoinLobby />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gamelobby"
          element={
            <ProtectedRoute>
              <GameLobby />
            </ProtectedRoute>
          }
        />
        <Route
          path="/multiplayer"
          element={
            <ProtectedRoute>
              <MultiGamePlay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
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
      </Routes>
    </>
  );
};

export { SignedInComponent };
