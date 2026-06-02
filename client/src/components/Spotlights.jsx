import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel, AnimatedHeadline, RevealText, BtnPrimary, BtnGhost, ease } from './ui';

const Check = ({ text }) => (
  <div style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:'0.875rem', color:'var(--muted2)' }}>
    <div style={{ width:20, height:20, borderRadius:7, flexShrink:0, marginTop:1,
      background:'rgba(29,233,182,0.1)', border:'1px solid rgba(29,233,182,0.22)',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:'0.58rem', color:'var(--green)', fontWeight:900 }}>✓</div>
    <span style={{ lineHeight:1.7, fontWeight:400 }}>{text}</span>
  </div>
);

function Terminal({ lines }) {
  return (
    <div style={{ background:'rgba(4,4,14,0.96)', borderRadius:14, padding:'1.1rem 1.4rem',
      fontFamily:'var(--mono)', fontSize:'0.76rem', lineHeight:2,
      border:'1px solid var(--border)' }}>
      <div style={{ display:'flex', gap:6, marginBottom:'0.875rem' }}>
        {['#ff5f57','#febc2e','#28c840'].map(c=>(
          <div key={c} style={{ width:10, height:10, borderRadius:'50%', background:c }} />
        ))}
      </div>
      {lines.map((l,i)=>(
        <div key={i} style={{ color:
          l.t==='comment'?'var(--muted)':l.t==='key'?'var(--ai3)':
          l.t==='str'?'var(--green)':l.t==='num'?'var(--amber)':'var(--white2)' }}>
          {l.v}
        </div>
      ))}
    </div>
  );
}

function ChatPreview() {
  const msgs = [
    { me:false, text:'Hi! How can I help you today? 👋' },
    { me:true,  text:'What are your prices for a website?' },
    { me:false, text:'Packages start from $299. Want a full quote?' },
    { me:true,  text:'Yes please!' },
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8,
        paddingBottom:'0.75rem', borderBottom:'1px solid var(--border)' }}>
        <div style={{ width:28, height:28, borderRadius:'50%',
          background:'linear-gradient(135deg,var(--ai),#6a5acd)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'0.62rem', fontWeight:800, color:'#fff' }}>WF</div>
        <span style={{ fontSize:'0.85rem', fontWeight:700 }}>WF Assistant</span>
        <span style={{ marginLeft:'auto', fontSize:'0.63rem',
          background:'rgba(29,233,182,0.1)', color:'var(--green)',
          padding:'0.15rem 0.55rem', borderRadius:100,
          fontFamily:'var(--mono)', border:'1px solid rgba(29,233,182,0.2)' }}>● Online</span>
      </div>
      {msgs.map((m,i)=>(
        <div key={i} style={{
          background:m.me?'rgba(123,104,238,0.12)':'rgba(255,255,255,0.04)',
          border:m.me?'1px solid rgba(123,104,238,0.2)':'1px solid var(--border)',
          borderRadius:m.me?'14px 14px 2px 14px':'14px 14px 14px 2px',
          padding:'0.65rem 0.875rem', fontSize:'0.82rem', color:'var(--white2)',
          alignSelf:m.me?'flex-end':'flex-start', maxWidth:'90%', display:'inline-block' }}>
          {m.text}
        </div>
      ))}
    </div>
  );
}

