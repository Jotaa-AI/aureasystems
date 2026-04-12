import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import './BookingModal.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [iframeReady, setIframeReady] = useState(false);

  useEffect(() => {
    const scriptId = 'cleesaas-embed-script';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://link.cleesaas.com/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);
    }

    const preloadTimer = window.setTimeout(() => {
      setIframeReady(true);
    }, 900);

    return () => {
      window.clearTimeout(preloadTimer);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIframeReady(true);
      return undefined;
    }

    document.body.style.overflow = 'unset';
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal-overlay ${isOpen ? 'is-open' : ''}`}
      onClick={handleOverlayClick}
      aria-hidden={!isOpen}
    >
      <div className="modal-container" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
          <X size={24} />
        </button>
        <div className="modal-header">
          <span className="modal-eyebrow">Reunión de descubrimiento</span>
          <h2 id="booking-modal-title">Reserva una llamada y revisamos tu caso.</h2>
          <p>Elige la franja que mejor te encaje. El calendario se abre dentro de la página para que no pierdas el contexto.</p>
        </div>
        <div className="modal-body">
          <div className="modal-embed-shell">
            {iframeReady ? (
              <iframe
                src="https://link.cleesaas.com/widget/booking/Pmlo90k5oI5mm21x9Vqb"
                style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '700px' }}
                scrolling="no"
                id="Pmlo90k5oI5mm21x9Vqb_1775980045908"
                title="Calendario de reunión de descubrimiento"
                loading="eager"
              />
            ) : (
              <div className="modal-embed-placeholder" aria-hidden="true">
                <div className="modal-embed-placeholder-bar" />
                <div className="modal-embed-placeholder-block" />
                <div className="modal-embed-placeholder-grid">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
