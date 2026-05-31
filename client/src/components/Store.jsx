import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SectionLabel, AnimatedHeadline, Badge, ease } from './ui';

const FILTERS = [
  { key:'all', label:'All' }, { key:'ai', label:'AI Software' },
  { key:'web', label:'Websites' }, { key:'mob', label:'Mobile' },
  { key:'ui', label:'UI Kits' }, { key:'saas', label:'SaaS' },
];

const PRODUCTS = [
  { cat:'ai', emoji:'📈', name:'WF AI Trading Bot', desc:'ML trading bot for Forex, crypto & stocks. Configurable risk, 24/7 execution.', price:299, badge:'AI', badgeV:'ai', hot:true, product:'WF AI Trading Bot', productDesc:'ML trading bot for Forex, crypto & stocks.', slug:'wf-ai-trading-bot', accentColor:'var(--ai2)' },
  { cat:'ai', emoji:'💬', name:'WF AI Assistant', desc:'Intelligent chatbot you embed on any site. Support, leads & Q&A — ready to go.', price:199, badge:'New', badgeV:'green', product:'WF AI Assistant', productDesc:'Intelligent chatbot for websites & apps.', slug:'wf-ai-assistant', accentColor:'var(--green)' },
  { cat:'web', emoji:'🌐', name:'Business Landing Page', desc:'Node.js + EJS landing page. Dark mode, contact form, M-Pesa/PayPal ready.', price:299, badge:'Popular', badgeV:'muted', product:'Business Landing Page', productDesc:'Professional landing page template.', slug:'business-landing-page', accentColor:'var(--white2)' },
  { cat:'web', emoji:'🛍️', name:'E-commerce Store', desc:'Full online store with cart, checkout, M-Pesa & PayPal integration.', price:449, badge:null, product:'E-commerce Store', productDesc:'Full e-commerce template.', slug:'ecommerce-store', accentColor:'var(--white2)' },
  { cat:'mob', emoji:'📱', name:'React Native Starter', desc:'Cross-platform mobile app: auth, Firebase, push notifications, app store ready.', price:499, badge:null, product:'React Native Starter Kit', productDesc:'Mobile app starter kit.', slug:'react-native-starter', accentColor:'var(--white2)' },
  { cat:'ui', emoji:'🎨', name:'Dashboard UI Kit', desc:'80+ Figma screens for SaaS. Auto-layout, variables, light & dark mode.', price:349, badge:'Figma', badgeV:'muted', product:'Dashboard UI Kit', productDesc:'Premium Figma UI kit.', slug:'dashboard-ui-kit', accentColor:'var(--ai3)' },
  { cat:'saas', emoji:'🚀', name:'SaaS Boilerplate', desc:'Full-stack boilerplate: auth, billing, admin panel, API & deploy guide.', price:599, badge:'Full stack', badgeV:'ai', product:'SaaS Boilerplate', productDesc:'Full-stack SaaS template.', slug:'saas-boilerplate', accentColor:'var(--ai2)' },
  { cat:'web', emoji:'✦', name:'Developer Portfolio', desc:'Animated one-page portfolio for developers. Responsive, fast to customize.', price:199, badge:null, product:'Developer Portfolio', productDesc:'Portfolio site template.', slug:'developer-portfolio', accentColor:'var(--white2)' },
];

const catLabel = { ai:'AI Software', web:'Website', mob:'Mobile App', ui:'UI Kit', saas:'SaaS' };

function ProductCard({ p, onBuy, visible }) {
  const navigate = useNavigate();
  const [hov, setHov] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.35, ease }}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            background: hov ? 'rgba(123,104,238,0.04)' : 'var(--bg)',
            border: `1px solid ${hov ? 'rgba(123,104,238,0.28)' : 'var(--border)'}`,
            borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
            transition: 'border-color 0.3s, background 0.3s',
            boxShadow: hov ? '0 24px 60px rgba(0,0,0,0.4)' : 'none',
            transform: hov ? 'translateY(-4px)' : 'translateY(0)',
          }}
        >
          {/* Thumb */}
          <div style={{
            height: 120, background: 'linear-gradient(160deg, rgba(123,104,238,0.08), rgba(0,0,0,0.4))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.2rem', position: 'relative',
            borderBottom: '1px solid var(--border)',
          }}>
            {p.badge && (
              <div style={{ position: 'absolute', top: 10, left: 10 }}>
                <Badge variant={p.badgeV || 'muted'}>{p.badge}</Badge>
              </div>
            )}
            {p.hot && (
              <div style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: '50%',
                background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
            )}
            {p.emoji}
          </div>

          {/* Body */}
          <div style={{ padding: '1.25rem' }}>
            <p style={{ fontSize: '0.63rem', fontFamily: 'var(--mono)', color: 'var(--muted)',
              textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>
              {catLabel[p.cat] || p.cat}
            </p>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>{p.name}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted2)', lineHeight: 1.6, marginBottom: '1.1rem' }}>{p.desc}</p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 900, fontFamily: 'var(--mono)', color: p.accentColor }}>
                ${p.price}
              </span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/product/${p.slug}`)}
                  style={{ background: 'transparent', color: 'var(--muted2)', border: '1px solid var(--border)',
                    borderRadius: 9, padding: '0.45rem 0.7rem', fontSize: '0.72rem', fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--head)' }}
                  onMouseEnter={e => { e.currentTarget.style.color='var(--white2)'; e.currentTarget.style.borderColor='var(--border2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='var(--muted2)'; e.currentTarget.style.borderColor='var(--border)'; }}
                >Details</motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => onBuy(p.product, p.productDesc, p.price)}
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--white2)', border: '1px solid var(--border2)',
                    borderRadius: 9, padding: '0.45rem 0.9rem', fontSize: '0.75rem', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--head)' }}
                  onMouseEnter={e => { e.currentTarget.style.background='var(--ai)'; e.currentTarget.style.borderColor='var(--ai)'; e.currentTarget.style.color='#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.color='var(--white2)'; }}
                >Buy →</motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Store({ onBuy }) {
  const [active, setActive] = useState('all');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="store" style={{ padding: '8rem 2.5rem', background: 'var(--bg3)', position: 'relative' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div ref={ref}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}>
            <SectionLabel>Full store</SectionLabel>
          </motion.div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
            <AnimatedHeadline
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 1.0, margin: 0 }}
              delay={0.1}
            >
              Browse all products
            </AnimatedHeadline>
            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ color: 'var(--muted2)', fontSize: '0.9rem', maxWidth: 280, lineHeight: 1.7 }}
            >
              Instant download after payment — all yours to keep and customize.
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}
          >
            {FILTERS.map(f => (
              <motion.button
                key={f.key}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActive(f.key)}
                style={{
                  padding: '0.5rem 1rem', borderRadius: 10, fontSize: '0.78rem', fontWeight: 600,
                  border: active === f.key ? '1px solid var(--ai)' : '1px solid var(--border)',
                  background: active === f.key ? 'var(--ai)' : 'rgba(255,255,255,0.03)',
                  color: active === f.key ? '#fff' : 'var(--muted2)',
                  cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--head)',
                }}
              >{f.label}</motion.button>
            ))}
          </motion.div>
        </div>

        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: '1.1rem' }}>
          {PRODUCTS.map(p => (
            <ProductCard key={p.name} p={p} onBuy={onBuy} visible={active === 'all' || p.cat === active} />
          ))}
        </motion.div>
      </div>

      <style>{`@media(max-width:600px){ #store { padding:5rem 1.25rem !important; } }`}</style>
    </section>
  );
}
