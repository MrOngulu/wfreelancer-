import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BtnPrimary, BtnGhost, ease } from './ui';

const Check = ({text}) => (
  <div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:'0.8rem',color:'var(--muted2)'}}>
    <div style={{width:18,height:18,borderRadius:6,flexShrink:0,marginTop:1,
      background:'rgba(29,233,182,0.1)',border:'1px solid rgba(29,233,182,0.22)',
      display:'flex',alignItems:'center',justifyContent:'center',
      fontSize:'0.55rem',color:'var(--green)',fontWeight:900}}>✓</div>
    <span style={{lineHeight:1.6,fontWeight:400}}>{text}</span>
  </div>
);

function Terminal({lines}) {
  return (
    <div style={{background:'rgba(0,0,0,0.7)',borderRadius:12,padding:'0.875rem 1.1rem',
      fontFamily:'var(--mono)',fontSize:'0.72rem',lineHeight:1.9,border:'1px solid var(--border)'}}>
      <div style={{display:'flex',gap:5,marginBottom:'0.6rem'}}>
        {['#ff5f57','#febc2e','#28c840'].map(c=>(
          <div key={c} style={{width:9,height:9,borderRadius:'50%',background:c}}/>
        ))}
      </div>
      {lines.map((l,i)=>(
        <div key={i} style={{color:l.t==='comment'?'var(--muted)':l.t==='key'?'var(--ai3)':l.t==='out'?'var(--green)':'var(--white2)'}}>{l.v}</div>
      ))}
    </div>
  );
}

