import { useContext } from "react";
import "./../../styles/Title.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const SignedInTitle = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);

  const handleSignOut = () => {
    logout();
    navigate("/");
  };
  return (
    <nav className="navbar">
      <Link to="/">
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
              src={user.userProfileImage.path} // Assuming the profile image is available in userData
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
