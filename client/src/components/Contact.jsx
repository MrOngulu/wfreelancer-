import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel, AnimatedHeadline, RevealText, ease } from './ui';

const PAY_METHODS = [
  { icon: '📲', name: 'M-Pesa (STK Push)', sub: 'Safaricom Paybill — instant confirmation' },
  { icon: '🅿️', name: 'PayPal', sub: 'International cards & PayPal balance' },
  { icon: '🏦', name: 'Bank Transfer', sub: 'Equity Bank · KCB · SWIFT international' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.target));
    fetch('https://wfreelancer.onrender.com/submit-contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {});
    setTimeout(() => { setLoading(false); setSent(true); e.target.reset(); }, 800);
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border2)',
    color: 'var(--white)', padding: '0.8rem 1rem', borderRadius: 12,
    fontSize: '0.875rem', width: '100%', outline: 'none',
    transition: 'border-color 0.25s',
    fontFamily: 'var(--head)',
  };

  return (
    <section id="contact" style={{ padding: '9rem 2.5rem', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Background orb */}
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(123,104,238,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative' }}>
        <div ref={ref}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}>
            <SectionLabel>Get started</SectionLabel>
          </motion.div>
          <AnimatedHeadline
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: '1.5rem' }}
            delay={0.1}
          >
            Buy, ask, or build.
          </AnimatedHeadline>
          <RevealText delay={0.25}>
            <p style={{ color: 'var(--muted2)', fontSize: '1.05rem', maxWidth: 460, lineHeight: 1.75, marginBottom: '4rem' }}>
              Ready-made products ship instantly. Custom projects quoted within 24 hours. We're based in Nairobi and work with clients globally.
            </p>
          </RevealText>
        </div>

        <div className="contact-grid">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1.25rem', color: 'var(--white2)' }}>
              Payment methods
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
              {PAY_METHODS.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.08 }}
                  whileHover={{ borderColor: 'rgba(123,104,238,0.3)', x: 4 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
                    borderRadius: 14, padding: '1rem 1.1rem', transition: 'all 0.25s',
                  }}
                >
                  <span style={{ fontSize: '1.3rem', width: 36, textAlign: 'center', flexShrink: 0 }}>{p.icon}</span>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 2 }}>{p.name}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{p.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(123,104,238,0.06)', border: '1px solid rgba(123,104,238,0.15)', borderRadius: 16 }}>
              <p style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--ai3)', marginBottom: '0.4rem' }}>DIRECT CONTACT</p>
              <a href="mailto:wfreelancers1@gmail.com" style={{ fontSize: '0.95rem', color: 'var(--white2)', fontWeight: 600, display: 'block', marginBottom: 6,
                transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--ai2)'}
                onMouseLeave={e => e.target.style.color = 'var(--white2)'}
              >wfreelancers1@gmail.com</a>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>🌍 Nairobi, Kenya · Global delivery</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div className="contact-name-email">
                {[['name','Name','Your name'],['email','Email','you@example.com']].map(([n,l,p]) => (
                  <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', color: 'var(--muted)',
                      textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</label>
                    <input name={n} type={n==='email'?'email':'text'} placeholder={p} required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--ai)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border2)'} />
                  </div>
                ))}
              </div>

              {[
                { name:'interest', label:'Interested in', opts:['WF AI Trading Bot','WF AI Assistant','Website Template','Mobile App','UI/UX Design Kit','SaaS Boilerplate','Custom development','Other'] },
                { name:'budget', label:'Budget (USD)', opts:['Under $200','$200 – $500','$500 – $1,000','$1,000+'] },
              ].map(f => (
                <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', color: 'var(--muted)',
                    textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.label}</label>
                  <select name={f.name} style={{ ...inputStyle, appearance: 'none', WebkitAppearance: 'none' }}
                    onFocus={e => e.target.style.borderColor = 'var(--ai)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border2)'}>
                    <option value="">Select...</option>
                    {f.opts.map(o => <option key={o} value={o} style={{ background: 'var(--bg2)' }}>{o}</option>)}
                  </select>
                </div>
              ))}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', color: 'var(--muted)',
                  textTransform: 'uppercase', letterSpacing: '0.1em' }}>Message</label>
                <textarea name="message" placeholder="Describe your project or ask a question..." rows={4}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = 'var(--ai)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border2)'} />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2, boxShadow: '0 0 48px rgba(123,104,238,0.4)' }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                style={{
                  background: 'linear-gradient(135deg,var(--ai),#6a5acd)',
                  color: '#fff', border: 'none', padding: '0.95rem',
                  borderRadius: 12, fontSize: '0.95rem', fontWeight: 800,
                  cursor: loading ? 'wait' : 'pointer',
                  boxShadow: '0 0 32px var(--ai-glow)',
                  opacity: loading ? 0.7 : 1, marginTop: '0.25rem',
                  letterSpacing: '-0.01em', fontFamily: 'var(--head)',
                  transition: 'box-shadow 0.3s',
                }}
              >{loading ? 'Sending...' : 'Send message →'}</motion.button>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'rgba(29,233,182,0.08)', border: '1px solid rgba(29,233,182,0.25)',
                    color: 'var(--green)', borderRadius: 12, padding: '0.9rem 1rem', fontSize: '0.875rem',
                  }}
                >✅ Message sent! We'll get back to you within 24 hours.</motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 5rem;
          align-items: start;
        }
        .contact-name-email {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        @media(max-width:800px){ .contact-grid { grid-template-columns:1fr !important; gap:3rem !important; } }
        @media(max-width:500px){
          #contact { padding:5rem 1.25rem !important; }
          .contact-name-email { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  );
}
