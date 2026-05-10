import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BtnPrimary } from './ui';

const links = [
  { label: 'Products', href: '#products' },
  { label: 'AI Bot', href: '#trading-bot' },
  { label: 'AI Assistant', href: '#assistant' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 2.5rem',
          background: scrolled
            ? 'rgba(4,4,10,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo */}
        <a href="#home" style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg,var(--ai),#6a5acd)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize: '0.7rem', fontWeight: 800, fontFamily:'var(--mono)',
            color: '#fff', letterSpacing: '-1px',
            boxShadow: '0 0 20px var(--ai-glow)',
          }}>WF</div>
          <span style={{ fontSize:'1rem', fontWeight:800, letterSpacing:'-0.03em' }}>
            W<span style={{ color:'var(--ai2)' }}>F</span>reelancers
          </span>
        </a>

        {/* Desktop links */}
        <ul style={{ display:'flex', gap:'2rem', alignItems:'center' }} className="nav-links-desktop">
          {links.map(l => (
            <li key={l.label}>
              <button
                onClick={() => scrollTo(l.href)}
                style={{
                  background:'none', color:'var(--muted2)', fontSize:'0.85rem',
                  fontWeight:500, border:'none', cursor:'pointer',
                  fontFamily:'var(--head)', transition:'color 0.2s', padding:'4px 0',
                  position:'relative',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--white)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted2)'}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <button
            onClick={() => scrollTo('#products')}
            className="nav-ghost-btn"
            style={{
              background:'transparent', color:'var(--white2)', padding:'0.45rem 1.1rem',
              borderRadius:10, fontSize:'0.8rem', fontWeight:600,
              border:'1px solid var(--border2)', transition:'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor='var(--border3)'; e.target.style.background='var(--surface2)'; }}
            onMouseLeave={e => { e.target.style.borderColor='var(--border2)'; e.target.style.background='transparent'; }}
          >
            Browse
          </button>
          <BtnPrimary
            onClick={() => scrollTo('#contact')}
            style={{ padding:'0.45rem 1.1rem', fontSize:'0.8rem', borderRadius:10 }}
          >
            Get a quote ↗
          </BtnPrimary>
          {/* Hamburger */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(v => !v)}
            style={{ background:'none', border:'1px solid var(--border2)', borderRadius:8,
              padding:'7px 9px', display:'none', flexDirection:'column', gap:4, cursor:'pointer' }}
          >
            <span style={{ width:18, height:2, background:'var(--muted2)', borderRadius:1, display:'block',
              transform: menuOpen ? 'rotate(45deg) translate(3px,3px)' : 'none', transition:'transform 0.3s' }} />
            <span style={{ width:18, height:2, background:'var(--muted2)', borderRadius:1, display:'block',
              opacity: menuOpen ? 0 : 1, transition:'opacity 0.2s' }} />
            <span style={{ width:18, height:2, background:'var(--muted2)', borderRadius:1, display:'block',
              transform: menuOpen ? 'rotate(-45deg) translate(3px,-3px)' : 'none', transition:'transform 0.3s' }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity:0, y:-10 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-10 }}
            transition={{ duration:0.25 }}
            style={{
              position:'fixed', top:64, left:0, right:0, zIndex:199,
              background:'rgba(9,9,15,0.97)', backdropFilter:'blur(20px)',
              borderBottom:'1px solid var(--border)',
              padding:'1.5rem 2rem', display:'flex', flexDirection:'column', gap:'1.25rem'
            }}
          >
            {links.map(l => (
              <button key={l.label} onClick={() => scrollTo(l.href)}
                style={{ background:'none', border:'none', color:'var(--white2)', fontSize:'1.05rem',
                  fontWeight:600, textAlign:'left', fontFamily:'var(--head)', cursor:'pointer' }}>
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){
          .nav-links-desktop { display:none !important; }
          .nav-ghost-btn { display:none !important; }
          .hamburger-btn { display:flex !important; }
        }
      `}</style>
    </>
  );
}
