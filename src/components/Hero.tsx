import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';

interface HeroProps {
  onOpenModal?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const [phase, setPhase] = useState<'initial' | 'revealing' | 'done'>('initial');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const revealTimer = setTimeout(() => setPhase('revealing'), 400);
    const doneTimer = setTimeout(() => setPhase('done'), 2200);
    return () => { clearTimeout(revealTimer); clearTimeout(doneTimer); };
  }, []);

  useEffect(() => {
    if (phase === 'done' && videoRef.current) {
      videoRef.current.play();
    }
  }, [phase]);

  const isRevealed = phase === 'revealing' || phase === 'done';

  return (
    <section className="hero-section">
      <div className={`hero-split ${isRevealed ? 'hero-revealed' : ''}`}>

        {/* Left Side: Content */}
        <div className="hero-left">
          <div className="hero-content">
            <div className="text-reveal-line">
              <h1 className={`h1-huge ${isRevealed ? 'revealed' : ''}`}>
                Llena tu <strong>agenda</strong> con <strong>pacientes cualificados.</strong>
              </h1>
            </div>
            <div className="text-reveal-line">
              <p className={`hero-subtitle ${isRevealed ? 'revealed' : ''}`}>
                El sistema que convierte tu <strong>inversión publicitaria</strong> en <strong>primeras valoraciones reales</strong> para tu clínica.
              </p>
            </div>
            <div className="text-reveal-line">
              <div className={`hero-ctas mt-8 ${isRevealed ? 'revealed' : ''}`}>
                <button className="btn btn-primary" onClick={onOpenModal}>Solicitar Auditoría Estratégica</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="hero-right">
          <div className="hero-visual-container">
            <div className="hero-image-wrapper">
              <video
                ref={videoRef}
                src="https://assets.cdn.filesafe.space/ju5vSpTX0hpH3uI8cPSE/media/69d3812aa7dcb4cff0d7d74e.mp4"
                className="hero-video"
                muted
                playsInline
              />
            </div>
            <div className={`hero-scroll-indicator ${isRevealed ? 'revealed' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
