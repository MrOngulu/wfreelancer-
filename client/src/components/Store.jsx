import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SectionLabel, AnimatedHeadline, Badge, ease } from './ui';

const FILTERS = [
  {key:'all',label:'All'},{key:'ai',label:'AI'},{key:'web',label:'Websites'},
  {key:'mob',label:'Mobile'},{key:'ui',label:'UI Kits'},{key:'saas',label:'SaaS'},
];

const PRODUCTS = [
  {cat:'ai',  emoji:'📈',name:'WF AI Trading Bot',    desc:'ML bot for Forex, crypto & stocks.',price:299,badge:'AI',bv:'ai',  slug:'wf-ai-trading-bot',    ac:'var(--ai2)',  product:'WF AI Trading Bot',   pd:'ML trading bot.',hot:true},
  {cat:'ai',  emoji:'💬',name:'WF AI Assistant',      desc:'Smart chatbot for any website.',    price:199,badge:'New',bv:'green',slug:'wf-ai-assistant',      ac:'var(--green)',product:'WF AI Assistant',     pd:'Chatbot software.'},
  {cat:'web', emoji:'🌐',name:'Business Landing Page',desc:'Node.js landing page template.',    price:299,badge:null,           slug:'business-landing-page', ac:'var(--white2)',product:'Business Landing Page',pd:'Landing page template.'},
  {cat:'web', emoji:'🛍️',name:'E-commerce Store',     desc:'Full store with M-Pesa & PayPal.', price:449,badge:null,           slug:'ecommerce-store',       ac:'var(--white2)',product:'E-commerce Store',      pd:'E-commerce template.'},
  {cat:'mob', emoji:'📱',name:'React Native Starter',  desc:'Cross-platform mobile app kit.',   price:499,badge:null,           slug:'react-native-starter',  ac:'var(--white2)',product:'React Native Starter Kit',pd:'Mobile app kit.'},
  {cat:'ui',  emoji:'🎨',name:'Dashboard UI Kit',      desc:'80+ Figma screens, light & dark.', price:349,badge:'Figma',bv:'muted',slug:'dashboard-ui-kit',   ac:'var(--ai3)',  product:'Dashboard UI Kit',     pd:'Figma UI kit.'},
  {cat:'saas',emoji:'🚀',name:'SaaS Boilerplate',      desc:'Full-stack: auth, billing, admin.',price:599,badge:'Full stack',bv:'ai',slug:'saas-boilerplate',  ac:'var(--ai2)',  product:'SaaS Boilerplate',     pd:'SaaS template.'},
  {cat:'web', emoji:'✦', name:'Developer Portfolio',   desc:'Animated one-page portfolio.',     price:199,badge:null,           slug:'developer-portfolio',   ac:'var(--white2)',product:'Developer Portfolio',    pd:'Portfolio template.'},
];

