import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Badge, ease } from './ui';

const PRODUCTS = [
  { icon:'📈', tag:'AI Software', badge:{text:'AI',variant:'ai'}, name:'WF AI Trading Bot',
    desc:'ML trading bot for Forex, crypto & stocks. 24/7 automated execution.', price:'$299',
    slug:'wf-ai-trading-bot', glow:'rgba(123,104,238,0.18)', ac:'var(--ai2)',
    stats:[['87%','Win rate'],['24/7','Active'],['+12.4%','Today']] },
  { icon:'💬', tag:'AI Software', badge:{text:'New',variant:'green'}, name:'WF AI Assistant',
    desc:'Smart chatbot for any website. Handles support, leads & Q&A instantly.', price:'$199',
    slug:'wf-ai-assistant', glow:'rgba(29,233,182,0.14)', ac:'var(--green)',
    stats:[['60%','Tickets down'],['Instant','Reply'],['99.9%','Uptime']] },
  { icon:'⚡', tag:'AI Software', badge:{text:'Soon',variant:'muted'}, name:'WF Analytics AI',
    desc:'Ask questions about your data in plain English. Charts on demand.', price:'—',
    slug:null, glow:'rgba(255,160,64,0.12)', ac:'var(--amber)', comingSoon:true,
    stats:[['Plain','English'],['Any','Dataset'],['Live','Charts']] },
];

export default function FeaturedProducts({ onBuy }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-40px' });
  const navigate = useNavigate();

  return (
    <div ref={ref} id="products" style={{
      width:'100%', height:'100%',
      display:'flex', flexDirection:'column', justifyContent:'center',
      background:'rgb(5,5,14)',
      padding:'72px clamp(1.25rem,4vw,3rem) 1rem',
      overflow:'hidden',
    }}>
      <div style={{ maxWidth:1140, margin:'0 auto', width:'100%' }}>

        {/* Header row */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end',
          marginBottom:'1.5rem', flexWrap:'wrap', gap:'0.75rem' }}>
          <div>
            <p style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', textTransform:'uppercase',
              letterSpacing:'0.16em', color:'var(--ai2)', marginBottom:'0.5rem',
              display:'flex', alignItems:'center', gap:8 }}>
              <span style={{width:20,height:1,background:'linear-gradient(90deg,var(--ai),transparent)',display:'inline-block'}}/>
              Flagship software
            </p>
            <motion.h2
              initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:0.6,ease,delay:0.05}}
              style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:900,
                letterSpacing:'-0.045em', lineHeight:1.0, margin:0, color:'var(--white)' }}
            >AI products built to earn</motion.h2>
          </div>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}}
            transition={{delay:0.2,duration:0.6}}
            style={{ color:'var(--muted2)', fontSize:'0.85rem', maxWidth:280, lineHeight:1.7, fontWeight:400 }}>
            Deploy-ready algorithms tested in real markets.
          </motion.p>
        </div>

        {/* Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem' }}
          className="fp-grid">
          {PRODUCTS.map((p,i) => (
            <motion.div key={p.name}
              initial={{opacity:0,y:32}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:0.65,ease,delay:i*0.1}}
              whileHover={{y:-5, boxShadow:`0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${p.glow}`}}
              style={{ background:'linear-gradient(160deg,rgba(14,14,26,0.95),rgba(8,8,18,0.90))',
                border:'1px solid var(--border)', borderRadius:20, padding:'1.5rem',
                position:'relative', overflow:'hidden', display:'flex', flexDirection:'column',
                transition:'box-shadow 0.3s, transform 0.3s',
                cursor:p.comingSoon?'default':'pointer' }}
            >
              {/* Top glow line */}
              <div style={{position:'absolute',top:0,left:'20%',right:'20%',height:1,
                background:`linear-gradient(90deg,transparent,${p.glow},transparent)`}}/>

              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem'}}>
                <div style={{width:44,height:44,borderRadius:14,
                  background:`radial-gradient(circle at 30% 30%,${p.glow},rgba(0,0,0,0.4))`,
                  border:`1px solid ${p.glow}`,display:'flex',alignItems:'center',
                  justifyContent:'center',fontSize:'1.3rem'}}>{p.icon}</div>
                <Badge variant={p.badge.variant}>{p.badge.text}</Badge>
              </div>

              <p style={{fontSize:'0.6rem',fontFamily:'var(--mono)',color:'var(--muted)',
                textTransform:'uppercase',letterSpacing:'0.12em',marginBottom:'0.3rem'}}>{p.tag}</p>
              <h3 style={{fontSize:'1rem',fontWeight:800,letterSpacing:'-0.025em',
                marginBottom:'0.5rem',color:'var(--white)'}}>{p.name}</h3>
              <p style={{fontSize:'0.8rem',color:'var(--muted2)',lineHeight:1.65,
                fontWeight:400,marginBottom:'1rem',flexGrow:1}}>{p.desc}</p>

              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0.4rem',marginBottom:'1rem'}}>
                {p.stats.map(([v,l]) => (
                  <div key={l} style={{background:'rgba(255,255,255,0.04)',
                    border:'1px solid var(--border)',borderRadius:10,
                    padding:'0.5rem 0.3rem',textAlign:'center'}}>
                    <div style={{fontSize:'0.8rem',fontWeight:800,fontFamily:'var(--mono)',color:p.ac}}>{v}</div>
                    <div style={{fontSize:'0.58rem',color:'var(--muted)',marginTop:2}}>{l}</div>
                  </div>
                ))}
              </div>

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <span style={{fontSize:'1.3rem',fontWeight:900,fontFamily:'var(--mono)',
                  color:p.comingSoon?'var(--muted)':p.ac}}>{p.price}</span>
                {!p.comingSoon && (
                  <button onClick={() => navigate(`/product/${p.slug}`)}
                    style={{background:'rgba(255,255,255,0.07)',color:'var(--white2)',
                      border:'1px solid var(--border2)',borderRadius:9,
                      padding:'0.45rem 1rem',fontSize:'0.75rem',fontWeight:600,
                      cursor:'pointer',fontFamily:'var(--head)',transition:'all 0.2s'}}
                    onMouseEnter={e=>{e.currentTarget.style.background='var(--ai)';e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor='var(--ai)'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.07)';e.currentTarget.style.color='var(--white2)';e.currentTarget.style.borderColor='var(--border2)'}}
                  >Learn more →</button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){ .fp-grid { grid-template-columns:1fr !important; } }
        @media(max-width:1024px){ .fp-grid { grid-template-columns:1fr 1fr !important; } }
      `}</style>
    </div>
  );
}
