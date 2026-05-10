import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionLabel, SectionTitle, fadeUp, staggerContainer } from './ui';

const PAY_METHODS = [
  { icon:'📲', name:'M-Pesa (STK Push)', sub:'Safaricom Paybill — instant confirmation' },
  { icon:'🅿️', name:'PayPal', sub:'International cards & PayPal balance' },
  { icon:'🏦', name:'Bank Transfer', sub:'Equity Bank · KCB · SWIFT international' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.target));
    fetch('/submit-contact', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(data),
    }).catch(() => {});
    setTimeout(() => { setLoading(false); setSent(true); e.target.reset(); }, 800);
  };

  const inputStyle = {
    background:'rgba(255,255,255,0.04)', border:'1px solid var(--border2)',
    color:'var(--white)', padding:'0.75rem 1rem', borderRadius:12,
    fontSize:'0.875rem', width:'100%', outline:'none',
    transition:'border-color 0.2s',
  };

  return (
    <section id="contact" style={{ padding:'6rem 2.5rem', background:'var(--bg)' }}>
      <div style={{ maxWidth:1140, margin:'0 auto' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-80px' }} variants={staggerContainer}>
          <motion.div variants={fadeUp}>
            <SectionLabel>Get started</SectionLabel>
            <SectionTitle>Buy, ask, or build</SectionTitle>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.25fr', gap:'5rem', alignItems:'start', marginTop:'3rem' }}>
            {/* Left info */}
            <motion.div variants={fadeUp}>
              <p style={{ fontSize:'0.9375rem', color:'var(--muted2)', lineHeight:1.75, marginBottom:'2rem' }}>
                Have questions about a product, or need something custom? We typically reply within a few hours. For ready-made products, use the buy buttons above.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'2rem' }}>
                {PAY_METHODS.map(p => (
                  <motion.div
                    key={p.name}
                    whileHover={{ borderColor:'rgba(123,104,238,0.3)', x:2 }}
                    style={{
                      display:'flex', alignItems:'center', gap:'1rem',
                      background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)',
                      borderRadius:14, padding:'0.875rem 1.1rem', transition:'all 0.2s',
                    }}
                  >
                    <span style={{ fontSize:'1.35rem', width:36, textAlign:'center' }}>{p.icon}</span>
                    <div>
                      <p style={{ fontSize:'0.875rem', fontWeight:700 }}>{p.name}</p>
                      <p style={{ fontSize:'0.72rem', color:'var(--muted)' }}>{p.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p style={{ fontSize:'0.82rem', color:'var(--muted)', lineHeight:1.8 }}>
                📧{' '}
                <a href="mailto:wfreelancers1@gmail.com" style={{ color:'var(--ai3)', transition:'color 0.2s' }}
                  onMouseEnter={e=>e.target.style.color='var(--ai2)'}
                  onMouseLeave={e=>e.target.style.color='var(--ai3)'}
                >
                  wfreelancers1@gmail.com
                </a><br/>
                🌍 Serving clients across Africa &amp; globally
              </p>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeUp}>
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                  {[['name','Name','Your name'],['email','Email','you@example.com']].map(([n,l,p]) => (
                    <div key={n} style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                      <label style={{ fontSize:'0.7rem', fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.07em' }}>{l}</label>
                      <input name={n} type={n==='email'?'email':'text'} placeholder={p} required style={inputStyle}
                        onFocus={e=>e.target.style.borderColor='var(--ai)'}
                        onBlur={e=>e.target.style.borderColor='var(--border2)'} />
                    </div>
                  ))}
                </div>
                {[
                  { name:'interest', label:'Interested in', type:'select', opts:['WF AI Trading Bot','WF AI Assistant','Website Template','Mobile App Template','UI/UX Design Kit','SaaS Boilerplate','Custom development','Other'] },
                  { name:'budget', label:'Budget (USD)', type:'select', opts:['Under $200','$200 – $500','$500 – $1,000','$1,000+'] },
                ].map(f => (
                  <div key={f.name} style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                    <label style={{ fontSize:'0.7rem', fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.07em' }}>{f.label}</label>
                    <select name={f.name} style={{ ...inputStyle, appearance:'none' }}
                      onFocus={e=>e.target.style.borderColor='var(--ai)'}
                      onBlur={e=>e.target.style.borderColor='var(--border2)'}>
                      <option value="">Select...</option>
                      {f.opts.map(o => <option key={o} value={o} style={{ background:'var(--bg2)' }}>{o}</option>)}
                    </select>
                  </div>
                ))}
                <div style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                  <label style={{ fontSize:'0.7rem', fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.07em' }}>Message</label>
                  <textarea name="message" placeholder="Describe your project or ask a question..." rows={4}
                    style={{ ...inputStyle, resize:'vertical' }}
                    onFocus={e=>e.target.style.borderColor='var(--ai)'}
                    onBlur={e=>e.target.style.borderColor='var(--border2)'} />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale:1.02, y:-1 }}
                  whileTap={{ scale:0.97 }}
                  disabled={loading}
                  style={{
                    background:'linear-gradient(135deg,var(--ai),#6a5acd)',
                    color:'#fff', border:'none', padding:'0.875rem',
                    borderRadius:12, fontSize:'0.95rem', fontWeight:800,
                    cursor: loading ? 'wait' : 'pointer',
                    boxShadow:'0 0 32px var(--ai-glow)',
                    opacity: loading ? 0.7 : 1,
                    marginTop:'0.25rem',
                  }}
                >
                  {loading ? 'Sending...' : 'Send message →'}
                </motion.button>
                {sent && (
                  <motion.div
                    initial={{ opacity:0, y:8 }}
                    animate={{ opacity:1, y:0 }}
                    style={{
                      background:'rgba(29,233,182,0.08)', border:'1px solid rgba(29,233,182,0.2)',
                      color:'var(--green)', borderRadius:12, padding:'0.875rem 1rem', fontSize:'0.875rem',
                    }}
                  >
                    ✅ Message sent! We'll get back to you within 24 hours.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <style>{`
        @media(max-width:800px){ #contact > div > div > div:last-child { grid-template-columns:1fr !important; gap:2.5rem !important; } }
        @media(max-width:600px){ #contact { padding:4rem 1.25rem !important; } }
      `}</style>
    </section>
  );
}
