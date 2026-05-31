import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// ─── Animation presets ────────────────────────────────────────────────────────
export const ease = [0.22, 1, 0.36, 1];
export const easeOut = [0.0, 0.0, 0.2, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease } }
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
};

// ─── AnimatedHeadline — word-by-word reveal ───────────────────────────────────
export function AnimatedHeadline({ children, style, className, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const words = typeof children === 'string' ? children.split(' ') : [children];

  return (
    <h2 ref={ref} className={className} style={{ overflow: 'hidden', ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: '110%', rotateX: -20 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.75, ease, delay: delay + i * 0.07 }}
          style={{ display: 'inline-block', marginRight: '0.3em', transformOrigin: 'bottom' }}
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}

// ─── RevealText — line-by-line reveal ────────────────────────────────────────
export function RevealText({ children, delay = 0, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} style={{ overflow: 'hidden', ...style }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── AnimatedParagraph ────────────────────────────────────────────────────────
export function AnimatedParagraph({ children, delay = 0, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay }}
      style={style}
    >
      {children}
    </motion.p>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────
export function SectionLabel({ children, center }) {
  return (
    <p style={{
      fontSize: '0.7rem', fontFamily: 'var(--mono)', textTransform: 'uppercase',
      letterSpacing: '0.16em', color: 'var(--ai2)', marginBottom: '1.1rem',
      display: 'flex', alignItems: 'center', gap: '10px',
      justifyContent: center ? 'center' : 'flex-start',
    }}>
      <span style={{
        width: 24, height: 1,
        background: 'linear-gradient(90deg,var(--ai),transparent)',
        display: 'inline-block', flexShrink: 0
      }} />
      {children}
      {center && <span style={{
        width: 24, height: 1,
        background: 'linear-gradient(270deg,var(--ai),transparent)',
        display: 'inline-block', flexShrink: 0
      }} />}
    </p>
  );
}

// ─── SectionTitle ─────────────────────────────────────────────────────────────
export function SectionTitle({ children, style }) {
  return (
    <h2 style={{
      fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 900,
      letterSpacing: '-0.045em', lineHeight: 1.0, marginBottom: '1.2rem',
      ...style
    }}>
      {children}
    </h2>
  );
}

// ─── BtnPrimary ───────────────────────────────────────────────────────────────
export function BtnPrimary({ children, onClick, href, style }) {
  const el = (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2, boxShadow: '0 0 48px rgba(123,104,238,0.4)' }}
      whileTap={{ scale: 0.96 }}
      style={{
        background: 'linear-gradient(135deg, var(--ai) 0%, #6a5acd 100%)',
        color: '#fff', padding: '0.8rem 1.75rem', borderRadius: 14,
        fontSize: '0.9rem', fontWeight: 700, display: 'inline-flex',
        alignItems: 'center', gap: 8, border: 'none',
        boxShadow: '0 0 32px var(--ai-glow), inset 0 1px 0 rgba(255,255,255,0.15)',
        cursor: 'pointer', transition: 'box-shadow 0.3s',
        letterSpacing: '-0.01em',
        ...style
      }}
    >
      {children}
    </motion.button>
  );
  if (href) return <a href={href}>{el}</a>;
  return el;
}

// ─── BtnGhost ─────────────────────────────────────────────────────────────────
export function BtnGhost({ children, onClick, href, style }) {
  const el = (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'var(--border3)' }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: 'transparent', color: 'var(--white2)',
        padding: '0.8rem 1.6rem', borderRadius: 14,
        fontSize: '0.9rem', fontWeight: 500,
        border: '1px solid var(--border2)',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        cursor: 'pointer', letterSpacing: '-0.01em', ...style
      }}
    >
      {children}
    </motion.button>
  );
  if (href) return <a href={href}>{el}</a>;
  return el;
}

// ─── GlassCard ────────────────────────────────────────────────────────────────
export function GlassCard({ children, style, onClick, hover = true }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -6, borderColor: 'rgba(123,104,238,0.35)', boxShadow: '0 32px 80px rgba(0,0,0,0.4)' } : {}}
      style={{
        background: 'linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))',
        border: '1px solid var(--border)',
        borderRadius: 24, backdropFilter: 'blur(12px)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 0.3s, box-shadow 0.4s',
        ...style
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
export function Badge({ children, variant = 'ai' }) {
  const vars = {
    ai:    { bg: 'rgba(123,104,238,0.12)', color: 'var(--ai3)', border: 'rgba(123,104,238,0.25)' },
    green: { bg: 'rgba(29,233,182,0.1)',   color: 'var(--green)', border: 'rgba(29,233,182,0.22)' },
    amber: { bg: 'rgba(255,160,64,0.1)',   color: 'var(--amber)', border: 'rgba(255,160,64,0.22)' },
    muted: { bg: 'rgba(255,255,255,0.05)', color: 'var(--muted2)', border: 'var(--border2)' },
  };
  const v = vars[variant] || vars.ai;
  return (
    <span style={{
      display: 'inline-block', background: v.bg, color: v.color,
      border: `1px solid ${v.border}`, padding: '0.22rem 0.7rem',
      borderRadius: 100, fontSize: '0.67rem', fontFamily: 'var(--mono)',
      fontWeight: 500, letterSpacing: '0.05em'
    }}>
      {children}
    </span>
  );
}
