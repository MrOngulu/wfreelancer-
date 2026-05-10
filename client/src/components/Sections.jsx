import { motion } from 'framer-motion';
import { SectionLabel, SectionTitle, fadeUp, staggerContainer } from './ui';

const SERVICES = [
  { icon:'🤖', name:'Custom AI Tools', desc:'Bespoke AI models, chatbots, and automation built for your specific use case and industry.', from:'From $500' },
  { icon:'🌐', name:'Website Development', desc:'Responsive business sites, landing pages, and full web apps in Node.js, React, and modern stacks.', from:'From $299' },
  { icon:'📱', name:'Mobile App Dev', desc:'Cross-platform iOS & Android apps with React Native or Flutter. Firebase backend, app store ready.', from:'From $500' },
  { icon:'🎨', name:'UI/UX Design', desc:'Figma wireframes, prototypes, and complete design systems with user testing included.', from:'From $350' },
  { icon:'⚡', name:'SaaS Web Apps', desc:'Subscription platforms with auth, billing, admin dashboards, and REST APIs — production-ready.', from:'From $800' },
  { icon:'🔗', name:'API & Integrations', desc:'M-Pesa STK Push, PayPal, Stripe, WhatsApp Business, and any custom REST or webhook integration.', from:'From $250' },
];

const TESTIMONIALS = [
  { stars:5, text:'The trading bot has been running for 3 months straight. Consistent results, easy to configure risk settings, and Telegram alerts are perfect. Best $299 I spent.', name:'David Kimani', role:'Forex trader · Nairobi' },
  { stars:5, text:'Deployed the AI Assistant on our site and our support ticket volume dropped by 60%. It handles returns, shipping, everything. Genuinely impressed.', name:'Amina Mwangi', role:'Founder, Duka Online · Nairobi' },
  { stars:5, text:'Bought the React Native starter kit and saved 3 weeks of setup time. Clean code, well documented. M-Pesa support built in — huge plus for us.', name:'Kwame Osei', role:'Mobile developer · Accra' },
];

const STEPS = [
  { num:'01', title:'Pick or describe', desc:'Buy a ready-made product or fill out the form describing your custom project.' },
  { num:'02', title:'Pay securely', desc:'M-Pesa STK Push, PayPal, or bank transfer — whatever works for you.' },
  { num:'03', title:'Receive delivery', desc:'Instant download for templates. Custom work delivered in agreed sprints.' },
  { num:'04', title:'Support included', desc:'All products get 30 days support. Custom projects get 60 days free.' },
];

