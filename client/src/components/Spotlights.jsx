import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel, AnimatedHeadline, RevealText, BtnPrimary, BtnGhost, ease } from './ui';

const CheckItem = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: '0.9rem', color: 'var(--muted2)' }}>
    <div style={{
      width: 22, height: 22, borderRadius: 8, flexShrink: 0, marginTop: 1,
      background: 'rgba(29,233,182,0.1)', border: '1px solid rgba(29,233,182,0.22)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.6rem', color: 'var(--green)', fontWeight: 900,
    }}>✓</div>
    {text}
  </div>
);

function Terminal({ lines }) {
  return (
    <div style={{
      background: 'rgba(10,10,20,0.25)', borderRadius: 14, padding: '1.25rem 1.5rem',
      fontFamily: 'var(--mono)', fontSize: '0.78rem', lineHeight: 2,
      border: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: '1rem' }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
      </div>
      {lines.map((l, i) => (
        <div key={i} style={{
          color: l.t === 'comment' ? 'var(--muted)' : l.t === 'key' ? 'var(--ai3)'
            : l.t === 'str' ? 'var(--green)' : l.t === 'num' ? 'var(--amber)'
            : l.t === 'out' ? 'var(--white2)' : 'var(--white2)',
        }}>{l.v}</div>
      ))}
    </div>
  );
}

function StatGrid({ stats }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
      {stats.map(([val, lab, col]) => (
        <div key={lab} style={{
          background: 'rgba(10,10,20,0.18)', border: '1px solid var(--border)',
          borderRadius: 14, padding: '1rem', textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 900, fontFamily: 'var(--mono)', color: col || 'var(--green)', marginBottom: 4 }}>{val}</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{lab}</div>
        </div>
      ))}
    </div>
  );
}