function Chat() {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
      <div style={{display:'flex',alignItems:'center',gap:7,paddingBottom:'0.6rem',borderBottom:'1px solid var(--border)'}}>
        <div style={{width:24,height:24,borderRadius:'50%',background:'linear-gradient(135deg,var(--ai),#6a5acd)',
          display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.58rem',fontWeight:800,color:'#fff'}}>WF</div>
        <span style={{fontSize:'0.8rem',fontWeight:700,color:'var(--white)'}}>WF Assistant</span>
        <span style={{marginLeft:'auto',fontSize:'0.6rem',background:'rgba(29,233,182,0.1)',color:'var(--green)',
          padding:'0.12rem 0.5rem',borderRadius:100,fontFamily:'var(--mono)',border:'1px solid rgba(29,233,182,0.2)'}}>● Online</span>
      </div>
      {[
        {me:false,t:'Hi! How can I help you today? 👋'},
        {me:true, t:'What are your prices for a website?'},
        {me:false,t:'Packages start from $299. Want a full quote?'},
        {me:true, t:'Yes please!'},
      ].map((m,i)=>(
        <div key={i} style={{
          background:m.me?'rgba(123,104,238,0.12)':'rgba(255,255,255,0.04)',
          border:m.me?'1px solid rgba(123,104,238,0.2)':'1px solid var(--border)',
          borderRadius:m.me?'12px 12px 2px 12px':'12px 12px 12px 2px',
          padding:'0.55rem 0.75rem',fontSize:'0.78rem',color:'var(--white2)',
          alignSelf:m.me?'flex-end':'flex-start',maxWidth:'88%',display:'inline-block'}}>
          {m.t}
        </div>
      ))}
    </div>
  );
}

function SpotRow({label,title,desc,features,price,product,productDesc,cta,visual,reverse,onBuy,delay=0}) {
  const ref = useRef(null);
  const inView = useInView(ref, {once:true, margin:'-40px'});

  return (
    <div ref={ref} style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3rem',alignItems:'center'}}
      className="spot-row">
      <div style={{order:reverse?2:1}}>
        <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}}
          transition={{duration:0.5,ease,delay}}
          style={{fontSize:'0.62rem',fontFamily:'var(--mono)',textTransform:'uppercase',
            letterSpacing:'0.16em',color:'var(--ai2)',marginBottom:'0.5rem',
            display:'flex',alignItems:'center',gap:6}}>
          <span style={{width:16,height:1,background:'linear-gradient(90deg,var(--ai),transparent)',display:'inline-block'}}/>
          {label}
        </motion.p>
        <motion.h3 initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:0.6,ease,delay:delay+0.08}}
          style={{fontSize:'clamp(1.4rem,2.5vw,2rem)',fontWeight:900,letterSpacing:'-0.04em',
            lineHeight:1.05,marginBottom:'0.75rem',color:'var(--white)'}}>
          {title}
        </motion.h3>
        <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}}
          transition={{delay:delay+0.16,duration:0.6}}
          style={{color:'var(--muted2)',fontSize:'0.85rem',lineHeight:1.75,fontWeight:400,
            marginBottom:'1rem',maxWidth:360}}>
          {desc}
        </motion.p>
        <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}}
          transition={{delay:delay+0.22,duration:0.6}}
          style={{display:'flex',flexDirection:'column',gap:'0.5rem',marginBottom:'1.25rem'}}>
          {features.map(f=><Check key={f} text={f}/>)}
        </motion.div>
        <motion.div initial={{opacity:0,y:10}} animate={inView?{opacity:1,y:0}:{}}
          transition={{delay:delay+0.3,duration:0.5}}
          style={{display:'flex',gap:'0.6rem',flexWrap:'wrap',alignItems:'center'}}>
          <BtnPrimary onClick={()=>onBuy(product,productDesc,price)}>{cta.label} — ${price}</BtnPrimary>
          <BtnGhost onClick={()=>document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}>Ask →</BtnGhost>
        </motion.div>
      </div>

      <motion.div initial={{opacity:0,x:reverse?-30:30}} animate={inView?{opacity:1,x:0}:{}}
        transition={{duration:0.8,ease,delay:delay+0.12}}
        style={{order:reverse?1:2}}>
        <div style={{background:'linear-gradient(160deg,rgba(123,104,238,0.1),rgba(255,255,255,0.02))',
          border:'1px solid var(--border)',borderRadius:20,overflow:'hidden',
          boxShadow:'0 24px 60px rgba(0,0,0,0.4)'}}>
          <div style={{padding:'1.1rem 1.1rem 0'}}>{visual}</div>
          <div style={{padding:'1rem',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.5rem'}}>
            {cta.stats.map(([v,l,c])=>(
              <div key={l} style={{background:'rgba(0,0,0,0.4)',border:'1px solid var(--border)',
                borderRadius:11,padding:'0.65rem',textAlign:'center'}}>
                <div style={{fontSize:'1rem',fontWeight:900,fontFamily:'var(--mono)',color:c||'var(--green)'}}>{v}</div>
                <div style={{fontSize:'0.6rem',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.05em'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`.spot-row{} @media(max-width:768px){.spot-row{grid-template-columns:1fr !important;} .spot-row>*{order:unset !important;}}`}</style>
    </div>
  );
}

export default function Spotlights({ onBuy }) {
  return (
    <div id="spotlights" style={{
      width:'100%', height:'100%',
      display:'flex', flexDirection:'column', justifyContent:'center',
      background:'rgb(5,5,14)',
      padding:'72px clamp(1.25rem,4vw,3rem) 1rem',
      overflow:'hidden',
    }}>
      <div style={{maxWidth:1140,margin:'0 auto',width:'100%',
        display:'flex',flexDirection:'column',gap:'2.5rem'}}>
        <SpotRow
          label="AI Product #01" title="WF AI Trading Bot"
          desc="An ML algorithm that scans markets 24/7 and executes trades automatically — even when you're offline."
          features={['Supports Forex, crypto (Binance, Bybit) and stocks','Configurable risk — max drawdown & position size','Telegram alerts for every trade and stop-loss hit']}
          price={299} product="WF AI Trading Bot" productDesc="ML trading bot."
          cta={{label:'Buy license',stats:[['87%','Win rate','var(--green)'],['24/7','Automated','var(--ai2)'],['12+','Exchanges','var(--amber)'],['0.3s','Execution','var(--white2)']]}}
          onBuy={onBuy}
          visual={<Terminal lines={[
            {t:'comment',v:'# WF Trading Bot v2.1 — live'},
            {t:'key',v:'strategy = "momentum_ml"'},
            {t:'key',v:'pairs    = ["BTC/USDT","EUR/USD"]'},
            {t:'out',v:'✓ BUY  BTC/USDT @ $67,420'},
            {t:'out',v:'✓ Order — 0.045 BTC'},
            {t:'comment',v:'>>> Monitoring position...'},
          ]}/>}
        />
        <SpotRow
          label="AI Product #02" title="WF AI Assistant"
          desc="Drop a smart chatbot onto any website. Handles questions, qualifies leads, 24/7 — trained on your content."
          features={['Embed with a single script tag','Train on your FAQs, docs, or product info','Responds in English, Swahili, French and more']}
          price={199} product="WF AI Assistant" productDesc="AI chatbot."
          cta={{label:'Buy license',stats:[['98%','Accuracy','var(--green)'],['5s','Setup','var(--ai2)'],['10+','Languages','var(--amber)'],['∞','Conversations','var(--white2)']]}}
          onBuy={onBuy} reverse delay={0.08}
          visual={<Chat/>}
        />
      </div>
    </div>
  );
}
