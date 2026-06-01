import { useRef } from 'react';

export default function StickySection({ children, index, scrollHeight = '120vh', id }) {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} id={id} style={{ position: 'relative', height: scrollHeight }}>
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        zIndex: index + 1,
      }}>
        {/* Scrim */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(4,4,12,0.82) 0%, rgba(4,4,12,0.72) 50%, rgba(4,4,12,0.84) 100%)',
        }} />
        <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
