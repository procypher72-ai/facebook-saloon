import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Sparkles, Scissors, Wand2, Gem } from 'lucide-react';

const RITUAL_STEPS = [
  {
    number: '01',
    title: 'Personal Consultation',
    subtitle: 'Face-shape mapping, hair texture analysis & tailored style vision.',
    icon: Wand2,
    range: [0.08, 0.34],
  },
  {
    number: '02',
    title: 'Precision Craft & Shears',
    subtitle: 'Sculpted geometry, dimensional color & frizz-free keratin mastery.',
    icon: Scissors,
    range: [0.34, 0.64],
  },
  {
    number: '03',
    title: 'Mirror-Shine Finish',
    subtitle: 'Weightless movement, luminous gloss & lasting salon-fresh confidence.',
    icon: Gem,
    range: [0.64, 0.92],
  },
];

const SPARKLE_POINTS = [
  { cx: 190, cy: 96, at: 0.18, size: 12 },
  { cx: 360, cy: 62, at: 0.3, size: 15 },
  { cx: 540, cy: 112, at: 0.45, size: 13 },
  { cx: 720, cy: 68, at: 0.58, size: 16 },
  { cx: 900, cy: 108, at: 0.72, size: 14 },
  { cx: 1060, cy: 74, at: 0.85, size: 12 },
];

/**
 * Centerpiece scroll-scrubbed luxury hair-transformation stage:
 * Mirrors the signature opening preloader aesthetic — as the visitor scrolls through,
 * giant golden shears glide across silky hair ribbons, rhythmically snipping &
 * transforming them into a radiant golden wave while lighting up each ritual step
 * and gliding counter-moving editorial serif watermarks in the background.
 */
