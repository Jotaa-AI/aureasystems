import React, { useState, useEffect, useRef } from 'react';
import './MechanismSection.css';
import { MousePointerClick, MessageSquareText, CalendarCheck, BarChart3 } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: "Atracción Estratégica (Meta Ads)",
    desc: "Diseñamos campañas sobrias y de alto nivel proyectadas exclusivamente hacia perfiles con capacidad adquisitiva y consciencia estética.",
    icon: <MousePointerClick size={24} className="step-icon" />
  },
  {
    id: 2,
    title: "Calificación en 60 Segundos (IA + WhatsApp)",
    desc: "Un asistente inteligente atiende, perfila y responde a cada solicitud en menos de un minuto, 24/7. Ninguna oportunidad se enfría.",
    icon: <MessageSquareText size={24} className="step-icon" />
  },
  {
    id: 3,
    title: "Escudo Anti No-Show",
    desc: "Establecemos un protocolo riguroso de recordatorios automáticos y doble confirmación, asegurando que a la evaluación solo asistan pacientes comprometidos.",
    icon: <CalendarCheck size={24} className="step-icon" />
  },
  {
    id: 4,
    title: "Atribución Clara (Dashboard)",
    desc: "Visualiza en directo el flujo de pacientes, la procedencia de cada agenda y el retorno exacto de tu inversión. Control total en una sola pantalla.",
    icon: <BarChart3 size={24} className="step-icon" />
  }
];

const MechanismSection: React.FC = () => {
  const [visiblePhases, setVisiblePhases] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Secuencialmente mostramos las fases
          STEPS.forEach((step, index) => {
            setTimeout(() => {
              setVisiblePhases(prev => {
                if (!prev.includes(step.id)) return [...prev, step.id];
                return prev;
              });
            }, index * 400); // 400ms de retraso por fase
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section mechanism-section" ref={sectionRef}>
      <div className="container">
        
        <div className="mechanism-header text-center">
          <h2 className="h2 pb-2">La arquitectura detrás de The PatientFlow System.</h2>
          <p className="p-large mx-auto">
            No somos una agencia. Implantamos un motor automatizado de adquisición y filtrado en el corazón de tu clínica.
          </p>
        </div>

        <div className="mechanism-timeline">
          {STEPS.map((step) => {
            const isVisible = visiblePhases.includes(step.id);
            return (
              <div 
                key={step.id} 
                className={`mechanism-step ${isVisible ? 'is-visible' : ''}`}
              >
                <div className="step-number">{step.id}</div>
                <div className="step-content">
                  <div className="step-header">
                    <h3 className="step-title">{step.title}</h3>
                  </div>
                  <div className="step-body-wrapper">
                    <div className="step-body-inner pt-4">
                      <div className="step-icon-wrapper">
                        {step.icon}
                      </div>
                      <p className="step-desc">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MechanismSection;
