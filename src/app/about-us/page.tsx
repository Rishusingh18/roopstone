export default function AboutUsPage() {
  return (
    <main style={{
      minHeight: '100vh',
      paddingTop: '120px', // account for fixed navbar
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: '4rem'
    }}>
      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          color: 'var(--color-primary)', 
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          About the Brand
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          textAlign: 'center', 
          fontStyle: 'italic', 
          color: 'var(--color-secondary)',
          marginBottom: '3rem'
        }}>
          "Where Stones become Poetry"
        </p>

        <div style={{
          backgroundColor: '#fff',
          padding: '3rem',
          borderRadius: '4px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          lineHeight: 1.8,
          fontSize: '1.1rem'
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong>Roop Stone Arts</strong> is a premium marble brand rooted in over three decades of craftsmanship, originating from the historic marble town of Makrana, Rajasthan.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Built on a legacy of more than <strong>2000+ completed projects</strong> across India, the company brings together traditional artistry and modern design to create refined marble experiences for contemporary spaces.
          </p>
          <h2 style={{ 
            color: 'var(--color-primary)', 
            marginTop: '2.5rem', 
            marginBottom: '1.5rem',
            fontSize: '1.8rem',
            borderBottom: '1px solid var(--color-accent)',
            paddingBottom: '0.5rem'
          }}>
            Our Segments
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ color: 'var(--color-secondary)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>IRA — Marble Art for Modern Living</h3>
              <p>
                A curated range of wall art and design-led marble pieces that transform stone into timeless expressions for modern homes.
              </p>
            </div>
            <div>
              <h3 style={{ color: 'var(--color-secondary)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>SPARSH — Sacred Spaces & Marble Mandirs</h3>
              <p>
                Custom-crafted temples and devotional spaces that combine precision, heritage, and a deep understanding of spiritual design.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
