'use client';

import { useEffect, useState, useRef } from 'react';
import FloatingNav from '@/components/FloatingNav';
import GalleryTile from '@/components/GalleryTile';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [bgShade, setBgShade] = useState('var(--color-background)');
  
  const heroRef = useRef<HTMLElement>(null);
  const craftRef = useRef<HTMLElement>(null);
  const brandsRef = useRef<HTMLElement>(null);
  const inquiryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrollPos(window.scrollY);
      if (window.scrollY > 1500) {
        setBgShade('var(--color-surface-container-high)');
      } else if (window.scrollY > 600) {
        setBgShade('var(--color-surface-container-low)');
      } else {
        setBgShade('var(--color-background)');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main style={{ 
      backgroundColor: bgShade, 
      color: 'var(--color-text)', 
      transition: 'background-color 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
      position: 'relative'
    }}>
      <FloatingNav />

      {/* Hero Section */}
      <section 
        ref={heroRef}
        style={{
          height: '100vh',
          minHeight: '800px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '12rem 8vw 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div 
          className="reveal-hidden hero-element"
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '65vw',
            height: '100vh',
            backgroundImage: `url('/images/hero.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            opacity: 0.95,
            transform: `translateY(${scrollPos * 0.2}px)`,
          }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, var(--color-background) 0%, transparent 50%), linear-gradient(to top, var(--color-background) 0%, transparent 20%)'
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
          <p className="label-md reveal-hidden hero-element" style={{ transitionDelay: '0.2s' }}>EST. 1993 | MAKRANA, RAJASTHAN</p>
          <h1 className="display-lg reveal-hidden hero-element" style={{ margin: '1.5rem 0 3.5rem', transitionDelay: '0.4s' }}>
            Where <span style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: '300' }}>Stone</span> <br/> Becomes Poetry
          </h1>
          <p className="reveal-hidden hero-element" style={{
            fontSize: '1.4rem',
            lineHeight: '1.8',
            color: 'var(--color-outline)',
            marginBottom: '4.5rem',
            maxWidth: '600px',
            transitionDelay: '0.6s'
          }}>
            For three decades, Roop Stone Arts has curated the earth’s most timeless medium. From the sacred white marble of Makrana to the brutalist strength of granite.
          </p>
          
          <div className="reveal-hidden" style={{ transitionDelay: '0.8s' }}>
            <Link href="#brands" className="bronze-luster" style={{
              display: 'inline-block',
              padding: '1.5rem 4rem',
              color: '#fff',
              fontSize: '0.85rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: '600',
              boxShadow: '0 12px 40px rgba(119, 89, 44, 0.3)'
            }}>
              Explore Our Brands
            </Link>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section 
        id="legacy"
        ref={craftRef}
        style={{ padding: '15vw 8vw', minHeight: '100vh' }}
      >
        <div className="weighted-asymmetry">
          <div className="reveal-hidden">
             <p className="label-md" style={{ marginBottom: '1.5rem' }}>Our Heritage</p>
             <h2 className="display-md" style={{ marginBottom: '3rem' }}>
                Born in the <br/> Heart of Makrana
             </h2>
             <p style={{
               fontSize: '1.25rem',
               lineHeight: '1.9',
               color: 'var(--color-outline)',
               maxWidth: '550px'
             }}>
               The Taj Mahal was built from Makrana marble—a stone that breathes history. Founded by the Saini family in 1993, Roop Stone Arts continues this legacy, hand-selecting every block for its resonant crystalline structure and unique narrative.
             </p>
          </div>
          <div className="reveal-hidden" style={{ position: 'relative' }}>
            <div style={{
              height: '700px',
              backgroundImage: `url('/images/kavya.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)'
            }} />
          </div>
        </div>
      </section>

      {/* Brands & Collections */}
      <section id="brands" ref={brandsRef} style={{ padding: '10vw 8vw', minHeight: '100vh' }}>
         <div style={{ textAlign: 'center', marginBottom: '10vw' }}>
            <p className="label-md reveal-hidden">The Triad of Artistry</p>
            <h2 className="display-md reveal-hidden" style={{ marginTop: '1.5rem' }}>Our Curated Brands</h2>
         </div>

         <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
            gap: '6vw',
            alignItems: 'start'
         }}>
           <div className="reveal-hidden">
              <GalleryTile 
                image="/images/sparsh.png" 
                title="SPARSH" 
                subtitle="High-End Home Mandirs"
              />
              <div style={{ marginTop: '3rem', padding: '0 2rem' }}>
                <h3 className="display-sm" style={{ marginBottom: '1.5rem' }}>Divine Resonance</h3>
                <p style={{ color: 'var(--color-outline)', lineHeight: '1.7', fontSize: '1.1rem' }}>
                  The Axis of the Home. SPARSH creates spiritual sanctuaries like the **Mayur Darbar** and **Samyak Darshan Dham**, where Makrana marble is carvd into intricate divine narratives.
                </p>
              </div>
           </div>

           <div className="reveal-hidden" style={{ marginTop: '12vw' }}>
              <GalleryTile 
                image="/images/ira.png" 
                title="IRA" 
                subtitle="Luxury Stone Furniture"
              />
              <div style={{ marginTop: '3rem', padding: '0 2rem' }}>
                <h3 className="display-sm" style={{ marginBottom: '1.5rem' }}>Modern Monoliths</h3>
                <p style={{ color: 'var(--color-outline)', lineHeight: '1.7', fontSize: '1.1rem' }}>
                  Where functionality meets the eternal. IRA transforms raw marble and granite into sculptural furniture—tables, consoles, and artifacts that anchor a space with monumental presence.
                </p>
              </div>
           </div>

           <div className="reveal-hidden">
              <GalleryTile 
                image="/images/kavya.png" 
                title="KAVYA" 
                subtitle="Exquisite Stone Artistry"
              />
              <div style={{ marginTop: '3rem', padding: '0 2rem' }}>
                <h3 className="display-sm" style={{ marginBottom: '1.5rem' }}>Stone Stories</h3>
                <p style={{ color: 'var(--color-outline)', lineHeight: '1.7', fontSize: '1.1rem' }}>
                  Art that endures. KAVYA specializes in intricate Jali work, inlay art, and wall panelling. Every piece is a testament to the master carver’s patience and the stone’s soul.
                </p>
              </div>
           </div>
         </div>
      </section>

      {/* Inquiry Selection */}
      <section 
        id="inquiry"
        ref={inquiryRef}
        style={{ padding: '15vw 0', display: 'flex', justifyContent: 'center' }}
      >
        <div 
          className="reveal-hidden"
          style={{
            maxWidth: '1400px',
            width: '90%',
            padding: '10vw 8vw',
            backgroundColor: 'var(--color-surface-container-highest)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10vw',
            alignItems: 'center',
          }}
        >
          <div>
             <h3 className="display-md" style={{ marginBottom: '3rem' }}>Begin Your <br/> Dialogue</h3>
             <p style={{ fontSize: '1.3rem', color: 'var(--color-outline)', lineHeight: '1.8' }}>
               From global shipping to custom 3D design consultations, we manage the entire journey of your architectural vision.
             </p>
             <div style={{ marginTop: '4rem', display: 'flex', gap: '3rem' }}>
                <div>
                   <p className="label-md" style={{ color: 'var(--color-text)', fontSize: '0.7rem' }}>Contact Us</p>
                   <p style={{ marginTop: '0.5rem', fontWeight: '500' }}>+91 91161 31818</p>
                </div>
                <div>
                   <p className="label-md" style={{ color: 'var(--color-text)', fontSize: '0.7rem' }}>Location</p>
                   <p style={{ marginTop: '0.5rem', fontWeight: '500' }}>Makrana, Rajasthan, India</p>
                </div>
             </div>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <div style={{ position: 'relative' }}>
               <input 
                 type="text" 
                 placeholder="FULL NAME"
                 className="luxury-input"
                 style={{
                   width: '100%',
                   padding: '1.5rem 0',
                   background: 'transparent',
                   border: 'none',
                   borderBottom: '1px solid var(--color-outline-variant)',
                   fontSize: '0.85rem',
                   letterSpacing: '0.2em',
                   outline: 'none',
                   color: 'var(--color-text)'
                 }}
               />
            </div>
            <div style={{ position: 'relative' }}>
               <input 
                 type="email" 
                 placeholder="EMAIL ADDRESS"
                 className="luxury-input"
                 style={{
                   width: '100%',
                   padding: '1.5rem 0',
                   background: 'transparent',
                   border: 'none',
                   borderBottom: '1px solid var(--color-outline-variant)',
                   fontSize: '0.85rem',
                   letterSpacing: '0.2em',
                   outline: 'none',
                   color: 'var(--color-text)'
                 }}
               />
            </div>
            <div style={{ position: 'relative' }}>
               <select 
                 className="luxury-input"
                 style={{
                   width: '100%',
                   padding: '1.5rem 0',
                   background: 'transparent',
                   border: 'none',
                   borderBottom: '1px solid var(--color-outline-variant)',
                   fontSize: '0.85rem',
                   letterSpacing: '0.2em',
                   outline: 'none',
                   color: 'var(--color-text)',
                   appearance: 'none'
                 }}
               >
                  <option value="">SELECT INTEREST</option>
                  <option value="sparsh">SPARSH (HOME TEMPLES)</option>
                  <option value="ira">IRA (STONE FURNITURE)</option>
                  <option value="kavya">KAVYA (STONE ARTISTRY)</option>
               </select>
            </div>
            <button type="submit" className="bronze-luster" style={{
              marginTop: '2rem',
              padding: '1.8rem',
              color: '#fff',
              fontSize: '0.85rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: '700',
            }}>
              Request Consultation
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '10vw 8vw', 
        backgroundColor: 'var(--color-surface-container-low)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '6vw'
      }}>
         <div>
            <div style={{ fontSize: '1.5rem', letterSpacing: '0.3em', marginBottom: '2rem', fontWeight: '500' }}>ROOP STONE ARTS</div>
            <p style={{ opacity: 0.6, fontSize: '0.9rem', lineHeight: '1.7', maxWidth: '300px' }}>
              Purveyors of rare architectural stone and artistic geological artifacts. From the heart of Makrana to the world.
            </p>
         </div>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4vw' }}>
            <div>
               <p className="label-md" style={{ marginBottom: '2rem' }}>Navigate</p>
               <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
                  <li><Link href="#legacy">Our Story</Link></li>
                  <li><Link href="#brands">Collections</Link></li>
                  <li><Link href="#inquiry">Consultation</Link></li>
               </ul>
            </div>
            <div>
               <p className="label-md" style={{ marginBottom: '2rem' }}>Social</p>
               <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
                  <li><Link href="#">Instagram</Link></li>
                  <li><Link href="#">LinkedIn</Link></li>
                  <li><Link href="#">Pinterest</Link></li>
               </ul>
            </div>
         </div>
         <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p style={{ opacity: 0.4, fontSize: '0.7rem', letterSpacing: '0.2em' }}>
              © {new Date().getFullYear()} ROOP STONE ARTS. ALL RIGHTS RESERVED.
            </p>
         </div>
      </footer>
    </main>
  );
}
