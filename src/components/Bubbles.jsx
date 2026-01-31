import React from 'react';
import { motion } from 'framer-motion';

const Bubbles = () => {
    const bubbles = Array.from({ length: 8 }); // Reduced for performance

    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0
        }}>
            {bubbles.map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: Math.random() * 80 + 40,
                        height: Math.random() * 80 + 40,
                        backgroundColor: 'rgba(0, 255, 157, 0.08)',
                        borderRadius: '50%',
                        bottom: '-150px',
                        left: `${Math.random() * 100}%`,
                        filter: 'blur(30px)',
                        willChange: 'transform, opacity' // Better performance
                    }}
                    animate={{
                        y: -1200,
                        opacity: [0, 0.3, 0],
                    }}
                    transition={{
                        duration: Math.random() * 12 + 12,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 8
                    }}
                />
            ))}
        </div>
    );
};

export default Bubbles;
