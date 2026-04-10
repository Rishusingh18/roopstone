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
      padding: '1.5rem 3rem',
      backgroundColor: 'rgba(250, 250, 250, 0.9)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      zIndex: 1000
    }}>
      {/* Brand */}
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
        <Link href="/">Roop Stone Arts</Link>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 500 }}>
        <Link href="/about-us">About Us</Link>
        <Link href="/ira">IRA</Link>
        <Link href="/sparsh">Sparsh</Link>
        <Link href="/services">Services</Link>
        <Link href="/legacy-works">Legacy Works</Link>
        <Link href="/price-estimator">Price Estimator</Link>
      </div>

      {/* CTA */}
      <div>
        <Link href="/book-consultation" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-accent)',
          borderRadius: '2px',
          fontSize: '0.9rem',
          transition: 'all 0.3s ease'
        }}>
          Book Consultation
        </Link>
      </div>
    </nav>
  );
}
