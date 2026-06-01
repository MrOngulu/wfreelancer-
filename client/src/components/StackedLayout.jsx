import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * StackedSection — Dala-style stacked card scroll effect
 *
 * Each section is wrapped in a tall scroll container.
 * The card sticks to the top while you scroll through it,
 * then the NEXT card slides up beneath it as it scales down slightly.
 *
 * Usage:
 *   <StackedSection index={0} total={8}>
 *     <YourSection />
 *   </StackedSection>
 */
export function StackedSection({ children, index, total, minH = '100vh' }) {
  const ref = useRef(null);

  // Each section is 200vh tall — 100vh of content + 100vh of scroll travel
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // As you scroll out: scale card down very slightly + fade slightly
  const scale = useTransform(scrollYProgress, [0.6, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0.3]);
  const y = useTransform(scrollYProgress, [0.6, 1], ['0%', '-4%']);

  // First section doesn't need the scroll container height — it's the hero
  const isFirst = index === 0;

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height: isFirst ? 'auto' : '200vh',
        // Prevents gaps — cards stack flush
        marginBottom: isFirst ? 0 : '-1px',
      }}
    >
      <motion.div
        style={{
          position: isFirst ? 'relative' : 'sticky',
          top: 0,
          minHeight: minH,
          scale,
          opacity,
          y,
          transformOrigin: 'top center',
          // Layer order so later cards stack on top
          zIndex: index + 1,
          // Round top corners on all but first
          borderRadius: isFirst ? 0 : '28px 28px 0 0',
          overflow: 'hidden',
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default StackedSection;
