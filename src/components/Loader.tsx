import React, { useEffect, useState } from 'react';
import './Loader.css';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Cargando Aurea Systems');

  useEffect(() => {
    const totalDuration = 3000;
    const fadeDuration = 800;
    const startedAt = performance.now();
    let animationFrame = 0;

    const animateProgress = (now: number) => {
      const elapsed = now - startedAt;
      const normalized = Math.min(elapsed / totalDuration, 1);
      const eased = 1 - Math.pow(1 - normalized, 2.5);
      const nextProgress = normalized >= 1 ? 100 : Math.min(97, Math.round(eased * 100));

      setProgress(nextProgress);

      if (nextProgress < 36) {
        setStatus('Cargando Aurea Systems');
      } else if (nextProgress < 76) {
        setStatus('Preparando Patient Flow');
      } else if (nextProgress < 100) {
        setStatus('Abriendo la experiencia');
      } else {
        setStatus('Listo');
      }

      if (normalized < 1) {
        animationFrame = window.requestAnimationFrame(animateProgress);
      }
    };

    animationFrame = window.requestAnimationFrame(animateProgress);

    const timer = window.setTimeout(() => {
      setProgress(100);
      setStatus('Listo');
      setIsFadingOut(true);
      window.setTimeout(() => {
        onComplete();
      }, fadeDuration);
    }, totalDuration);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className={`loader-container ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="loader-logo">
        <img src="https://assets.cdn.filesafe.space/ju5vSpTX0hpH3uI8cPSE/media/69d3aa6f4cde4bbc2a007b40.png" alt="Aurea Systems" className="loader-logo-img" />
      </div>
      <div className="loader-meta" aria-live="polite">
        <span className="loader-status">{status}</span>
        <span className="loader-progress-value">{progress}%</span>
      </div>
      <div className="loader-progress-bar">
        <div className="loader-progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default Loader;
