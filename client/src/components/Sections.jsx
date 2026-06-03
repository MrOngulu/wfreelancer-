import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease } from './ui';

const SERVICES = [
  { icon:'🤖', name:'Custom AI Tools',     desc:'Bespoke AI models and automation for your use case.', from:'From $500', color:'rgba(123,104,238,0.13)' },
  { icon:'🌐', name:'Website Development', desc:'Business sites and web apps in Node.js and React.',   from:'From $299', color:'rgba(29,233,182,0.10)' },
  { icon:'📱', name:'Mobile App Dev',       desc:'Cross-platform iOS & Android with React Native.',     from:'From $500', color:'rgba(123,104,238,0.10)' },
  { icon:'🎨', name:'UI/UX Design',         desc:'Figma wireframes, prototypes and design systems.',    from:'From $350', color:'rgba(255,160,64,0.10)'  },
  { icon:'⚡', name:'SaaS Web Apps',        desc:'Subscription platforms with auth, billing, admin.',  from:'From $800', color:'rgba(123,104,238,0.13)' },
  { icon:'🔗', name:'API & Integrations',   desc:'M-Pesa, PayPal, Stripe, WhatsApp and custom APIs.',  from:'From $250', color:'rgba(29,233,182,0.08)'  },
];

const TESTIMONIALS = [
  { stars:5, text:'The trading bot has been running 3 months straight. Consistent results, easy risk settings, Telegram alerts are perfect. Best $299 I spent.',
    name:'David Kimani', role:'Forex trader · Nairobi', initials:'DK' },
  { stars:5, text:'Deployed the AI Assistant and support tickets dropped 60%. Handles returns, shipping, everything. Genuinely impressed.',
    name:'Amina Mwangi', role:'Founder, Duka Online', initials:'AM' },
  { stars:5, text:'Bought the React Native starter and saved 3 weeks of setup. Clean code, M-Pesa built in — huge plus.',
    name:'Kwame Osei', role:'Mobile developer · Accra', initials:'KO' },
];

const STEPS = [
  { num:'01', title:'Pick or describe', desc:'Buy ready-made or describe your custom project.' },
  { num:'02', title:'Pay securely',     desc:'M-Pesa STK Push, PayPal, or bank transfer.' },
  { num:'03', title:'Receive delivery', desc:'Instant download for templates. Custom work in sprints.' },
  { num:'04', title:'Support included', desc:'30 days for products. 60 days free for custom builds.' },
];

const SLabel = ({ children }) => (
  <p style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', textTransform:'uppercase',
    letterSpacing:'0.16em', color:'var(--ai2)', marginBottom:'0.6rem',
    display:'flex', alignItems:'center', gap:8 }}>
    <span style={{width:20,height:1,background:'linear-gradient(90deg,var(--ai),transparent)',display:'inline-block'}}/>
    {children}
  </p>
);

