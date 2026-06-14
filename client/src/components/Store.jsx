import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SectionLabel, AnimatedHeadline, Badge, ease } from './ui';

function IconBox({ children, bg, border, size = 48, radius = 12 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: bg, border: `1px solid ${border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>{children}</div>
  );
}

// Store product icons
const TradingIcon  = ({c='rgba(123,104,238,1)'}) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const ChatBotIcon  = ({c='rgba(29,233,182,1)'}) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const GlobeIcon    = ({c='rgba(255,255,255,0.7)'}) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const StoreIcon    = ({c='rgba(255,255,255,0.7)'}) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
const MobileIcon   = ({c='rgba(255,255,255,0.7)'}) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
const LayoutIcon   = ({c='rgba(123,104,238,0.8)'}) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>;
const ServerIcon   = ({c='rgba(123,104,238,1)'}) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>;
const CodeIcon     = ({c='rgba(255,255,255,0.7)'}) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;

const STORE_ICON_MAP = {
  '📈': { Comp: TradingIcon, bg: 'rgba(123,104,238,0.15)', border: 'rgba(123,104,238,0.3)', c: 'rgba(123,104,238,1)' },
  '💬': { Comp: ChatBotIcon, bg: 'rgba(29,233,182,0.12)',  border: 'rgba(29,233,182,0.28)', c: 'rgba(29,233,182,1)' },
  '🌐': { Comp: GlobeIcon,   bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', c: 'rgba(255,255,255,0.7)' },
  '🛍️': { Comp: StoreIcon,   bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', c: 'rgba(255,255,255,0.7)' },
  '📱': { Comp: MobileIcon,  bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', c: 'rgba(255,255,255,0.7)' },
  '🎨': { Comp: LayoutIcon,  bg: 'rgba(123,104,238,0.1)',  border: 'rgba(123,104,238,0.22)', c: 'rgba(123,104,238,0.8)' },
  '🚀': { Comp: ServerIcon,  bg: 'rgba(123,104,238,0.15)', border: 'rgba(123,104,238,0.3)',  c: 'rgba(123,104,238,1)' },
  '✦':  { Comp: CodeIcon,    bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', c: 'rgba(255,255,255,0.7)' },
};


const FILTERS = [
  { key:'all', label:'All' }, { key:'ai', label:'AI Software' },
  { key:'web', label:'Websites' }, { key:'mob', label:'Mobile' },
  { key:'ui', label:'UI Kits' }, { key:'saas', label:'SaaS' },
];

const PRODUCTS = [
  { cat:'ai', emoji:'📈', name:'WF AI Trading Bot', desc:'ML trading bot for Forex, crypto & stocks. Configurable risk, 24/7 execution.', price:30, priceSuffix:'/mo', badge:'AI', badgeV:'ai', hot:true, product:'WF AI Trading Bot', productDesc:'ML trading bot for Forex, crypto & stocks.', slug:'wf-ai-trading-bot', accentColor:'var(--ai2)' },
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
            height: 120, background: 'linear-gradient(160deg, rgba(123,104,238,0.06), rgba(0,0,0,0.4))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', borderBottom: '1px solid var(--border)',
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
            {(() => {
              const ic = STORE_ICON_MAP[p.emoji];
              if (!ic) return null;
              const { Comp, bg, border, c } = ic;
              return <IconBox bg={bg} border={border} size={52} radius={14}><Comp c={c} /></IconBox>;
            })()}
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
                ${p.price}{p.priceSuffix && <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--muted)' }}>{p.priceSuffix}</span>}
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
    <section id="store" style={{ padding: '8rem 2.5rem', background: 'transparent', position: 'relative' }}>
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

        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(270px,100%),1fr))', gap: '1.1rem' }}>
          {PRODUCTS.map(p => (
            <ProductCard key={p.name} p={p} onBuy={onBuy} visible={active === 'all' || p.cat === active} />
          ))}
        </motion.div>
      </div>

      <style>{`@media(max-width:600px){ #store { padding:5rem 1.25rem !important; } }`}</style>
    </section>
  );
}