/**
 * StickySection — slide in/out only, no fading.
 *
 * Architecture:
 *   z:0   — WebGL canvas (position:fixed) — always behind everything
 *   z:1+  — sticky section panels
 *
 * Each panel has a dark semi-transparent background.
 * This means:
 *   - The WebGL canvas shows through every panel (it's fixed behind all)
 *   - Each panel covers the panel below it in z-stack (no overlap bleed)
 *
 * Transition: translateY only. No opacity change. Ever.
 *   Enter: slides up from +100vh → 0
 *   Hold:  stays at 0
 *   Exit:  nudges back to -5vh as next card slides over it
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function StickySection({ children, index, scrollHeight = '120vh', id }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const y = useTransform(
    scrollYProgress,
    [0,      0.12,  0.80,  1.0],
    ['100vh', '0vh', '0vh', '-5vh']
  );

  return (
    <div ref={ref} id={id} style={{ position: 'relative', height: scrollHeight }}>
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        zIndex: index + 1,
      }}>
        <motion.div style={{
          y,
          width: '100%',
          height: '100%',
          position: 'relative',
          willChange: 'transform',
          // This background does two jobs:
          // 1. Blocks the sticky section BELOW this one (prevents overlap bleed)
          // 2. Is semi-transparent so the fixed WebGL canvas (z:0) shows through
          //    — browser composites fixed elements behind all stacking contexts
          background: 'rgba(4,4,12,0.88)',
        }}>
          {/* Readability scrim — darkens the WebGL just enough to read text */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            background: 'linear-gradient(160deg, rgba(4,4,12,0.52) 0%, rgba(4,4,12,0.38) 50%, rgba(4,4,12,0.56) 100%)',
          }} />
          {/* Section content */}
          <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
