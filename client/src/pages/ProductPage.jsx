import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProduct } from '../data/productsData';
import { SectionLabel, Badge, BtnPrimary, BtnGhost, fadeUp, staggerContainer } from '../components/ui';
import BuyModal from '../components/BuyModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function FeatureCheck({ text, color }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
      <div style={{
        width:20, height:20, borderRadius:6, flexShrink:0, marginTop:2,
        background: color ? `${color.replace('1)','0.1)')}` : 'rgba(29,233,182,0.1)',
        border: `1px solid ${color ? color.replace('1)','0.25)') : 'rgba(29,233,182,0.25)'}`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'0.6rem', color: color || 'var(--green)', fontWeight:900,
      }}>✓</div>
      <span style={{ fontSize:'0.875rem', color:'var(--muted2)', lineHeight:1.65 }}>{text}</span>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', transition:'border-color 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'1.1rem 1.25rem', background:'rgba(255,255,255,0.02)',
          border:'none', cursor:'pointer', textAlign:'left', gap:16, fontFamily:'var(--head)',
        }}
      >
        <span style={{ fontSize:'0.9rem', fontWeight:700, color:'var(--white)', lineHeight:1.4 }}>{q}</span>
        <span style={{ fontSize:'1.1rem', color:'var(--muted)', transition:'transform 0.25s', flexShrink:0,
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
      </button>
      {open && (
        <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
          style={{ padding:'0 1.25rem 1.1rem', fontSize:'0.875rem', color:'var(--muted2)', lineHeight:1.75 }}>
          {a}
        </motion.div>
      )}
    </div>
  );
}


function BackButton({ navigate }) {
  return (
    <button
      onClick={() => navigate('/')}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#fff';
        e.currentTarget.style.borderColor = 'rgba(123,104,238,0.6)';
        e.currentTarget.style.background = 'rgba(123,104,238,0.12)';
        e.currentTarget.style.boxShadow = '0 0 24px rgba(123,104,238,0.25)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--ai2)';
        e.currentTarget.style.borderColor = 'rgba(123,104,238,0.3)';
        e.currentTarget.style.background = 'rgba(123,104,238,0.06)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      style={{
        display:'inline-flex', alignItems:'center', gap:'0.4rem',
        background:'rgba(123,104,238,0.06)', border:'1px solid rgba(123,104,238,0.3)',
        color:'var(--ai2)', borderRadius:100,
        padding:'0.4rem 0.9rem', fontSize:'0.78rem', cursor:'pointer',
        fontFamily:'var(--mono)', letterSpacing:'0.04em',
        transition:'color 0.18s ease, border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease',
        marginBottom:'2rem',
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      Back to home
    </button>
  );
}

