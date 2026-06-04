import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel, AnimatedHeadline, RevealText, ease } from './ui';

const SERVICES = [
  { icon:'🤖', name:'Custom AI Tools', desc:'Bespoke AI models, chatbots, and automation built for your specific use case and industry.', from:'From $500', color:'rgba(123,104,238,0.15)' },
  { icon:'🌐', name:'Website Development', desc:'Responsive business sites, landing pages, and full web apps in Node.js, React, and modern stacks.', from:'From $299', color:'rgba(29,233,182,0.12)' },
  { icon:'📱', name:'Mobile App Dev', desc:'Cross-platform iOS & Android apps with React Native or Flutter. Firebase backend, app store ready.', from:'From $500', color:'rgba(123,104,238,0.12)' },
  { icon:'🎨', name:'UI/UX Design', desc:'Figma wireframes, prototypes, and complete design systems with user testing included.', from:'From $350', color:'rgba(255,160,64,0.12)' },
  { icon:'⚡', name:'SaaS Web Apps', desc:'Subscription platforms with auth, billing, admin dashboards, and REST APIs — production-ready.', from:'From $800', color:'rgba(123,104,238,0.15)' },
  { icon:'🔗', name:'API & Integrations', desc:'M-Pesa STK Push, PayPal, Stripe, WhatsApp Business, and any custom REST or webhook integration.', from:'From $250', color:'rgba(29,233,182,0.1)' },
];

const TESTIMONIALS = [
  { stars:5, text:'The trading bot has been running for 3 months straight. Consistent results, easy to configure risk settings, and Telegram alerts are perfect. Best $299 I spent.', name:'David Kimani', role:'Forex trader · Nairobi', initials:'DK' },
  { stars:5, text:'Deployed the AI Assistant on our site and our support ticket volume dropped by 60%. It handles returns, shipping, everything. Genuinely impressed.', name:'Amina Mwangi', role:'Founder, Duka Online · Nairobi', initials:'AM' },
  { stars:5, text:'Bought the React Native starter kit and saved 3 weeks of setup time. Clean code, well documented. M-Pesa support built in — huge plus for us.', name:'Kwame Osei', role:'Mobile developer · Accra', initials:'KO' },
];

const STEPS = [
  { num:'01', title:'Pick or describe', desc:'Buy a ready-made product or describe your custom project. No fluff, just results.' },
  { num:'02', title:'Pay securely', desc:'M-Pesa STK Push, PayPal, or bank transfer — whatever works best for you.' },
  { num:'03', title:'Receive delivery', desc:'Instant download for templates. Custom work delivered in agreed sprints.' },
  { num:'04', title:'Support included', desc:'All products get 30 days support. Custom projects get 60 days free.' },
];

