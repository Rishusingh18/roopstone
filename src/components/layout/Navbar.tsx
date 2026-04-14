'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 4rem',
      backgroundColor: 'rgba(252, 250, 248, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(111, 62, 30, 0.08)',
      transition: 'all 0.3s ease',
      zIndex: 1000
    }}>
      {/* Brand */}
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-primary)', letterSpacing: '0.5px' }}>
        <Link href="/">Roop Stone Arts</Link>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '3rem', fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '1px' }}>
        <Link href="/collections" style={{ transition: 'color 0.3s ease', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-secondary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text)'}>Collections</Link>
        <Link href="/about-us" style={{ transition: 'color 0.3s ease', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-secondary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text)'}>About The Brand</Link>
        <Link href="/artisans" style={{ transition: 'color 0.3s ease', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-secondary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text)'}>Our Artisans</Link>
        <Link href="/locations" style={{ transition: 'color 0.3s ease', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-secondary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text)'}>Locations</Link>
      </div>

      {/* CTA */}
      <div>
        <Link href="/book-consultation" style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          padding: '0.8rem 2rem',
          backgroundColor: 'var(--color-primary-container)',
          color: '#fff',
          borderRadius: '4px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontSize: '0.85rem',
          boxShadow: '0 4px 15px rgba(111, 62, 30, 0.2)',
          transition: 'all 0.3s ease'
        }}>
          Book Appointment
        </Link>
      </div>
    </nav>
  );
}
