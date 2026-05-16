import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { key:'mpesa', label:'📲 M-Pesa' },
  { key:'paypal', label:'🅿️ PayPal' },
  { key:'bank', label:'🏦 Bank' },
];

export default function BuyModal({ product, price, desc, onClose }) {
  const [tab, setTab] = useState('mpesa');
  const [phone, setPhone] = useState('');
  const [done, setDone] = useState('');

  const doMpesa = () => {
    if (!phone.trim()) { alert('Enter your M-Pesa number'); return; }
    fetch('https://wfreelancer.onrender.com/mpesa-pay', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ phone, amount:price, product }),
    }).catch(() => {});
    setDone('📲 STK Push sent to ' + phone + '! Check your phone to complete payment.');
  };

  const doPaypal = () => {
    window.location.href = `https://wfreelancer.onrender.com/pay?product=${encodeURIComponent(product)}&amount=${price}`; 
  };

  const inputStyle = {
    background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.13)',
    color:'var(--white)', padding:'0.7rem 1rem', borderRadius:10,
    fontSize:'0.875rem', width:'100%', outline:'none',
    fontFamily:'var(--head)',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        exit={{ opacity:0 }}
        onClick={e => { if(e.target === e.currentTarget) onClose(); }}
        style={{
          position:'fixed', inset:0, zIndex:500,
          background:'rgba(0,0,0,0.88)', backdropFilter:'blur(8px)',
          display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem',
        }}
      >
        <motion.div
          initial={{ opacity:0, scale:0.94, y:20 }}
          animate={{ opacity:1, scale:1, y:0 }}
          exit={{ opacity:0, scale:0.94, y:20 }}
          transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
          style={{
            background:'linear-gradient(160deg,rgba(30,30,50,0.98),rgba(15,15,25,0.98))',
            border:'1px solid rgba(123,104,238,0.25)',
            borderRadius:24, padding:'2rem', maxWidth:460, width:'100%',
            position:'relative', boxShadow:'0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(123,104,238,0.1)',
          }}
        >
          {/* Close */}
          <button onClick={onClose} style={{
            position:'absolute', top:'1rem', right:'1rem',
            background:'rgba(255,255,255,0.07)', border:'1px solid var(--border)',
            borderRadius:'50%', width:30, height:30, color:'var(--muted2)',
            display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
            fontSize:'0.9rem', transition:'all 0.2s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.color='var(--white)';e.currentTarget.style.background='rgba(255,255,255,0.12)';}}
          onMouseLeave={e=>{e.currentTarget.style.color='var(--muted2)';e.currentTarget.style.background='rgba(255,255,255,0.07)';}}
          >✕</button>

          <h3 style={{ fontSize:'1.25rem', fontWeight:900, letterSpacing:'-0.03em', marginBottom:'0.25rem' }}>{product}</h3>
          <p style={{ fontSize:'0.82rem', color:'var(--muted2)', marginBottom:'0.875rem', lineHeight:1.6 }}>{desc}</p>
          <p style={{ fontSize:'2rem', fontWeight:900, fontFamily:'var(--mono)',
            background:'linear-gradient(135deg,var(--ai2),var(--ai3))',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            marginBottom:'1.5rem', letterSpacing:'-0.04em' }}>
            ${price}
          </p>

          {/* Payment tabs */}
          <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.5rem' }}>
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setDone(''); }}
                style={{
                  flex:1, padding:'0.55rem', borderRadius:10, fontSize:'0.8rem', fontWeight:700,
                  border: tab === t.key ? '1px solid var(--ai)' : '1px solid var(--border2)',
                  background: tab === t.key ? 'var(--ai)' : 'rgba(255,255,255,0.04)',
                  color: tab === t.key ? '#fff' : 'var(--muted2)',
                  cursor:'pointer', transition:'all 0.2s',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Panels */}
          {!done ? (
            <>
              {tab === 'mpesa' && (
                <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                    <label style={{ fontSize:'0.7rem', fontFamily:'var(--mono)', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.07em' }}>M-Pesa phone</label>
                    <input type="tel" placeholder="0712 345 678" value={phone} onChange={e=>setPhone(e.target.value)} style={inputStyle} />
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}} onClick={doMpesa}
                    style={{ background:'linear-gradient(135deg,var(--ai),#6a5acd)', color:'#fff', border:'none',
                      padding:'0.875rem', borderRadius:12, fontSize:'0.95rem', fontWeight:800,
                      cursor:'pointer', boxShadow:'0 0 24px var(--ai-glow)' }}>
                    Send STK Push →
                  </motion.button>
                </div>
              )}
              {tab === 'paypal' && (
                <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                  <p style={{ fontSize:'0.875rem', color:'var(--muted2)', lineHeight:1.65 }}>
                    You'll be redirected to PayPal to complete your payment securely. Your download link is sent by email once confirmed.
                  </p>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}} onClick={doPaypal}
                    style={{ background:'#0070ba', color:'#fff', border:'none',
                      padding:'0.875rem', borderRadius:12, fontSize:'0.95rem', fontWeight:800, cursor:'pointer' }}>
                    Continue to PayPal →
                  </motion.button>
                </div>
              )}
              {tab === 'bank' && (
                <div style={{
                  background:'rgba(0,0,0,0.4)', border:'1px solid var(--border)',
                  borderRadius:12, padding:'1.25rem', fontSize:'0.85rem', color:'var(--muted2)', lineHeight:2,
                }}>
                  <strong style={{ color:'var(--white)' }}>Equity Bank Kenya</strong><br/>
                  Account: <strong style={{ color:'var(--white)' }}>WFreelancers</strong><br/>
                  Acc no: <strong style={{ color:'var(--white)' }}>1234567890</strong><br/>
                  SWIFT: <strong style={{ color:'var(--white)' }}>EQBLKENA</strong><br/>
                  <br/>
                  Email receipt to: <strong style={{ color:'var(--ai3)' }}>wfreelancers1@gmail.com</strong><br/>
                  Delivery within 2 hours of confirmation.
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
              style={{
                background:'rgba(29,233,182,0.08)', border:'1px solid rgba(29,233,182,0.25)',
                color:'var(--green)', borderRadius:12, padding:'1rem', fontSize:'0.875rem', lineHeight:1.6,
              }}
            >
              {done}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
