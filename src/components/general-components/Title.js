import './../../styles/Title.css';
import { Link } from 'react-router-dom'; // Import Link for navigation

const TitleBar = () => {
    return (
        <nav className="navbar">
            <Link to="/"><h1 className="navbar-brand">Samvidhan</h1></Link>
            <ul className="navbar-menu">
                <li className="navbar-item"><a href="#about" className="navbar-button">About</a></li>
                {/* Use Link instead of <a> for routing */}
                <li className="navbar-item">
                    <Link to="/demo" className="navbar-button">Try a demo!</Link>
                </li>
                <li className="navbar-item"><a href="#signin" className="navbar-button">Sign In</a></li>
            </ul>
        </nav>
    );
};

export { TitleBar };
