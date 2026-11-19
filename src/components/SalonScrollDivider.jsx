import { useId, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Scroll-scrubbed hair-salon divider:
 * As the user scrolls past, golden hairdressing shears glide smoothly along a silky
 * hair strand, opening & closing in sync with scroll progress while illuminating a
 * radiant champagne-gold trail and twinkling 4-point sparkles.
 */
export default function SalonScrollDivider({
  label = 'THE CRAFT',
  reverse = false,
  bgClass = 'bg-[#FAF8F5]',
}) {
  const ref = useRef(null);
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'end 18%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.001,
  });

  // Shears travel across the 1200-wide SVG viewBox
  const shearX = useTransform(
    smoothProgress,
    [0.05, 0.95],
    reverse ? [1120, 80] : [80, 1120]
  );

  // Subtle organic wave following the hair curve
  const shearY = useTransform(
    smoothProgress,
    [0.05, 0.28, 0.5, 0.72, 0.95],
    [42, 26, 44, 28, 40]
  );

  // Rhythmic blade snipping tied directly to scroll!
  const upperBladeRotate = useTransform(
    smoothProgress,
    [0.05, 0.16, 0.27, 0.38, 0.49, 0.6, 0.71, 0.82, 0.95],
    [0, -24, 2, -24, 2, -24, 2, -22, 0]
  );
  const lowerBladeRotate = useTransform(
    smoothProgress,
    [0.05, 0.16, 0.27, 0.38, 0.49, 0.6, 0.71, 0.82, 0.95],
    [0, 22, -2, 22, -2, 22, -2, 20, 0]
  );

  const strandLength = useTransform(smoothProgress, [0.05, 0.95], [0, 1]);
  const labelOpacity = useTransform(smoothProgress, [0.15, 0.42, 0.88], [0.25, 1, 1]);
  const labelY = useTransform(smoothProgress, [0.15, 0.45], [8, 0]);

  const sparkles = [
    { cx: 240, cy: 26, at: 0.24, size: 11 },
    { cx: 460, cy: 52, at: 0.42, size: 13 },
    { cx: 700, cy: 24, at: 0.6, size: 12 },
    { cx: 940, cy: 50, at: 0.78, size: 11 },
  ];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative overflow-hidden py-6 sm:py-8 select-none ${bgClass}`}
    >
      <div className="site-container">
        <div className="relative flex flex-col items-center">
          {/* Subtle chapter eyebrow revealed on scroll */}
          <motion.div
            style={shouldReduceMotion ? undefined : { opacity: labelOpacity, y: labelY }}
            className="mb-1 flex items-center gap-3"
          >
            <span className="h-[1px] w-8 bg-[#C59B6D]/50" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.34em] text-[#B87D56]">
              {label}
            </span>
            <span className="h-[1px] w-8 bg-[#C59B6D]/50" />
          </motion.div>

          {/* Scroll-driven Hair Ribbon + Gliding Shears SVG */}
          <svg
            viewBox="0 0 1200 80"
            className="h-14 sm:h-16 w-full overflow-visible"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id={`divGold-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B87D56" stopOpacity="0.2" />
                <stop offset="25%" stopColor="#C59B6D" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#DFC3A0" stopOpacity="1" />
                <stop offset="75%" stopColor="#C59B6D" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#B87D56" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id={`divBlade-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF7EC" />
                <stop offset="50%" stopColor="#DFC3A0" />
                <stop offset="100%" stopColor="#9C7147" />
              </linearGradient>
            </defs>

            {/* Faint guide hair strand */}
            <path
              d="M 40 42 C 210 12, 360 68, 580 38 C 790 10, 960 66, 1160 36"
              fill="none"
              stroke="#C59B6D"
              strokeOpacity="0.22"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              strokeLinecap="round"
            />

            {/* Secondary silky flowing hair strand */}
            <motion.path
              d={
                reverse
                  ? 'M 1160 44 C 960 72, 790 18, 580 46 C 360 74, 210 20, 40 48'
                  : 'M 40 48 C 210 20, 360 74, 580 46 C 790 18, 960 72, 1160 44'
              }
              fill="none"
              stroke="#B87D56"
              strokeOpacity="0.38"
              strokeWidth="1.4"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : strandLength }}
            />

            {/* Main illuminated golden styled hair strand */}
            <motion.path
              d={
                reverse
                  ? 'M 1160 36 C 960 66, 790 10, 580 38 C 360 68, 210 12, 40 42'
                  : 'M 40 42 C 210 12, 360 68, 580 38 C 790 10, 960 66, 1160 36'
              }
              fill="none"
              stroke={`url(#divGold-${uid})`}
              strokeWidth="2.8"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : strandLength }}
            />

            {/* Scroll-triggered 4-point sparkles along the path */}
            {sparkles.map((s) => (
              <ScrollSparkle
                key={s.cx}
                cx={s.cx}
                cy={s.cy}
                size={s.size}
                triggerAt={reverse ? 1 - s.at : s.at}
                progress={smoothProgress}
                reduced={shouldReduceMotion}
              />
            ))}

            {/* Precision Shears gliding & snipping with scroll */}
            {!shouldReduceMotion && (
              <motion.g
                style={{
                  x: shearX,
                  y: shearY,
                  scaleX: reverse ? -1 : 1,
                }}
              >
                <g transform="scale(0.62) rotate(-6)">
                  {/* Upper blade + finger loop */}
                  <motion.g
                    style={{
                      rotate: upperBladeRotate,
                      transformOrigin: '0px 0px',
                    }}
                  >
                    <path
                      d="M -6 -2 L 46 -7 C 51 -7.5, 54 -5, 52 -3 L 4 3 Z"
                      fill={`url(#divBlade-${uid})`}
                      stroke="#1A1817"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M -4 -1 L -28 -11"
                      stroke="#B87D56"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="-37"
                      cy="-15"
                      r="9.5"
                      fill="none"
                      stroke="#B87D56"
                      strokeWidth="3"
                    />
                  </motion.g>

                  {/* Lower blade + thumb loop */}
                  <motion.g
                    style={{
                      rotate: lowerBladeRotate,
                      transformOrigin: '0px 0px',
                    }}
                  >
                    <path
                      d="M -6 2 L 46 7 C 51 7.5, 54 5, 52 3 L 4 -3 Z"
                      fill={`url(#divBlade-${uid})`}
                      stroke="#1A1817"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M -4 1 L -26 12"
                      stroke="#B87D56"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="-35"
                      cy="16"
                      r="9.5"
                      fill="none"
                      stroke="#B87D56"
                      strokeWidth="3"
                    />
                  </motion.g>

                  {/* Brass pivot screw */}
                  <circle cx="0" cy="0" r="3.6" fill="#C59B6D" stroke="#1A1817" strokeWidth="1" />
                  <circle cx="0" cy="0" r="1.2" fill="#FFF7E6" />
                </g>
              </motion.g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

function ScrollSparkle({ cx, cy, size, triggerAt, progress, reduced }) {
  const half = size / 2;
  const inner = size * 0.18;
  const d = `
    M ${cx} ${cy - half}
    Q ${cx + inner} ${cy - inner} ${cx + half} ${cy}
    Q ${cx + inner} ${cy + inner} ${cx} ${cy + half}
    Q ${cx - inner} ${cy + inner} ${cx - half} ${cy}
    Q ${cx - inner} ${cy - inner} ${cx} ${cy - half} Z
  `;

  const opacity = useTransform(
    progress,
    [Math.max(0, triggerAt - 0.08), triggerAt, Math.min(1, triggerAt + 0.14)],
    [0, 1, 0.7]
  );
  const scale = useTransform(
    progress,
    [Math.max(0, triggerAt - 0.08), triggerAt, Math.min(1, triggerAt + 0.14)],
    [0.2, 1.35, 0.9]
  );
  const rotate = useTransform(
    progress,
    [Math.max(0, triggerAt - 0.08), Math.min(1, triggerAt + 0.2)],
    [-35, 45]
  );

  return (
    <motion.path
      d={d}
      fill="#C59B6D"
      style={
        reduced
          ? { opacity: 0.75 }
          : {
              opacity,
              scale,
              rotate,
              transformOrigin: `${cx}px ${cy}px`,
            }
      }
    />
  );
}
