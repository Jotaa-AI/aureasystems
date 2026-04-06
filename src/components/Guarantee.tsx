import React from 'react';
import './Guarantee.css';
import { ShieldAlert, Fingerprint } from 'lucide-react';

const Guarantee: React.FC = () => {
  return (
    <section className="section section-dark guarantee-section">
      <div className="container">
        
        <div className="guarantee-box">
          <div className="guarantee-icon-top">
            <ShieldAlert size={48} />
          </div>
          
          <h2 className="h2 text-center pb-2">Nuestra Doble Garantía de Resultados.</h2>
          <p className="p-large mx-auto text-center text-light-muted mb-4">
            Construimos sistemas que funcionan. Por eso, asumimos nosotros la mayor parte del riesgo.
          </p>

          <div className="guarantee-terms">
            
            <div className="guarantee-clause">
              <div className="clause-header">
                <Fingerprint size={20} className="clause-icon" />
                <h3>Garantía Operativa</h3>
              </div>
              <p>
                Tu sistema íntegro estará montado, testeado y generando flujo de contactos cualificados en menos de <strong>14 días</strong>. Cumpliremos con el estándar de contacto al 100% de las solicitudes en menos de <strong>1 minuto</strong>.
              </p>
            </div>

            <div className="guarantee-clause highlight-clause">
              <div className="clause-header">
                <Fingerprint size={20} className="clause-icon" />
                <h3>Garantía de Rendimiento Condicional</h3>
              </div>
              <p>
                Si inviertes un mínimo de 800€/mes en publicidad, tu equipo usa y responde siguiendo nuestros protocolos, y aun así no generamos valoraciones cualificadas en 30 días, <strong>seguiremos trabajando sin coste de gestión hasta cumplir el objetivo acordado.</strong>
              </p>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Guarantee;
