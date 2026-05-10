import { motion } from 'framer-motion';
import { SectionLabel, SectionTitle, BtnPrimary, BtnGhost, fadeUp, staggerContainer } from './ui';

const CheckItem = ({ text }) => (
  <div style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:'0.875rem', color:'var(--muted2)' }}>
    <div style={{
      width:20, height:20, borderRadius:7, flexShrink:0, marginTop:1,
      background:'rgba(29,233,182,0.1)', border:'1px solid rgba(29,233,182,0.2)',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:'0.6rem', color:'var(--green)', fontWeight:900,
    }}>✓</div>
    {text}
  </div>
);

function Terminal({ lines }) {
  return (
    <div style={{
      background:'rgba(0,0,0,0.5)', borderRadius:14, padding:'1.25rem',
      fontFamily:'var(--mono)', fontSize:'0.78rem', lineHeight:1.9,
      border:'1px solid var(--border)',
    }}>
      {lines.map((l, i) => (
        <div key={i} style={{ color: l.t === 'comment' ? 'var(--muted)' : l.t === 'key' ? 'var(--ai3)' : l.t === 'str' ? 'var(--green)' : l.t === 'num' ? 'var(--amber)' : 'var(--white2)' }}>
          {l.v}
        </div>
      ))}
    </div>
  );
}

function StatGrid({ stats }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginTop:'0.75rem' }}>
      {stats.map(([val, lab, col]) => (
        <div key={lab} style={{
          background:'rgba(0,0,0,0.4)', border:'1px solid var(--border)',
          borderRadius:12, padding:'0.875rem', textAlign:'center',
        }}>
          <div style={{ fontSize:'1.25rem', fontWeight:900, fontFamily:'var(--mono)', color:col || 'var(--green)', marginBottom:2 }}>{val}</div>
          <div style={{ fontSize:'0.68rem', color:'var(--muted)' }}>{lab}</div>
        </div>
      ))}
    </div>
  );
}

function SpotlightSection({ id, bg, label, title, desc, features, cta, visual, reverse, onBuy }) {
  return (
    <section id={id} style={{ background: bg || 'var(--bg)', padding:'7rem 2.5rem', overflow:'hidden' }}>
      <div style={{
        maxWidth:1140, margin:'0 auto',
        display:'grid', gridTemplateColumns:'1fr 1fr',
        gap:'4rem', alignItems:'center',
      }} className={reverse ? 'spotlight-rev' : ''}>

        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once:true, margin:'-80px' }}
          variants={staggerContainer}
          style={{ order: reverse ? 2 : 1 }}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{label}</SectionLabel>
            <SectionTitle style={{ fontSize:'clamp(1.75rem,3.5vw,2.75rem)' }}>{title}</SectionTitle>
            <p style={{ color:'var(--muted2)', fontSize:'1rem', lineHeight:1.75, marginBottom:'1.75rem' }}>{desc}</p>
          </motion.div>
          <motion.div variants={fadeUp} style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'2rem' }}>
            {features.map(f => <CheckItem key={f} text={f} />)}
          </motion.div>
          <motion.div variants={fadeUp} style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
            {cta.map((c, i) => i === 0
              ? <BtnPrimary key={i} onClick={() => onBuy(c.product, c.desc, c.price)}>{c.label}</BtnPrimary>
              : <BtnGhost key={i} onClick={() => document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}>{c.label}</BtnGhost>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity:0, x: reverse ? -40 : 40 }}
          whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true, margin:'-80px' }}
          transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}
          style={{
            background:'linear-gradient(160deg,rgba(123,104,238,0.08),rgba(255,255,255,0.02))',
            border:'1px solid var(--border)', borderRadius:24, overflow:'hidden',
            order: reverse ? 1 : 2,
          }}
        >
          <div style={{ padding:'1.25rem' }}>{visual}</div>
          <StatGrid stats={cta[0].stats} />
          <div style={{ height:'0.75rem' }} />
        </motion.div>
      </div>
      <style>{`
        @media(max-width:900px){
          #${id} > div > div { grid-template-columns:1fr !important; }
          .spotlight-rev > * { order:unset !important; }
        }
        @media(max-width:600px){ #${id} { padding:4rem 1.25rem !important; } }
      `}</style>
    </section>
  );
}

