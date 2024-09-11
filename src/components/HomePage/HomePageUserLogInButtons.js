import "./../../styles/HomePageUserLogInButtons.css";
import { Link } from "react-router-dom"; // Import Link for navigation

const HomePageUserLogInButtons = () => {
  return (
    <div className="button-container">
      <Link to="/signup" className="signup-login-button">
        Sign Up
      </Link>
      <br />
      <Link to="/signin" className="signup-login-button login-button">
        Already have an account? Log In
      </Link>
    </div>
  );
};

export { HomePageUserLogInButtons };
