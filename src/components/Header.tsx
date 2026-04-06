import React, { useState, useEffect } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <a href="#" className="brand-logo">
          <img src="https://assets.cdn.filesafe.space/ju5vSpTX0hpH3uI8cPSE/media/69d3aa6f4cde4bbc2a007b40.png" alt="Aurea Systems" className="brand-logo-img" />
        </a>
      </div>
    </header>
  );
};

export default Header;