/* ── TRADING BOT HERO ── */
function TradingHero({ product, onBuy, navigate }) {
  const [tick, setTick] = useState(0);
  const lines = [
    { text: '# WF Trading Bot v2.1 — live session', color: 'rgba(255,255,255,0.3)', delay: 0 },
    { text: 'strategy = "momentum_ml"', color: 'rgba(123,104,238,0.9)', delay: 0.4 },
    { text: 'pairs = ["BTC/USDT", "EUR/USD"]', color: 'rgba(123,104,238,0.9)', delay: 0.7 },
    { text: 'risk = 0.02  # 2% per trade', color: 'rgba(123,104,238,0.9)', delay: 1.0 },
    { text: '>>> Scanning signals...', color: 'rgba(255,255,255,0.35)', delay: 1.4 },
    { text: '✓ BUY signal — BTC/USDT @ $67,420', color: 'rgba(29,233,182,1)', delay: 1.9 },
    { text: '✓ Order placed — 0.045 BTC', color: 'rgba(29,233,182,1)', delay: 2.3 },
    { text: '✓ Stop-loss set — $65,900', color: 'rgba(29,233,182,1)', delay: 2.7 },
    { text: '>>> Monitoring position...', color: 'rgba(255,255,255,0.35)', delay: 3.1 },
  ];

  const stats = [
    { val: '87%', label: 'WIN RATE', color: 'rgba(29,233,182,1)' },
    { val: '24/7', label: 'AUTOMATED', color: 'rgba(123,104,238,1)' },
    { val: '12+', label: 'EXCHANGES', color: 'rgba(255,160,64,1)' },
    { val: '0.3s', label: 'EXECUTION', color: '#fff' },
  ];

  return (
    <section style={{ padding:'8rem 2.5rem 5rem', background:'transparent', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(123,104,238,0.07) 0%, transparent 70%)' }} />

      <div style={{ maxWidth:1140, margin:'0 auto', display:'flex', gap:'4rem', alignItems:'center' }}>

        {/* LEFT */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ flex:'0 0 44%' }}>
          <motion.div variants={fadeUp}><BackButton navigate={navigate} /></motion.div>

          <motion.div variants={fadeUp} style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem' }}>
            <div style={{ width:20, height:1, background:'var(--ai2)' }} />
            <span style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', textTransform:'uppercase',
              letterSpacing:'0.14em', color:'var(--ai2)' }}>AI Product #01</span>
          </motion.div>

          <motion.h1 variants={fadeUp} style={{ fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:900,
            letterSpacing:'-0.05em', lineHeight:1.0, marginBottom:'1.25rem' }}>
            WF AI Trading Bot
          </motion.h1>

          <motion.p variants={fadeUp} style={{ fontSize:'1rem', color:'var(--muted2)', lineHeight:1.75,
            marginBottom:'2rem', maxWidth:400 }}>
            A machine-learning trading algorithm that analyzes markets in real time and executes trades automatically — even when you're offline.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display:'flex', flexDirection:'column', gap:'0.6rem', marginBottom:'2.5rem' }}>
            {product.features.slice(0,5).map(f => (
              <FeatureCheck key={f} text={f} color="rgba(29,233,182,1)" />
            ))}
          </motion.div>

          <motion.div variants={fadeUp} style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
            <button
              onClick={onBuy}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(123,104,238,0.85)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--ai2)'}
              style={{
                background:'var(--ai2)', color:'#fff', border:'none', borderRadius:100,
                padding:'0.8rem 1.75rem', fontWeight:700, fontSize:'0.9rem',
                cursor:'pointer', transition:'background 0.18s ease', letterSpacing:'-0.01em',
              }}
            >Buy license — $299</button>
            <button
              onClick={() => navigate('/#contact')}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; }}
              style={{
                background:'transparent', color:'#fff',
                border:'1px solid rgba(255,255,255,0.12)', borderRadius:100,
                padding:'0.8rem 1.75rem', fontWeight:600, fontSize:'0.9rem',
                cursor:'pointer', transition:'all 0.18s ease',
              }}
            >Ask a question</button>
          </motion.div>
        </motion.div>

        {/* RIGHT — terminal + stats */}
        <motion.div
          initial={{ opacity:0, x:32 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.8, ease:[0.25,0.46,0.45,0.94], delay:0.2 }}
          style={{ flex:1 }}
        >
          {/* Terminal card */}
          <div style={{
            border:'1px solid rgba(255,255,255,0.08)', borderRadius:20,
            overflow:'hidden', marginBottom:'1rem',
            background:'rgba(255,255,255,0.02)',
          }}>
            {/* Terminal toolbar */}
            <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', padding:'0.75rem 1rem',
              borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              {['#ef4444','#f59e0b','#22c55e'].map(c => (
                <div key={c} style={{ width:11, height:11, borderRadius:'50%', background:c, opacity:0.85 }} />
              ))}
            </div>
            {/* Code lines */}
            <div style={{ padding:'1.25rem 1.25rem 1.5rem', fontFamily:'var(--mono)', fontSize:'0.8rem', lineHeight:1.8 }}>
              {lines.map((l, i) => (
                <motion.div key={i} initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay:l.delay, duration:0.4 }}
                  style={{ color:l.color }}>{l.text}</motion.div>
              ))}
            </div>
          </div>

          {/* 2×2 stats grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
            {stats.map(s => (
              <div key={s.label} style={{
                border:'1px solid rgba(255,255,255,0.07)', borderRadius:14,
                padding:'1rem 1.25rem', background:'rgba(255,255,255,0.02)',
              }}>
                <div style={{ fontSize:'1.75rem', fontWeight:900, fontFamily:'var(--mono)',
                  color:s.color, letterSpacing:'-0.03em', lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:'0.6rem', fontFamily:'var(--mono)', textTransform:'uppercase',
                  letterSpacing:'0.1em', color:'var(--muted)', marginTop:'0.3rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

/* ── AI ASSISTANT HERO ── */
function AssistantHero({ product, onBuy, navigate }) {
  const messages = [
    { from:'bot', text:"Hi! How can I help you today!" },
    { from:'user', text:"What are your prices for a website?" },
    { from:'bot', text:"Our packages start from $299 for a landing page and go up to $800+ for custom apps. Want a quote?" },
    { from:'user', text:"Yes please!" },
  ];

  const stats = [
    { val:'98%', label:'FAQ ACCURACY', color:'rgba(29,233,182,1)' },
    { val:'5s', label:'SETUP TIME', color:'rgba(123,104,238,1)' },
    { val:'10+', label:'LANGUAGES', color:'rgba(255,160,64,1)' },
    { val:'∞', label:'CONVERSATIONS', color:'#fff' },
  ];

  return (
    <section style={{ padding:'8rem 2.5rem 5rem', background:'transparent', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(29,233,182,0.06) 0%, transparent 70%)' }} />

      <div style={{ maxWidth:1140, margin:'0 auto', display:'flex', gap:'4rem', alignItems:'center' }}>

        {/* LEFT — chat mockup + stats */}
        <motion.div
          initial={{ opacity:0, x:-32 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.8, ease:[0.25,0.46,0.45,0.94], delay:0.2 }}
          style={{ flex:1 }}
        >
          {/* Chat widget */}
          <div style={{
            border:'1px solid rgba(255,255,255,0.08)', borderRadius:20,
            overflow:'hidden', marginBottom:'1rem',
            background:'rgba(255,255,255,0.02)',
          }}>
            {/* Chat header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'0.9rem 1.25rem', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
                <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--ai2)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'0.7rem', fontWeight:800, color:'#fff' }}>WF</div>
                <span style={{ fontSize:'0.9rem', fontWeight:700 }}>WF Assistant</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.4rem',
                background:'rgba(29,233,182,0.1)', border:'1px solid rgba(29,233,182,0.25)',
                borderRadius:100, padding:'0.25rem 0.7rem' }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)' }} />
                <span style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', color:'var(--green)' }}>Online</span>
              </div>
            </div>

            {/* Messages */}
            <div style={{ padding:'1rem 1.25rem', display:'flex', flexDirection:'column', gap:'0.6rem' }}>
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.4 + i * 0.25, duration:0.4 }}
                  style={{ display:'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth:'75%', padding:'0.6rem 0.9rem', borderRadius:12,
                    fontSize:'0.82rem', lineHeight:1.55,
                    background: m.from === 'user' ? 'rgba(123,104,238,0.25)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${m.from === 'user' ? 'rgba(123,104,238,0.3)' : 'rgba(255,255,255,0.07)'}`,
                    color: m.from === 'user' ? '#fff' : 'var(--muted2)',
                  }}>{m.text}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 2×2 stats */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
            {stats.map(s => (
              <div key={s.label} style={{
                border:'1px solid rgba(255,255,255,0.07)', borderRadius:14,
                padding:'1rem 1.25rem', background:'rgba(255,255,255,0.02)',
              }}>
                <div style={{ fontSize:'1.75rem', fontWeight:900, fontFamily:'var(--mono)',
                  color:s.color, letterSpacing:'-0.03em', lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:'0.6rem', fontFamily:'var(--mono)', textTransform:'uppercase',
                  letterSpacing:'0.1em', color:'var(--muted)', marginTop:'0.3rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ flex:'0 0 44%' }}>
          <motion.div variants={fadeUp}><BackButton navigate={navigate} /></motion.div>

          <motion.div variants={fadeUp} style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem' }}>
            <div style={{ width:20, height:1, background:'var(--green)' }} />
            <span style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', textTransform:'uppercase',
              letterSpacing:'0.14em', color:'var(--green)' }}>AI Product #02</span>
          </motion.div>

          <motion.h1 variants={fadeUp} style={{ fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:900,
            letterSpacing:'-0.05em', lineHeight:1.0, marginBottom:'1.25rem' }}>
            WF AI Assistant
          </motion.h1>

          <motion.p variants={fadeUp} style={{ fontSize:'1rem', color:'var(--muted2)', lineHeight:1.75,
            marginBottom:'2rem', maxWidth:400 }}>
            Drop a smart AI chatbot onto any website. It handles customer questions, qualifies leads, and works around the clock — trained on your content.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display:'flex', flexDirection:'column', gap:'0.6rem', marginBottom:'2.5rem' }}>
            {product.features.slice(0,5).map(f => (
              <FeatureCheck key={f} text={f} color="rgba(29,233,182,1)" />
            ))}
          </motion.div>

          <motion.div variants={fadeUp} style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
            <button
              onClick={onBuy}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(29,233,182,0.8)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--green)'}
              style={{
                background:'var(--green)', color:'#0a0a12', border:'none', borderRadius:100,
                padding:'0.8rem 1.75rem', fontWeight:700, fontSize:'0.9rem',
                cursor:'pointer', transition:'background 0.18s ease', letterSpacing:'-0.01em',
              }}
            >Buy license — $199</button>
            <button
              onClick={() => navigate('/#contact')}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; }}
              style={{
                background:'transparent', color:'#fff',
                border:'1px solid rgba(255,255,255,0.12)', borderRadius:100,
                padding:'0.8rem 1.75rem', fontWeight:600, fontSize:'0.9rem',
                cursor:'pointer', transition:'all 0.18s ease',
              }}
            >Request a demo</button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