function StatGrid({ stats }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.65rem' }}>
      {stats.map(([val,lab,col])=>(
        <div key={lab} style={{ background:'rgba(0,0,0,0.4)', border:'1px solid var(--border)',
          borderRadius:13, padding:'0.875rem', textAlign:'center' }}>
          <div style={{ fontSize:'1.2rem', fontWeight:900, fontFamily:'var(--mono)',
            color:col||'var(--green)', marginBottom:3 }}>{val}</div>
          <div style={{ fontSize:'0.65rem', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{lab}</div>
        </div>
      ))}
    </div>
  );
}

function SpotItem({ label, title, desc, features, cta, visual, onBuy, reverse, delay=0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });

  return (
    <div ref={ref} style={{ display:'grid', gridTemplateColumns:'1fr 1fr',
      gap:'4rem', alignItems:'center', marginBottom:'0' }}
      className="spot-inner">

      <div style={{ order:reverse?2:1 }}>
        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:0.6,ease,delay}}>
          <SectionLabel>{label}</SectionLabel>
        </motion.div>
        <AnimatedHeadline
          style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:900,
            letterSpacing:'-0.04em', lineHeight:1.0, marginBottom:'1rem' }}
          delay={delay+0.1}
        >{title}</AnimatedHeadline>
        <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}}
          transition={{delay:delay+0.2,duration:0.7}}
          style={{ color:'var(--muted2)', fontSize:'0.95rem', lineHeight:1.85,
            fontWeight:400, marginBottom:'1.5rem', maxWidth:400 }}>
          {desc}
        </motion.p>
        <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}}
          transition={{delay:delay+0.3,duration:0.7}}
          style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'2rem' }}>
          {features.map(f=><Check key={f} text={f} />)}
        </motion.div>
        <motion.div initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}}
          transition={{delay:delay+0.4,duration:0.6}}
          style={{ display:'flex', gap:'0.65rem', flexWrap:'wrap' }}>
          <BtnPrimary onClick={()=>onBuy(cta.product,cta.desc,cta.price)}>{cta.label}</BtnPrimary>
          <BtnGhost onClick={()=>document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}>Ask a question</BtnGhost>
        </motion.div>
      </div>

      <motion.div initial={{opacity:0,x:reverse?-40:40}} animate={inView?{opacity:1,x:0}:{}}
        transition={{duration:0.95,ease,delay:delay+0.15}}
        style={{ order:reverse?1:2 }}>
        <div style={{ background:'linear-gradient(160deg,rgba(123,104,238,0.1),rgba(255,255,255,0.02))',
          border:'1px solid var(--border)', borderRadius:24, overflow:'hidden',
          boxShadow:'0 40px 80px rgba(0,0,0,0.4)' }}>
          <div style={{ padding:'1.5rem 1.5rem 0' }}>{visual}</div>
          <div style={{ padding:'1.25rem' }}><StatGrid stats={cta.stats} /></div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Spotlights({ onBuy }) {
  return (
    <div id="spotlights" style={{
      width:'100%', height:'100%',
      display:'flex', alignItems:'center',
      background:'rgb(5,5,14)',
      padding:'0 2.5rem', overflow:'hidden',
    }}>
      <div style={{ maxWidth:1140, margin:'0 auto', width:'100%',
        display:'grid', gridTemplateColumns:'1fr', gap:'4rem' }}>
        <SpotItem
          label="AI Product #01" title="WF AI Trading Bot"
          desc="An ML trading algorithm that analyses markets in real time and executes trades automatically — even when you're offline."
          features={[
            'Supports Forex, crypto (Binance, Bybit) and stocks',
            'Configurable risk management — max drawdown & position size',
            'Backtesting dashboard with full historical data',
            'Telegram alerts for every trade and stop-loss hit',
          ]}
          cta={{ label:'Buy license — $299', product:'WF AI Trading Bot',
            desc:'ML-powered trading bot.', price:299,
            stats:[['87%','Win rate','var(--green)'],['24/7','Automated','var(--ai2)'],
              ['12+','Exchanges','var(--amber)'],['0.3s','Execution','var(--white)']] }}
          onBuy={onBuy}
          visual={<Terminal lines={[
            {t:'comment',v:'# WF Trading Bot v2.1 — live'},
            {t:'',v:''},
            {t:'key',v:'strategy  = "momentum_ml"'},
            {t:'key',v:'pairs     = ["BTC/USDT", "EUR/USD"]'},
            {t:'key',v:'risk      = 0.02'},
            {t:'',v:''},
            {t:'out',v:'✓ BUY signal — BTC/USDT @ $67,420'},
            {t:'out',v:'✓ Order placed — 0.045 BTC'},
            {t:'comment',v:'>>> Monitoring position...'},
          ]} />}
        />

        <SpotItem
          label="AI Product #02" title="WF AI Assistant"
          desc="Drop a smart chatbot onto any website. Handles customer questions and qualifies leads around the clock — trained on your content."
          features={[
            'Embed on any site with a single script tag',
            'Train it on your own FAQs, docs, or product info',
            'Responds in English, Swahili, French and more',
            'Full chat history dashboard and export',
          ]}
          cta={{ label:'Buy license — $199', product:'WF AI Assistant',
            desc:'Intelligent chatbot for websites.', price:199,
            stats:[['98%','Accuracy','var(--green)'],['5s','Setup','var(--ai2)'],
              ['10+','Languages','var(--amber)'],['∞','Conversations','var(--white)']] }}
          onBuy={onBuy}
          visual={<ChatPreview />}
          reverse
          delay={0.1}
        />
      </div>

      <style>{`
        .spot-inner { }
        @media(max-width:900px){
          .spot-inner { grid-template-columns:1fr !important; gap:2.5rem !important; }
          .spot-inner > * { order:unset !important; }
        }
      `}</style>
    </div>
  );
}
