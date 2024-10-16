import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../../styles/Title.css"; // Ensure this path is correct
import { UserContext } from "../../context/UserContext";
import { useNarration } from "../../context/NarrationContext"; // Import the narration context
import { getNarrationText } from "../../utils/narrationData"; // Import your narration data

const SignedInTitle = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);
  const { isNarrationActive, toggleNarration, narrate } = useNarration(); // Get narration context

  const handleSignOut = () => {
    narrate(getNarrationText('SignOut')); // Example narration text for sign out
    logout();
    navigate("/");
  };

  const handleNarrate = (textKey) => {
    narrate(getNarrationText(textKey)); // Get narration text based on the key
  };

  return (
    <nav className="navbar">
      <Link to="/user">
        <h1 className="navbar-brand">Samvidhan</h1>
      </Link>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link 
            to="/user/leaderboard" 
            className="navbar-button" 
            onClick={() => handleNarrate('Leaderboard')}
          >
            Leaderboard
          </Link>
        </li>
        <li className="navbar-item">
          <Link 
            to="/user/askAI" 
            className="navbar-button" 
            onClick={() => handleNarrate('AskAI')}
          >
            askAI
          </Link>
        </li>
        <li className="navbar-item">
          <div onClick={handleSignOut} className="navbar-button">
            Sign Out
          </div>
        </li>
        <li className="navbar-item">
          <Link 
            to="/user/profile" 
            className="navbar-profile"
            onClick={() => handleNarrate('Profile')}
          >

            <img
              src={user.userProfileImage.path}
              alt={`${user.firstName[0]} ${user.lastName[0]}`}
              className="navbar-profile-image"
            />
          </Link>
        </li>
      </ul>
      <button onClick={toggleNarration} className="navbar-button">
        {isNarrationActive ? "Stop Narration" : "Start Narration"}
      </button>
    </nav>
  );
};

export { SignedInTitle };
