"use client";

import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "919829000000";
const DEFAULT_MESSAGE = "Namaste Roop Stone Arts, I'd like to enquire about your creations.";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <a
      data-testid="floating-whatsapp"
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        right: "1.8rem",
        bottom: "1.8rem",
        zIndex: 9000,
        display: "flex",
        width: 62,
        height: 62,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        color: "#fff",
        boxShadow: "0 14px 40px rgba(18, 140, 126, 0.35), 0 0 0 1px rgba(255,255,255,0.2) inset",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
        transition: "opacity .6s ease, transform .6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.83c0 2.09.55 4.12 1.6 5.92L0 24l6.41-1.68a11.82 11.82 0 0 0 5.62 1.43h.01c6.53 0 11.84-5.3 11.84-11.83 0-3.16-1.23-6.13-3.36-8.44zM12.04 21.6h-.01a9.77 9.77 0 0 1-4.98-1.36l-.36-.21-3.8 1 .99-3.7-.23-.38a9.8 9.8 0 0 1-1.52-5.22c0-5.42 4.41-9.83 9.82-9.83 2.62 0 5.08 1.02 6.93 2.88a9.73 9.73 0 0 1 2.88 6.95c0 5.43-4.41 9.87-9.72 9.87zm5.62-7.36c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.7.16-.2.31-.8 1-.99 1.2-.18.2-.36.22-.67.07-.31-.16-1.3-.48-2.48-1.54-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.63.14-.14.31-.36.46-.55.15-.18.2-.31.3-.52.1-.21.05-.39-.03-.55-.08-.15-.7-1.68-.95-2.3-.25-.6-.5-.52-.7-.53l-.6-.01c-.2 0-.54.08-.82.39-.28.31-1.08 1.05-1.08 2.57 0 1.51 1.11 2.97 1.26 3.18.15.2 2.18 3.34 5.29 4.68.74.32 1.32.51 1.77.66.74.24 1.42.2 1.95.12.6-.09 1.82-.74 2.08-1.46.26-.72.26-1.33.18-1.46-.08-.13-.28-.21-.6-.36z" />
      </svg>
    </a>
  );
}
