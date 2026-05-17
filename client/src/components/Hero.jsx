import { motion } from 'framer-motion';
import { BtnPrimary, BtnGhost, fadeUp, staggerContainer } from './ui';

const TradingCard = ({ onBuy }) => (
  <motion.div
    initial={{ opacity:0, x:40, rotateY:-8 }}
    animate={{ opacity:1, x:0, rotateY:0 }}
    transition={{ delay:0.5, duration:0.9, ease:[0.22,1,0.36,1] }}
    style={{ perspective:1000, width:'100%' }}
  >
    <div style={{
      background:'linear-gradient(160deg,rgba(123,104,238,0.1),rgba(255,255,255,0.03))',
      border:'1px solid rgba(123,104,238,0.25)',
      borderRadius:24, overflow:'hidden',
      boxShadow:'0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(123,104,238,0.1)',
    }}>
      {/* Window chrome */}
      <div style={{
        background:'rgba(255,255,255,0.03)',
        borderBottom:'1px solid var(--border)',
        padding:'0.875rem 1.25rem',
        display:'flex', alignItems:'center', gap:8
      }}>
        <div style={{ display:'flex', gap:6 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => (
            <div key={c} style={{ width:10,height:10,borderRadius:'50%',background:c }} />
          ))}
        </div>
        <span style={{ fontSize:'0.7rem', fontFamily:'var(--mono)', color:'var(--muted)', marginLeft:'auto' }}>
          wf-trading-bot v2.1 · live
        </span>
        <span style={{ width:6,height:6,borderRadius:'50%',background:'var(--green)',
          boxShadow:'0 0 8px var(--green)', animation:'pulse 2s infinite', flexShrink:0 }} />
      </div>

      <div style={{ padding:'1.25rem' }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'1rem' }}>
          <div>
            <p style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4 }}>
              AI Product
            </p>
            <h3 style={{ fontSize:'1.1rem', fontWeight:800, letterSpacing:'-0.02em' }}>WF Trading Bot</h3>
          </div>
          <span style={{
            background:'var(--green-dim)', color:'var(--green)',
            border:'1px solid rgba(29,233,182,0.2)',
            fontSize:'0.65rem', fontFamily:'var(--mono)', fontWeight:600,
            padding:'0.25rem 0.6rem', borderRadius:100,
            animation:'floatBadge 3s ease-in-out infinite', flexShrink:0,
          }}>+12.4% today</span>
        </div>

        {/* Metrics */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.625rem', marginBottom:'1rem' }}>
          {[['87%','Win rate'],['24/7','Active'],['0.3s','Execute']].map(([v,l]) => (
            <div key={l} style={{
              background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)',
              borderRadius:12, padding:'0.75rem', textAlign:'center'
            }}>
              <div style={{ fontSize:'1.05rem', fontWeight:800, fontFamily:'var(--mono)', color:'var(--green)' }}>{v}</div>
              <div style={{ fontSize:'0.62rem', color:'var(--muted)', marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Mini chart */}
        <div style={{
          height:56, background:'rgba(255,255,255,0.03)',
          borderRadius:10, marginBottom:'1rem', overflow:'hidden', position:'relative'
        }}>
          <svg width="100%" height="100%" viewBox="0 0 300 56" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1de9b6" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#1de9b6" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <polygon
              points="0,56 0,46 30,36 60,38 90,26 120,28 150,16 180,14 210,20 240,8 270,6 300,2 300,56"
              fill="url(#chartGrad)"
            />
            <polyline
              points="0,46 30,36 60,38 90,26 120,28 150,16 180,14 210,20 240,8 270,6 300,2"
              fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round"
            />
          </svg>
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <span style={{ fontSize:'1.35rem', fontWeight:800, fontFamily:'var(--mono)' }}>$299</span>
            <span style={{ fontSize:'0.72rem', color:'var(--muted)', marginLeft:4 }}>/ license</span>
          </div>
          <motion.button
            whileHover={{ scale:1.04 }}
            whileTap={{ scale:0.96 }}
            onClick={() => onBuy('WF AI Trading Bot','Automated ML-powered trading bot for Forex, crypto & stocks.',299)}
            style={{
              background:'linear-gradient(135deg,var(--ai),#6a5acd)',
              color:'#fff', padding:'0.5rem 1.1rem', borderRadius:10,
              fontSize:'0.8rem', fontWeight:700, border:'none', cursor:'pointer',
              boxShadow:'0 0 20px var(--ai-glow)',
            }}
          >
            Buy now
          </motion.button>
        </div>
      </div>
    </div>
  </motion.div>
);

const stats = [
  { val:'50+', label:'Projects delivered' },
  { val:'$199', label:'Starting price' },
  { val:'M-Pesa', label:'& PayPal accepted' },
];

export default function Hero({ onBuy }) {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior:'smooth' });
  };

  return (
    <section id="home" style={{
      minHeight:'100vh', display:'flex', alignItems:'center',
      padding:'7rem 2.5rem 5rem', position:'relative', overflow:'hidden',
    }}>
      {/* Background effects */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:'linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)',
          backgroundSize:'72px 72px',
          maskImage:'radial-gradient(ellipse 100% 80% at 50% 50%,black 20%,transparent 75%)',
        }} />
        <div style={{
          position:'absolute', top:'15%', left:'55%',
          width:700, height:500, borderRadius:'50%',
          background:'radial-gradient(ellipse,rgba(123,104,238,0.1) 0%,transparent 65%)',
          transform:'translateX(-50%)',
        }} />
        <div style={{
          position:'absolute', bottom:'10%', left:'10%',
          width:400, height:300, borderRadius:'50%',
          background:'radial-gradient(ellipse,rgba(29,233,182,0.05) 0%,transparent 65%)',
        }} />
      </div>

      <div style={{ maxWidth:1140, margin:'0 auto', width:'100%', position:'relative' }}
        className="hero-grid">

        {/* Left */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8,
              background:'rgba(123,104,238,0.1)', border:'1px solid rgba(123,104,238,0.25)',
              padding:'0.3rem 0.9rem', borderRadius:100,
              fontSize:'0.72rem', fontFamily:'var(--mono)', color:'var(--ai3)',
              marginBottom:'1.5rem',
            }}>
              <span style={{ width:6,height:6,borderRadius:'50%',background:'var(--ai2)',
                boxShadow:'0 0 8px var(--ai)',flexShrink:0,animation:'pulse 2s infinite' }} />
              AI-powered software · Made in Africa
            </div>
          </motion.div>

          <motion.h1 variants={fadeUp} className="hero-h1">
            Software that<br />
            <span style={{ background:'linear-gradient(135deg,var(--ai2),var(--ai3))',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              works while
            </span>
            <br />you sleep.
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontSize:'1.05rem', color:'var(--muted2)', fontWeight:400,
            maxWidth:440, marginBottom:'2rem', lineHeight:1.7
          }}>
            AI trading bots, intelligent assistants, website templates, and mobile apps — ready to buy or custom-built for your business.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', marginBottom:'2.5rem' }}>
            <BtnPrimary onClick={() => scrollTo('#products')}>
              Explore products ↓
            </BtnPrimary>
            <BtnGhost onClick={() => scrollTo('#contact')}>
              Custom project →
            </BtnGhost>
          </motion.div>

          <motion.div variants={fadeUp} className="hero-stats">
            {stats.map(s => (
              <div key={s.label}>
                <div style={{ fontSize:'1.6rem', fontWeight:900, fontFamily:'var(--mono)',
                  letterSpacing:'-0.04em', color:'var(--white)' }}>{s.val}</div>
                <div style={{ fontSize:'0.72rem', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.07em' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: live card */}
        <TradingCard onBuy={onBuy} />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .hero-h1 {
          font-size: clamp(2.2rem, 5.5vw, 4.5rem);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -0.05em;
          margin-bottom: 1.25rem;
        }
        .hero-stats {
          display: flex;
          gap: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
        }

        /* Tablet */
        @media(max-width:900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          #home {
            padding: 7rem 2rem 4rem !important;
            align-items: flex-start !important;
          }
        }

        /* Mobile */
        @media(max-width:600px) {
          #home {
            padding: 6rem 1.25rem 3.5rem !important;
          }
          .hero-h1 {
            font-size: 2.2rem !important;
          }
          .hero-stats {
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}