import { useContext } from "react";
import "./../../styles/Title.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const SignedInTitle = () => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

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
          <Link to="/user/profile" className="navbar-button">
            Profile
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/user/leaderboard" className="navbar-button">
            Leaderboard
          </Link>
        </li>
        <li className="navbar-item">
          <div onClick={handleSignOut} className="navbar-button">
            Sign Out
          </div>
        </li>
      </ul>
    </nav>
  );
};

export { SignedInTitle };