function Card({ p, onBuy }) {
  const navigate = useNavigate();
  return (
    <motion.div
      layout
      initial={{opacity:0,scale:0.95,y:16}}
      animate={{opacity:1,scale:1,y:0}}
      exit={{opacity:0,scale:0.94}}
      transition={{duration:0.35,ease}}
      whileHover={{ y:-5, borderColor:'rgba(123,104,238,0.3)',
        boxShadow:'0 24px 60px rgba(0,0,0,0.45)' }}
      style={{ background:'var(--bg)', border:'1px solid var(--border)',
        borderRadius:18, overflow:'hidden', cursor:'pointer',
        transition:'border-color 0.3s, box-shadow 0.4s, transform 0.35s' }}
    >
      <div style={{ height:100, background:'linear-gradient(160deg,rgba(123,104,238,0.08),rgba(0,0,0,0.4))',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'2rem', position:'relative', borderBottom:'1px solid var(--border)' }}>
        {p.badge && <div style={{position:'absolute',top:8,left:8}}><Badge variant={p.bv||'muted'}>{p.badge}</Badge></div>}
        {p.hot && <div style={{position:'absolute',top:10,right:10,width:7,height:7,borderRadius:'50%',background:'var(--green)',boxShadow:'0 0 8px var(--green)'}} />}
        {p.emoji}
      </div>
      <div style={{ padding:'1.1rem' }}>
        <p style={{ fontSize:'0.62rem', fontFamily:'var(--mono)', color:'var(--muted)',
          textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.35rem' }}>{p.cat}</p>
        <h3 style={{ fontSize:'0.9rem', fontWeight:800, letterSpacing:'-0.02em', marginBottom:'0.45rem' }}>{p.name}</h3>
        <p style={{ fontSize:'0.78rem', color:'var(--muted2)', lineHeight:1.65,
          fontWeight:400, marginBottom:'1rem' }}>{p.desc}</p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:6 }}>
          <span style={{ fontSize:'1.1rem', fontWeight:900, fontFamily:'var(--mono)', color:p.ac }}>${p.price}</span>
          <div style={{ display:'flex', gap:'0.35rem' }}>
            <button onClick={()=>navigate(`/product/${p.slug}`)}
              style={{ background:'transparent', color:'var(--muted2)',
                border:'1px solid var(--border)', borderRadius:8,
                padding:'0.4rem 0.65rem', fontSize:'0.7rem', fontWeight:600,
                cursor:'pointer', fontFamily:'var(--head)', transition:'all 0.2s' }}
              onMouseEnter={e=>{e.target.style.color='var(--white2)';e.target.style.borderColor='var(--border2)'}}
              onMouseLeave={e=>{e.target.style.color='var(--muted2)';e.target.style.borderColor='var(--border)'}}
            >Details</button>
            <button onClick={()=>onBuy(p.product,p.pd,p.price)}
              style={{ background:'rgba(255,255,255,0.06)', color:'var(--white2)',
                border:'1px solid var(--border2)', borderRadius:8,
                padding:'0.4rem 0.875rem', fontSize:'0.72rem', fontWeight:700,
                cursor:'pointer', fontFamily:'var(--head)', transition:'all 0.2s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='var(--ai)';e.currentTarget.style.borderColor='var(--ai)';e.currentTarget.style.color='#fff'}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.borderColor='var(--border2)';e.currentTarget.style.color='var(--white2)'}}
            >Buy →</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Store({ onBuy }) {
  const [active, setActive] = useState('all');
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });

  const filtered = PRODUCTS.filter(p => active === 'all' || p.cat === active);

  return (
    <div ref={ref} id="store" style={{
      width:'100%', height:'100%',
      display:'flex', alignItems:'center',
      padding:'0 2.5rem', overflow:'hidden',
    }}>
      <div style={{ maxWidth:1140, margin:'0 auto', width:'100%' }}>
        <motion.div initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,ease}}>
          <SectionLabel>Full store</SectionLabel>
        </motion.div>

        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between',
          flexWrap:'wrap', gap:'1.5rem', marginBottom:'2rem' }}>
          <AnimatedHeadline
            style={{ fontSize:'clamp(2.2rem,4.5vw,3.5rem)', fontWeight:900,
              letterSpacing:'-0.045em', lineHeight:1.0, margin:0 }}
            delay={0.1}
          >Browse all products</AnimatedHeadline>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.3,duration:0.6}}
            style={{ color:'var(--muted2)', fontSize:'0.9rem', maxWidth:260,
              lineHeight:1.75, fontWeight:400 }}>
            Instant download after payment — yours to keep and customize.
          </motion.p>
        </div>

        <motion.div initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}}
          transition={{delay:0.2,duration:0.6}}
          style={{ display:'flex', gap:'0.45rem', flexWrap:'wrap', marginBottom:'2rem' }}>
          {FILTERS.map(f=>(
            <button key={f.key} onClick={()=>setActive(f.key)}
              style={{ padding:'0.45rem 0.95rem', borderRadius:9, fontSize:'0.75rem',
                fontWeight:600, border:active===f.key?'1px solid var(--ai)':'1px solid var(--border)',
                background:active===f.key?'var(--ai)':'rgba(255,255,255,0.03)',
                color:active===f.key?'#fff':'var(--muted2)',
                cursor:'pointer', transition:'all 0.2s', fontFamily:'var(--head)' }}>
              {f.label}
            </button>
          ))}
        </motion.div>

        <motion.div layout style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'0.9rem' }}>
          {filtered.map(p => <Card key={p.name} p={p} onBuy={onBuy} />)}
        </motion.div>
      </div>
    </div>
  );
}
