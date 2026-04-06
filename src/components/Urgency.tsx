import React from 'react';
import './Urgency.css';

const Urgency: React.FC = () => {
  return (
    <section className="section urgency-section">
      <div className="container">
        <div className="urgency-container">
          <div className="urgency-content text-center">
            <h2 className="h2 pb-2">Calidad operativa, no cantidad.</h2>
            <p className="p-large mx-auto mb-4">
              Para poder garantizar los tiempos de respuesta y la excelencia de nuestro equipo y de la inteligencia artificial, limitamos estrictamente nuestro volumen de trabajo y onboarding.
            </p>
            
            <div className="urgency-highlight">
              <div className="pulse-dot"></div>
              <span>Actualmente solo podemos aceptar a <strong>4 nuevas clínicas</strong> al mes.</span>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Urgency;
