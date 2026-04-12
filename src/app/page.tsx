'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      {/* Hero Section: The Architectural Monolith */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 5vw',
        position: 'relative'
      }}>
        {/* Asymmetrical float image */}
        <div style={{
          position: 'absolute',
          top: '15vh',
          right: '5vw',
          width: '50vw',
          height: '70vh',
          backgroundImage: `url('/images/products/3.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          borderTopLeftRadius: '100px', // Asymmetrical gallery tile
          borderBottomRightRadius: '100px'
        }}>
          {/* Subtle soft gradient overlay to tie into background */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to left, transparent 0%, var(--color-background) 100%)',
            borderTopLeftRadius: '100px',
            borderBottomRightRadius: '100px'
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', marginTop: '10vh' }}>
          <p style={{
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '1rem',
            color: 'var(--color-primary)',
            fontWeight: '600'
          }}>
            Roop Stone Arts
          </p>
          <h1 style={{
            fontSize: '5.5rem',
            lineHeight: '1.1',
            marginBottom: '2rem',
            color: 'var(--color-text)',
          }}>
            Where Stones <br/> Become Poetry
          </h1>
          <p style={{
            fontSize: '1.25rem',
            lineHeight: '1.6',
            color: 'var(--color-outline)',
            marginBottom: '3rem',
            maxWidth: '450px'
            }}>
            An enduring dialogue between nature and space. Our craftsmen listen to the rhythm of the veins, the weight of the density, and the song of the texture.
          </p>

          <Link href="/collections" style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-container) 100%)',
            color: '#fff',
            fontSize: '0.9rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: '4px',
            boxShadow: '0 12px 40px rgba(119, 89, 44, 0.15)',
            textDecoration: 'none',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 15px 45px rgba(119, 89, 44, 0.25)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(119, 89, 44, 0.15)';
          }}>
            View All Collections
          </Link>
        </div>
      </section>

      {/* Curated Series / Tonal Layering Section */}
      <section style={{ 
        padding: '10rem 5vw', 
        backgroundColor: 'var(--color-surface-low)', // Subtle surface shift instead of border
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '5rem'
        }}>
          <h2 style={{ fontSize: '3.5rem', maxWidth: '500px', lineHeight: '1.2' }}>
            Curated Series from <br/> our Master Archives
          </h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '300px', color: 'var(--color-outline)', textAlign: 'right' }}>
            Discover the textures that have shaped eras.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '3rem', overflowX: 'auto', paddingBottom: '2rem' }}>
          {[
            { img: '1.jpg', title: 'Imperial Quartzite' },
            { img: '15.jpg', title: 'Midnight Onyx' },
            { img: '5.jpg', title: 'Tuscan Travertine' },
            { img: '13.jpg', title: 'Aegean Marble' },
          ].map((cat, idx) => (
            <div key={idx} style={{ 
              minWidth: '350px', 
              cursor: 'pointer',
              position: 'relative'
             }}>
              <div style={{
                height: '480px',
                backgroundImage: `url('/images/products/${cat.img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderTopLeftRadius: '60px',
                borderBottomRightRadius: '60px',
                boxShadow: '0 20px 50px rgba(30, 28, 18, 0.08)',
                transition: 'all 0.5s ease'
              }}
              className="gallery-tile"
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} 
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                
                {/* Glassmorphism Title Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '2rem',
                  right: '2rem',
                  backgroundColor: 'rgba(255, 249, 234, 0.7)', // surface with opacity
                  backdropFilter: 'blur(20px)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--color-text)', letterSpacing: '0.05em' }}>
                    {cat.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Crafting Process Section */}
      <section style={{ 
        padding: '12rem 5vw', 
        backgroundColor: 'var(--color-surface)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8rem'
      }}>
        {/* Left Side: Heavy Typography */}
        <div style={{ flex: '1', maxWidth: '500px' }}>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '1rem',
            fontWeight: '600'
          }}>Process</p>
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem', lineHeight: '1.1' }}>
            Crafting Forever
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-outline)', lineHeight: '1.7', marginBottom: '4rem' }}>
            Our process is slow, deliberate, and uncompromising. From the initial selection of the block at the quarry to the final polishing in our studio, every touch is an act of preservation.
          </p>

          <div style={{ display: 'flex', gap: '4rem' }}>
            <div>
              <p style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>45+</p>
              <p style={{ fontSize: '1rem', color: 'var(--color-outline)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Master Artisans</p>
            </div>
            <div>
              <p style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>1200</p>
              <p style={{ fontSize: '1rem', color: 'var(--color-outline)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Global Installations</p>
            </div>
          </div>
        </div>

        {/* Right Side: Floating "Inset" Card for Form/Contact */}
        <div style={{
          flex: '1',
          backgroundColor: 'var(--color-surface-lowest)',
          padding: '4rem',
          borderRadius: '24px',
          boxShadow: '0 40px 100px rgba(30, 28, 18, 0.05)'
        }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Begin Your Story</h3>
          <p style={{ color: 'var(--color-outline)', marginBottom: '3rem', lineHeight: '1.6' }}>
            Connect with our consultants to explore how the earth’s most timeless medium can transform your architectural vision.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <input 
              type="text" 
              placeholder="Your Name" 
              style={{
                width: '100%',
                padding: '1rem 0',
                border: 'none',
                borderBottom: '1px solid var(--color-outline-variant)',
                backgroundColor: 'transparent',
                outline: 'none',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text)',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderBottom = '1px solid var(--color-primary)'}
              onBlur={(e) => e.target.style.borderBottom = '1px solid var(--color-outline-variant)'}
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              style={{
                width: '100%',
                padding: '1rem 0',
                border: 'none',
                borderBottom: '1px solid var(--color-outline-variant)',
                backgroundColor: 'transparent',
                outline: 'none',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text)',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderBottom = '1px solid var(--color-primary)'}
              onBlur={(e) => e.target.style.borderBottom = '1px solid var(--color-outline-variant)'}
            />
            <button style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-container) 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(119, 89, 44, 0.15)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              Submit Inquiry
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}

