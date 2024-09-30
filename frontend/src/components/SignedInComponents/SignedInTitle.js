import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../../styles/Title.css"; // Ensure this path is correct
import { UserContext } from "../../context/UserContext";

const SignedInTitle = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  console.log("SignedInTitle Rendered");
  console.log("User:", user);
  // console.log("Here!!", user.userProfileImage.path);

  return (
    <nav className="navbar">
      <Link to="/user">
        <h1 className="navbar-brand">Samvidhan</h1>
      </Link>
      <ul className="navbar-menu">
        <li className="navbar-item">
          {/* <Link to="/user/profile" className="navbar-button">
            Profile
          </Link> */}
        </li>
        <li className="navbar-item">
          <Link to="/user/leaderboard" className="navbar-button">
            Leaderboard
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/user/askAI" className="navbar-button">
            askAI
          </Link>
        </li>
        <li className="navbar-item">
          <div onClick={handleSignOut} className="navbar-button">
            Sign Out
          </div>
        </li>
        <li className="navbar-item">
          <Link to="/user/profile" className="navbar-profile">
            <img
              src={user.userProfileImage.path} // Ensure the image path is correct
              alt={`${user.firstName} ${user.lastName}`}
              className="navbar-profile-image"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export { SignedInTitle };
