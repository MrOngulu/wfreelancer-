import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel, AnimatedHeadline, RevealText, ease } from './ui';

const SERVICES = [
  { icon:'🤖', name:'Custom AI Tools',      desc:'Bespoke AI models, chatbots, and automation built for your specific use case.', from:'From $500', color:'rgba(123,104,238,0.13)' },
  { icon:'🌐', name:'Website Development',  desc:'Responsive business sites and full web apps in Node.js, React, and modern stacks.', from:'From $299', color:'rgba(29,233,182,0.1)' },
  { icon:'📱', name:'Mobile App Dev',        desc:'Cross-platform iOS & Android apps with React Native. Firebase backend, app store ready.', from:'From $500', color:'rgba(123,104,238,0.1)' },
  { icon:'🎨', name:'UI/UX Design',          desc:'Figma wireframes, prototypes, and design systems with user testing included.', from:'From $350', color:'rgba(255,160,64,0.1)' },
  { icon:'⚡', name:'SaaS Web Apps',         desc:'Subscription platforms with auth, billing, admin dashboards, and REST APIs.', from:'From $800', color:'rgba(123,104,238,0.13)' },
  { icon:'🔗', name:'API & Integrations',    desc:'M-Pesa STK Push, PayPal, Stripe, WhatsApp Business, and custom webhook integration.', from:'From $250', color:'rgba(29,233,182,0.08)' },
];

const TESTIMONIALS = [
  { stars:5, text:'The trading bot has been running 3 months straight. Consistent results, easy risk settings, Telegram alerts are perfect. Best $299 I spent.',
    name:'David Kimani', role:'Forex trader · Nairobi', initials:'DK' },
  { stars:5, text:'Deployed the AI Assistant on our site and support tickets dropped 60%. Handles returns, shipping, everything. Genuinely impressed.',
    name:'Amina Mwangi', role:'Founder, Duka Online · Nairobi', initials:'AM' },
  { stars:5, text:'Bought the React Native starter and saved 3 weeks of setup. Clean code, well documented. M-Pesa support built in — huge plus.',
    name:'Kwame Osei', role:'Mobile developer · Accra', initials:'KO' },
];

const STEPS = [
  { num:'01', title:'Pick or describe', desc:'Buy a ready-made product or describe your custom project. No fluff, just results.' },
  { num:'02', title:'Pay securely',      desc:'M-Pesa STK Push, PayPal, or bank transfer — whatever works for you.' },
  { num:'03', title:'Receive delivery', desc:'Instant download for templates. Custom work delivered in agreed sprints.' },
  { num:'04', title:'Support included', desc:'All products: 30 days support. Custom projects: 60 days free.' },
];

