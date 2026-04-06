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
          <span className="brand-light">AUREA</span>
          <span className="brand-bold">SYSTEMS</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
