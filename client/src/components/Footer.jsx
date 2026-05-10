import { motion } from 'framer-motion';

const LINKS = [
  { label:'Products', href:'#products' },
  { label:'AI Trading Bot', href:'#trading-bot' },
  { label:'AI Assistant', href:'#assistant' },
  { label:'Services', href:'#services' },
  { label:'Reviews', href:'#reviews' },
  { label:'Contact', href:'#contact' },
];

export default function Footer() {
  const scrollTo = href => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior:'smooth' });
  };

  return (
    <footer style={{
      background:'var(--bg2)', borderTop:'1px solid var(--border)',
      padding:'3rem 2.5rem', position:'relative', overflow:'hidden',
    }}>
      {/* subtle glow */}
      <div style={{
        position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)',
        width:600, height:200,
        background:'radial-gradient(ellipse,rgba(123,104,238,0.06) 0%,transparent 70%)',
        pointerEvents:'none',
      }} />

      <div style={{ maxWidth:1140, margin:'0 auto', position:'relative',
        display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem', textAlign:'center' }}>

        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{
            width:30, height:30, borderRadius:8,
            background:'linear-gradient(135deg,var(--ai),#6a5acd)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'0.65rem', fontWeight:800, fontFamily:'var(--mono)', color:'#fff',
          }}>WF</div>
          <span style={{ fontSize:'1.05rem', fontWeight:800, letterSpacing:'-0.03em' }}>
            W<span style={{ color:'var(--ai2)' }}>F</span>reelancers
          </span>
        </div>

        <p style={{ fontSize:'0.875rem', color:'var(--muted)', maxWidth:360 }}>
          Building digital Africa, one AI product at a time.
        </p>

        <div style={{ display:'flex', gap:'2rem', flexWrap:'wrap', justifyContent:'center' }}>
          {LINKS.map(l => (
            <button key={l.label} onClick={() => scrollTo(l.href)}
              style={{
                background:'none', border:'none', color:'var(--muted)',
                fontSize:'0.825rem', cursor:'pointer', fontFamily:'var(--head)',
                transition:'color 0.2s',
              }}
              onMouseEnter={e=>e.target.style.color='var(--white2)'}
              onMouseLeave={e=>e.target.style.color='var(--muted)'}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ width:'100%', height:1, background:'var(--border)' }} />

        <p style={{ fontSize:'0.72rem', color:'var(--muted)' }}>
          © 2025 WFreelancers · Built by Ryan Ngware · Nairobi, Kenya · All rights reserved
        </p>
      </div>
    </footer>
  );
}
