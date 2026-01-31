import React from 'react';
import { useLocation } from 'react-router-dom';

const BackgroundSlideshow = () => {
    const location = useLocation();
    const isLanding = location.pathname === '/';

    if (!isLanding) return null;

    return (
        <div className="slideshow-container" style={{ position: 'fixed', inset: 0, zIndex: -2, overflow: 'hidden' }}>
            <div
                style={{
                    backgroundImage: 'url(/eco_illustration.jpg)',
                    position: 'absolute',
                    inset: 0,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Overlay for text readability */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(4, 30, 21, 0.4)',
                    backdropFilter: 'blur(2px)',
                    zIndex: -1,
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};

export default BackgroundSlideshow;
