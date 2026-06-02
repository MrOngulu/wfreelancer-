/**
 * StickySection — clean stacked slide, no raw canvas ever visible.
 *
 * Architecture fix:
 *   - Each panel is FULLY OPAQUE (no transparency to canvas below)
 *   - WebGL canvas is still fixed at z:0 but panels at z:1+ fully cover it
 *   - HERO: visible immediately, no translateY, gentle opacity fade-in
 *   - OTHERS: start at translateY(100vh), slide to 0 as you scroll
 *   - EXIT: panel slides to translateY(-4vh) as next card covers it
 *   - The canvas shows through ONLY on the hero (isFirst) since its
 *     background is slightly transparent — all others are fully solid
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function StickySection({
  children,
  index,
  scrollHeight = '115vh',
  id,
  isFirst = false,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const y = useTransform(
    scrollYProgress,
    isFirst
      ? [0,    0.82,  1.0]
      : [0,    0.15,  0.82,  1.0],
    isFirst
      ? ['0vh','0vh', '-4vh']
      : ['100vh','0vh','0vh','-4vh']
  );

  return (
    <div ref={ref} id={id} style={{ position: 'relative', height: scrollHeight }}>
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh',
        overflow: 'hidden',
        zIndex: index + 1,
      }}>
        <motion.div
          initial={isFirst ? { opacity: 0 } : false}
          animate={isFirst ? { opacity: 1 } : undefined}
          transition={isFirst ? { duration: 0.8, ease: [0.22,1,0.36,1] } : undefined}
          style={{
            y,
            width: '100%', height: '100%',
            position: 'relative',
            willChange: 'transform',
            // Hero: slightly transparent so WebGL shows through
            // All others: fully solid — prevents ANY canvas bleed-through
            background: isFirst
              ? 'rgba(5,5,14,0.85)'
              : 'rgb(5,5,14)',
          }}
        >
          {/* Subtle inner gradient for depth */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            background: isFirst
              ? 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(123,104,238,0.06) 0%, transparent 70%)'
              : 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(123,104,238,0.04) 0%, transparent 70%)',
          }} />
          <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