// ─── Services ─────────────────────────────────────────────────────────────────
export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} id="services" style={{
      width:'100%', height:'100%',
      display:'flex', alignItems:'center',
      background:'rgb(5,5,14)',
      padding:'0 2.5rem', overflow:'hidden',
    }}>
      <div style={{ maxWidth:1140, margin:'0 auto', width:'100%' }}>
        <motion.div initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,ease}}>
          <SectionLabel>Custom development</SectionLabel>
        </motion.div>

        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between',
          marginBottom:'3rem', flexWrap:'wrap', gap:'1.5rem' }}>
          <AnimatedHeadline
            style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:900,
              letterSpacing:'-0.05em', lineHeight:0.95, margin:0, maxWidth:520 }}
            delay={0.1}
          >Need something built?</AnimatedHeadline>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.3,duration:0.7}}
            style={{ color:'var(--muted2)', fontSize:'0.95rem', maxWidth:320, lineHeight:1.85, fontWeight:400 }}>
            Don't see it in the store? We build bespoke software, apps, and AI tools from scratch.
          </motion.p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',
          gap:1, background:'var(--border)', borderRadius:22, overflow:'hidden' }}>
          {SERVICES.map((s,i) => (
            <motion.div key={s.name}
              initial={{opacity:0}} whileInView={{opacity:1}}
              viewport={{once:true,margin:'-40px'}}
              transition={{duration:0.6,ease,delay:i*0.06}}
              whileHover={{ background:s.color }}
              style={{ background:'rgba(8,8,20,0.94)', padding:'2rem 1.75rem',
                transition:'background 0.4s', position:'relative', cursor:'pointer' }}
            >
              <div style={{ width:46, height:46, borderRadius:14, background:s.color,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.25rem', marginBottom:'1.1rem' }}>{s.icon}</div>
              <h3 style={{ fontSize:'1rem', fontWeight:800, letterSpacing:'-0.022em', marginBottom:'0.5rem' }}>{s.name}</h3>
              <p style={{ fontSize:'0.82rem', color:'var(--muted2)', lineHeight:1.75, fontWeight:400, marginBottom:'0.875rem' }}>{s.desc}</p>
              <span style={{ fontSize:'0.72rem', fontFamily:'var(--mono)', color:'var(--ai2)', fontWeight:600 }}>{s.from}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} id="reviews" style={{
      width:'100%', height:'100%',
      display:'flex', alignItems:'center',
      background:'rgb(5,5,14)',
      padding:'0 2.5rem', overflow:'hidden',
    }}>
      <div style={{ maxWidth:1140, margin:'0 auto', width:'100%' }}>
        <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
          <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,ease}}>
            <SectionLabel center>Client reviews</SectionLabel>
          </motion.div>
          <AnimatedHeadline
            style={{ fontSize:'clamp(2.2rem,5vw,3.8rem)', fontWeight:900,
              letterSpacing:'-0.05em', lineHeight:1.0, textAlign:'center', marginBottom:'1rem' }}
            delay={0.1}
          >Trusted across Africa</AnimatedHeadline>
          <motion.p initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.25,duration:0.7}}
            style={{ color:'var(--muted2)', fontSize:'1rem', maxWidth:440, lineHeight:1.85,
              fontWeight:400, textAlign:'center', margin:'0 auto' }}>
            Real feedback from traders, startups, and businesses using WFreelancers products.
          </motion.p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.25rem' }}>
          {TESTIMONIALS.map((t,i) => (
            <motion.div key={i}
              initial={{opacity:0,y:40}}
              animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:0.75,ease,delay:i*0.1}}
              whileHover={{ y:-6, borderColor:'rgba(123,104,238,0.3)',
                boxShadow:'0 32px 80px rgba(0,0,0,0.4)' }}
              style={{ background:'rgba(10,10,22,0.92)', border:'1px solid var(--border)',
                borderRadius:24, padding:'2rem', position:'relative', overflow:'hidden',
                transition:'border-color 0.3s, box-shadow 0.4s, transform 0.4s' }}
            >
              <div style={{ position:'absolute', top:0, left:'20%', right:'20%', height:1,
                background:'linear-gradient(90deg,transparent,rgba(123,104,238,0.5),transparent)' }} />
              <div style={{ color:'var(--amber)', fontSize:'0.9rem', letterSpacing:3, marginBottom:'1.25rem' }}>
                {'★'.repeat(t.stars)}
              </div>
              <p style={{ fontSize:'0.95rem', color:'var(--white2)', lineHeight:1.85,
                fontWeight:400, marginBottom:'1.75rem', fontStyle:'italic' }}>"{t.text}"</p>
              <div style={{ display:'flex', alignItems:'center', gap:'0.875rem' }}>
                <div style={{ width:40, height:40, borderRadius:'50%',
                  background:'linear-gradient(135deg,var(--ai),#6a5acd)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'0.72rem', fontWeight:800, color:'#fff', flexShrink:0 }}>{t.initials}</div>
                <div>
                  <p style={{ fontSize:'0.875rem', fontWeight:700, marginBottom:2 }}>{t.name}</p>
                  <p style={{ fontSize:'0.72rem', color:'var(--muted)' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
export function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} id="process" style={{
      width:'100%', height:'100%',
      display:'flex', alignItems:'center',
      background:'rgb(5,5,14)',
      padding:'0 2.5rem', overflow:'hidden',
    }}>
      <div style={{ maxWidth:1140, margin:'0 auto', width:'100%' }}>
        <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
          <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,ease}}>
            <SectionLabel center>How it works</SectionLabel>
          </motion.div>
          <AnimatedHeadline
            style={{ fontSize:'clamp(2.2rem,5vw,3.8rem)', fontWeight:900,
              letterSpacing:'-0.05em', lineHeight:1.0, textAlign:'center' }}
            delay={0.1}
          >Simple process, real results</AnimatedHeadline>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',
          gap:1, background:'var(--border)', borderRadius:22, overflow:'hidden' }}>
          {STEPS.map((s,i) => (
            <motion.div key={s.num}
              initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}}
              transition={{duration:0.6,ease,delay:i*0.09}}
              whileHover={{ background:'rgba(123,104,238,0.06)' }}
              style={{ background:'rgba(8,8,20,0.95)', padding:'2.5rem 2rem',
                position:'relative', transition:'background 0.3s' }}
            >
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3,
                background:i===0?'linear-gradient(90deg,var(--ai),transparent)':'transparent' }} />
              <div style={{ fontSize:'3.5rem', fontWeight:900, fontFamily:'var(--mono)',
                color:'rgba(123,104,238,0.1)', letterSpacing:'-0.05em', lineHeight:1,
                marginBottom:'1rem', userSelect:'none' }}>{s.num}</div>
              <h3 style={{ fontSize:'1.05rem', fontWeight:800, letterSpacing:'-0.025em', marginBottom:'0.6rem' }}>{s.title}</h3>
              <p style={{ fontSize:'0.84rem', color:'var(--muted2)', lineHeight:1.75, fontWeight:400 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