function SpotlightSection({ id, bg, label, title, titleAccent, desc, features, cta, visual, reverse, onBuy }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id={id} style={{ background: bg || 'transparent', padding: '9rem 2.5rem', overflow: 'hidden', position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: reverse ? '20%' : '80%',
        transform: 'translate(-50%,-50%)', width: 500, height: 500,
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(123,104,238,0.06) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative' }}>
        <div ref={ref} style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '5rem', alignItems: 'center',
        }} className={`spotlight-inner${reverse ? ' rev' : ''}`}>

          {/* Text column */}
          <div style={{ order: reverse ? 2 : 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease }}
            >
              <SectionLabel>{label}</SectionLabel>
            </motion.div>

            <AnimatedHeadline
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.0, marginBottom: '1.25rem' }}
              delay={0.1}
            >
              {title}
            </AnimatedHeadline>

            <RevealText delay={0.25}>
              <p style={{ color: 'var(--muted2)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>{desc}</p>
            </RevealText>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35, duration: 0.7 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2.5rem' }}
            >
              {features.map(f => <CheckItem key={f} text={f} />)}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
            >
              {cta.map((c, i) => i === 0
                ? <BtnPrimary key={i} onClick={() => onBuy(c.product, c.desc, c.price)}>{c.label}</BtnPrimary>
                : <BtnGhost key={i} onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>{c.label}</BtnGhost>
              )}
            </motion.div>
          </div>

          {/* Visual column */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -50 : 50, y: 20 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 1.0, ease, delay: 0.15 }}
            style={{ order: reverse ? 1 : 2 }}
          >
            <div style={{
              background: 'linear-gradient(160deg,rgba(123,104,238,0.1),rgba(255,255,255,0.02))',
              border: '1px solid var(--border)', borderRadius: 28, overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
            }}>
              <div style={{ padding: '1.5rem 1.5rem 0' }}>{visual}</div>
              <div style={{ padding: '1.5rem' }}>
                <StatGrid stats={cta[0].stats} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .spotlight-inner { }
        @media(max-width:900px){
          .spotlight-inner { grid-template-columns:1fr !important; gap:3rem !important; }
          .spotlight-inner > * { order:unset !important; }
        }
        @media(max-width:600px){
          #${id} { padding:5rem 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}

export default function Spotlights({ onBuy }) {
  return (
    <>
      <SpotlightSection
        id="trading-bot"
        bg="transparent"
        label="AI Product #01"
        title="WF AI Trading Bot"
        desc="A machine-learning trading algorithm that analyzes markets in real time and executes trades automatically — even when you're offline."
        features={[
          'Supports Forex, crypto (Binance, Bybit, Coinbase) and stocks',
          'Configurable risk management — set max drawdown and position size',
          'Backtesting dashboard with full historical performance data',
          'Telegram alerts for every trade, profit, and stop-loss hit',
          'Monthly subscription — cancel anytime',
        ]}
        cta={[
          { label: 'Subscribe — $30/mo', product: 'WF AI Trading Bot', desc: 'ML-powered algorithmic trading bot.', price: 30,
            stats: [['87%','Win rate','var(--green)'],['24/7','Automated','var(--ai2)'],['12+','Exchanges','var(--amber)'],['0.3s','Execution','var(--white)']] },
          { label: 'Ask a question' },
        ]}
        onBuy={onBuy}
        visual={
          <Terminal lines={[
            { t:'comment', v:'# WF Trading Bot v2.1 — live session' },
            { t:'', v:'' },
            { t:'key', v:'strategy  = "momentum_ml"' },
            { t:'key', v:'pairs     = ["BTC/USDT", "EUR/USD"]' },
            { t:'key', v:'risk      = 0.02  # 2% per trade' },
            { t:'', v:'' },
            { t:'comment', v:'>>> Scanning signals...' },
            { t:'out', v:'✓ BUY signal — BTC/USDT @ $67,420' },
            { t:'out', v:'✓ Order placed — 0.045 BTC' },
            { t:'out', v:'✓ Stop-loss set — $65,900' },
            { t:'comment', v:'>>> Monitoring position...' },
          ]} />
        }
      />

      <SpotlightSection
        id="assistant"
        bg="transparent"
        label="AI Product #02"
        title="WF AI Assistant"
        desc="Drop a smart AI chatbot onto any website. It handles customer questions, qualifies leads, and works around the clock — trained on your content."
        features={[
          'Embed on any website with a single script tag',
          'Train it on your own FAQs, docs, or product info',
          'Handles support, lead capture, and appointment booking',
          'Responds in English, Swahili, French, and more',
          'Full chat history dashboard and export',
        ]}
        cta={[
          { label: 'Buy license — $199', product: 'WF AI Assistant', desc: 'Intelligent chatbot for websites & apps.', price: 199,
            stats: [['98%','FAQ accuracy','var(--green)'],['5s','Setup time','var(--ai2)'],['10+','Languages','var(--amber)'],['∞','Conversations','var(--white)']] },
          { label: 'Request a demo' },
        ]}
        onBuy={onBuy}
        reverse
        visual={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: '0.875rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,var(--ai),#6a5acd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, color: '#fff' }}>WF</div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>WF Assistant</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.65rem', background: 'rgba(29,233,182,0.1)', color: 'var(--green)', padding: '0.15rem 0.55rem', borderRadius: 100, fontFamily: 'var(--mono)', border: '1px solid rgba(29,233,182,0.2)' }}>● Online</span>
            </div>
            {[
              { me: false, text: 'Hi! How can I help you today? 👋' },
              { me: true, text: 'What are your prices for a website?' },
              { me: false, text: 'Our packages start from $299 for a landing page and go up to $800+ for custom apps. Want a quote?' },
              { me: true, text: 'Yes please!' },
            ].map((m, i) => (
              <div key={i} style={{
                background: m.me ? 'rgba(123,104,238,0.12)' : 'rgba(255,255,255,0.04)',
                border: m.me ? '1px solid rgba(123,104,238,0.2)' : '1px solid var(--border)',
                borderRadius: m.me ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                padding: '0.7rem 0.9rem', fontSize: '0.82rem', color: 'var(--white2)',
                alignSelf: m.me ? 'flex-end' : 'flex-start', maxWidth: '88%', display: 'flex',
              }}>{m.text}</div>
            ))}
          </div>
        }
      />
    </>
  );
}