/* ── GENERIC HERO ── */
function GenericHero({ product, onBuy, navigate }) {
  return (
    <section style={{ padding:'8rem 2.5rem 5rem', background:'transparent', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'20%', left:'50%', transform:'translateX(-50%)',
        width:700, height:400, borderRadius:'50%',
        background:'radial-gradient(ellipse,rgba(123,104,238,0.08) 0%,transparent 65%)',
        pointerEvents:'none' }} />
      <div style={{ maxWidth:860, margin:'0 auto', position:'relative' }}>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'2rem', flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')}
              style={{ background:'rgba(255,255,255,0.04)', border:'1px solid var(--border2)',
                color:'var(--muted2)', padding:'0.35rem 0.9rem', borderRadius:8,
                fontSize:'0.78rem', cursor:'pointer', transition:'all 0.2s', fontFamily:'var(--head)',
                display:'flex', alignItems:'center', gap:6 }}
              onMouseEnter={e => { e.currentTarget.style.color='var(--white)'; e.currentTarget.style.borderColor='var(--border3)'; }}
              onMouseLeave={e => { e.currentTarget.style.color='var(--muted2)'; e.currentTarget.style.borderColor='var(--border2)'; }}
            >← All products</button>
            <Badge variant={product.badgeVariant}>{product.badge}</Badge>
          </motion.div>
          <motion.div variants={fadeUp} style={{ marginBottom:'1rem' }}>
          <div style={{ width:64, height:64, borderRadius:18, background: product.accentColor ? product.accentColor.replace('1)','0.12)') : 'rgba(123,104,238,0.12)', border: `1px solid ${product.accentColor ? product.accentColor.replace('1)','0.25)') : 'rgba(123,104,238,0.25)'}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={product.accentColor || 'rgba(123,104,238,1)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
          </div>
        </motion.div>
          <motion.h1 variants={fadeUp} style={{ fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:900,
            letterSpacing:'-0.04em', lineHeight:1.05, marginBottom:'1rem' }}>{product.name}</motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize:'1.1rem', color:'var(--muted2)', maxWidth:560, lineHeight:1.7, marginBottom:'2.5rem' }}>
            {product.tagline}
          </motion.p>
          <motion.div variants={fadeUp} style={{ display:'flex', alignItems:'center', gap:'1.5rem', flexWrap:'wrap' }}>
            <div>
              <span style={{ fontSize:'2.5rem', fontWeight:900, fontFamily:'var(--mono)',
                color:product.accentColor, letterSpacing:'-0.04em' }}>${product.price}</span>
              <span style={{ fontSize:'0.8rem', color:'var(--muted)', marginLeft:6 }}>one-time</span>
            </div>
            <BtnPrimary onClick={onBuy}>Buy now →</BtnPrimary>
            <BtnGhost onClick={() => navigate('/#contact')}>Ask a question</BtnGhost>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── MAIN PRODUCT PAGE ── */
export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProduct(slug);
  const [modal, setModal] = useState(false);

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight:'80vh', display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', gap:'1.5rem', padding:'2rem', textAlign:'center' }}>
          <div style={{ width:64, height:64, borderRadius:18, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
          <h1 style={{ fontSize:'1.5rem', fontWeight:800 }}>Product not found</h1>
          <p style={{ color:'var(--muted2)' }}>That product doesn't exist or the link may be wrong.</p>
          <BtnPrimary onClick={() => navigate('/')}>← Back to store</BtnPrimary>
        </div>
        <Footer />
      </>
    );
  }

  const heroProps = { product, onBuy: () => setModal(true), navigate };

  return (
    <>
      <Navbar />

      {product.heroVariant === 'trading'   && <TradingHero   {...heroProps} />}
      {product.heroVariant === 'assistant' && <AssistantHero {...heroProps} />}
      {!product.heroVariant                && <GenericHero   {...heroProps} />}

      {/* ── WHAT IT IS ── */}
      <section style={{ padding:'5rem 2.5rem', background:'transparent', borderTop:'1px solid var(--border)' }}>
        <div style={{ maxWidth:860, margin:'0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-60px' }} variants={staggerContainer}>
            <motion.div variants={fadeUp}>
              <SectionLabel>What it is</SectionLabel>
              <p style={{ fontSize:'1.05rem', color:'var(--muted2)', lineHeight:1.85, whiteSpace:'pre-line', maxWidth:700 }}>
                {product.intro}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding:'5rem 2.5rem', background:'transparent' }}>
        <div style={{ maxWidth:860, margin:'0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-60px' }} variants={staggerContainer}>
            <motion.div variants={fadeUp}>
              <SectionLabel>How it works</SectionLabel>
              <h2 style={{ fontSize:'clamp(1.6rem,3vw,2.25rem)', fontWeight:800, letterSpacing:'-0.04em', marginBottom:'2.5rem' }}>
                Step by step
              </h2>
            </motion.div>
            <div style={{ display:'flex', flexDirection:'column', position:'relative' }}>
              <div style={{ position:'absolute', left:19, top:20, bottom:20, width:1,
                background:'linear-gradient(to bottom,rgba(123,104,238,0.5),transparent)', pointerEvents:'none' }} />
              {product.howItWorks.map(step => (
                <motion.div key={step.step} variants={fadeUp}
                  style={{ display:'flex', gap:'1.5rem', paddingBottom:'2rem', position:'relative' }}>
                  <div style={{ width:40, height:40, borderRadius:'50%', flexShrink:0,
                    background:'rgba(123,104,238,0.12)', border:'1px solid rgba(123,104,238,0.3)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'0.65rem', fontFamily:'var(--mono)', fontWeight:700, color:'var(--ai2)', zIndex:1 }}>
                    {step.step}
                  </div>
                  <div style={{ paddingTop:8 }}>
                    <h3 style={{ fontSize:'1rem', fontWeight:800, letterSpacing:'-0.02em', marginBottom:'0.4rem' }}>{step.title}</h3>
                    <p style={{ fontSize:'0.875rem', color:'var(--muted2)', lineHeight:1.7, maxWidth:600 }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES + SPECS ── */}
      <section style={{ padding:'5rem 2.5rem', background:'transparent', borderTop:'1px solid var(--border)' }}>
        <div style={{ maxWidth:860, margin:'0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-60px' }}
            variants={staggerContainer} className="pp-feat-specs">
            <motion.div variants={fadeUp}>
              <SectionLabel>Features</SectionLabel>
              <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,1.9rem)', fontWeight:800, letterSpacing:'-0.04em', marginBottom:'1.5rem' }}>
                Everything included
              </h2>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {product.features.map(f => <FeatureCheck key={f} text={f} />)}
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <SectionLabel>Specs</SectionLabel>
              <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,1.9rem)', fontWeight:800, letterSpacing:'-0.04em', marginBottom:'1.5rem' }}>
                Technical details
              </h2>
              <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden' }}>
                {product.specs.map(([label, value], i) => (
                  <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                    padding:'0.875rem 1.25rem', gap:'1rem',
                    borderBottom: i < product.specs.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ fontSize:'0.75rem', color:'var(--muted)', fontFamily:'var(--mono)',
                      textTransform:'uppercase', letterSpacing:'0.06em' }}>{label}</span>
                    <span style={{ fontSize:'0.875rem', fontWeight:600, color:'var(--white2)', textAlign:'right' }}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {product.faq?.length > 0 && (
        <section style={{ padding:'5rem 2.5rem', background:'transparent' }}>
          <div style={{ maxWidth:720, margin:'0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-60px' }} variants={staggerContainer}>
              <motion.div variants={fadeUp}>
                <SectionLabel>FAQ</SectionLabel>
                <h2 style={{ fontSize:'clamp(1.6rem,3vw,2.25rem)', fontWeight:800, letterSpacing:'-0.04em', marginBottom:'2rem' }}>
                  Common questions
                </h2>
              </motion.div>
              <motion.div variants={fadeUp} style={{ display:'flex', flexDirection:'column', gap:'0.625rem' }}>
                {product.faq.map(item => <FaqItem key={item.q} q={item.q} a={item.a} />)}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding:'5rem 2.5rem', background:'transparent',
        borderTop:'1px solid var(--border)', textAlign:'center' }}>
        <div style={{ maxWidth:520, margin:'0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} style={{ marginBottom:'1rem', display:'flex', justifyContent:'center' }}>
            <div style={{ width:52, height:52, borderRadius:16, background: product.accentColor ? product.accentColor.replace('1)','0.12)') : 'rgba(123,104,238,0.12)', border: `1px solid ${product.accentColor ? product.accentColor.replace('1)','0.25)') : 'rgba(123,104,238,0.25)'}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={product.accentColor || 'rgba(123,104,238,1)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            </div>
          </motion.div>
            <motion.h2 variants={fadeUp} style={{ fontSize:'clamp(1.6rem,3vw,2.25rem)', fontWeight:900,
              letterSpacing:'-0.04em', marginBottom:'0.75rem' }}>Ready to get started?</motion.h2>
            <motion.p variants={fadeUp} style={{ color:'var(--muted2)', marginBottom:'2rem', lineHeight:1.7 }}>
              One-time payment. Yours to keep. 30 days support included.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap' }}>
              <BtnPrimary onClick={() => setModal(true)}>Buy {product.name} — ${product.price} →</BtnPrimary>
              <BtnGhost onClick={() => navigate('/')}>Browse other products</BtnGhost>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {modal && (
        <BuyModal product={product.name} desc={product.productDesc}
          price={product.price} onClose={() => setModal(false)} />
      )}

      <style>{`
        .pp-feat-specs { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        @media(max-width:700px) {
          .pp-feat-specs { grid-template-columns: 1fr !important; gap: 3rem !important; }
          section { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
        }
        @media(max-width:860px) {
          .hero-split { flex-direction: column !important; }
        }
      `}</style>
    </>
  );
}