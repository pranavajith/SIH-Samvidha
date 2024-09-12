import "./../../styles/Title.css";
import { Link } from "react-router-dom";

const SignedInTitle = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1 className="navbar-brand">Samvidhan 2</h1>
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
          <Link to="/user/signout" className="navbar-button">
            Sign Out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export { SignedInTitle };
