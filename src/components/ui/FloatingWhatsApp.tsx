'use client';

import React from 'react';

export default function FloatingWhatsApp() {
  const whatsappNumber = "+919876543210"; // REPLACE WITH ACTUAL
  const defaultMessage = "Hello, I would like to inquire about Roop Stone Arts.";

  const cxStyles: React.CSSProperties = {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    backgroundColor: '#25D366',
    color: 'white',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
    cursor: 'pointer',
    zIndex: 9999,
    transition: 'transform 0.3s ease'
  };

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = 'scale(1.1)';
  };

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <a 
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      style={cxStyles}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      aria-label="Chat with us on WhatsApp"
    >
      <svg
        width="35"
        height="35"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.01 2.013C6.49 2.013 2 6.503 2 12.022c0 1.76.452 3.473 1.306 5L2.023 21.99l5.083-1.334c1.474.793 3.136 1.213 4.887 1.213h.017c5.518 0 10.007-4.485 10.008-10.006 0-2.673-1.042-5.185-2.932-7.076-1.89-1.89-4.402-2.93-7.076-2.93h-.001zm0 16.51c-1.488 0-2.946-.4-4.225-1.157l-.304-.18-3.141.824.838-3.064-.197-.313c-.832-1.325-1.272-2.856-1.272-4.453 0-4.606 3.75-8.355 8.358-8.355 2.23 0 4.327.87 5.905 2.45 1.577 1.58 2.447 3.676 2.446 5.907-.001 4.608-3.75 8.341-8.408 8.341zM16.602 13.56c-.251-.126-1.486-.734-1.716-.818-.23-.084-.398-.126-.566.125-.168.251-.649.818-.796.985-.147.167-.294.188-.545.063-2.1-.92-3.32-2.023-4.144-3.418-.146-.252-.016-.388.11-.514.113-.113.251-.293.376-.44.126-.146.168-.251.251-.418.084-.167.042-.314-.02-.44-.063-.125-.566-1.36-.775-1.862-.204-.49-.411-.424-.566-.431-.146-.008-.314-.008-.482-.008-.168 0-.44.063-.67.314-.23.251-.88 .858-.88 2.093s.9 2.428 1.026 2.596c.126.167 1.77 2.7 4.285 3.785 1.5.645 2.115.7 2.89.585.595-.088 1.835-.75 2.093-1.472.258-.722.258-1.341.182-1.472-.075-.13-.243-.214-.494-.34z" />
      </svg>
    </a>
  );
}
