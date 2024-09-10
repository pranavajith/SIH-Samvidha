import './../../styles/Title.css';
import { Link } from 'react-router-dom'; // Import Link for navigation

const TitleBar = () => {
    return (
        <nav className="navbar">
            <Link to="/"><h1 className="navbar-brand">Samvidhan</h1></Link>
            <ul className="navbar-menu">
                <li>

            <Link to="/about" className="navbar-button">About</Link>
                </li>
                    
                {/* Use Link instead of <a> for routing */}
                <li className="navbar-item">
                    <Link to="/demo" className="navbar-button">Try a demo!</Link>
                </li>
                <li className="navbar-item"><Link to="/signin" className="navbar-button">Sign In</Link></li>
            </ul>
        </nav>
    );
};

export { TitleBar };
