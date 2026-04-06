import React, { useState } from 'react';
import Hero from './components/Hero';
import CredibilityStrip from './components/CredibilityStrip';
import ProblemSection from './components/ProblemSection';
import MechanismSection from './components/MechanismSection';
import GrowthSimulator from './components/GrowthSimulator';
import Transformation from './components/Transformation';
import Features from './components/Features';
import Guarantee from './components/Guarantee';
import Urgency from './components/Urgency';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Loader from './components/Loader';
import Header from './components/Header';
import BookingModal from './components/BookingModal'; // Added import

const App: React.FC = () => {
  const [appReady, setAppReady] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false); // Added state

  const handleOpenBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <>
      {!appReady && <Loader onComplete={() => setAppReady(true)} />}
      
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />

      <div className="app-container" style={{ 
        opacity: appReady ? 1 : 0, 
        transition: 'opacity 0.8s ease-in-out',
        visibility: appReady ? 'visible' : 'hidden'
      }}>
        <Header />
        <Hero onOpenModal={handleOpenBookingModal} />
        <CredibilityStrip />
        <ProblemSection />
        <MechanismSection />
        <GrowthSimulator onOpenModal={handleOpenBookingModal} />
        <Transformation />
        <Features />
        <Guarantee />
        <Urgency />
        <FAQ />
        <CTA onOpenModal={handleOpenBookingModal} />
      </div>
    </>
  );
};

export default App;
