'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Legacy', href: '/#legacy' },
    { name: 'Brands', href: '/#brands' },
    { name: 'Inquire', href: '/#inquiry' },
  ];

  return (
    <nav 
      className={`glass-blur ${scrolled ? 'nav-compact' : 'nav-expansive'}`}
      style={{
        position: 'fixed',
        top: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 3rem',
        width: '94vw',
        maxWidth: '1400px',
        border: scrolled ? '1px solid rgba(121, 89, 44, 0.1)' : 'none',
        backgroundColor: scrolled ? 'rgba(255, 252, 240, 0.95)' : 'transparent',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <Link href="/" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1.2rem',
        textDecoration: 'none',
        color: 'var(--color-text)',
      }}>
        <img 
          src="/images/logo.png" 
          alt="Roop Stone Arts Logo" 
          key="nav-logo"
          style={{
            height: '62px',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 6px rgba(119, 89, 44, 0.2))',
            marginRight: '0.4rem',
            transition: 'transform 0.4s ease'
          }} 
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <span style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'var(--color-text)',
          whiteSpace: 'nowrap'
        }}>
          ROOP STONE ARTS
        </span>
      </Link>

      <ul style={{ 
        display: 'flex', 
        gap: '4rem', 
        listStyle: 'none',
        margin: 0,
        padding: 0
      }}>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link 
              href={link.href} 
              style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--color-text)',
                opacity: 0.8,
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                textDecoration: 'none',
                fontWeight: '600'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.color = 'var(--color-text)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
