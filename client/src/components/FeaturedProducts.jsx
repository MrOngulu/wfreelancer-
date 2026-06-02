import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SectionLabel, AnimatedHeadline, Badge, ease } from './ui';

const PRODUCTS = [
  {
    icon:'📈', tag:'AI Software', badge:{text:'AI',variant:'ai'},
    name:'WF AI Trading Bot',
    desc:'ML trading algorithm. 24/7 execution across Forex, crypto & stocks. Configurable risk.',
    price:'$299', slug:'wf-ai-trading-bot', glow:'rgba(123,104,238,0.2)',
    accentColor:'var(--ai2)',
    stats:[['87%','Win rate'],['24/7','Active'],['+12.4%','Today']],
  },
  {
    icon:'💬', tag:'AI Software', badge:{text:'New',variant:'green'},
    name:'WF AI Assistant',
    desc:'Smart chatbot for any website. Handles support, leads & Q&A. Ready in minutes.',
    price:'$199', slug:'wf-ai-assistant', glow:'rgba(29,233,182,0.16)',
    accentColor:'var(--green)',
    stats:[['60%','Ticket drop'],['Instant','Response'],['99.9%','Uptime']],
  },
  {
    icon:'⚡', tag:'AI Software', badge:{text:'Coming soon',variant:'muted'},
    name:'WF Analytics AI',
    desc:'Ask questions about your data in plain English. Charts and insights on demand.',
    price:'—', slug:null, glow:'rgba(255,160,64,0.13)',
    accentColor:'var(--amber)', comingSoon:true,
    stats:[['Plain','English'],['Any','Dataset'],['Real-time','Charts']],
  },
];

export default function FeaturedProducts({ onBuy }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const navigate = useNavigate();

  return (
    <div ref={ref} id="products" style={{
      width:'100%', height:'100%',
      display:'flex', alignItems:'center',
      background:'rgb(5,5,14)',
      padding:'0 2.5rem', overflow:'hidden',
    }}>
      <div style={{ maxWidth:1140, margin:'0 auto', width:'100%' }}>

        <motion.div initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,ease}}>
          <SectionLabel>Flagship software</SectionLabel>
        </motion.div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end',
          marginBottom:'3rem', flexWrap:'wrap', gap:'1rem' }}>
          <AnimatedHeadline
            style={{ fontSize:'clamp(2.2rem,4.5vw,3.5rem)', fontWeight:900,
              letterSpacing:'-0.045em', lineHeight:1.0, margin:0, maxWidth:480 }}
            delay={0.1}
          >AI products built to earn</AnimatedHeadline>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.3,duration:0.7}}
            style={{ color:'var(--muted2)', fontSize:'0.95rem', maxWidth:300,
              lineHeight:1.85, fontWeight:400 }}>
            Deploy-ready algorithms and intelligent tools — tested in real markets.
          </motion.p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.25rem' }}>
          {PRODUCTS.map((p, i) => (
            <motion.div key={p.name}
              initial={{opacity:0, y:48}}
              animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:0.8,ease,delay:i*0.12}}
              whileHover={{ y:-7,
                borderColor:p.glow.replace('0.2','0.45').replace('0.16','0.38').replace('0.13','0.35'),
                boxShadow:`0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px ${p.glow}` }}
              style={{
                background:'linear-gradient(160deg,rgba(14,14,24,0.92),rgba(8,8,18,0.88))',
                border:'1px solid var(--border)', borderRadius:24, padding:'2rem',
                position:'relative', overflow:'hidden',
                display:'flex', flexDirection:'column',
                transition:'border-color 0.3s, box-shadow 0.4s',
                cursor: p.comingSoon ? 'default' : 'pointer',
              }}
            >
              <div style={{ position:'absolute', top:-60, right:-60, width:200, height:200,
                borderRadius:'50%', background:`radial-gradient(ellipse,${p.glow} 0%,transparent 70%)`,
                pointerEvents:'none' }} />
              <div style={{ position:'absolute', top:0, left:'15%', right:'15%', height:1,
                background:`linear-gradient(90deg,transparent,${p.glow},transparent)` }} />

              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1.5rem' }}>
                <div style={{ width:52, height:52, borderRadius:16,
                  background:`radial-gradient(circle at 30% 30%,${p.glow},rgba(0,0,0,0.3))`,
                  border:`1px solid ${p.glow}`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem' }}>
                  {p.icon}
                </div>
                <Badge variant={p.badge.variant}>{p.badge.text}</Badge>
              </div>

              <p style={{ fontSize:'0.62rem', fontFamily:'var(--mono)', color:'var(--muted)',
                textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'0.4rem' }}>{p.tag}</p>
              <h3 style={{ fontSize:'1.2rem', fontWeight:900, letterSpacing:'-0.03em', marginBottom:'0.7rem' }}>{p.name}</h3>
              <p style={{ fontSize:'0.875rem', color:'var(--muted2)', lineHeight:1.75,
                fontWeight:400, marginBottom:'1.5rem', flexGrow:1 }}>{p.desc}</p>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.5rem', marginBottom:'1.5rem' }}>
                {p.stats.map(([v,l]) => (
                  <div key={l} style={{ background:'rgba(255,255,255,0.03)',
                    border:'1px solid var(--border)', borderRadius:11, padding:'0.6rem 0.4rem', textAlign:'center' }}>
                    <div style={{ fontSize:'0.875rem', fontWeight:800, fontFamily:'var(--mono)', color:p.accentColor }}>{v}</div>
                    <div style={{ fontSize:'0.6rem', color:'var(--muted)', marginTop:2 }}>{l}</div>
                  </div>
                ))}
              </div>

              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:'1.45rem', fontWeight:900, fontFamily:'var(--mono)',
                  color:p.comingSoon?'var(--muted)':p.accentColor }}>{p.price}</span>
                {!p.comingSoon && (
                  <motion.button
                    whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                    onClick={() => navigate(`/product/${p.slug}`)}
                    style={{ background:'rgba(255,255,255,0.07)', color:'var(--white2)',
                      border:'1px solid var(--border2)', borderRadius:10,
                      padding:'0.5rem 1.1rem', fontSize:'0.8rem', fontWeight:600,
                      cursor:'pointer', fontFamily:'var(--head)',
                      transition:'all 0.25s' }}
                  >Learn more →</motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
