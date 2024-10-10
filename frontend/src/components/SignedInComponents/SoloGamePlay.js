import React from "react";
import { UserProgress } from "./UserProgress";
import "./../../styles/UserHomePage.css";
import { UserDisplayWithGame } from "./UserDisplayWithGame";

export const SoloGamePlay = () => {
  return (
    <div className="user-homepage-container">
      <UserProgress />
      <UserDisplayWithGame />
    </div>
  );
};

export default SoloGamePlay;
