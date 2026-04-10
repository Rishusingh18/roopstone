import { getActiveTheme } from '@/data/themes';
import Link from 'next/link';

export default function Home() {
  const theme = getActiveTheme();

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      {/* Dynamic Hero Section */}
      <section style={{
        height: '100vh', 
        position: 'relative',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundImage: `url(${theme.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(31, 34, 40, 0.6)' // Default dark overlay for legibility
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ 
            fontSize: '4.5rem', 
            marginBottom: '1rem', 
            color: 'var(--color-secondary)',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            {theme.overlayTextHeading}
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            opacity: 0.9,
            color: 'var(--color-accent)',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}>
            {theme.overlayTextSubheading}
          </p>
          
          <Link href={theme.ctaLink} style={{
            padding: '1rem 2.5rem',
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-primary)',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '2px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {theme.ctaText}
          </Link>
        </div>
      </section>

      {/* Featured Collections Placeholder */}
      <section style={{ padding: '6rem 3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Our Heritage Segments</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div style={{ padding: '3rem', backgroundColor: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--color-secondary)', marginBottom: '1rem' }}>IRA</h3>
            <p style={{ marginBottom: '2rem' }}>Marble Art for Modern Living. A curated range of design-led marble pieces.</p>
            <Link href="/ira" style={{ borderBottom: '1px solid var(--color-primary)', paddingBottom: '0.2rem' }}>Explore IRA</Link>
          </div>
          <div style={{ padding: '3rem', backgroundColor: '#fff', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--color-secondary)', marginBottom: '1rem' }}>SPARSH</h3>
            <p style={{ marginBottom: '2rem' }}>Sacred Spaces & Marble Mandirs. Custom-crafted temples bridging precision and faith.</p>
            <Link href="/sparsh" style={{ borderBottom: '1px solid var(--color-primary)', paddingBottom: '0.2rem' }}>Explore SPARSH</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
