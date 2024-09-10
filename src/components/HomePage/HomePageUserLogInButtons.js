import './../../styles/HomePageUserLogInButtons.css';
import { Link } from 'react-router-dom'; // Import Link for navigation


const HomePageUserLogInButtons = () => {
    return (
        <div className="button-container">
            <a href="#signup"><Link to="/signup" className="signup-login-button">Sign Up</Link></a>
            <br />
            <a href="#login" className="login-button signup-login-button">Already have an account? Log In</a>
        </div>
    );
}

export { HomePageUserLogInButtons };
