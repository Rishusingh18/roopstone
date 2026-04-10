'use client';
import React, { useState } from 'react';
import { calculateIndicativePrice, EstimatorInputs } from '@/data/estimatorConfig';

export default function PriceEstimatorPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<EstimatorInputs>({
    templeType: 'wall_mounted',
    widthFt: 4,
    heightFt: 5,
    material: 'standard_vietnam',
    complexity: 'minimal',
    backlit: false,
    internationalShipping: false
  });
  
  const [result, setResult] = useState<{ min: number, max: number } | null>(null);
  
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateIndicativePrice(formData);
    setResult(res);
    setStep(3); // Result step
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Next config step
  };

  const inputStyles = {
    width: '100%', padding: '0.75rem', marginBottom: '1.5rem', 
    border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem'
  };

  const btnStyles = {
    padding: '1rem 2rem', backgroundColor: 'var(--color-primary)', 
    color: 'var(--color-secondary)', border: 'none', cursor: 'pointer',
    fontSize: '1.1rem', borderRadius: '4px', marginTop: '1rem'
  };

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--color-primary)', textAlign: 'center', marginBottom: '1rem' }}>
          Temple Price Estimator
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '3rem', opacity: 0.8 }}>
          Receive an indicative quote based on your material choices and dimensions.
        </p>

        <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          {step === 1 && (
            <form onSubmit={handleNext}>
              <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Step 1: Core Dimensions & Type</h2>
              
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Temple Type</label>
              <select 
                style={inputStyles}
                value={formData.templeType} 
                onChange={(e) => setFormData({...formData, templeType: e.target.value as any})}
              >
                <option value="wall_mounted">Wall Mounted</option>
                <option value="floor_standing">Floor Standing</option>
                <option value="pooja_room_complete">Complete Pooja Room Installation</option>
              </select>

              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Width (in feet)</label>
              <input type="number" step="0.5" min="2" max="20" style={inputStyles} 
                value={formData.widthFt} onChange={(e) => setFormData({...formData, widthFt: parseFloat(e.target.value)})}
                required
              />

              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Height (in feet)</label>
              <input type="number" step="0.5" min="2" max="20" style={inputStyles} 
                value={formData.heightFt} onChange={(e) => setFormData({...formData, heightFt: parseFloat(e.target.value)})}
                required
              />

              <button type="submit" style={btnStyles}>Continue to Finishes</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleCalculate}>
              <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Step 2: Material & Complexity</h2>

              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Material Grade</label>
              <select style={inputStyles} value={formData.material} onChange={(e) => setFormData({...formData, material: e.target.value as any})}>
                <option value="standard_vietnam">Standard Vietnam Marble</option>
                <option value="premium_makrana">Premium Makrana White</option>
                <option value="italian_carrara">Italian Carrara Marble</option>
              </select>

              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Carving Complexity</label>
              <select style={inputStyles} value={formData.complexity} onChange={(e) => setFormData({...formData, complexity: e.target.value as any})}>
                <option value="minimal">Minimal / Modern Clean</option>
                <option value="moderate">Moderate Detailing</option>
                <option value="intricate_heritage">Intricate Heritage Carving</option>
              </select>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.backlit} onChange={(e) => setFormData({...formData, backlit: e.target.checked})} />
                Include Backlit / LED Panels
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.internationalShipping} onChange={(e) => setFormData({...formData, internationalShipping: e.target.checked})} />
                Requires International Shipping
              </label>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep(1)} style={{...btnStyles, backgroundColor: '#f0f0f0', color: '#333'}}>Back</button>
                <button type="submit" style={btnStyles}>Calculate Estimate</button>
              </div>
            </form>
          )}

          {step === 3 && result && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ marginBottom: '1rem', fontSize: '1.8rem', color: 'var(--color-primary)' }}>Your Estimated Quote</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#555' }}>
                Based on your selections, the estimated investment is:
              </p>
              <div style={{ padding: '2rem', backgroundColor: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--color-secondary)' }}>
                  ₹{result.min.toLocaleString('en-IN')} - ₹{result.max.toLocaleString('en-IN')}
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', fontStyle: 'italic', opacity: 0.7, marginBottom: '2rem' }}>
                Disclaimer: All price estimator results designed within this system are indicative only. Final quotes will depend on exact architectural design, material selection, logistics, and formal business approval.
              </p>
              
              <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem', textAlign: 'left' }}>
                <h3 style={{ marginBottom: '1rem' }}>Want a formal quote?</h3>
                <p style={{ marginBottom: '1rem' }}>Leave your details below and our design consultant will reach out to discuss your specific requirements.</p>
                <form>
                  <input type="text" placeholder="Your Name" required style={inputStyles} />
                  <input type="email" placeholder="Your Email" required style={inputStyles} />
                  <input type="tel" placeholder="Phone Number" required style={inputStyles} />
                  <button type="button" onClick={() => alert("Lead functionality to be connected to CRM.")} style={{...btnStyles, width: '100%'}}>
                    Request Formal Quote
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
