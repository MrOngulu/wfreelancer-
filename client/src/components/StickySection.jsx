/**
 * StickySection — wraps any section in the Dala stacked-card scroll mechanic.
 *
 * Usage:
 *   <StickySection index={2} total={8}>
 *     <YourSection />
 *   </StickySection>
 *
 * Each section:
 *  - Has a tall scroll container (2 × 100vh)
 *  - Inner content is sticky (top:0, 100vh)
 *  - As next section scrolls up, this one scales down + fades (card stacking)
 *  - Entrance: slides up from y:60, opacity 0→1
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function StickySection({
  children,
  index,
  total,
  scrollHeight = '180vh',  // how much scroll travel this section gets
  id,
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring-smooth the raw progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  // Entrance: first 30% of scroll through this section
  const y       = useTransform(smoothProgress, [0, 0.28], ['6vh', '0vh']);
  const opacity = useTransform(smoothProgress, [0, 0.22], [0, 1]);

  // Exit (card-stack): last 40% of scroll — scale down + push back
  const scale   = useTransform(smoothProgress, [0.55, 1], [1, 0.93]);
  const exitY   = useTransform(smoothProgress, [0.55, 1], ['0vh', '-5vh']);
  const exitOp  = useTransform(smoothProgress, [0.60, 0.92], [1, 0]);
  const blur    = useTransform(smoothProgress, [0.65, 1], [0, 6]);
  const blurStr = useTransform(blur, v => `blur(${v}px)`);

  return (
    <div
      ref={containerRef}
      id={id}
      style={{
        position: 'relative',
        height: scrollHeight,
        // The first section (Hero) is taller
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Stacking order so new sections slide over old
          zIndex: index + 1,
        }}
      >
        <motion.div
          style={{
            y: exitY,
            scale,
            opacity: exitOp,
            filter: blurStr,
            width: '100%',
            height: '100%',
            position: 'relative',
            transformOrigin: 'center top',
          }}
        >
          {/* Dark scrim — sits between WebGL canvas and content */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(rgba(4,4,10,0.78) 0%, rgba(4,4,10,0.70) 40%, rgba(4,4,10,0.80) 100%)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />
          <motion.div
            style={{
              y,
              opacity,
              width: '100%',
              height: '100%',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
