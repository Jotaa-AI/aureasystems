import React, { useState } from 'react';
import './FAQ.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "¿Es esto otra agencia de marketing más?",
    answer: "No. Las agencias tradicionales te envían decenas de nombres vacíos y se olvidan. Nosotros construimos un sistema dentro de tu clínica que se encarga de que ese contacto se filtre, cualifique y asista, uniendo captación, inteligencia artificial y automatización operativa."
  },
  {
    question: "¿En cuánto tiempo veré el sistema funcionando?",
    answer: "Implementamos y dejamos todo 100% operativo en un máximo de 14 días. Desde el momento del lanzamiento, empezarás a recibir solicitudes filtradas."
  },
  {
    question: "¿Mi equipo de recepción tendrá más volumen de trabajo?",
    answer: "Exactamente lo contrario. La IA asume todo el trabajo invisible y agotador (responder al instante, filtrar curiosos, lograr la cita inicial). Tu equipo solo interactúa con aquellos pacientes con intención real, eliminando el estrés administrativo."
  },
  {
    question: "¿Qué necesito para empezar o saber si esto aplica a mí?",
    answer: "Agendar una llamada de auditoría y descubrimiento. Analizaremos tu modelo de clínica, los tratamientos estrella y veremos si cumples los requisitos de perfil para operar juntos."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section faq-section">
      <div className="container">
        
        <div className="faq-header text-center">
          <h2 className="h2 pb-2">Preguntas Frecuentes</h2>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'is-open' : ''}`}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp size={20} className="faq-icon" />
                ) : (
                  <ChevronDown size={20} className="faq-icon" />
                )}
              </button>
              
              <div 
                className="faq-answer-wrapper"
                style={{ 
                  maxHeight: openIndex === index ? '300px' : '0',
                  opacity: openIndex === index ? 1 : 0
                }}
              >
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default FAQ;
