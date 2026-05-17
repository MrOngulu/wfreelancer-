import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLabel, SectionTitle, Badge, fadeUp, staggerContainer } from './ui';

const FILTERS = [
  { key:'all', label:'All' },
  { key:'ai', label:'AI Software' },
  { key:'web', label:'Websites' },
  { key:'mob', label:'Mobile' },
  { key:'ui', label:'UI Kits' },
  { key:'saas', label:'SaaS' },
];

const PRODUCTS = [
  { cat:'ai', emoji:'📈', bg:'#060e0a', name:'WF AI Trading Bot', desc:'ML trading bot for Forex, crypto & stocks. Configurable risk, 24/7 execution.', price:299, badge:'AI', badgeV:'ai', hot:true, product:'WF AI Trading Bot', productDesc:'ML trading bot for Forex, crypto & stocks.' },
  { cat:'ai', emoji:'💬', bg:'#07070f', name:'WF AI Assistant', desc:'Intelligent chatbot you embed on any site. Support, leads & Q&A — ready to go.', price:199, badge:'New', badgeV:'green', product:'WF AI Assistant', productDesc:'Intelligent chatbot for websites & apps.' },
  { cat:'web', emoji:'🌐', bg:'#07070d', name:'Business Landing Page', desc:'Node.js + EJS landing page. Dark mode, contact form, M-Pesa/PayPal ready.', price:299, badge:'Popular', badgeV:'muted', product:'Business Landing Page', productDesc:'Professional landing page template.' },
  { cat:'web', emoji:'🛍️', bg:'#070a07', name:'E-commerce Store', desc:'Full online store with cart, checkout, M-Pesa & PayPal integration.', price:449, badge:null, product:'E-commerce Store', productDesc:'Full e-commerce template.' },
  { cat:'mob', emoji:'📱', bg:'#08060f', name:'React Native Starter', desc:'Cross-platform mobile app: auth, Firebase, push notifications, app store ready.', price:499, badge:null, product:'React Native Starter Kit', productDesc:'Mobile app starter kit.' },
  { cat:'ui', emoji:'🎨', bg:'#0a060d', name:'Dashboard UI Kit', desc:'80+ Figma screens for SaaS. Auto-layout, variables, light & dark mode.', price:349, badge:'Figma', badgeV:'muted', product:'Dashboard UI Kit', productDesc:'Premium Figma UI kit.' },
  { cat:'saas', emoji:'🚀', bg:'#06080f', name:'SaaS Boilerplate', desc:'Full-stack boilerplate: auth, billing, admin panel, API & deploy guide.', price:599, badge:'Full stack', badgeV:'ai', product:'SaaS Boilerplate', productDesc:'Full-stack SaaS template.' },
  { cat:'web', emoji:'✦', bg:'#07070f', name:'Developer Portfolio', desc:'Animated one-page portfolio for developers. Responsive, fast to customize.', price:199, badge:null, product:'Developer Portfolio', productDesc:'Portfolio site template.' },
];

function ProductCard({ p, onBuy, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          layout
          initial={{ opacity:0, scale:0.95 }}
          animate={{ opacity:1, scale:1 }}
          exit={{ opacity:0, scale:0.95 }}
          transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
          whileHover={{ y:-4, borderColor:'rgba(123,104,238,0.3)' }}
          style={{
            background:'var(--bg)', border:'1px solid var(--border)',
            borderRadius:18, overflow:'hidden',
            transition:'border-color 0.3s', cursor:'pointer',
          }}
        >
          {/* Thumb */}
          <div style={{
            height:140, background:p.bg,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'2.5rem', position:'relative',
          }}>
            {p.badge && (
              <div style={{ position:'absolute', top:10, left:10 }}>
                <Badge variant={p.badgeV || 'muted'}>{p.badge}</Badge>
              </div>
            )}
            {p.emoji}
          </div>
          {/* Body */}
          <div style={{ padding:'1.1rem' }}>
            <p style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', color:'var(--muted)',
              textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.3rem' }}>
              {p.cat === 'ai' ? 'AI Software' : p.cat === 'web' ? 'Website' : p.cat === 'mob' ? 'Mobile App' : p.cat === 'ui' ? 'UI Kit' : 'SaaS'}
            </p>
            <h3 style={{ fontSize:'0.95rem', fontWeight:800, letterSpacing:'-0.02em', marginBottom:'0.4rem' }}>{p.name}</h3>
            <p style={{ fontSize:'0.8rem', color:'var(--muted2)', lineHeight:1.55, marginBottom:'1rem' }}>{p.desc}</p>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:'1.1rem', fontWeight:900, fontFamily:'var(--mono)',
                color: p.cat === 'ai' ? 'var(--green)' : 'var(--white)' }}>
                ${p.price}
              </span>
              <motion.button
                whileHover={{ scale:1.05 }}
                whileTap={{ scale:0.95 }}
                onClick={() => onBuy(p.product, p.productDesc, p.price)}
                style={{
                  background:'rgba(255,255,255,0.06)', color:'var(--white2)',
                  border:'1px solid var(--border2)', borderRadius:9,
                  /* Larger tap target on mobile */
                  padding:'0.5rem 1rem', fontSize:'0.75rem', fontWeight:700, cursor:'pointer',
                  transition:'all 0.2s', minHeight:40,
                }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--ai)'; e.currentTarget.style.borderColor='var(--ai)'; e.currentTarget.style.color='#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.color='var(--white2)'; }}
              >
                Buy →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Store({ onBuy }) {
  const [active, setActive] = useState('all');

  return (
    <section id="store" style={{ padding:'6rem 2.5rem', background:'var(--bg3)' }}>
      <div style={{ maxWidth:1140, margin:'0 auto' }}>
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once:true, margin:'-80px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="store-header">
            <div>
              <SectionLabel>Full store</SectionLabel>
              <SectionTitle style={{ marginBottom:'0.5rem' }}>Browse all products</SectionTitle>
              <p style={{ color:'var(--muted2)', fontSize:'0.95rem' }}>Instant download after payment — all yours to keep and customize.</p>
            </div>
            {/* Filter tabs */}
            <div className="store-filters">
              {FILTERS.map(f => (
                <motion.button
                  key={f.key}
                  whileTap={{ scale:0.95 }}
                  onClick={() => setActive(f.key)}
                  style={{
                    /* Min 44px tap target height for mobile */
                    padding:'0.45rem 0.9rem', borderRadius:9, minHeight:44,
                    fontSize:'0.78rem', fontWeight:600,
                    border: active === f.key ? '1px solid var(--ai)' : '1px solid var(--border)',
                    background: active === f.key ? 'var(--ai)' : 'transparent',
                    color: active === f.key ? '#fff' : 'var(--muted2)',
                    cursor:'pointer', transition:'all 0.2s',
                  }}
                >
                  {f.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          layout
          style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))', gap:'1rem' }}
        >
          {PRODUCTS.map(p => (
            <ProductCard
              key={p.name}
              p={p}
              onBuy={onBuy}
              visible={active === 'all' || p.cat === active}
            />
          ))}
        </motion.div>
      </div>

      <style>{`
        .store-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .store-filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        @media(max-width:600px) {
          #store { padding: 4rem 1.25rem !important; }
          .store-header { align-items: flex-start !important; }
          .store-filters { gap: 0.4rem !important; }
        }
      `}</style>
    </section>
  );
}