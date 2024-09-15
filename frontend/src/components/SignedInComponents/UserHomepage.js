import React, { useState } from "react";
import { UserProgress } from "./UserProgress";
import "./../../styles/UserHomePage.css"; // Import the CSS file
import UserGameplay from "./UserGameplay";
import { UserDisplayWithGame } from "./UserDisplayWithGame";

export const UserHomePage = () => {
  return (
    <div className="user-homepage-container">
      <UserProgress />
      <UserDisplayWithGame />
    </div>
  );
};

export default UserHomePage;
