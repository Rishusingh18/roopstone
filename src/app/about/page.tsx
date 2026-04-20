'use client';

import { useEffect, useState, useRef } from 'react';
import FloatingNav from '@/components/FloatingNav';
import Link from 'next/link';

export default function About() {
  const [mounted, setMounted] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [bgShade, setBgShade] = useState('var(--color-background)');

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrollPos(window.scrollY);
      if (window.scrollY > 1200) {
        setBgShade('var(--color-surface-high)');
      } else if (window.scrollY > 400) {
        setBgShade('var(--color-surface-low)');
      } else {
        setBgShade('var(--color-background)');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main style={{ 
      backgroundColor: bgShade, 
      color: 'var(--color-text)', 
      transition: 'background-color 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
      position: 'relative',
      minHeight: '100vh'
    }}>
      <FloatingNav />

      {/* Hero Section */}
      <section style={{
        height: '110vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 8vw',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '55vw',
          height: '100%',
          backgroundImage: `url('/images/products/1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7,
          zIndex: 0,
          transform: `translateY(${scrollPos * 0.15}px)`,
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, var(--color-background) 0%, transparent 60%)'
          }} />
        </div>

        <div className="reveal-hidden hero-element" style={{ position: 'relative', zIndex: 1 }}>
          <p className="label-md">Purveyors of Architectural Resonance</p>
          <h1 className="display-lg" style={{ margin: '2rem 0', maxWidth: '850px', fontSize: '6rem' }}>
            The Poetry <br />
            Of <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-heading)', fontWeight: 300 }}>Monoliths</span>
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            lineHeight: '1.8', 
            maxWidth: '650px', 
            color: 'var(--color-outline)',
            fontWeight: '300'
          }}>
            Roop Stone Arts is a specialized atelier dedicated to the preservation of geological history. From the sacred quarries of Makrana to the modern home.
          </p>
        </div>
      </section>

      {/* Heritage Narrative */}
      <section id="heritage" style={{ padding: '20vw 8vw', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10vw', alignItems: 'center' }}>
        <div className="reveal-hidden">
          <p className="label-md" style={{ marginBottom: '2.5rem' }}>Our Lineage | EST. 1993</p>
          <h2 className="display-md" style={{ marginBottom: '4rem', fontSize: '4.5rem' }}>Born of Silent <br/> Witness</h2>
          <p style={{ fontSize: '1.3rem', lineHeight: '2.1', color: 'var(--color-outline)', maxWidth: '600px' }}>
            Founded in Makrana, Rajasthan—the source of the world’s most pristine marble—Roop Stone Arts began as a family pursuit of perfection.
            <br /><br />
            For three decades, we have traversed the furthest reaches of the globe to hand-select monoliths that speak of tectonic shift and celestial pressure. Our collection rejects 98% of available stock, ensuring only the most profound textural narratives enter our collection.
          </p>
        </div>
        <div className="reveal-hidden" style={{ position: 'relative' }}>
          <div style={{
            height: '800px',
            backgroundColor: 'var(--color-surface-highest)',
            backgroundImage: `url('/images/products/5.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 50px 120px rgba(0,0,0,0.12)'
          }} />
        </div>
      </section>

      {/* Curation Process */}
      <section style={{ padding: '15vw 8vw', backgroundColor: 'var(--color-surface-low)' }}>
        <div style={{ textAlign: 'center', marginBottom: '10vw' }}>
          <p className="label-md">The Architectural Method</p>
          <h2 className="display-md">The Art of Selection</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4vw' }}>
          {[
            { step: '01', title: 'Identification', desc: 'Every slab is treated as a unique manuscript. We identify veins that tell a story spanning millennia.' },
            { step: '02', title: 'Extraction', desc: 'Precision extraction ensures the crystalline integrity of the stone remains uncompromised.' },
            { step: '03', title: 'Precision', desc: 'Only the most profound narratives enter our collection, shaped by masters of the artisanal craft.' }
          ].map((item, i) => (
            <div key={i} style={{ padding: '5rem 3.5rem', backgroundColor: 'var(--color-background)', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.03)' }}>
              <span style={{ 
                position: 'absolute', 
                top: '2.5rem', 
                right: '2.5rem', 
                fontSize: '5rem', 
                fontWeight: 800, 
                opacity: 0.03, 
                fontFamily: 'var(--font-heading)' 
              }}>
                {item.step}
              </span>
              <h3 className="display-sm" style={{ marginBottom: '2rem', fontSize: '2rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--color-outline)', lineHeight: '1.9', fontSize: '1.1rem' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Signature Collections Spotlight */}
      <section style={{ padding: '20vw 8vw' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw', alignItems: 'start' }}>
          <div className="reveal-hidden">
             <p className="label-md" style={{ marginBottom: '2rem' }}>Design Excellence</p>
             <h2 className="display-md" style={{ marginBottom: '4rem' }}>Sacred <br/> Sanctuaries</h2>
             <div style={{
                height: '700px',
                backgroundImage: `url('/images/products/9.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 40px 100px rgba(0,0,0,0.08)'
             }} />
             <div style={{ marginTop: '3rem' }}>
                <h3 className="display-sm" style={{ fontSize: '1.8rem' }}>Neel Shanti Mandir</h3>
                <p style={{ color: 'var(--color-outline)', fontSize: '1.2rem', marginTop: '1.5rem' }}>A soothing blend of devotion and elegance featuring soft blue inlay work set against pristine marble.</p>
             </div>
          </div>
          <div className="reveal-hidden" style={{ marginTop: '15vw' }}>
             <div style={{
                height: '700px',
                backgroundImage: `url('/images/products/10.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 40px 100px rgba(0,0,0,0.08)'
             }} />
             <div style={{ marginTop: '3rem' }}>
                <h3 className="display-sm" style={{ fontSize: '1.8rem' }}>Swarn Pallav Mandir</h3>
                <p style={{ color: 'var(--color-outline)', fontSize: '1.2rem', marginTop: '1.5rem' }}>Adorned with delicate golden leaf motifs, symbolizing growth, renewal, and divine blessings.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Permanence Section - REFINED */}
      <section style={{ padding: '15vw 8vw', backgroundColor: 'var(--color-surface-high)' }}>
        <div className="weighted-asymmetry">
          <div className="reveal-hidden">
            <div style={{
                height: '800px',
                backgroundImage: `url('/images/products/12.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 50px 150px rgba(0,0,0,0.15)'
            }} />
          </div>
          <div>
            <p className="label-md" style={{ marginBottom: '2rem' }}>Our Promise</p>
            <h2 className="display-md" style={{ marginBottom: '3.5rem', fontSize: '5rem' }}>Permanence <br /> & Poetics</h2>
            <p style={{ fontSize: '1.4rem', lineHeight: '2.1', color: 'var(--color-outline)', maxWidth: '550px' }}>
              We do not build for the season. We build for the centuries. Our vision is a return to architecture as an enduring monolith. 
              <br /><br />
              Based in Jodhpur and Makrana, we bridge the gap between raw natural beauty and refined architectural elegance. Your space is not just a room; it is a reflection of your taste and idea of divinity.
            </p>
            <div style={{ marginTop: '6rem' }}>
              <Link href="/#inquiry" className="bronze-luster" style={{
                padding: '2rem 6rem',
                color: '#fff',
                fontSize: '0.9rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                fontWeight: 700,
                display: 'inline-block'
              }}>
                Begin Your Legacy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '10vw 8vw', 
        backgroundColor: 'var(--color-surface-low)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '6vw'
      }}>
         <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <img src="/images/logo.png" alt="Logo" style={{ height: '54px', width: 'auto' }} />
              <div style={{ fontSize: '1.4rem', letterSpacing: '0.4em', fontWeight: '500' }}>ROOP STONE ARTS</div>
            </div>
            <p style={{ opacity: 0.6, fontSize: '1rem', lineHeight: '1.8', maxWidth: '350px' }}>
              Handcrafted from the same mountains that gave the world the Taj Mahal. From the heart of Makrana to the world.
            </p>
         </div>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4vw' }}>
            <div>
               <p className="label-md" style={{ marginBottom: '2.5rem' }}>Navigation</p>
               <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1rem', opacity: 0.8 }}>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/#heritage">Heritage</Link></li>
                  <li><Link href="/#brands">Collections</Link></li>
               </ul>
            </div>
            <div>
               <p className="label-md" style={{ marginBottom: '2.5rem' }}>Contact</p>
               <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '1rem', opacity: 0.8 }}>
                  <li>+91 7742712301</li>
                  <li>info@roopstonearts.com</li>
                  <li>Makrana, Rajasthan</li>
               </ul>
            </div>
         </div>
         <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p style={{ opacity: 0.4, fontSize: '0.8rem', letterSpacing: '0.2em' }}>
              © {new Date().getFullYear()} ROOP STONE ARTS. ALL RIGHTS RESERVED.
            </p>
         </div>
      </footer>
    </main>
  );
}
