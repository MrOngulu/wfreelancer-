import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease } from './ui';

const PAIN = [
  { icon:'⏳', text:'Spending hours on repetitive tasks instead of billable work' },
  { icon:'📉', text:'Missing trading opportunities the moment you step away' },
  { icon:'📞', text:'Losing leads because no one is online to answer questions' },
  { icon:'🔧', text:'Rebuilding the same infrastructure from scratch every project' },
];

const OPP = [
  { label:'Automate trading', desc:'ML strategies running 24/7 while you sleep', color:'var(--green)', glow:'rgba(29,233,182,0.12)' },
  { label:'Automate support', desc:'Answer customers instantly with AI', color:'var(--ai2)', glow:'rgba(123,104,238,0.12)' },
  { label:'Ship in days', desc:'Start from battle-tested templates', color:'var(--amber)', glow:'rgba(255,160,64,0.12)' },
];

export default function Narrative() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center',
      background: 'rgb(5,5,14)',
      padding: '0 2.5rem',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 860, margin: '0 auto', width: '100%' }}>

        {/* Problem */}
        <motion.p
          initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.6, ease }}
          style={{ fontSize:'0.7rem', fontFamily:'var(--mono)', textTransform:'uppercase',
            letterSpacing:'0.16em', color:'var(--muted)', marginBottom:'1.25rem' }}
        >The problem</motion.p>

        <motion.h2
          initial={{ opacity:0, y:32 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.85, ease, delay:0.08 }}
          style={{ fontSize:'clamp(2rem,5vw,4rem)', fontWeight:900,
            letterSpacing:'-0.05em', lineHeight:1.0, marginBottom:'1.25rem' }}
        >
          Most freelancers waste time{' '}
          <span style={{ color:'var(--muted)' }}>building systems instead of earning.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
          transition={{ delay:0.2, duration:0.7 }}
          style={{ color:'var(--muted2)', fontSize:'1.05rem', maxWidth:520,
            lineHeight:1.9, fontWeight:400, marginBottom:'2.5rem' }}
        >
          The best digital businesses run on automation. Most freelancers don't have the tools to get there.
        </motion.p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'0.75rem', marginBottom:'3rem' }}>
          {PAIN.map((p,i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ delay:0.15+i*0.07, duration:0.6, ease }}
              style={{ background:'rgba(255,255,255,0.02)', border:'1px solid var(--border)',
                borderRadius:14, padding:'1.1rem', display:'flex', gap:'0.875rem', alignItems:'flex-start' }}
            >
              <span style={{ fontSize:'1.1rem', flexShrink:0 }}>{p.icon}</span>
              <p style={{ fontSize:'0.82rem', color:'var(--muted2)', lineHeight:1.7 }}>{p.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
          transition={{ delay:0.45 }}
          style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2.5rem' }}>
          <div style={{ height:1, flex:1, background:'var(--border)' }} />
          <div style={{ width:30, height:30, borderRadius:'50%',
            background:'linear-gradient(135deg,var(--ai),#6a5acd)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'0.75rem', color:'#fff', boxShadow:'0 0 18px var(--ai-glow)' }}>↓</div>
          <div style={{ height:1, flex:1, background:'var(--border)' }} />
        </motion.div>

        {/* Opportunity */}
        <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
          transition={{ delay:0.5 }}
          style={{ fontSize:'0.7rem', fontFamily:'var(--mono)', textTransform:'uppercase',
            letterSpacing:'0.16em', color:'var(--ai2)', marginBottom:'1rem' }}
        >The opportunity</motion.p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1rem' }}>
          {OPP.map((o,i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ delay:0.55+i*0.08, duration:0.7, ease }}
              whileHover={{ y:-5, boxShadow:'0 24px 60px rgba(0,0,0,0.35)' }}
              style={{ background:o.glow, border:`1px solid ${o.glow.replace('0.12','0.3')}`,
                borderRadius:18, padding:'1.5rem',
                transition:'box-shadow 0.4s, transform 0.4s' }}
            >
              <div style={{ width:8, height:8, borderRadius:'50%', background:o.color,
                boxShadow:`0 0 12px ${o.color}`, marginBottom:'1rem' }} />
              <h3 style={{ fontSize:'1rem', fontWeight:900, letterSpacing:'-0.025em',
                color:o.color, marginBottom:'0.4rem' }}>{o.label}</h3>
              <p style={{ fontSize:'0.82rem', color:'var(--muted2)', lineHeight:1.7 }}>{o.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