// ─── Services ─────────────────────────────────────────────────────────────────
export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" style={{ padding: '9rem 2.5rem', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle bg glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 800, height: 600, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(123,104,238,0.04) 0%, transparent 70%)',
        pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative' }}>
        <div ref={ref}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}>
            <SectionLabel>Custom development</SectionLabel>
          </motion.div>

          {/* Big editorial headline */}
          <div style={{ marginBottom: '5rem' }}>
            <AnimatedHeadline
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, margin: '0 0 1.5rem' }}
              delay={0.1}
            >
              Need something built?
            </AnimatedHeadline>
            <RevealText delay={0.3}>
              <p style={{ color: 'var(--muted2)', fontSize: '1.05rem', maxWidth: 500, lineHeight: 1.75 }}>
                Don't see what you need in the store? We build bespoke software, apps, and AI tools from scratch — scoped, priced, and delivered.
              </p>
            </RevealText>
          </div>
        </div>

        {/* Services grid — asymmetric */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1px',
          background: 'var(--border)', borderRadius: 24, overflow: 'hidden' }}>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease, delay: i * 0.07 }}
              whileHover={{ background: s.color }}
              style={{
                background: 'transparent', padding: '2.25rem 2rem',
                transition: 'background 0.4s', position: 'relative',
              }}
            >
              <div style={{ width: 50, height: 50, borderRadius: 16,
                background: s.color, border: `1px solid ${s.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem', marginBottom: '1.25rem',
              }}>{s.icon}</div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.6rem' }}>{s.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted2)', lineHeight: 1.7, marginBottom: '1rem' }}>{s.desc}</p>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--ai2)', fontWeight: 600 }}>{s.from}</span>

              {/* Arrow on hover */}
              <motion.span
                initial={{ opacity: 0, x: -4 }} whileHover={{ opacity: 1, x: 0 }}
                style={{ position: 'absolute', top: '2.25rem', right: '2rem', fontSize: '1.1rem', color: 'var(--ai2)' }}
              >→</motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:600px){ #services { padding:5rem 1.25rem !important; } }`}</style>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="reviews" style={{ padding: '9rem 2.5rem', background: 'var(--bg2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div ref={ref}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}>
            <SectionLabel center>Client reviews</SectionLabel>
          </motion.div>
          <AnimatedHeadline
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.0, textAlign: 'center', marginBottom: '1.5rem' }}
            delay={0.1}
          >
            Trusted across Africa
          </AnimatedHeadline>
          <RevealText delay={0.3}>
            <p style={{ color: 'var(--muted2)', fontSize: '1.05rem', maxWidth: 460, lineHeight: 1.75, textAlign: 'center', margin: '0 auto 5rem' }}>
              Real feedback from traders, startups, and businesses using WFreelancers products.
            </p>
          </RevealText>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem' }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease, delay: i * 0.1 }}
              whileHover={{ y: -6, borderColor: 'rgba(123,104,238,0.3)', boxShadow: '0 32px 80px rgba(0,0,0,0.4)' }}
              style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
                borderRadius: 24, padding: '2.25rem',
                transition: 'border-color 0.3s, box-shadow 0.4s, transform 0.4s',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Top line */}
              <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
                background: 'linear-gradient(90deg,transparent,rgba(123,104,238,0.5),transparent)' }} />

              <div style={{ color: 'var(--amber)', fontSize: '0.9rem', letterSpacing: 3, marginBottom: '1.25rem' }}>
                {'★'.repeat(t.stars)}
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--white2)', lineHeight: 1.8, marginBottom: '2rem', fontStyle: 'italic' }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: 'linear-gradient(135deg,var(--ai),#6a5acd)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 800, color: '#fff', flexShrink: 0,
                }}>{t.initials}</div>
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 2 }}>{t.name}</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:600px){ #reviews { padding:5rem 1.25rem !important; } }`}</style>
    </section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────
export function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" style={{ padding: '9rem 2.5rem', background: 'var(--bg3)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}>
            <SectionLabel center>How it works</SectionLabel>
          </motion.div>
          <AnimatedHeadline
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.0, marginBottom: '1.5rem', textAlign: 'center' }}
            delay={0.1}
          >
            Simple process, real results
          </AnimatedHeadline>
          <RevealText delay={0.3}>
            <p style={{ color: 'var(--muted2)', fontSize: '1.05rem', maxWidth: 400, lineHeight: 1.75, margin: '0 auto' }}>
              From idea to delivery — four clear steps, no surprises.
            </p>
          </RevealText>
        </div>

        {/* Steps — horizontal timeline on desktop */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 1,
          background: 'var(--border)', borderRadius: 24, overflow: 'hidden' }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              whileHover={{ background: 'rgba(123,104,238,0.06)' }}
              style={{ background: 'var(--bg3)', padding: '2.5rem 2rem', position: 'relative', transition: 'background 0.3s' }}
            >
              {/* Step number — large muted */}
              <div style={{
                fontSize: '4rem', fontWeight: 900, fontFamily: 'var(--mono)',
                color: 'rgba(123,104,238,0.12)', letterSpacing: '-0.05em',
                lineHeight: 1, marginBottom: '1rem', userSelect: 'none',
              }}>{s.num}</div>
              {/* Active indicator bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: i === 0
                  ? 'linear-gradient(90deg,var(--ai),transparent)'
                  : 'transparent',
              }} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.6rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted2)', lineHeight: 1.7 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:600px){
          #process { padding:5rem 1.25rem !important; }
          #process .process-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  );
}
