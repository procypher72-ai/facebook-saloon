import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Scissors } from 'lucide-react';

/**
 * Subtle desktop-only floating vertical hair-strand scroll rail along the right edge.
 * A miniature golden shear glides smoothly down the wavy golden strand as you explore the site.
 */
export default function SalonScrollRail() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  // Travel vertically down the 140px strand
  const shearY = useTransform(smooth, [0, 1], [0, 134]);
  // Gentle snipping rotation oscillation as you scroll through the page
  const shearRotate = useTransform(
    smooth,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [135, 118, 142, 118, 142, 118, 142, 135]
  );
  const strandPath = useTransform(smooth, [0, 1], [0, 1]);

  if (shouldReduceMotion) return null;

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed right-4 2xl:right-6 top-1/2 z-30 hidden -translate-y-1/2 xl:flex flex-col items-center gap-2 select-none"
    >
      <span className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#B87D56]/75 [writing-mode:vertical-rl]">
        FB3
      </span>

      <div className="relative h-[160px] w-7 flex items-start justify-center">
        <svg viewBox="0 0 28 160" className="h-full w-full overflow-visible">
          {/* Muted background wavy strand */}
          <path
            d="M 14 4 C 22 32, 6 58, 14 84 C 22 110, 6 134, 14 156"
            fill="none"
            stroke="#C59B6D"
            strokeOpacity="0.26"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Illuminated golden progress strand */}
          <motion.path
            d="M 14 4 C 22 32, 6 58, 14 84 C 22 110, 6 134, 14 156"
            fill="none"
            stroke="#B87D56"
            strokeWidth="2.2"
            strokeLinecap="round"
            style={{ pathLength: strandPath }}
          />
        </svg>

        {/* Descending golden shears emblem */}
        <motion.div
          style={{ y: shearY, rotate: shearRotate }}
          className="absolute top-0 flex h-7 w-7 items-center justify-center rounded-full border border-[#C59B6D]/60 bg-[#1A1817] text-[#DFC3A0] shadow-[0_6px_18px_rgba(26,24,23,0.22)]"
        >
          <Scissors className="h-3.5 w-3.5" />
        </motion.div>
      </div>
    </aside>
  );
}
