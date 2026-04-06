import React, { useEffect, useState } from 'react';
import './Loader.css';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

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
        <img src="https://assets.cdn.filesafe.space/ju5vSpTX0hpH3uI8cPSE/media/69d3aa6f4cde4bbc2a007b40.png" alt="Aurea Systems" className="loader-logo-img" />
      </div>
      <div className="loader-progress-bar">
        <div className="loader-progress-fill"></div>
      </div>
    </div>
  );
};

export default Loader;
