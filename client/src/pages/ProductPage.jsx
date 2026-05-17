import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { getProduct } from '../data/productsData';
import { SectionLabel, Badge, BtnPrimary, BtnGhost, fadeUp, staggerContainer } from '../components/ui';
import BuyModal from '../components/BuyModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function FeatureCheck({ text }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
      <div style={{
        width:20, height:20, borderRadius:6, flexShrink:0, marginTop:2,
        background:'rgba(29,233,182,0.1)', border:'1px solid rgba(29,233,182,0.2)',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'0.6rem', color:'var(--green)', fontWeight:900,
      }}>✓</div>
      <span style={{ fontSize:'0.875rem', color:'var(--muted2)', lineHeight:1.65 }}>{text}</span>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        border:'1px solid var(--border)', borderRadius:14, overflow:'hidden',
        transition:'border-color 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'1.1rem 1.25rem', background:'rgba(255,255,255,0.02)',
          border:'none', cursor:'pointer', textAlign:'left', gap:16,
          fontFamily:'var(--head)',
        }}
      >
        <span style={{ fontSize:'0.9rem', fontWeight:700, color:'var(--white)', lineHeight:1.4 }}>{q}</span>
        <span style={{
          fontSize:'1.1rem', color:'var(--muted)', transition:'transform 0.25s', flexShrink:0,
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>+</span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity:0, height:0 }}
          animate={{ opacity:1, height:'auto' }}
          style={{ padding:'0 1.25rem 1.1rem', fontSize:'0.875rem', color:'var(--muted2)', lineHeight:1.75 }}
        >
          {a}
        </motion.div>
      )}
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProduct(slug);
  const [modal, setModal] = useState(false);

  // 404 state
  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{
          minHeight:'80vh', display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center',
          gap:'1.5rem', padding:'2rem', textAlign:'center',
        }}>
          <p style={{ fontSize:'3rem' }}>🔍</p>
          <h1 style={{ fontSize:'1.5rem', fontWeight:800 }}>Product not found</h1>
          <p style={{ color:'var(--muted2)' }}>That product doesn't exist or the link may be wrong.</p>
          <BtnPrimary onClick={() => navigate('/')}>← Back to store</BtnPrimary>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        padding:'8rem 2.5rem 5rem', background:'var(--bg)',
        position:'relative', overflow:'hidden',
      }}>
        {/* Grid background */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
          backgroundSize:'72px 72px',
          maskImage:'radial-gradient(ellipse 80% 60% at 50% 0%,black,transparent)',
        }} />
        {/* Glow */}
        <div style={{
          position:'absolute', top:'20%', left:'50%', transform:'translateX(-50%)',
          width:700, height:400, borderRadius:'50%',
          background:'radial-gradient(ellipse,rgba(123,104,238,0.08) 0%,transparent 65%)',
          pointerEvents:'none',
        }} />

        <div style={{ maxWidth:860, margin:'0 auto', position:'relative' }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">

            {/* Breadcrumb + badge */}
            <motion.div variants={fadeUp} style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'2rem', flexWrap:'wrap' }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  background:'rgba(255,255,255,0.04)', border:'1px solid var(--border2)',
                  color:'var(--muted2)', padding:'0.35rem 0.9rem', borderRadius:8,
                  fontSize:'0.78rem', cursor:'pointer', transition:'all 0.2s',
                  fontFamily:'var(--head)', display:'flex', alignItems:'center', gap:6,
                }}
                onMouseEnter={e => { e.currentTarget.style.color='var(--white)'; e.currentTarget.style.borderColor='var(--border3)'; }}
                onMouseLeave={e => { e.currentTarget.style.color='var(--muted2)'; e.currentTarget.style.borderColor='var(--border2)'; }}
              >
                ← All products
              </button>
              <Badge variant={product.badgeVariant}>{product.badge}</Badge>
            </motion.div>

            <motion.div variants={fadeUp} style={{ fontSize:'3.5rem', marginBottom:'1rem' }}>
              {product.emoji}
            </motion.div>

            <motion.h1 variants={fadeUp} style={{
              fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:900,
              letterSpacing:'-0.04em', lineHeight:1.05, marginBottom:'1rem',
            }}>
              {product.name}
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontSize:'1.1rem', color:'var(--muted2)', maxWidth:560, lineHeight:1.7, marginBottom:'2.5rem',
            }}>
              {product.tagline}
            </motion.p>

            <motion.div variants={fadeUp} style={{ display:'flex', alignItems:'center', gap:'1.5rem', flexWrap:'wrap' }}>
              <div>
                <span style={{
                  fontSize:'2.5rem', fontWeight:900, fontFamily:'var(--mono)',
                  color:product.accentColor, letterSpacing:'-0.04em',
                }}>${product.price}</span>
                <span style={{ fontSize:'0.8rem', color:'var(--muted)', marginLeft:6 }}>one-time</span>
              </div>
              <BtnPrimary onClick={() => setModal(true)}>Buy now →</BtnPrimary>
              <BtnGhost onClick={() => navigate('/#contact')}>Ask a question</BtnGhost>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ── WHAT IT IS ── */}
      <section style={{ padding:'5rem 2.5rem', background:'var(--bg2)', borderTop:'1px solid var(--border)' }}>
        <div style={{ maxWidth:860, margin:'0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-60px' }} variants={staggerContainer}>
            <motion.div variants={fadeUp}>
              <SectionLabel>What it is</SectionLabel>
              <p style={{
                fontSize:'1.05rem', color:'var(--muted2)', lineHeight:1.85,
                whiteSpace:'pre-line', maxWidth:700,
              }}>
                {product.intro}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding:'5rem 2.5rem', background:'var(--bg)' }}>
        <div style={{ maxWidth:860, margin:'0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-60px' }} variants={staggerContainer}>
            <motion.div variants={fadeUp}>
              <SectionLabel>How it works</SectionLabel>
              <h2 style={{ fontSize:'clamp(1.6rem,3vw,2.25rem)', fontWeight:800, letterSpacing:'-0.04em', marginBottom:'2.5rem' }}>
                Step by step
              </h2>
            </motion.div>

            <div style={{ display:'flex', flexDirection:'column', position:'relative' }}>
              {/* Vertical connector line */}
              <div style={{
                position:'absolute', left:19, top:20, bottom:20, width:1,
                background:'linear-gradient(to bottom,rgba(123,104,238,0.5),transparent)',
                pointerEvents:'none',
              }} />

              {product.howItWorks.map(step => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  style={{ display:'flex', gap:'1.5rem', paddingBottom:'2rem', position:'relative' }}
                >
                  <div style={{
                    width:40, height:40, borderRadius:'50%', flexShrink:0,
                    background:'rgba(123,104,238,0.12)', border:'1px solid rgba(123,104,238,0.3)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'0.65rem', fontFamily:'var(--mono)', fontWeight:700,
                    color:'var(--ai2)', zIndex:1,
                  }}>
                    {step.step}
                  </div>
                  <div style={{ paddingTop:8 }}>
                    <h3 style={{ fontSize:'1rem', fontWeight:800, letterSpacing:'-0.02em', marginBottom:'0.4rem' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize:'0.875rem', color:'var(--muted2)', lineHeight:1.7, maxWidth:600 }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES + SPECS ── */}
      <section style={{ padding:'5rem 2.5rem', background:'var(--bg2)' }}>
        <div style={{ maxWidth:860, margin:'0 auto' }}>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-60px' }}
            variants={staggerContainer}
            className="pp-feat-specs"
          >
            {/* Features */}
            <motion.div variants={fadeUp}>
              <SectionLabel>Features</SectionLabel>
              <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,1.9rem)', fontWeight:800, letterSpacing:'-0.04em', marginBottom:'1.5rem' }}>
                Everything included
              </h2>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {product.features.map(f => <FeatureCheck key={f} text={f} />)}
              </div>
            </motion.div>

            {/* Specs */}
            <motion.div variants={fadeUp}>
              <SectionLabel>Specs</SectionLabel>
              <h2 style={{ fontSize:'clamp(1.4rem,2.5vw,1.9rem)', fontWeight:800, letterSpacing:'-0.04em', marginBottom:'1.5rem' }}>
                Technical details
              </h2>
              <div style={{
                background:'rgba(255,255,255,0.02)', border:'1px solid var(--border)',
                borderRadius:16, overflow:'hidden',
              }}>
                {product.specs.map(([label, value], i) => (
                  <div key={label} style={{
                    display:'flex', justifyContent:'space-between', alignItems:'center',
                    padding:'0.875rem 1.25rem', gap:'1rem',
                    borderBottom: i < product.specs.length - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <span style={{ fontSize:'0.75rem', color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em' }}>
                      {label}
                    </span>
                    <span style={{ fontSize:'0.875rem', fontWeight:600, color:'var(--white2)', textAlign:'right' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {product.faq?.length > 0 && (
        <section style={{ padding:'5rem 2.5rem', background:'var(--bg)' }}>
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
      <section style={{
        padding:'5rem 2.5rem', background:'var(--bg2)',
        borderTop:'1px solid var(--border)', textAlign:'center',
      }}>
        <div style={{ maxWidth:520, margin:'0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={staggerContainer}>
            <motion.div variants={fadeUp} style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>{product.emoji}</motion.div>
            <motion.h2 variants={fadeUp} style={{
              fontSize:'clamp(1.6rem,3vw,2.25rem)', fontWeight:900,
              letterSpacing:'-0.04em', marginBottom:'0.75rem',
            }}>
              Ready to get started?
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color:'var(--muted2)', marginBottom:'2rem', lineHeight:1.7 }}>
              One-time payment. Yours to keep. 30 days support included.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap' }}>
              <BtnPrimary onClick={() => setModal(true)}>
                Buy {product.name} — ${product.price} →
              </BtnPrimary>
              <BtnGhost onClick={() => navigate('/')}>
                Browse other products
              </BtnGhost>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {modal && (
        <BuyModal
          product={product.name}
          desc={product.productDesc}
          price={product.price}
          onClose={() => setModal(false)}
        />
      )}

      <style>{`
        .pp-feat-specs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        @media(max-width:700px) {
          .pp-feat-specs {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          section {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
        }
      `}</style>
    </>
  );
}
