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

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', marginTop: '10vh' }}>
          <p className="brand-subtitle" style={{ marginBottom: '1.5rem' }}>
            Roop Stone Arts
          </p>
          <h1 style={{ marginBottom: '2rem' }}>
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
        padding: '15rem 5vw', 
        backgroundColor: 'var(--color-surface-low)', // Now white, relies on padding/white-space
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
                boxShadow: '0 12px 40px rgba(30, 28, 18, 0.06)', // Ambient shadow spec
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
                  backgroundColor: 'rgba(255, 255, 255, 0.7)', // surface with opacity
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
      
      {/* IRA: The Modern Art Gallery (Weighted Asymmetry) */}
      <section style={{ 
        padding: '15rem 5vw', 
        display: 'flex', 
        flexDirection: 'column',
        gap: '8rem'
      }}>
        <div style={{ display: 'flex', gap: '5vw', alignItems: 'center' }}>
          <div style={{ flex: '1.2' }}>
            <div style={{
              height: '80vh',
              backgroundImage: `url('/images/products/12.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderTopLeftRadius: '200px',
              borderBottomRightRadius: '40px',
              boxShadow: '0 40px 100px rgba(30, 28, 18, 0.1)'
            }} />
          </div>
          <div style={{ flex: '1', paddingLeft: '2rem' }}>
            <p className="brand-subtitle" style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>The Collection</p>
            <h2 style={{ fontSize: '4rem', marginBottom: '2.5rem', lineHeight: '1' }}>
              IRA. <br/>
              Sculpted <br/>
              Stillness.
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-outline)', lineHeight: '1.8', marginBottom: '3rem', maxWidth: '400px' }}>
              Our IRA series redefines marble as a medium of modern art. Each piece is a singular dialogue between the raw tectonic force of the earth and the delicate touch of the artisan.
            </p>
            <Link href="/ira" style={{
              fontSize: '0.9rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-text)',
              borderBottom: '1px solid var(--color-primary)',
              paddingBottom: '0.5rem',
              fontWeight: '600'
            }}>
              Explore Artworks
            </Link>
          </div>
        </div>

        {/* Supporting imagery grid */}
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
          <div style={{ flex: '1', marginTop: '5rem' }}>
            <div style={{
              height: '500px',
              backgroundImage: `url('/images/products/6.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderTopLeftRadius: '120px',
              boxShadow: '0 20px 60px rgba(30, 28, 18, 0.05)'
            }} />
            <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--color-outline)', fontStyle: 'italic' }}>
              01. The Tectonic Rift - White Statuario
            </p>
          </div>
          <div style={{ flex: '1' }}>
            <div style={{
              height: '600px',
              backgroundImage: `url('/images/products/17.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderBottomRightRadius: '120px',
              boxShadow: '0 20px 60px rgba(30, 28, 18, 0.05)'
            }} />
            <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--color-outline)', fontStyle: 'italic' }}>
              02. Fluid Architecture - Grey Travertine
            </p>
          </div>
        </div>
      </section>
      
      {/* Sparsh: Sacred Spaces (Centered & Balanced) */}
      <section style={{ 
        padding: '15rem 5vw', 
        textAlign: 'center',
        backgroundColor: '#fafafa' // Very subtle distinction for sacred space
      }}>
        <p className="brand-subtitle" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem' }}>Sacred Heritage</p>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
          SPARSH. Crafting the <br/> Sanctuary within.
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-outline)', lineHeight: '1.8', marginBottom: '5rem', maxWidth: '600px', margin: '0 auto 5rem auto' }}>
          Custom-crafted marble mandirs and devotional spaces that combine geometric precision with spiritual resonance. A legacy of piety, carved for eternity.
        </p>
        
        <div style={{
          position: 'relative',
          width: '100%',
          height: '90vh',
          backgroundImage: `url('/images/products/4.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '4px',
          boxShadow: '0 50px 120px rgba(0,0,0,0.1)'
        }}>
          {/* Symmetrical white overlay for centered focus */}
          <div style={{
            position: 'absolute',
            bottom: '4rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            padding: '3rem 5rem',
            borderRadius: '4px',
            textAlign: 'center',
            maxWidth: '500px'
          }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>The Temple at Ajmer</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-outline)', marginBottom: '2rem' }}>A masterpiece in Makrana Pure White marble, featuring hand-carved intricate jaalis and floral motifs.</p>
            <Link href="/sparsh" style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              border: '1px solid var(--color-primary)',
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.85rem'
            }}>
              View Sparsh Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Crafting Process Section */}
      <section style={{ 
        padding: '15rem 5vw', 
        backgroundColor: 'var(--color-background)',
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

