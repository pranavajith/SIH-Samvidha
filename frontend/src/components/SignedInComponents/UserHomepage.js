import React, { useState } from "react";
import { UserProgress } from "./UserProgress";
import "./../../styles/UserHomePage.css"; // Import the CSS file
import UserGameplay from "./UserGameplay";

export const UserHomePage = () => {
  return (
    <div className="user-homepage-container">
      <UserProgress />
      <UserGameplay />
    </div>
  );
};

export default UserHomePage;
