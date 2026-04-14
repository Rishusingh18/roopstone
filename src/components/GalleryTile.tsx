'use client';

import { CSSProperties } from 'react';

interface GalleryTileProps {
  image: string;
  title: string;
  subtitle?: string;
  className?: string;
  style?: CSSProperties;
}

export default function GalleryTile({ image, title, subtitle, className = '', style }: GalleryTileProps) {
  return (
    <div
      className={`asymmetric-tile group ${className}`}
      style={{
        ...style,
        position: 'relative',
        height: '600px',
        width: '100%',
        overflow: 'hidden',
        boxShadow: '0 30px 60px rgba(30, 28, 18, 0.12)',
        backgroundColor: 'var(--color-surface-container-low)'
      }}
    >
      {/* Background Image with Hover Scale */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="group-hover:scale-105"
      />

      <div
        className="glass-blur"
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          padding: '3rem',
          zIndex: 1,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <p className="label-md" style={{ 
          fontSize: '0.65rem', 
          marginBottom: '0.8rem',
          opacity: 0.8
        }}>
          {subtitle}
        </p>
        <h3 style={{ 
          fontSize: '1.8rem', 
          color: 'var(--color-text)', 
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: '500'
        }}>
          {title}
        </h3>
      </div>

      <style jsx>{`
        .group:hover > div:first-child {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
