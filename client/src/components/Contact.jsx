import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease } from './ui';

const PAY = [
  {icon:'📲',name:'M-Pesa (STK Push)',sub:'Safaricom Paybill — instant'},
  {icon:'🅿️',name:'PayPal',          sub:'Cards & PayPal balance'},
  {icon:'🏦',name:'Bank Transfer',    sub:'Equity · KCB · SWIFT'},
];
const inp = {
  background:'rgba(255,255,255,0.05)',border:'1px solid var(--border2)',
  color:'var(--white)',padding:'0.7rem 0.9rem',borderRadius:10,
  fontSize:'0.82rem',width:'100%',outline:'none',
  transition:'border-color 0.22s',fontFamily:'var(--head)',
};

export default function Contact() {
  const [sent,setSent]=useState(false);
  const [loading,setLoading]=useState(false);
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:'-40px'});

  const handleSubmit=e=>{
    e.preventDefault(); setLoading(true);
    const data=Object.fromEntries(new FormData(e.target));
    fetch('https://wfreelancer.onrender.com/submit-contact',{
      method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),
    }).catch(()=>{});
    setTimeout(()=>{setLoading(false);setSent(true);e.target.reset();},800);
  };

  return (
    <div ref={ref} id="contact" style={{
      width:'100%', height:'100%',
      display:'flex', flexDirection:'column', justifyContent:'center',
      background:'rgb(5,5,14)',
      padding:'72px clamp(1.25rem,4vw,3rem) 1rem',
      overflow:'hidden',
    }}>
      <div style={{maxWidth:1140,margin:'0 auto',width:'100%'}}>
        <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,ease}}>
          <p style={{fontSize:'0.65rem',fontFamily:'var(--mono)',textTransform:'uppercase',
            letterSpacing:'0.16em',color:'var(--ai2)',marginBottom:'0.5rem',
            display:'flex',alignItems:'center',gap:8}}>
            <span style={{width:20,height:1,background:'linear-gradient(90deg,var(--ai),transparent)',display:'inline-block'}}/>
            Get started
          </p>
          <h2 style={{fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:900,letterSpacing:'-0.045em',
            lineHeight:1.0,marginBottom:'0.6rem',color:'var(--white)'}}>Buy, ask, or build.</h2>
          <p style={{color:'var(--muted2)',fontSize:'0.85rem',maxWidth:420,lineHeight:1.7,
            fontWeight:400,marginBottom:'1.5rem'}}>
            Ready-made products ship instantly. Custom projects quoted within 24 hours.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Left */}
          <motion.div initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}}
            transition={{duration:0.7,ease,delay:0.15}}>
            <p style={{fontSize:'0.62rem',fontFamily:'var(--mono)',color:'var(--muted)',
              textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.875rem'}}>Payment methods</p>
            <div style={{display:'flex',flexDirection:'column',gap:'0.5rem',marginBottom:'1.25rem'}}>
              {PAY.map((p,i)=>(
                <motion.div key={p.name}
                  initial={{opacity:0,x:-12}} animate={inView?{opacity:1,x:0}:{}}
                  transition={{duration:0.5,ease,delay:0.2+i*0.06}}
                  whileHover={{borderColor:'rgba(123,104,238,0.3)',x:3}}
                  style={{display:'flex',alignItems:'center',gap:'0.75rem',
                    background:'rgba(255,255,255,0.03)',border:'1px solid var(--border)',
                    borderRadius:12,padding:'0.75rem 0.875rem',transition:'all 0.22s'}}>
                  <span style={{fontSize:'1.1rem',width:28,textAlign:'center',flexShrink:0}}>{p.icon}</span>
                  <div>
                    <p style={{fontSize:'0.8rem',fontWeight:700,marginBottom:2,color:'var(--white)'}}>{p.name}</p>
                    <p style={{fontSize:'0.68rem',color:'var(--muted)'}}>{p.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{padding:'1.1rem',background:'rgba(123,104,238,0.06)',
              border:'1px solid rgba(123,104,238,0.15)',borderRadius:13}}>
              <p style={{fontSize:'0.6rem',fontFamily:'var(--mono)',color:'var(--ai3)',
                textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.35rem'}}>Direct contact</p>
              <a href="mailto:wfreelancers1@gmail.com"
                style={{fontSize:'0.85rem',color:'var(--white2)',fontWeight:600,display:'block',
                  marginBottom:4,transition:'color 0.2s',textDecoration:'none'}}
                onMouseEnter={e=>e.target.style.color='var(--ai2)'}
                onMouseLeave={e=>e.target.style.color='var(--white2)'}>
                wfreelancers1@gmail.com
              </a>
              <p style={{fontSize:'0.75rem',color:'var(--muted)'}}>🌍 Nairobi, Kenya · Global delivery</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{opacity:0,x:20}} animate={inView?{opacity:1,x:0}:{}}
            transition={{duration:0.7,ease,delay:0.22}}>
            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'0.65rem'}}>
              <div className="name-row">
                {[['name','Name','Your name'],['email','Email','you@example.com']].map(([n,l,ph])=>(
                  <div key={n} style={{display:'flex',flexDirection:'column',gap:'0.3rem'}}>
                    <label style={{fontSize:'0.6rem',fontFamily:'var(--mono)',color:'var(--muted)',
                      textTransform:'uppercase',letterSpacing:'0.1em'}}>{l}</label>
                    <input name={n} type={n==='email'?'email':'text'} placeholder={ph} required style={inp}
                      onFocus={e=>e.target.style.borderColor='var(--ai)'}
                      onBlur={e=>e.target.style.borderColor='var(--border2)'}/>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'0.3rem'}}>
                <label style={{fontSize:'0.6rem',fontFamily:'var(--mono)',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.1em'}}>Interested in</label>
                <select name="interest" style={{...inp,appearance:'none',WebkitAppearance:'none'}}
                  onFocus={e=>e.target.style.borderColor='var(--ai)'}
                  onBlur={e=>e.target.style.borderColor='var(--border2)'}>
                  <option value="">Select...</option>
                  {['WF AI Trading Bot','WF AI Assistant','Website','Mobile App','UI Kit','SaaS','Custom build'].map(o=>(
                    <option key={o} value={o} style={{background:'var(--bg2)'}}>{o}</option>
                  ))}
                </select>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'0.3rem'}}>
                <label style={{fontSize:'0.6rem',fontFamily:'var(--mono)',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.1em'}}>Message</label>
                <textarea name="message" placeholder="Describe your project..." rows={3}
                  style={{...inp,resize:'vertical'}}
                  onFocus={e=>e.target.style.borderColor='var(--ai)'}
                  onBlur={e=>e.target.style.borderColor='var(--border2)'}/>
              </div>
              <motion.button type="submit"
                whileHover={{scale:1.02,y:-1,boxShadow:'0 0 40px rgba(123,104,238,0.35)'}}
                whileTap={{scale:0.97}} disabled={loading}
                style={{background:'linear-gradient(135deg,var(--ai),#6a5acd)',color:'#fff',
                  border:'none',padding:'0.8rem',borderRadius:11,fontSize:'0.9rem',
                  fontWeight:800,cursor:loading?'wait':'pointer',
                  boxShadow:'0 0 28px var(--ai-glow)',opacity:loading?0.7:1,
                  letterSpacing:'-0.01em',fontFamily:'var(--head)',transition:'box-shadow 0.3s'}}>
                {loading?'Sending...':'Send message →'}
              </motion.button>
              {sent && (
                <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
                  style={{background:'rgba(29,233,182,0.08)',border:'1px solid rgba(29,233,182,0.25)',
                    color:'var(--green)',borderRadius:11,padding:'0.75rem',fontSize:'0.82rem'}}>
                  ✅ Sent! We'll reply within 24 hours.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:3rem;align-items:start;}
        .name-row{display:grid;grid-template-columns:1fr 1fr;gap:0.65rem;}
        @media(max-width:768px){.contact-grid{grid-template-columns:1fr !important;gap:2rem !important;}}
        @media(max-width:480px){.name-row{grid-template-columns:1fr !important;}}
      `}</style>
    </div>
  );
}