export function Services() {
  return (
    <section id="services" style={{ padding:'6rem 2.5rem', background:'var(--bg)' }}>
      <div style={{ maxWidth:1140, margin:'0 auto' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-80px' }} variants={staggerContainer}>
          <motion.div variants={fadeUp}>
            <SectionLabel>Custom development</SectionLabel>
            <SectionTitle>Need something built?</SectionTitle>
            <p style={{ color:'var(--muted2)', fontSize:'1rem', maxWidth:480, marginBottom:'3rem', lineHeight:1.7 }}>
              Don't see what you need in the store? We build bespoke software, apps, and AI tools from scratch.
            </p>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))', gap:'1rem' }}>
            {SERVICES.map(s => (
              <motion.div
                key={s.name}
                variants={fadeUp}
                whileHover={{ y:-4, borderColor:'rgba(123,104,238,0.3)', background:'rgba(123,104,238,0.04)' }}
                style={{
                  background:'rgba(255,255,255,0.02)', border:'1px solid var(--border)',
                  borderRadius:20, padding:'1.75rem', transition:'all 0.3s', position:'relative', overflow:'hidden',
                }}
              >
                <div style={{
                  width:48, height:48, borderRadius:14,
                  background:'rgba(123,104,238,0.1)', border:'1px solid rgba(123,104,238,0.2)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'1.35rem', marginBottom:'1.1rem',
                }} >{s.icon}</div>
                <h3 style={{ fontSize:'1rem', fontWeight:800, letterSpacing:'-0.02em', marginBottom:'0.45rem' }}>{s.name}</h3>
                <p style={{ fontSize:'0.83rem', color:'var(--muted2)', lineHeight:1.65, marginBottom:'0.875rem' }}>{s.desc}</p>
                <span style={{ fontSize:'0.75rem', fontFamily:'var(--mono)', color:'var(--ai2)', fontWeight:600 }}>{s.from}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <style>{`@media(max-width:600px){ #services { padding:4rem 1.25rem !important; } }`}</style>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" style={{ padding:'6rem 2.5rem', background:'var(--bg2)' }}>
      <div style={{ maxWidth:1140, margin:'0 auto' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-80px' }} variants={staggerContainer}>
          <motion.div variants={fadeUp}>
            <SectionLabel>Client reviews</SectionLabel>
            <SectionTitle>Trusted across Africa</SectionTitle>
            <p style={{ color:'var(--muted2)', fontSize:'1rem', maxWidth:460, marginBottom:'3rem', lineHeight:1.7 }}>
              Real feedback from startups, traders, and businesses who use WFreelancers products.
            </p>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'1.25rem' }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y:-4, borderColor:'rgba(123,104,238,0.25)' }}
                style={{
                  background:'rgba(255,255,255,0.02)', border:'1px solid var(--border)',
                  borderRadius:20, padding:'1.75rem', transition:'border-color 0.3s',
                  position:'relative', overflow:'hidden',
                }}
              >
                {/* subtle top glow line */}
                <div style={{ position:'absolute', top:0, left:'20%', right:'20%', height:1,
                  background:'linear-gradient(90deg,transparent,rgba(123,104,238,0.4),transparent)' }} />
                <div style={{ color:'var(--amber)', fontSize:'0.875rem', letterSpacing:3, marginBottom:'1rem' }}>
                  {'★'.repeat(t.stars)}
                </div>
                <p style={{ fontSize:'0.9rem', color:'var(--muted2)', lineHeight:1.75, marginBottom:'1.5rem', fontStyle:'italic' }}>
                  "{t.text}"
                </p>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                  <div style={{
                    width:38, height:38, borderRadius:'50%',
                    background:'rgba(123,104,238,0.15)', border:'1px solid rgba(123,104,238,0.2)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'0.75rem', fontWeight:800, color:'var(--ai3)',
                  }}>
                    {t.name.split(' ').map(w=>w[0]).join('')}
                  </div>
                  <div>
                    <p style={{ fontSize:'0.875rem', fontWeight:700 }}>{t.name}</p>
                    <p style={{ fontSize:'0.72rem', color:'var(--muted)' }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section style={{ padding:'5rem 2.5rem', background:'var(--bg3)' }}>
      <div style={{ maxWidth:1140, margin:'0 auto' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-80px' }} variants={staggerContainer}>
          <motion.div variants={fadeUp} style={{ textAlign:'center', marginBottom:'3rem' }}>
            <SectionLabel>How it works</SectionLabel>
            <SectionTitle>Simple process, real results</SectionTitle>
          </motion.div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1px', background:'var(--border)', borderRadius:20, overflow:'hidden' }}>
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                whileHover={{ background:'rgba(123,104,238,0.06)' }}
                style={{ background:'var(--bg3)', padding:'2rem 1.75rem', position:'relative', transition:'background 0.3s' }}
              >
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
                  background: i === 0 ? 'linear-gradient(90deg,var(--ai),transparent)' : 'transparent' }} />
                <p style={{ fontSize:'0.68rem', fontFamily:'var(--mono)', color:'var(--ai2)', fontWeight:700,
                  letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'0.875rem' }}>{s.num}</p>
                <h3 style={{ fontSize:'1rem', fontWeight:800, letterSpacing:'-0.02em', marginBottom:'0.5rem' }}>{s.title}</h3>
                <p style={{ fontSize:'0.83rem', color:'var(--muted2)', lineHeight:1.65 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