// ─── Services ─────────────────────────────────────────────────────────────────
export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-40px' });

  return (
    <div ref={ref} id="services" style={{
      width:'100%', height:'100%',
      display:'flex', flexDirection:'column', justifyContent:'center',
      background:'rgb(5,5,14)',
      padding:'72px clamp(1.25rem,4vw,3rem) 1rem',
      overflow:'hidden',
    }}>
      <div style={{ maxWidth:1140, margin:'0 auto', width:'100%' }}>
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,ease}}>
          <SLabel>Custom development</SLabel>
          <h2 style={{fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:900,letterSpacing:'-0.045em',
            lineHeight:1.0,marginBottom:'1.5rem',color:'var(--white)'}}>Need something built?</h2>
        </motion.div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,
          background:'var(--border)',borderRadius:18,overflow:'hidden'}} className="svc-grid">
          {SERVICES.map((s,i) => (
            <motion.div key={s.name}
              initial={{opacity:0}} animate={inView?{opacity:1}:{}}
              transition={{duration:0.5,ease,delay:i*0.05}}
              whileHover={{background:s.color}}
              style={{background:'rgba(5,5,14,0.98)',padding:'1.5rem 1.25rem',
                transition:'background 0.35s',cursor:'pointer'}}>
              <div style={{width:38,height:38,borderRadius:12,background:s.color,
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:'1.1rem',marginBottom:'0.875rem'}}>{s.icon}</div>
              <h3 style={{fontSize:'0.9rem',fontWeight:800,letterSpacing:'-0.02em',
                marginBottom:'0.4rem',color:'var(--white)'}}>{s.name}</h3>
              <p style={{fontSize:'0.78rem',color:'var(--muted2)',lineHeight:1.65,
                fontWeight:400,marginBottom:'0.6rem'}}>{s.desc}</p>
              <span style={{fontSize:'0.68rem',fontFamily:'var(--mono)',color:'var(--ai2)',fontWeight:600}}>{s.from}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.svc-grid{grid-template-columns:repeat(2,1fr) !important;}}
               @media(max-width:600px){.svc-grid{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-40px' });

  return (
    <div ref={ref} id="reviews" style={{
      width:'100%', height:'100%',
      display:'flex', flexDirection:'column', justifyContent:'center',
      background:'rgb(5,5,14)',
      padding:'72px clamp(1.25rem,4vw,3rem) 1rem',
      overflow:'hidden',
    }}>
      <div style={{ maxWidth:1140, margin:'0 auto', width:'100%' }}>
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:0.6,ease}} style={{textAlign:'center',marginBottom:'1.75rem'}}>
          <SLabel>Client reviews</SLabel>
          <h2 style={{fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:900,
            letterSpacing:'-0.045em',lineHeight:1.0,color:'var(--white)'}}>
            Trusted across Africa
          </h2>
        </motion.div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem'}} className="tm-grid">
          {TESTIMONIALS.map((t,i) => (
            <motion.div key={i}
              initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:0.6,ease,delay:i*0.1}}
              whileHover={{y:-4,borderColor:'rgba(123,104,238,0.3)'}}
              style={{background:'rgba(255,255,255,0.025)',border:'1px solid var(--border)',
                borderRadius:20,padding:'1.5rem',position:'relative',overflow:'hidden',
                transition:'border-color 0.3s,transform 0.3s'}}>
              <div style={{position:'absolute',top:0,left:'20%',right:'20%',height:1,
                background:'linear-gradient(90deg,transparent,rgba(123,104,238,0.5),transparent)'}}/>
              <div style={{color:'var(--amber)',fontSize:'0.85rem',letterSpacing:3,marginBottom:'0.875rem'}}>
                {'★'.repeat(t.stars)}
              </div>
              <p style={{fontSize:'0.85rem',color:'var(--white2)',lineHeight:1.75,
                fontWeight:400,marginBottom:'1.25rem',fontStyle:'italic'}}>"{t.text}"</p>
              <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
                <div style={{width:36,height:36,borderRadius:'50%',
                  background:'linear-gradient(135deg,var(--ai),#6a5acd)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:'0.68rem',fontWeight:800,color:'#fff',flexShrink:0}}>{t.initials}</div>
                <div>
                  <p style={{fontSize:'0.82rem',fontWeight:700,color:'var(--white)',marginBottom:2}}>{t.name}</p>
                  <p style={{fontSize:'0.68rem',color:'var(--muted)'}}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.tm-grid{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
export function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-40px' });

  return (
    <div ref={ref} id="process" style={{
      width:'100%', height:'100%',
      display:'flex', flexDirection:'column', justifyContent:'center',
      background:'rgb(5,5,14)',
      padding:'72px clamp(1.25rem,4vw,3rem) 1rem',
      overflow:'hidden',
    }}>
      <div style={{ maxWidth:1140, margin:'0 auto', width:'100%' }}>
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:0.6,ease}} style={{textAlign:'center',marginBottom:'1.75rem'}}>
          <SLabel>How it works</SLabel>
          <h2 style={{fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:900,
            letterSpacing:'-0.045em',lineHeight:1.0,color:'var(--white)'}}>
            Simple process, real results
          </h2>
        </motion.div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:1,
          background:'var(--border)',borderRadius:18,overflow:'hidden'}} className="proc-grid">
          {STEPS.map((s,i) => (
            <motion.div key={s.num}
              initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:0.55,ease,delay:i*0.08}}
              whileHover={{background:'rgba(123,104,238,0.06)'}}
              style={{background:'rgba(5,5,14,0.98)',padding:'2rem 1.5rem',
                position:'relative',transition:'background 0.3s'}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:3,
                background:i===0?'linear-gradient(90deg,var(--ai),transparent)':'transparent'}}/>
              <div style={{fontSize:'3rem',fontWeight:900,fontFamily:'var(--mono)',
                color:'rgba(123,104,238,0.1)',letterSpacing:'-0.05em',lineHeight:1,
                marginBottom:'0.875rem',userSelect:'none'}}>{s.num}</div>
              <h3 style={{fontSize:'0.95rem',fontWeight:800,letterSpacing:'-0.022em',
                marginBottom:'0.5rem',color:'var(--white)'}}>{s.title}</h3>
              <p style={{fontSize:'0.8rem',color:'var(--muted2)',lineHeight:1.65,fontWeight:400}}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.proc-grid{grid-template-columns:repeat(2,1fr) !important;}}
               @media(max-width:480px){.proc-grid{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}
