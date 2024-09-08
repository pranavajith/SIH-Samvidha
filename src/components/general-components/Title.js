import './../../styles/Title.css';

const TitleBar = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar-brand">Samvidhan</h1>
            <ul className="navbar-menu">
                <li className="navbar-item"><a href="#about">About</a></li>
                <li className="navbar-item"><a href="#queries">Queries</a></li>
                <li className="navbar-item"><a href="#contact">Contact</a></li>
                <li className="navbar-item"><a href="#signin">Sign In</a></li>
            </ul>
        </nav>
    )
};

export { TitleBar };
