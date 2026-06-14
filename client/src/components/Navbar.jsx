import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ease } from './ui';

const links = [
  { label: 'Products', href: '#store' },
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

function NavLink({ label, href, scrollTo }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li style={{ position: 'relative' }}>
      <button
        onClick={() => scrollTo(href)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'none', color: hovered ? 'var(--white)' : 'var(--muted2)',
          fontSize: '0.85rem', fontWeight: 500, border: 'none', cursor: 'pointer',
          fontFamily: 'var(--head)', padding: '6px 0', position: 'relative',
          transition: 'color 0.2s', letterSpacing: '-0.01em',
        }}
      >
        {label}
        <motion.span
          initial={false}
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg,var(--ai),var(--ai2))',
            transformOrigin: 'left',
          }}
        />
      </button>
    </li>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

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
        transition={{ duration: 0.8, ease }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 2.5rem',
          background: scrolled ? 'rgba(4,4,10,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.6)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.6)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background 0.5s ease, border-color 0.5s ease',
        }}
      >
        {/* Logo */}
        <a href="#home" onClick={e => { e.preventDefault(); scrollTo('#home'); }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <motion.div
            whileHover={{ rotate: 5, scale: 1.08 }}
            transition={{ duration: 0.3 }}
            style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg,var(--ai),#5a4acd)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.68rem', fontWeight: 800, fontFamily: 'var(--mono)',
              color: '#fff', letterSpacing: '-1px',
              boxShadow: '0 0 20px var(--ai-glow)',
            }}>WF</motion.div>
          <span style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
            W<span style={{ color: 'var(--ai2)' }}>F</span>reelancers
          </span>
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '2rem', alignItems: 'center', listStyle: 'none' }}
          className="nav-links-desktop">
          {links.map(l => (
            <NavLink key={l.label} {...l} scrollTo={scrollTo} />
          ))}
        </ul>

        {/* Right CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <motion.button
            className="nav-ghost-btn"
            onClick={() => scrollTo('#store')}
            whileHover={{ borderColor: 'var(--border3)', background: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'transparent', color: 'var(--white2)', padding: '0.45rem 1.1rem',
              borderRadius: 10, fontSize: '0.8rem', fontWeight: 600,
              border: '1px solid var(--border2)', cursor: 'pointer',
              fontFamily: 'var(--head)', transition: 'all 0.2s', letterSpacing: '-0.01em',
            }}
          >Browse store</motion.button>

          <motion.button
            onClick={() => scrollTo('#contact')}
            whileHover={{ scale: 1.04, y: -1, boxShadow: '0 0 32px rgba(123,104,238,0.4)' }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: 'linear-gradient(135deg,var(--ai),#6a5acd)',
              color: '#fff', padding: '0.45rem 1.1rem',
              borderRadius: 10, fontSize: '0.8rem', fontWeight: 700,
              border: 'none', cursor: 'pointer', fontFamily: 'var(--head)',
              boxShadow: '0 0 24px var(--ai-glow)',
              transition: 'box-shadow 0.3s', letterSpacing: '-0.01em',
            }}
          >Get a quote ↗</motion.button>

          {/* Hamburger */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(v => !v)}
            style={{
              background: 'none', border: '1px solid var(--border2)', borderRadius: 8,
              padding: '7px 9px', display: 'none', flexDirection: 'column',
              gap: 4, cursor: 'pointer',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                width: 18, height: 2, background: 'var(--muted2)', borderRadius: 1, display: 'block',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(3px,3px)'
                  : i === 2 ? 'rotate(-45deg) translate(3px,-3px)' : 'none'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
                transition: 'transform 0.3s, opacity 0.2s',
              }} />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.35, ease }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 199,
              background: 'rgba(6,6,14,0.97)', backdropFilter: 'blur(24px)',
              borderBottom: '1px solid var(--border)',
              padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
            }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => scrollTo(l.href)}
                style={{
                  background: 'none', border: 'none', color: 'var(--white2)',
                  fontSize: '1.1rem', fontWeight: 700, textAlign: 'left',
                  fontFamily: 'var(--head)', cursor: 'pointer', letterSpacing: '-0.02em',
                }}
              >
                {l.label}
              </motion.button>
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