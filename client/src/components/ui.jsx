import { motion } from 'framer-motion';

export function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: '0.7rem', fontFamily: 'var(--mono)', textTransform: 'uppercase',
      letterSpacing: '0.14em', color: 'var(--ai2)', marginBottom: '0.875rem',
      display: 'flex', alignItems: 'center', gap: '8px'
    }}>
      <span style={{
        width: 20, height: 1, background: 'linear-gradient(90deg,var(--ai),transparent)',
        display: 'inline-block', flexShrink: 0
      }} />
      {children}
    </p>
  );
}

export function SectionTitle({ children, style }) {
  return (
    <h2 style={{
      fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800,
      letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '1rem',
      ...style
    }}>
      {children}
    </h2>
  );
}

export function BtnPrimary({ children, onClick, href, style }) {
  const el = (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: 'linear-gradient(135deg, var(--ai), #6a5acd)',
        color: '#fff', padding: '0.75rem 1.6rem', borderRadius: 12,
        fontSize: '0.9rem', fontWeight: 700, display: 'inline-flex',
        alignItems: 'center', gap: 8, border: 'none',
        boxShadow: '0 0 32px var(--ai-glow), inset 0 1px 0 rgba(255,255,255,0.15)',
        cursor: 'pointer', transition: 'box-shadow 0.2s',
        ...style
      }}
    >
      {children}
    </motion.button>
  );
  if (href) return <a href={href}>{el}</a>;
  return el;
}

export function BtnGhost({ children, onClick, href, style }) {
  const el = (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: 'transparent', color: 'var(--white2)',
        padding: '0.75rem 1.5rem', borderRadius: 12,
        fontSize: '0.9rem', fontWeight: 500,
        border: '1px solid var(--border2)',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        cursor: 'pointer', ...style
      }}
    >
      {children}
    </motion.button>
  );
  if (href) return <a href={href}>{el}</a>;
  return el;
}

export function GlassCard({ children, style, onClick, hover = true }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, borderColor: 'rgba(123,104,238,0.3)' } : {}}
      style={{
        background: 'linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))',
        border: '1px solid var(--border)',
        borderRadius: 20, backdropFilter: 'blur(12px)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 0.3s',
        ...style
      }}
    >
      {children}
    </motion.div>
  );
}

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
      border: `1px solid ${v.border}`, padding: '0.2rem 0.65rem',
      borderRadius: 100, fontSize: '0.68rem', fontFamily: 'var(--mono)',
      fontWeight: 500, letterSpacing: '0.04em'
    }}>
      {children}
    </span>
  );
}

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } }
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};
