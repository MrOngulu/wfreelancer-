import { motion } from 'framer-motion';
import { SectionLabel, SectionTitle, Badge, GlassCard, BtnPrimary, staggerContainer, fadeUp } from './ui';

const featured = [
  {
    icon: '🤖',
    variant: 'ai',
    tag: 'AI Software',
    badge: { text:'AI', variant:'ai' },
    name: 'WF AI Trading Bot',
    desc: 'Machine-learning trading algorithm that scans markets 24/7 and executes positions automatically on Forex, crypto & stocks.',
    price: '$299',
    per: '/ license',
    href: '#trading-bot',
    glow: 'rgba(123,104,238,0.2)',
    accentColor: 'var(--ai2)',
  },
  {
    icon: '💬',
    variant: 'green',
    tag: 'AI Software',
    badge: { text:'New', variant:'green' },
    name: 'WF AI Assistant',
    desc: 'Deploy a smart chatbot on any website. Handles customer support, qualifies leads, and answers questions — fully customizable.',
    price: '$199',
    per: '/ license',
    href: '#assistant',
    glow: 'rgba(29,233,182,0.15)',
    accentColor: 'var(--green)',
  },
  {
    icon: '⚡',
    variant: 'amber',
    tag: 'AI Software',
    badge: { text:'Coming soon', variant:'muted' },
    name: 'WF Analytics AI',
    desc: 'Ask questions about your business in plain English and get instant charts, summaries and insights from your own data.',
    price: '—',
    per: 'in development',
    comingSoon: true,
    glow: 'rgba(255,160,64,0.12)',
    accentColor: 'var(--amber)',
  },
];

function FeatCard({ item, index }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y:-6, boxShadow:`0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px ${item.glow}` }}
      style={{
        background:'linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))',
        border:'1px solid var(--border)',
        borderRadius:24, padding:'2rem',
        cursor: item.comingSoon ? 'default' : 'pointer',
        transition:'border-color 0.3s, box-shadow 0.4s',
        position:'relative', overflow:'hidden',
      }}
    >
      {/* Glow bleed */}
      <div style={{
        position:'absolute', top:-40, right:-40,
        width:160, height:160, borderRadius:'50%',
        background:`radial-gradient(ellipse,${item.glow} 0%,transparent 70%)`,
        pointerEvents:'none',
      }} />

      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'1.5rem' }}>
        <div style={{
          width:52, height:52, borderRadius:16,
          background:`radial-gradient(circle at 30% 30%,${item.glow},rgba(255,255,255,0.03))`,
          border:`1px solid ${item.glow}`,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem',
        }}>
          {item.icon}
        </div>
        <Badge variant={item.badge.variant}>{item.badge.text}</Badge>
      </div>

      <p style={{ fontSize:'0.68rem', fontFamily:'var(--mono)', color:'var(--muted)',
        textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.4rem' }}>
        {item.tag}
      </p>
      <h3 style={{ fontSize:'1.15rem', fontWeight:800, letterSpacing:'-0.025em', marginBottom:'0.6rem' }}>
        {item.name}
      </h3>
      <p style={{ fontSize:'0.875rem', color:'var(--muted2)', lineHeight:1.65, marginBottom:'1.5rem' }}>
        {item.desc}
      </p>

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto' }}>
        <div>
          <span style={{ fontSize:'1.4rem', fontWeight:900, fontFamily:'var(--mono)',
            color: item.comingSoon ? 'var(--muted)' : item.accentColor }}>
            {item.price}
          </span>
          <span style={{ fontSize:'0.72rem', color:'var(--muted)', marginLeft:4 }}>{item.per}</span>
        </div>
        {!item.comingSoon && (
          <a href={item.href}>
            <motion.button
              whileHover={{ scale:1.05 }}
              whileTap={{ scale:0.95 }}
              style={{
                background:'rgba(255,255,255,0.07)', color:'var(--white2)',
                border:'1px solid var(--border2)', borderRadius:10,
                padding:'0.45rem 1rem', fontSize:'0.78rem', fontWeight:600,
                cursor:'pointer', transition:'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.background='var(--ai)'; e.target.style.color='#fff'; }}
              onMouseLeave={e => { e.target.style.background='rgba(255,255,255,0.07)'; e.target.style.color='var(--white2)'; }}
            >
              Learn more →
            </motion.button>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  return (
    <section id="products" style={{ padding:'6rem 2.5rem', background:'var(--bg2)' }}>
      <div style={{ maxWidth:1140, margin:'0 auto' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once:true, margin:'-80px' }}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Flagship software</SectionLabel>
            <SectionTitle>AI products built to earn</SectionTitle>
            <p style={{ color:'var(--muted2)', fontSize:'1rem', maxWidth:480, marginBottom:'3rem', lineHeight:1.7 }}>
              Deploy-ready algorithms and intelligent tools — powered by machine learning, tested in real markets.
            </p>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:'1.25rem' }}>
            {featured.map((item, i) => <FeatCard key={item.name} item={item} index={i} />)}
          </div>
        </motion.div>
      </div>
      <style>{`@media(max-width:600px){ #products { padding:4rem 1.25rem !important; } }`}</style>
    </section>
  );
}
