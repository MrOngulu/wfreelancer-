import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease } from './ui';

const PAIN = [
  { icon:'⏳', text:'Wasting hours on repetitive tasks instead of billable work' },
  { icon:'📉', text:'Missing trading opportunities the moment you step away' },
  { icon:'📞', text:'Losing leads because no one is online to answer questions' },
  { icon:'🔧', text:'Rebuilding the same infrastructure from scratch every project' },
];

const OPP = [
  { label:'Automate trading',  desc:'ML strategies running 24/7 while you sleep', color:'var(--green)', glow:'rgba(29,233,182,0.12)' },
  { label:'Automate support',  desc:'Answer customers instantly with AI',           color:'var(--ai2)',  glow:'rgba(123,104,238,0.12)' },
  { label:'Ship in days',      desc:'Start from battle-tested templates',            color:'var(--amber)',glow:'rgba(255,160,64,0.12)'  },
];

export default function Narrative() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div style={{
      width:'100%', height:'100%',
      background:'rgb(5,5,14)',
      display:'flex', alignItems:'center',
      padding:'72px clamp(1.25rem,4vw,3rem) 0',
      overflow:'hidden',
    }}>
      <div ref={ref} style={{ maxWidth:1000, margin:'0 auto', width:'100%' }}>

        {/* Two-column layout: Problem left, Opportunity right */}
        <div className="narrative-grid">

          {/* Left — Problem */}
          <div>
            <motion.p
              initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:0.5,ease}}
              style={{ fontSize:'0.68rem', fontFamily:'var(--mono)', textTransform:'uppercase',
                letterSpacing:'0.16em', color:'var(--muted)', marginBottom:'0.875rem' }}
            >The problem</motion.p>

            <motion.h2
              initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:0.7,ease,delay:0.08}}
              style={{ fontSize:'clamp(1.6rem,3vw,2.6rem)', fontWeight:900,
                letterSpacing:'-0.045em', lineHeight:1.05, marginBottom:'1rem',
                color:'var(--white)' }}
            >
              Most freelancers waste time{' '}
              <span style={{color:'var(--muted2)'}}>building systems instead of earning.</span>
            </motion.h2>

            <motion.p
              initial={{opacity:0}} animate={inView?{opacity:1}:{}}
              transition={{delay:0.18,duration:0.6}}
              style={{ color:'var(--muted2)', fontSize:'0.9rem', lineHeight:1.75,
                fontWeight:400, marginBottom:'1.5rem', maxWidth:380 }}
            >
              The best digital businesses run on automation. Most freelancers don't have the tools to get there.
            </motion.p>

            <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
              {PAIN.map((p,i) => (
                <motion.div key={i}
                  initial={{opacity:0,x:-12}} animate={inView?{opacity:1,x:0}:{}}
                  transition={{delay:0.12+i*0.06,duration:0.5,ease}}
                  style={{ background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)',
                    borderRadius:12, padding:'0.75rem 1rem',
                    display:'flex', gap:'0.75rem', alignItems:'flex-start' }}
                >
                  <span style={{fontSize:'1rem',flexShrink:0}}>{p.icon}</span>
                  <p style={{fontSize:'0.8rem',color:'var(--muted2)',lineHeight:1.6,fontWeight:400}}>{p.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Opportunity */}
          <div>
            <motion.p
              initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:0.5,ease,delay:0.2}}
              style={{ fontSize:'0.68rem', fontFamily:'var(--mono)', textTransform:'uppercase',
                letterSpacing:'0.16em', color:'var(--ai2)', marginBottom:'0.875rem' }}
            >The opportunity</motion.p>

            <motion.h2
              initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:0.7,ease,delay:0.28}}
              style={{ fontSize:'clamp(1.6rem,3vw,2.6rem)', fontWeight:900,
                letterSpacing:'-0.045em', lineHeight:1.05, marginBottom:'1rem',
                color:'var(--white)' }}
            >
              AI can automate{' '}
              <span style={{
                background:'linear-gradient(135deg,var(--ai2),var(--ai3))',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
              }}>the hard parts.</span>
            </motion.h2>

            <motion.p
              initial={{opacity:0}} animate={inView?{opacity:1}:{}}
              transition={{delay:0.35,duration:0.6}}
              style={{ color:'var(--muted2)', fontSize:'0.9rem', lineHeight:1.75,
                fontWeight:400, marginBottom:'1.5rem', maxWidth:380 }}
            >
              WFreelancers gives you the tools to run like a studio — without a team of 20.
            </motion.p>

            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {OPP.map((o,i) => (
                <motion.div key={i}
                  initial={{opacity:0,x:12}} animate={inView?{opacity:1,x:0}:{}}
                  transition={{delay:0.3+i*0.08,duration:0.6,ease}}
                  whileHover={{y:-3,boxShadow:'0 16px 40px rgba(0,0,0,0.35)'}}
                  style={{ background:o.glow,
                    border:`1px solid ${o.glow.replace('0.12','0.28')}`,
                    borderRadius:16, padding:'1.1rem 1.25rem',
                    transition:'box-shadow 0.3s,transform 0.3s' }}
                >
                  <div style={{width:8,height:8,borderRadius:'50%',background:o.color,
                    boxShadow:`0 0 10px ${o.color}`,marginBottom:'0.6rem'}} />
                  <h3 style={{fontSize:'0.95rem',fontWeight:800,letterSpacing:'-0.02em',
                    color:o.color,marginBottom:'0.3rem'}}>{o.label}</h3>
                  <p style={{fontSize:'0.8rem',color:'var(--muted2)',lineHeight:1.6,fontWeight:400}}>{o.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .narrative-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        @media(max-width:768px){
          .narrative-grid { grid-template-columns:1fr !important; gap:2rem !important; }
        }
      `}</style>
    </div>
  );
}
