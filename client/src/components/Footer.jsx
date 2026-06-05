import { motion } from 'framer-motion';
import { ease } from './ui';

const LINKS = [
  { label: 'Products', href: '#products' },
  { label: 'AI Trading Bot', href: '#trading-bot' },
  { label: 'AI Assistant', href: '#assistant' },
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTo = href => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer" style={{
      background: 'var(--bg2)', borderTop: '1px solid var(--border)',
      padding: '4rem 2.5rem 3rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 300,
        background: 'radial-gradient(ellipse,rgba(123,104,238,0.06) 0%,transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative' }}>
        {/* Big CTA line */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900,
            letterSpacing: '-0.05em', lineHeight: 1.0,
            background: 'linear-gradient(135deg,var(--white) 40%,var(--muted) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '1.25rem',
          }}>
            The OS for modern freelancing.
          </p>
          <motion.button
            onClick={() => scrollTo('#products')}
            whileHover={{ scale: 1.04, y: -2, boxShadow: '0 0 40px rgba(123,104,238,0.35)' }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: 'linear-gradient(135deg,var(--ai),#6a5acd)',
              color: '#fff', border: 'none', padding: '0.8rem 2rem',
              borderRadius: 14, fontSize: '0.95rem', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 0 28px var(--ai-glow)',
              fontFamily: 'var(--head)', letterSpacing: '-0.01em',
              transition: 'box-shadow 0.3s',
            }}
          >Browse products ↗</motion.button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border)', marginBottom: '2.5rem' }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: 'linear-gradient(135deg,var(--ai),#6a5acd)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.65rem', fontWeight: 800, fontFamily: 'var(--mono)', color: '#fff',
            }}>WF</div>
            <span style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.035em' }}>
              W<span style={{ color: 'var(--ai2)' }}>F</span>reelancers
            </span>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap' }}>
            {LINKS.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.href)}
                style={{
                  background: 'none', border: 'none', color: 'var(--muted)',
                  fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'var(--head)',
                  transition: 'color 0.2s', letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--white2)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}
              >{l.label}</button>
            ))}
          </div>

          <p style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
            © 2025 WFreelancers · Nairobi, Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
