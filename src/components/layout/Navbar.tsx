"use client";
import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: "About Us", link: "/about-us" },
    { name: "Sparsh", link: "/sparsh" },
    { name: "IRA", link: "/ira" },
    { name: "Our Creations", link: "/creations" },
    { name: "Journal", link: "/journal" },
    { name: "Testimonials", link: "/testimonials" },
  ];

  return (
    <NavbarContainer>
      <NavBody>
        <NavbarLogo>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
            <img 
              src="/logo.png" 
              alt="Roop Stone Arts" 
              style={{ height: '60px', width: 'auto' }} 
            />
            <div style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '1.2rem', 
              fontWeight: '400', 
              color: 'var(--color-text-main)', 
              letterSpacing: '3px', 
              textTransform: 'uppercase',
              lineHeight: '1.2'
            }}>
              Roop <span style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '5px', opacity: 0.7 }}>Stone Arts</span>
            </div>
          </Link>
        </NavbarLogo>

        <NavItems items={navItems} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <NavbarButton onClick={() => window.location.href='/book-consultation'}>
            Book Consultation
          </NavbarButton>
          
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </NavBody>

      <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {navItems.map((item, idx) => (
          <Link 
            key={idx} 
            href={item.link} 
            onClick={() => setIsOpen(false)}
            style={{ 
              fontSize: '1.5rem', 
              fontFamily: 'var(--font-heading)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              color: 'var(--color-text-main)'
            }}
          >
            {item.name}
          </Link>
        ))}
        <Link 
          href="/book-consultation"
          onClick={() => setIsOpen(false)}
          style={{ 
            fontSize: '1.5rem', 
            fontFamily: 'var(--font-heading)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            color: 'var(--color-primary)',
            fontWeight: '600',
            marginTop: '1rem'
          }}
        >
          Book Consultation
        </Link>
      </MobileNavMenu>
    </NavbarContainer>
  );
}

const NavbarContainer = ({ children }) => (
  <div style={{
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none',
  }}>
    {children}
  </div>
);

const NavBody = ({ children }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrolled = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 80;
    const shouldBeUnscrolled = latest < 30;
    
    if (shouldBeScrolled && !lastScrolled.current) {
      lastScrolled.current = true;
      setIsScrolled(true);
    } else if (shouldBeUnscrolled && lastScrolled.current) {
      lastScrolled.current = false;
      setIsScrolled(false);
    }
  });

  return (
    <div
      className={isScrolled ? 'navbar-island navbar-island--scrolled' : 'navbar-island'}
    >
      {children}
    </div>
  );
};

const NavItems = ({ items }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="md-flex" style={{ gap: '1.8rem' }}>
      {items.map((item, idx) => (
        <Link
          key={idx}
          href={item.link}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
          className="nav-link"
          style={{ 
            color: hoveredIdx === idx ? 'var(--color-primary)' : 'var(--color-text-main)',
            fontSize: '0.85rem'
          }}
        >
          {item.name}
          {hoveredIdx === idx && (
            <motion.span
              layoutId="hover-pill"
              style={{
                position: 'absolute',
                inset: '-8px -16px',
                zIndex: -1,
                backgroundColor: 'rgba(119, 89, 44, 0.05)',
                borderRadius: '100px',
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </Link>
      ))}
    </div>
  );
};

const NavbarLogo = ({ children }) => (
  <div style={{ flexShrink: 0 }}>
    {children}
  </div>
);

const NavbarButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="md-block"
    style={{
      padding: '0.8rem 1.8rem',
      backgroundColor: 'var(--color-primary)',
      color: '#fff',
      border: 'none',
      borderRadius: '100px',
      fontSize: '0.8rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      cursor: 'pointer',
      boxShadow: '0 8px 20px rgba(119, 89, 44, 0.2)',
      transition: 'all 0.3s ease'
    }}
  >
    {children}
  </button>
);

const MobileNavToggle = ({ isOpen, onClick }) => (
  <button 
    onClick={onClick} 
    className="lg-hidden"
    style={{ 
      background: 'none', 
      border: 'none', 
      cursor: 'pointer', 
      color: 'var(--color-text-main)',
      alignItems: 'center'
    }}
  >
    {isOpen ? <X size={28} /> : <Menu size={28} />}
  </button>
);

const MobileNavMenu = ({ isOpen, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem',
          zIndex: 9998
        }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);
