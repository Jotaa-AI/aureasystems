import React, { useState, useEffect } from 'react';
import './Hero.css';

interface HeroProps {
  onOpenModal?: () => void;
}

const WORDS = [
  "Cero no-shows",
  "Pacientes cualificados",
  "Control de tu agenda",
  "The PatientFlow System™"
];

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [phase, setPhase] = useState<'words' | 'opening' | 'done'>('words');
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    if (phase !== 'words') return;

    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev === WORDS.length - 1) {
          clearInterval(wordInterval);
          setTimeout(() => setPhase('opening'), 800);
          setTimeout(() => setPhase('done'), 2000); // 1.2s after opening
          return prev;
        }
        return prev + 1;
      });
    }, 1100);

    return () => clearInterval(wordInterval);
  }, [phase]);

  const isHeroReady = phase === 'opening' || phase === 'done';

  return (
    <section className="hero-section">
      
      {/* Tenzr-style Purple Curtain */}
      {phase !== 'done' && (
        <div className={`hero-curtain ${phase === 'opening' ? 'curtain-open' : ''}`}>
          <div className="curtain-content">
            {WORDS.map((word, i) => (
              <div 
                key={word} 
                className={`curtain-word ${i === currentWordIndex ? 'active' : ''} ${i < currentWordIndex ? 'exit' : ''}`}
              >
                <div className="curtain-dot"></div>
                <h2>{word}</h2>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="hero-split">
        
        {/* Left Side: Content */}
        <div className="hero-left">
          <div className={`hero-content ${isHeroReady ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h1 className="h1-huge" style={{ transitionDelay: '0.4s' }}>
              Consigue más valoraciones cualificadas para tu clínica facial en menos de 30 días.
            </h1>
            <div className="hero-ctas mt-8" style={{ transitionDelay: '0.6s' }}>
              <button className="btn btn-primary" onClick={onOpenModal}>Solicitar Auditoría Estratégica</button>
            </div>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="hero-right">
          <div className="hero-visual-container">
            <div className="hero-image-wrapper">
              <img 
                src="https://assets.cdn.filesafe.space/ju5vSpTX0hpH3uI8cPSE/media/69d3639f84c045c2748777e4.png" 
                alt="Clinic Professional" 
                className="hero-image"
                style={{ opacity: isVideoEnded ? 1 : 0 }}
              />
              {!isVideoEnded && (
                <video 
                  src="https://assets.cdn.filesafe.space/ju5vSpTX0hpH3uI8cPSE/media/69d3680884c045c274880472.mp4" 
                  className="hero-video"
                  autoPlay
                  muted
                  playsInline
                  onEnded={() => setIsVideoEnded(true)}
                />
              )}
            </div>
            {/* Scroll Down Arrow */}
            <div className="hero-scroll-indicator" style={{ transitionDelay: '1s' }}>
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
