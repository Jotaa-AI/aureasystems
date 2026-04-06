import React from 'react';
import './CTA.css';

interface CTAProps {
  onOpenModal?: () => void;
}

const CTA: React.FC<CTAProps> = ({ onOpenModal }) => {
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-block text-center">
          <h2 className="h1 pb-2">Eleva el estándar operativo de tu clínica hoy.</h2>
          <p className="p-large mx-auto mb-4 cta-desc">
            Agenda una sesión de consultoría técnica gratuita de 30 minutos. Analizaremos sin compromiso los cuellos de botella actuales de tu captación y proyectaremos qué impacto podría tener nuestro sistema en tu facturación mensual.
          </p>
          
          <button className="btn btn-primary cta-btn" onClick={onOpenModal}>
            Solicitar Auditoría Gratuita
          </button>
          
          <p className="cta-disclaimer">
            *Solo reservamos llamadas con directores o propietarios de clínicas que facturan más de X€ o tienen la infraestructura para crecer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
