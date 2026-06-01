import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel, AnimatedHeadline, ease } from './ui';

const PAY = [
  { icon:'📲', name:'M-Pesa (STK Push)', sub:'Safaricom Paybill — instant confirmation' },
  { icon:'🅿️', name:'PayPal',            sub:'International cards & PayPal balance' },
  { icon:'🏦', name:'Bank Transfer',      sub:'Equity Bank · KCB · SWIFT international' },
];

const inputStyle = {
  background:'rgba(255,255,255,0.04)', border:'1px solid var(--border2)',
  color:'var(--white)', padding:'0.8rem 1rem', borderRadius:12,
  fontSize:'0.875rem', width:'100%', outline:'none',
  transition:'border-color 0.25s', fontFamily:'var(--head)',
};

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.target));
    fetch('https://wfreelancer.onrender.com/submit-contact', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify(data),
    }).catch(() => {});
    setTimeout(() => { setLoading(false); setSent(true); e.target.reset(); }, 800);
  };

  return (
    <div ref={ref} id="contact" style={{
      width:'100%', height:'100%',
      display:'flex', alignItems:'center',
      padding:'0 2.5rem', overflow:'hidden',
    }}>
      <div style={{ maxWidth:1140, margin:'0 auto', width:'100%' }}>
        <motion.div initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,ease}}>
          <SectionLabel>Get started</SectionLabel>
        </motion.div>
        <AnimatedHeadline
          style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:900,
            letterSpacing:'-0.05em', lineHeight:0.95, marginBottom:'1.25rem' }}
          delay={0.1}
        >Buy, ask, or build.</AnimatedHeadline>
        <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.25,duration:0.7}}
          style={{ color:'var(--muted2)', fontSize:'1rem', maxWidth:460, lineHeight:1.85,
            fontWeight:400, marginBottom:'3rem' }}>
          Ready-made products ship instantly. Custom projects quoted within 24 hours. Based in Nairobi, working globally.
        </motion.p>

        <div className="contact-grid">
          {/* Left */}
          <motion.div
            initial={{opacity:0,x:-24}} animate={inView?{opacity:1,x:0}:{}}
            transition={{duration:0.8,ease,delay:0.2}}
          >
            <h3 style={{ fontSize:'0.9rem', fontWeight:700, letterSpacing:'-0.02em',
              marginBottom:'1.1rem', color:'var(--white2)', textTransform:'uppercase',
              letterSpacing:'0.08em', fontSize:'0.7rem', fontFamily:'var(--mono)' }}>Payment methods</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem', marginBottom:'2rem' }}>
              {PAY.map((p,i) => (
                <motion.div key={p.name}
                  initial={{opacity:0,x:-16}} animate={inView?{opacity:1,x:0}:{}}
                  transition={{duration:0.6,ease,delay:0.3+i*0.07}}
                  whileHover={{ borderColor:'rgba(123,104,238,0.3)', x:4 }}
                  style={{ display:'flex', alignItems:'center', gap:'0.875rem',
                    background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)',
                    borderRadius:13, padding:'0.9rem 1rem', transition:'all 0.25s' }}
                >
                  <span style={{ fontSize:'1.2rem', width:32, textAlign:'center', flexShrink:0 }}>{p.icon}</span>
                  <div>
                    <p style={{ fontSize:'0.85rem', fontWeight:700, marginBottom:2 }}>{p.name}</p>
                    <p style={{ fontSize:'0.7rem', color:'var(--muted)' }}>{p.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{ padding:'1.25rem', background:'rgba(123,104,238,0.06)',
              border:'1px solid rgba(123,104,238,0.15)', borderRadius:14 }}>
              <p style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', color:'var(--ai3)',
                textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.4rem' }}>Direct contact</p>
              <a href="mailto:wfreelancers1@gmail.com"
                style={{ fontSize:'0.9rem', color:'var(--white2)', fontWeight:600, display:'block', marginBottom:5, transition:'color 0.2s' }}
                onMouseEnter={e=>e.target.style.color='var(--ai2)'}
                onMouseLeave={e=>e.target.style.color='var(--white2)'}
              >wfreelancers1@gmail.com</a>
              <p style={{ fontSize:'0.78rem', color:'var(--muted)' }}>🌍 Nairobi, Kenya · Global delivery</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{opacity:0,x:24}} animate={inView?{opacity:1,x:0}:{}}
            transition={{duration:0.8,ease,delay:0.3}}
          >
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              <div className="name-email-row">
                {[['name','Name','Your name'],['email','Email','you@example.com']].map(([n,l,p])=>(
                  <div key={n} style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                    <label style={{ fontSize:'0.63rem', fontFamily:'var(--mono)', color:'var(--muted)',
                      textTransform:'uppercase', letterSpacing:'0.1em' }}>{l}</label>
                    <input name={n} type={n==='email'?'email':'text'} placeholder={p} required style={inputStyle}
                      onFocus={e=>e.target.style.borderColor='var(--ai)'}
                      onBlur={e=>e.target.style.borderColor='var(--border2)'} />
                  </div>
                ))}
              </div>
              {[
                {name:'interest',label:'Interested in',opts:['WF AI Trading Bot','WF AI Assistant','Website Template','Mobile App','UI/UX Design Kit','SaaS Boilerplate','Custom development','Other']},
                {name:'budget',label:'Budget (USD)',opts:['Under $200','$200–$500','$500–$1,000','$1,000+']},
              ].map(f=>(
                <div key={f.name} style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                  <label style={{ fontSize:'0.63rem', fontFamily:'var(--mono)', color:'var(--muted)',
                    textTransform:'uppercase', letterSpacing:'0.1em' }}>{f.label}</label>
                  <select name={f.name} style={{...inputStyle,appearance:'none',WebkitAppearance:'none'}}
                    onFocus={e=>e.target.style.borderColor='var(--ai)'}
                    onBlur={e=>e.target.style.borderColor='var(--border2)'}>
                    <option value="">Select...</option>
                    {f.opts.map(o=><option key={o} value={o} style={{background:'var(--bg2)'}}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                <label style={{ fontSize:'0.63rem', fontFamily:'var(--mono)', color:'var(--muted)',
                  textTransform:'uppercase', letterSpacing:'0.1em' }}>Message</label>
                <textarea name="message" placeholder="Describe your project or ask a question..." rows={3}
                  style={{...inputStyle,resize:'vertical'}}
                  onFocus={e=>e.target.style.borderColor='var(--ai)'}
                  onBlur={e=>e.target.style.borderColor='var(--border2)'} />
              </div>
              <motion.button type="submit"
                whileHover={{ scale:1.02,y:-2,boxShadow:'0 0 48px rgba(123,104,238,0.4)' }}
                whileTap={{ scale:0.97 }}
                disabled={loading}
                style={{ background:'linear-gradient(135deg,var(--ai),#6a5acd)', color:'#fff',
                  border:'none', padding:'0.9rem', borderRadius:12, fontSize:'0.95rem',
                  fontWeight:800, cursor:loading?'wait':'pointer',
                  boxShadow:'0 0 32px var(--ai-glow)', opacity:loading?0.7:1,
                  letterSpacing:'-0.01em', fontFamily:'var(--head)', transition:'box-shadow 0.3s' }}
              >{loading?'Sending...':'Send message →'}</motion.button>
              {sent && (
                <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
                  style={{ background:'rgba(29,233,182,0.08)', border:'1px solid rgba(29,233,182,0.25)',
                    color:'var(--green)', borderRadius:12, padding:'0.875rem', fontSize:'0.875rem' }}>
                  ✅ Message sent! We'll reply within 24 hours.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-grid { display:grid; grid-template-columns:1fr 1.3fr; gap:4rem; align-items:start; }
        .name-email-row { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; }
        @media(max-width:800px){ .contact-grid { grid-template-columns:1fr !important; gap:2.5rem !important; } }
        @media(max-width:500px){ .name-email-row { grid-template-columns:1fr !important; } }
      `}</style>
    </div>
  );
}
