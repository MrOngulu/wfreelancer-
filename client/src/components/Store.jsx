import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Badge, ease } from './ui';

const FILTERS = [
  {key:'all',label:'All'},{key:'ai',label:'AI'},{key:'web',label:'Websites'},
  {key:'mob',label:'Mobile'},{key:'ui',label:'UI Kits'},{key:'saas',label:'SaaS'},
];
const PRODUCTS = [
  {cat:'ai',  e:'📈',n:'WF AI Trading Bot',    d:'ML bot for Forex, crypto & stocks.',p:299,b:'AI',bv:'ai',  s:'wf-ai-trading-bot',   ac:'var(--ai2)', hot:true, prod:'WF AI Trading Bot',    pd:'ML trading bot.'},
  {cat:'ai',  e:'💬',n:'WF AI Assistant',      d:'Smart chatbot for any website.',   p:199,b:'New',bv:'green',s:'wf-ai-assistant',    ac:'var(--green)',       prod:'WF AI Assistant',      pd:'AI chatbot.'},
  {cat:'web', e:'🌐',n:'Business Landing Page',d:'Node.js landing page template.',  p:299,              s:'business-landing-page',ac:'var(--white2)',     prod:'Business Landing Page',pd:'Landing page.'},
  {cat:'web', e:'🛍️',n:'E-commerce Store',     d:'Full store with M-Pesa & PayPal.',p:449,              s:'ecommerce-store',      ac:'var(--white2)',     prod:'E-commerce Store',     pd:'E-commerce template.'},
  {cat:'mob', e:'📱',n:'React Native Starter',  d:'Cross-platform mobile app kit.',  p:499,              s:'react-native-starter', ac:'var(--white2)',     prod:'React Native Starter Kit',pd:'Mobile kit.'},
  {cat:'ui',  e:'🎨',n:'Dashboard UI Kit',      d:'80+ Figma screens, dark & light.',p:349,b:'Figma',bv:'muted',s:'dashboard-ui-kit',ac:'var(--ai3)',       prod:'Dashboard UI Kit',     pd:'Figma UI kit.'},
  {cat:'saas',e:'🚀',n:'SaaS Boilerplate',      d:'Full-stack: auth, billing, admin.',p:599,b:'Full stack',bv:'ai',s:'saas-boilerplate',ac:'var(--ai2)',    prod:'SaaS Boilerplate',     pd:'SaaS template.'},
  {cat:'web', e:'✦', n:'Developer Portfolio',   d:'Animated one-page portfolio.',    p:199,              s:'developer-portfolio',  ac:'var(--white2)',     prod:'Developer Portfolio',  pd:'Portfolio template.'},
];

export default function Store({ onBuy }) {
  const [active, setActive] = useState('all');
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-40px' });
  const navigate = useNavigate();

  const filtered = PRODUCTS.filter(p => active==='all' || p.cat===active);

  return (
    <div ref={ref} id="store" style={{
      width:'100%', height:'100%',
      display:'flex', flexDirection:'column', justifyContent:'center',
      background:'rgb(5,5,14)',
      padding:'72px clamp(1.25rem,4vw,3rem) 1rem',
      overflow:'hidden',
    }}>
      <div style={{ maxWidth:1140, margin:'0 auto', width:'100%' }}>
        {/* Header */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
          flexWrap:'wrap',gap:'0.75rem',marginBottom:'1rem'}}>
          <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,ease}}>
            <p style={{fontSize:'0.65rem',fontFamily:'var(--mono)',textTransform:'uppercase',
              letterSpacing:'0.16em',color:'var(--ai2)',marginBottom:'0.4rem',
              display:'flex',alignItems:'center',gap:8}}>
              <span style={{width:20,height:1,background:'linear-gradient(90deg,var(--ai),transparent)',display:'inline-block'}}/>
              Full store
            </p>
            <h2 style={{fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:900,
              letterSpacing:'-0.045em',lineHeight:1.0,color:'var(--white)'}}>Browse all products</h2>
          </motion.div>

          {/* Filters */}
          <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.15,duration:0.5}}
            style={{display:'flex',gap:'0.4rem',flexWrap:'wrap'}}>
            {FILTERS.map(f => (
              <button key={f.key} onClick={()=>setActive(f.key)}
                style={{padding:'0.4rem 0.85rem',borderRadius:8,fontSize:'0.72rem',fontWeight:600,
                  border:active===f.key?'1px solid var(--ai)':'1px solid var(--border)',
                  background:active===f.key?'var(--ai)':'rgba(255,255,255,0.03)',
                  color:active===f.key?'#fff':'var(--muted2)',
                  cursor:'pointer',transition:'all 0.2s',fontFamily:'var(--head)'}}>
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div layout style={{display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'0.75rem'}}
          className="store-grid">
          {filtered.map((p,i) => (
            <motion.div key={p.n} layout
              initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
              transition={{duration:0.3,ease,delay:i*0.04}}
              whileHover={{y:-4,borderColor:'rgba(123,104,238,0.3)'}}
              style={{background:'rgba(10,10,22,0.95)',border:'1px solid var(--border)',
                borderRadius:16,overflow:'hidden',cursor:'pointer',
                transition:'border-color 0.25s,transform 0.25s'}}>
              {/* Thumb */}
              <div style={{height:80,background:'linear-gradient(160deg,rgba(123,104,238,0.08),rgba(0,0,0,0.5))',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:'1.8rem',position:'relative',borderBottom:'1px solid var(--border)'}}>
                {p.b && <div style={{position:'absolute',top:6,left:6}}><Badge variant={p.bv||'muted'}>{p.b}</Badge></div>}
                {p.hot && <div style={{position:'absolute',top:8,right:8,width:7,height:7,borderRadius:'50%',
                  background:'var(--green)',boxShadow:'0 0 8px var(--green)'}}/>}
                {p.e}
              </div>
              <div style={{padding:'0.875rem'}}>
                <p style={{fontSize:'0.58rem',fontFamily:'var(--mono)',color:'var(--muted)',
                  textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'0.3rem'}}>{p.cat}</p>
                <h3 style={{fontSize:'0.82rem',fontWeight:800,letterSpacing:'-0.018em',
                  marginBottom:'0.4rem',color:'var(--white)'}}>{p.n}</h3>
                <p style={{fontSize:'0.72rem',color:'var(--muted2)',lineHeight:1.55,
                  fontWeight:400,marginBottom:'0.75rem'}}>{p.d}</p>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:4}}>
                  <span style={{fontSize:'1rem',fontWeight:900,fontFamily:'var(--mono)',color:p.ac}}>${p.p}</span>
                  <div style={{display:'flex',gap:'0.3rem'}}>
                    <button onClick={()=>navigate(`/product/${p.s}`)}
                      style={{background:'transparent',color:'var(--muted2)',
                        border:'1px solid var(--border)',borderRadius:7,
                        padding:'0.35rem 0.6rem',fontSize:'0.65rem',fontWeight:600,
                        cursor:'pointer',fontFamily:'var(--head)'}}>↗</button>
                    <button onClick={()=>onBuy(p.prod,p.pd,p.p)}
                      style={{background:'rgba(123,104,238,0.12)',color:'var(--ai3)',
                        border:'1px solid rgba(123,104,238,0.25)',borderRadius:7,
                        padding:'0.35rem 0.65rem',fontSize:'0.65rem',fontWeight:700,
                        cursor:'pointer',fontFamily:'var(--head)'}}>Buy</button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
