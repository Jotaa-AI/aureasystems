import React, { useEffect, useState } from 'react';
import './Loader.css';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const brandName = "AUREA SYSTEMS".split("");

  useEffect(() => {
    // Exact 3 seconds of animation before starting fade out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Wait for fade out animation to finish before notifying parent
      setTimeout(() => {
        onComplete();
      }, 800); // 800ms fade out duration
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`loader-container ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="loader-logo">
        {brandName.map((char, index) => (
          <span 
            key={index} 
            className="loader-char" 
            style={{ 
              animationDelay: `${0.1 + (index * 0.15)}s`,
              marginRight: char === " " ? "1rem" : "0"
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="loader-progress-bar">
        <div className="loader-progress-fill"></div>
      </div>
    </div>
  );
};

export default Loader;
