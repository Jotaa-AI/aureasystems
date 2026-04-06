import React from 'react';
import './CredibilityStrip.css';
import { ShieldCheck, Zap, Clock, Users } from 'lucide-react';

const CredibilityStrip: React.FC = () => {
  return (
    <div className="credibility-strip">
      <div className="container">
        <div className="credibility-grid">
          
          <div className="credibility-item">
            <ShieldCheck size={20} className="credibility-icon" />
            <span>Garantía por contrato</span>
          </div>
          
          <div className="credibility-item">
            <Zap size={20} className="credibility-icon" />
            <span>Operativo en &lt; 14 días</span>
          </div>
          
          <div className="credibility-item">
            <Clock size={20} className="credibility-icon" />
            <span>Respuesta en &lt; 1 minuto</span>
          </div>
          
          <div className="credibility-item">
            <Users size={20} className="credibility-icon" />
            <span>Sólo 4 plazas mensuales</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CredibilityStrip;
