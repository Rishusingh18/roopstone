import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-accent)',
      padding: '4rem 3rem 2rem 3rem',
      fontFamily: 'var(--font-body)'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-secondary)', marginBottom: '1rem' }}>Roop Stone Arts</h2>
          <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
            Where Stones become Poetry. A legacy of over three decades in premium marble experiences.
          </p>
        </div>
        
        <div>
          <h3 style={{ color: 'var(--color-secondary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: 0.8 }}>
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/ira">IRA</Link></li>
            <li><Link href="/sparsh">Sparsh</Link></li>
            <li><Link href="/services">Our Services</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{ color: 'var(--color-secondary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Explore</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: 0.8 }}>
            <li><Link href="/legacy-works">Legacy Works</Link></li>
            <li><Link href="/how-it-works">How It Works</Link></li>
            <li><Link href="/journal">Journal</Link></li>
            <li><Link href="/testimonials">Testimonials</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{ color: 'var(--color-secondary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Connect</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: 0.8 }}>
            <li><Link href="/book-consultation">Book Consultation</Link></li>
            <li>Email: info@roopstonearts.com</li>
            <li>Location: Makrana, Rajasthan</li>
          </ul>
        </div>
      </div>
      
      <div style={{
        borderTop: '1px solid rgba(234, 230, 222, 0.2)',
        paddingTop: '2rem',
        textAlign: 'center',
        opacity: 0.6,
        fontSize: '0.85rem'
      }}>
        <p>&copy; {new Date().getFullYear()} Roop Stone Arts. All rights reserved.</p>
      </div>
    </footer>
  );
}
