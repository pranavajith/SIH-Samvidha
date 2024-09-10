import './../../styles/HomePageUserLogInButtons.css';

const HomePageUserLogInButtons = () => {
    return (
        <div className="button-container">
            <a href="#signup" className="signup-button signup-login-button">Sign Up!</a>
            <br />
            <a href="#login" className="login-button signup-login-button">Already have an account? Log In</a>
        </div>
    );
}

export { HomePageUserLogInButtons };
