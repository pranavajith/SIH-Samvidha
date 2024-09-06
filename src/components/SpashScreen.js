import React, { useEffect, useState } from 'react';
import './../styles/SplashScreen.css';

const SplashScreen = () => {
    const [active, setActive] = useState(false); // Control 'active' class
    const [fade, setFade] = useState(false);     // Control 'fade' class
    const [hideIntro, setHideIntro] = useState(false); // Control hiding the intro

    useEffect(() => {
        // This is equivalent to DOMContentLoaded event
        const logoSpan = document.querySelectorAll('.logo');

        // Activate each logo span with staggered effect
        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.add('active');
                }, (idx + 1) * 400);
            });
        }, 100); // Start after a slight delay

        // Remove 'active' class and add 'fade' class
        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50);
            });
        }, 2000); // Fade out after 2 seconds

        // Hide the splash screen after the animation
        setTimeout(() => {
            setHideIntro(true); // Move the splash screen up
        }, 2300); // Move up after 2.3 seconds
    }, []);

    return (
        <div className={`intro ${hideIntro ? 'hide' : ''}`}>
            <div className="logo-header">
                <span className="logo">Sam</span><span className="logo">vidhan.</span>
            </div>
        </div>
    );
};

export { SplashScreen };
