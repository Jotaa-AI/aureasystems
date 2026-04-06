import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './BookingModal.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
      
      // Load the GoHighLevel/CleeSaaS embed script dynamically
      const scriptId = 'cleesaas-embed-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://link.cleesaas.com/js/form_embed.js';
        script.async = true;
        document.body.appendChild(script);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Close modal if overlay is clicked
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container animate-fade-in-up">
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
          <X size={24} />
        </button>
        <div className="modal-body">
          <iframe 
            src="https://link.cleesaas.com/widget/booking/Pmlo90k5oI5mm21x9Vqb" 
            style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '650px' }} 
            scrolling="no" 
            id="Pmlo90k5oI5mm21x9Vqb_1775459723968"
            title="Agendar Auditoría"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
