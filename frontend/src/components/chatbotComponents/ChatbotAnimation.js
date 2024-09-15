import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from './Animation - 1726408998335.json';

const ChatbotAnimation = () => {
    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            animationData,
            renderer: 'svg',
            loop: true,
            autoplay: true,
        });

        // Cleanup on component unmount
        return () => lottie.stop();
    }, []);

    return (
        <div className="animation-container" ref={container}></div>
    );
};

export default ChatbotAnimation;
