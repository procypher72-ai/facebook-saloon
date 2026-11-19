import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Subtle desktop-only champagne-gold trailing cursor ring.
 * Automatically disabled on touch devices and when prefers-reduced-motion is active.
 * Morphs cleanly into a "VIEW" or "DRAG" editorial badge over tagged elements.
 */
export default function LuxuryCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('default'); // 'default' | 'pointer' | 'view' | 'drag'

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const smoothX = useSpring(rawX, { stiffness: 320, damping: 28, mass: 0.45 });
  const smoothY = useSpring(rawY, { stiffness: 320, damping: 28, mass: 0.45 });

  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)');
    const handleChange = (e) => setEnabled(e.matches);
    finePointer.addEventListener('change', handleChange);
    return () => finePointer.removeEventListener('change', handleChange);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);

      const target = e.target;
      if (!(target instanceof Element)) {
        setMode('default');
        return;
      }

      const customCursorEl = target.closest('[data-cursor]');
      if (customCursorEl) {
        const cursorType = customCursorEl.getAttribute('data-cursor');
        if (cursorType === 'view' || cursorType === 'drag') {
          setMode(cursorType);
          return;
        }
      }

      const interactiveEl = target.closest(
        'a, button, input, select, textarea, [role="button"], [role="tab"]'
      );
      setMode(interactiveEl ? 'pointer' : 'default');
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled || shouldReduceMotion) return null;

  const isPill = mode === 'view' || mode === 'drag';
  const size = isPill ? 64 : mode === 'pointer' ? 42 : 28;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        backgroundColor: isPill
          ? 'rgba(26, 24, 23, 0.88)'
          : mode === 'pointer'
            ? 'rgba(197, 155, 109, 0.14)'
            : 'rgba(197, 155, 109, 0.04)',
        borderColor: isPill
          ? 'rgba(223, 195, 160, 0.85)'
          : mode === 'pointer'
            ? 'rgba(184, 125, 86, 0.85)'
            : 'rgba(197, 155, 109, 0.65)',
      }}
      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
      className="pointer-events-none fixed left-0 top-0 z-[60] flex items-center justify-center rounded-full border backdrop-blur-[1px]"
    >
      {isPill && (
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DFC3A0]">
          {mode === 'view' ? 'View' : 'Drag'}
        </span>
      )}
    </motion.div>
  );
}