export default function Spotlights({ onBuy }) {
  return (
    <>
      <SpotlightSection
        id="trading-bot"
        bg="var(--bg)"
        label="AI Product #01"
        title="WF AI Trading Bot"
        desc="A machine-learning trading algorithm that analyzes markets in real time and executes trades automatically — even when you're offline."
        features={[
          'Supports Forex, crypto (Binance, Bybit, Coinbase) and stocks',
          'Configurable risk management — set max drawdown and position size',
          'Backtesting dashboard with full historical performance data',
          'Telegram alerts for every trade, profit, and stop-loss hit',
          'One-time license fee — no monthly subscriptions',
        ]}
        cta={[
          { label:'Buy license — $299', product:'WF AI Trading Bot', desc:'ML-powered algorithmic trading bot.', price:299,
            stats:[['87%','Backtested win rate','var(--green)'],['24/7','Automated','var(--ai2)'],['12+','Exchanges','var(--amber)'],['0.3s','Execution','var(--white)']] },
          { label:'Ask a question' },
        ]}
        onBuy={onBuy}
        visual={
          <Terminal lines={[
            {t:'comment',v:'# WF Trading Bot v2.1 — live session'},
            {t:'',v:''},
            {t:'key',v:'strategy'}, {t:'',v:'  = "momentum_ml"'},
            {t:'key',v:'pairs'},{t:'',v:'     = ["BTC/USDT", "EUR/USD"]'},
            {t:'key',v:'risk'},{t:'',v:'      = 0.02  # 2% per trade'},
            {t:'',v:''},
            {t:'comment',v:'>>> Scanning signals...'},
            {t:'out',v:'✓ BUY signal — BTC/USDT @ $67,420'},
            {t:'out',v:'✓ Order placed — 0.045 BTC'},
            {t:'out',v:'✓ Stop-loss set — $65,900'},
            {t:'comment',v:'>>> Monitoring position...'},
          ]} />
        }
      />

      <SpotlightSection
        id="assistant"
        bg="var(--bg2)"
        label="AI Product #02"
        title="WF AI Assistant"
        desc="Drop a smart AI chatbot onto any website or app. It handles customer questions, qualifies leads, and works around the clock — trained on your content."
        features={[
          'Embed on any website with a single script tag',
          'Train it on your own FAQs, docs, or product info',
          'Handles support, lead capture, and appointment booking',
          'Responds in English, Swahili, French, and more',
          'Full chat history dashboard and export',
        ]}
        cta={[
          { label:'Buy license — $199', product:'WF AI Assistant', desc:'Intelligent chatbot for websites & apps.', price:199,
            stats:[['98%','FAQ accuracy','var(--green)'],['5s','Setup time','var(--ai2)'],['10+','Languages','var(--amber)'],['∞','Conversations','var(--white)']] },
          { label:'Request a demo' },
        ]}
        onBuy={onBuy}
        reverse
        visual={
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, paddingBottom:'0.875rem', borderBottom:'1px solid var(--border)' }}>
              <div style={{ width:28,height:28,borderRadius:'50%',background:'var(--ai)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.7rem',fontWeight:800 }}>WF</div>
              <span style={{ fontSize:'0.85rem', fontWeight:700 }}>WF Assistant</span>
              <span style={{ marginLeft:'auto', fontSize:'0.65rem', background:'var(--green-dim)', color:'var(--green)', padding:'0.15rem 0.55rem', borderRadius:100, fontFamily:'var(--mono)' }}>● Online</span>
            </div>
            {[
              { me:false, text:"Hi! How can I help you today? 👋" },
              { me:true, text:"What are your prices for a website?" },
              { me:false, text:"Our packages start from $299 for a landing page and go up to $800+ for custom apps. Want a quote?" },
              { me:true, text:"Yes please!" },
            ].map((m, i) => (
              <div key={i} style={{
                background: m.me ? 'var(--ai-glow)' : 'rgba(255,255,255,0.04)',
                border: m.me ? '1px solid var(--ai-glow2)' : '1px solid var(--border)',
                borderRadius: m.me ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                padding:'0.65rem 0.875rem', fontSize:'0.8rem', color:'var(--white2)',
                alignSelf: m.me ? 'flex-end' : 'flex-start',
                maxWidth:'88%',
              }}>
                {m.text}
              </div>
            ))}
          </div>
        }
      />
    </>
  );
}
