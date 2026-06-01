/**
 * StickySection — Dala-style stacked card scroll.
 *
 * scrollHeight = '120vh' means:
 *   - first ~15vh: section enters (slides up + fades in)
 *   - middle 20vh: section is fully visible ("hold" zone)  
 *   - last ~15vh: section exits (scales back + fades out)
 *   - 0vh gap between sections — next section immediately appears
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function StickySection({ children, index, scrollHeight = '120vh', id }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.0005,
  });

  // Entrance — very fast, first 18% of scroll
  const y       = useTransform(smooth, [0, 0.18], ['5vh', '0vh']);
  const opacity = useTransform(smooth, [0, 0.15], [0, 1]);

  // Exit — starts at 72%, done by 96%
  const scale  = useTransform(smooth, [0.72, 0.96], [1,    0.94]);
  const exitY  = useTransform(smooth, [0.72, 0.96], ['0vh', '-4vh']);
  const exitOp = useTransform(smooth, [0.72, 0.96], [1,    0]);
  const blurV  = useTransform(smooth, [0.78, 0.96], [0,    5]);
  const blurS  = useTransform(blurV, v => `blur(${v}px)`);

  return (
    <div ref={containerRef} id={id} style={{ position: 'relative', height: scrollHeight }}>
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        zIndex: index + 1,
      }}>
        <motion.div style={{
          y: exitY, scale, opacity: exitOp, filter: blurS,
          width: '100%', height: '100%',
          position: 'relative', transformOrigin: 'center 30%',
        }}>
          {/* Scrim */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            background: 'linear-gradient(180deg, rgba(4,4,12,0.82) 0%, rgba(4,4,12,0.72) 50%, rgba(4,4,12,0.84) 100%)',
          }} />
          <motion.div style={{
            y, opacity,
            width: '100%', height: '100%',
            position: 'relative', zIndex: 1,
          }}>
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
