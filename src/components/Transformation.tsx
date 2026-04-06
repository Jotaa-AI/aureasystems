import React from 'react';
import './Transformation.css';
import { Check } from 'lucide-react';

const Transformation: React.FC = () => {
  return (
    <section className="section transformation-section">
      <div className="container">
        
        <div className="transformation-content">
          <div className="transformation-text">
            <h2 className="h2 pb-2">Qué ocurre cuando tomas el control del flujo de pacientes.</h2>
            
            <ul className="transformation-list">
              <li className="transformation-item">
                <div className="check-icon">
                  <Check size={20} />
                </div>
                <div>
                  <strong>De la incertidumbre a la métrica:</strong> Sabes exactamente cuántas valoraciones entran y cuánto dinero generan.
                </div>
              </li>
              
              <li className="transformation-item">
                <div className="check-icon">
                  <Check size={20} />
                </div>
                <div>
                  <strong>Independencia operativa:</strong> Tu recepción deja de ser un call-center y vuelve a ser la cara amable y exclusiva de tu clínica.
                </div>
              </li>

              <li className="transformation-item">
                <div className="check-icon">
                  <Check size={20} />
                </div>
                <div>
                  <strong>Velocidad sin esfuerzo:</strong> Todos los contactos reciben un trato premium, instantáneo y personalizado.
                </div>
              </li>

              <li className="transformation-item">
                <div className="check-icon">
                  <Check size={20} />
                </div>
                <div>
                  <strong>Agendas optimizadas:</strong> Menos trabajo administrativo y más horas facturables para tus especialistas médicos.
                </div>
              </li>
            </ul>
          </div>
          
          <div className="transformation-visual">
            <div className="visual-card">
              <div className="visual-card-header">
                <div>Rendimiento Semanal</div>
                <div className="badge">+32%</div>
              </div>
              <div className="visual-bars">
                <div className="bar-wrapper"><div className="bar bar-1"></div></div>
                <div className="bar-wrapper"><div className="bar bar-2"></div></div>
                <div className="bar-wrapper"><div className="bar bar-3"></div></div>
                <div className="bar-wrapper"><div className="bar bar-4"></div></div>
                <div className="bar-wrapper"><div className="bar bar-5"></div></div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Transformation;