export default function SalonCraftScrollStage() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 20%'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 24,
    restDelta: 0.001,
  });

  // Counter-gliding background editorial watermarks
  const watermarkLeftX = useTransform(smooth, [0, 1], ['-6%', '7%']);
  const watermarkRightX = useTransform(smooth, [0, 1], ['7%', '-6%']);

  // Main hair-cutting shears path motion across the 1200x180 stage
  const shearX = useTransform(smooth, [0.06, 0.92], [85, 1115]);
  const shearY = useTransform(
    smooth,
    [0.06, 0.25, 0.48, 0.7, 0.92],
    [104, 70, 110, 74, 92]
  );
  const shearTilt = useTransform(
    smooth,
    [0.06, 0.25, 0.48, 0.7, 0.92],
    [-12, -4, -14, -5, -9]
  );

  // Rhythmic blade snipping driven by scroll position
  const upperBlade = useTransform(
    smooth,
    [0.06, 0.15, 0.24, 0.34, 0.44, 0.54, 0.64, 0.74, 0.84, 0.92],
    [0, -26, 2, -26, 2, -25, 2, -24, 2, 0]
  );
  const lowerBlade = useTransform(
    smooth,
    [0.06, 0.15, 0.24, 0.34, 0.44, 0.54, 0.64, 0.74, 0.84, 0.92],
    [0, 24, -2, 24, -2, 23, -2, 22, -2, 0]
  );

  // Flowing golden trail + trimmed wisps drifting down
  const trailLength = useTransform(smooth, [0.06, 0.92], [0, 1]);
  const wispY = useTransform(smooth, [0.2, 0.85], [0, 34]);
  const wispOpacity = useTransform(smooth, [0.1, 0.45, 0.88], [0.55, 0.45, 0]);
  const progressBarScale = useTransform(smooth, [0.08, 0.92], [0, 1]);

  return (
    <section
      ref={sectionRef}
      aria-label="The Signature FB3 Hair Craftsmanship Ritual"
      className="luxury-grain relative overflow-hidden bg-[#1A1817] py-20 sm:py-28 text-[#FAF8F5]"
    >
      {/* Subtle radial golden salon spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(197, 155, 109, 0.16) 0%, rgba(184, 125, 86, 0.05) 45%, rgba(26, 24, 23, 0) 75%)',
        }}
      />

      {/* Counter-scrolling oversized editorial typography watermarks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-8 select-none overflow-hidden opacity-[0.045]"
      >
        <motion.p
          style={shouldReduceMotion ? undefined : { x: watermarkLeftX }}
          className="whitespace-nowrap font-serif text-[4.5rem] sm:text-[7rem] xl:text-[9rem] font-semibold tracking-[0.08em] text-[#DFC3A0]"
        >
          PRECISION CUTS · SILK KERATIN · RADIANT COLOR · LUXURY SPA
        </motion.p>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 select-none overflow-hidden opacity-[0.04]"
      >
        <motion.p
          style={shouldReduceMotion ? undefined : { x: watermarkRightX }}
          className="whitespace-nowrap font-serif italic text-[4rem] sm:text-[6.5rem] xl:text-[8.5rem] tracking-[0.06em] text-[#FAF8F5]"
        >
          FACEBOOK-3 UNISEX FAMILY SALON · BHARUCH · CITY CENTRE MALL
        </motion.p>
      </div>

      <div className="site-container relative z-10">
        {/* Stage Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C59B6D]/35 bg-[#FAF8F5]/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#DFC3A0]">
            <Sparkles className="h-3.5 w-3.5 sparkle-pulse" />
            The Signature FB3 Experience
          </span>
          <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-[#FAF8F5] sm:text-5xl xl:text-[3.4rem]">
            Every Strand Sculpted With{' '}
            <span className="italic font-normal text-[#DFC3A0]">
              Precision &amp; Grace
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base xl:text-lg text-[#FAF8F5]/70">
            Scroll to glide through our signature three-step salon craft—from tailored
            consultation to mirror-like silkiness.
          </p>
        </div>

        {/* Full-Width Scroll-Scrubbed Shears & Hair Wave Stage */}
        <div className="relative mt-10 sm:mt-14">
          <svg
            viewBox="0 0 1200 180"
            className="h-32 sm:h-44 lg:h-52 w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="stageHairMuted" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6D4B37" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#B87D56" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#6D4B37" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="stageGoldTrail" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B87D56" stopOpacity="0.35" />
                <stop offset="35%" stopColor="#DFC3A0" stopOpacity="1" />
                <stop offset="70%" stopColor="#FFF2DC" stopOpacity="1" />
                <stop offset="100%" stopColor="#C59B6D" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="stageBlade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9F0" />
                <stop offset="48%" stopColor="#DFC3A0" />
                <stop offset="100%" stopColor="#9C7147" />
              </linearGradient>
              <filter id="stageGlow" x="-15%" y="-40%" width="130%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Unstyled base hair wave (soft muted ribbon) */}
            <path
              d="M 40 108 C 190 36, 350 154, 560 92 C 760 32, 950 144, 1160 80"
              fill="none"
              stroke="url(#stageHairMuted)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 55 122 C 210 52, 365 166, 575 104 C 775 44, 965 152, 1150 94"
              fill="none"
              stroke="#C59B6D"
              strokeOpacity="0.22"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Trimmed stray wisp gently drifting downward as you scroll */}
            <motion.path
              d="M 210 116 C 370 152, 540 104, 725 130 C 890 152, 1020 120, 1135 104"
              fill="none"
              stroke="#B87D56"
              strokeWidth="1.6"
              strokeDasharray="5 4"
              strokeLinecap="round"
              style={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { y: wispY, opacity: wispOpacity }
              }
            />

            {/* Luminous styled golden silk strand revealed directly behind the shears */}
            <motion.path
              d="M 40 108 C 190 36, 350 154, 560 92 C 760 32, 950 144, 1160 80"
              fill="none"
              stroke="url(#stageGoldTrail)"
              strokeWidth="4.2"
              strokeLinecap="round"
              filter="url(#stageGlow)"
              style={{ pathLength: shouldReduceMotion ? 1 : trailLength }}
            />

            {/* Secondary golden shimmer strand */}
            <motion.path
              d="M 55 118 C 205 48, 360 162, 570 100 C 770 40, 960 148, 1150 90"
              fill="none"
              stroke="#DFC3A0"
              strokeOpacity="0.6"
              strokeWidth="1.8"
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : trailLength }}
            />

            {/* Twinkling 4-point golden stars igniting as shears pass */}
            {SPARKLE_POINTS.map((s) => (
              <StageSparkle
                key={s.cx}
                {...s}
                progress={smooth}
                reduced={shouldReduceMotion}
              />
            ))}

            {/* Signature Precision Hairdressing Shears gliding & snipping on scroll */}
            {!shouldReduceMotion && (
              <motion.g
                style={{
                  x: shearX,
                  y: shearY,
                  rotate: shearTilt,
                }}
              >
                <g transform="scale(1.05)">
                  {/* Upper Shear Blade + Finger Ring */}
                  <motion.g style={{ rotate: upperBlade, transformOrigin: '0px 0px' }}>
                    <path
                      d="M -6 -2 L 48 -7.5 C 53 -8, 56 -5.2, 54 -3 L 4 3 Z"
                      fill="url(#stageBlade)"
                      stroke="#1A1817"
                      strokeWidth="0.7"
                    />
                    <path
                      d="M -4 -1 L -28 -11"
                      stroke="url(#stageBlade)"
                      strokeWidth="3.4"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="-37"
                      cy="-15"
                      r="9.8"
                      fill="none"
                      stroke="url(#stageBlade)"
                      strokeWidth="3.2"
                    />
                    <path
                      d="M -46 -18 C -51 -20, -55 -17, -57 -14"
                      fill="none"
                      stroke="#DFC3A0"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                    />
                  </motion.g>

                  {/* Lower Shear Blade + Thumb Ring */}
                  <motion.g style={{ rotate: lowerBlade, transformOrigin: '0px 0px' }}>
                    <path
                      d="M -6 2 L 48 7.5 C 53 8, 56 5.2, 54 3 L 4 -3 Z"
                      fill="url(#stageBlade)"
                      stroke="#1A1817"
                      strokeWidth="0.7"
                    />
                    <path
                      d="M -4 1 L -26 12"
                      stroke="url(#stageBlade)"
                      strokeWidth="3.4"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="-35"
                      cy="16"
                      r="9.8"
                      fill="none"
                      stroke="url(#stageBlade)"
                      strokeWidth="3.2"
                    />
                  </motion.g>

                  {/* Brass Center Pivot */}
                  <circle cx="0" cy="0" r="3.8" fill="#C59B6D" stroke="#1A1817" strokeWidth="1" />
                  <circle cx="0" cy="0" r="1.3" fill="#FFF7E6" />
                </g>
              </motion.g>
            )}
          </svg>
        </div>

        {/* Synchronized Horizontal Golden Timeline Progress Bar */}
        <div className="relative mt-6 mb-10 hidden md:block">
          <div className="h-[1px] w-full bg-[#FAF8F5]/12" />
          <motion.div
            style={{ scaleX: shouldReduceMotion ? 1 : progressBarScale }}
            className="absolute inset-y-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-[#B87D56] via-[#DFC3A0] to-[#C59B6D]"
          />
        </div>

        {/* 3 Scroll-Illuminated Ritual Steps */}
        <div className="mt-8 md:mt-0 grid gap-6 md:grid-cols-3 xl:gap-10">
          {RITUAL_STEPS.map((step) => (
            <RitualStepCard
              key={step.number}
              step={step}
              progress={smooth}
              reduced={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RitualStepCard({ step, progress, reduced }) {
  const Icon = step.icon;
  const [start, end] = step.range;
  const opacity = useTransform(progress, [Math.max(0, start - 0.12), start, end], [0.45, 1, 1]);
  const y = useTransform(progress, [Math.max(0, start - 0.12), start + 0.08], [18, 0]);
  const borderOpacity = useTransform(progress, [Math.max(0, start - 0.08), start + 0.06], [0.1, 0.55]);

  return (
    <motion.div
      style={
        reduced
          ? undefined
          : {
              opacity,
              y,
            }
      }
      className="relative rounded-3xl border border-[#C59B6D]/25 bg-[#FAF8F5]/[0.04] p-6 xl:p-8 backdrop-blur-sm transition-colors duration-300 hover:border-[#C59B6D]/55 hover:bg-[#FAF8F5]/[0.07]"
    >
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { opacity: borderOpacity }}
        className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#DFC3A0] to-transparent"
      />
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C59B6D]/35 bg-[#2C2725] text-[#DFC3A0]">
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-serif text-3xl font-semibold text-[#C59B6D]/45">
          {step.number}
        </span>
      </div>
      <h3 className="mt-5 font-serif text-2xl font-semibold text-[#FAF8F5]">
        {step.title}
      </h3>
      <p className="mt-2 text-sm xl:text-[15px] leading-relaxed text-[#FAF8F5]/70">
        {step.subtitle}
      </p>
    </motion.div>
  );
}

function StageSparkle({ cx, cy, size, at, progress, reduced }) {
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
    [Math.max(0, at - 0.08), at, Math.min(1, at + 0.16)],
    [0, 1, 0.78]
  );
  const scale = useTransform(
    progress,
    [Math.max(0, at - 0.08), at, Math.min(1, at + 0.16)],
    [0.15, 1.35, 0.95]
  );
  const rotate = useTransform(
    progress,
    [Math.max(0, at - 0.08), Math.min(1, at + 0.25)],
    [-40, 50]
  );

  return (
    <motion.path
      d={d}
      fill="#FFF2DC"
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
