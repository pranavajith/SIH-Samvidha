// MainComponents.js

import './../styles/MainComponents.css';

const lockImageUrl = 'https://www.freeiconspng.com/thumbs/lock-icon/lock-icon-11.png';

const Component1 = () => {
    return (
        <a href="#" className="component full-width">
            <div className="overlay">
                <p className="component-text">Preamble</p>
            </div>
        </a>
    );
};

export { Component1 };

const Component2 = () => {
    return (
        <a href="#" className="component third-width component-2">
            <div className="overlay overlay-locked">
                <img src={lockImageUrl} alt="Locked" className="lock-icon" />
                <p className="component-text">Legislature</p>
            </div>
        </a>
    );
};

export { Component2 };

const Component3 = () => {
    return (
        <a href="#" className="component third-width component-3">
            <div className="overlay overlay-locked">
                <img src={lockImageUrl} alt="Locked" className="lock-icon" />
                <p className="component-text">Executive</p>
            </div>
        </a>
    );
};

export { Component3 };

const Component4 = () => {
    return (
        <a href="#" className="component third-width component-4">
            <div className="overlay overlay-locked">
                <img src={lockImageUrl} alt="Locked" className="lock-icon" />
                <p className="component-text">Judiciary</p>
            </div>
        </a>
    );
};

export { Component4 };
