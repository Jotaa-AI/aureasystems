import React from 'react';
import './ProblemSection.css';
import { Target, Clock3, CalendarOff, LineChart } from 'lucide-react';

const ProblemSection: React.FC = () => {
  return (
    <section className="section section-dark problem-section">
      <div className="container">
        
        <div className="problem-header text-center">
          <h2 className="h2 pb-2">Tu clínica no necesita más volumen.<br/>Necesita mejores pacientes y más control.</h2>
          <p className="p-large mx-auto text-light-muted">
            El cuello de botella de las clínicas de medicina estética premium no es generar interés, es gestionarlo. Cuando la recepción se satura, el servicio al paciente se resiente y la rentabilidad se escapa.
          </p>
        </div>

        <div className="problem-grid">
          
          <div className="problem-card">
            <div className="problem-icon-wrapper">
              <Target size={24} className="problem-icon" />
            </div>
            <h3 className="problem-card-title">Recepción colapsada</h3>
            <p className="problem-card-text">
              Tu equipo pierde horas atendiendo a personas curiosas sin intención real de agendar un tratamiento.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon-wrapper">
              <Clock3 size={24} className="problem-icon" />
            </div>
            <h3 className="problem-card-title">Fuga de oportunidades</h3>
            <p className="problem-card-text">
              El tiempo es crítico. Los potenciales pacientes que no reciben respuesta en pocos minutos terminan acudiendo a la competencia.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon-wrapper">
              <CalendarOff size={24} className="problem-icon" />
            </div>
            <h3 className="problem-card-title">La sangría de los No-Shows</h3>
            <p className="problem-card-text">
              Huecos vacíos en la agenda de tus doctores que cuestan miles de euros al mes y desmotivan al personal.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon-wrapper">
              <LineChart size={24} className="problem-icon" />
            </div>
            <h3 className="problem-card-title">Caos publicitario</h3>
            <p className="problem-card-text">
              Inviertes en anuncios sin tener claridad absoluta de qué campañas generan ingresos reales y cuáles solo traen ruido.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
