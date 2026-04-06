import React from 'react';
import './Features.css';
import { Layers, Bot, CalendarDays, KeySquare } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="section features-section">
      <div className="container">
        
        <div className="features-header text-center">
          <h2 className="h2 pb-2">Un ecosistema tecnológico "Llave en Mano".</h2>
        </div>

        <div className="features-grid">
          
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Layers size={24} className="feature-icon" />
            </div>
            <h3 className="feature-title">Gestión Publicitaria Premium</h3>
            <p className="feature-desc">
              Creación, optimización y escalado de campañas en Meta Ads con enfoque exclusivo en tratamientos faciales de alto ticket.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Bot size={24} className="feature-icon" />
            </div>
            <h3 className="feature-title">Motor Conversacional de IA</h3>
            <p className="feature-desc">
              Agente virtual entrenado con las directrices y el tono de tu marca para cualificar pacientes vía WhatsApp y llamadas.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <CalendarDays size={24} className="feature-icon" />
            </div>
            <h3 className="feature-title">Sistema de Agendamiento Inteligente</h3>
            <p className="feature-desc">
              Integración con tu calendario actual y protocolos estrictos de reducción de cancelaciones y reprogramaciones.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <KeySquare size={24} className="feature-icon" />
            </div>
            <h3 className="feature-title">Reporting Directivo</h3>
            <p className="feature-desc">
              Cuadro de mandos simplificado. Solo los datos que necesitas para tomar decisiones de negocio: Inversión, Reservas, Ingresos.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
