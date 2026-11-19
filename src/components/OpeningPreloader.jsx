import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SPARKLES = [
  { id: 1, cx: 145, cy: 108, delay: 0.32, size: 7 },
  { id: 2, cx: 198, cy: 84, delay: 0.52, size: 10 },
  { id: 3, cx: 255, cy: 112, delay: 0.72, size: 8 },
  { id: 4, cx: 315, cy: 88, delay: 0.92, size: 11 },
  { id: 5, cx: 372, cy: 115, delay: 1.12, size: 9 },
  { id: 6, cx: 430, cy: 90, delay: 1.32, size: 10 },
  { id: 7, cx: 482, cy: 104, delay: 1.48, size: 7 },
  { id: 8, cx: 226, cy: 126, delay: 0.62, size: 5 },
  { id: 9, cx: 345, cy: 72, delay: 1.02, size: 6 },
];

function FourPointStar({ cx, cy, size, delay }) {
  const half = size / 2;
  const inner = size * 0.16;
  const d = `
    M ${cx} ${cy - half}
    Q ${cx + inner} ${cy - inner} ${cx + half} ${cy}
    Q ${cx + inner} ${cy + inner} ${cx} ${cy + half}
    Q ${cx - inner} ${cy + inner} ${cx - half} ${cy}
    Q ${cx - inner} ${cy - inner} ${cx} ${cy - half} Z
  `;
  return (
    <motion.path
      d={d}
      fill="url(#sparkleGold)"
      initial={{ opacity: 0, scale: 0, rotate: -25 }}
      animate={{
        opacity: [0, 1, 0.85, 0],
        scale: [0.2, 1.25, 0.9, 0.3],
        y: [4, -8, -16],
        rotate: [0, 35, 65],
      }}
      transition={{
        duration: 0.95,
        delay,
        ease: 'easeOut',
      }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  );
}

export default function OpeningPreloader({ isVisible, onComplete, onSkip }) {
  useEffect(() => {
    if (!isVisible) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      onComplete();
    }, 2400);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
    };
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="fb3-preloader"
          className="luxury-grain fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#1A1817] text-[#FAF8F5]"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.78, ease: [0.76, 0, 0.24, 1] },
          }}
          role="dialog"
          aria-label="Opening animation for FACEBOOK-3 UNISEX FAMILY SALON"
        >
          {/* Ambient radial golden salon glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(197, 155, 109, 0.16) 0%, rgba(184, 125, 86, 0.06) 36%, rgba(26, 24, 23, 0) 70%)',
            }}
          />

          {/* Subtle ornamental corner hairlines */}
          <div className="pointer-events-none absolute inset-5 sm:inset-8 border border-[#C59B6D]/20" />

          {/* Top Skip button */}
          <motion.button
            type="button"
            onClick={onSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            whileHover={{ opacity: 1, scale: 1.03 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="absolute right-7 top-7 sm:right-11 sm:top-10 z-20 rounded-full border border-[#C59B6D]/40 bg-[#FAF8F5]/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#DFC3A0] backdrop-blur-sm transition hover:border-[#C59B6D] hover:bg-[#C59B6D]/15 cursor-pointer"
          >
            Skip Intro
          </motion.button>

          {/* Center Animation Stage */}
          <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-6">
            {/* Subtle Eyebrow Monogram */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mb-3 flex items-center gap-3"
            >
              <span className="h-[1px] w-8 bg-[#C59B6D]/60" />
              <span className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#C59B6D]">
                FB3 · BHARUCH
              </span>
              <span className="h-[1px] w-8 bg-[#C59B6D]/60" />
            </motion.div>

            {/* Custom Hair-Cutting & Precision Shears SVG */}
            <div className="relative w-full max-w-[560px]">
              <svg
                viewBox="0 0 600 200"
                className="h-auto w-full overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="hairBase" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6D4B37" stopOpacity="0.25" />
                    <stop offset="25%" stopColor="#B87D56" stopOpacity="0.85" />
                    <stop offset="55%" stopColor="#E3C49E" stopOpacity="1" />
                    <stop offset="85%" stopColor="#C59B6D" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#6D4B37" stopOpacity="0.2" />
                  </linearGradient>

                  <linearGradient id="goldTrail" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C59B6D" stopOpacity="0" />
                    <stop offset="40%" stopColor="#F5DFC2" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#C59B6D" stopOpacity="1" />
                  </linearGradient>

                  <linearGradient id="bladeMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF7EC" />
                    <stop offset="45%" stopColor="#DFC3A0" />
                    <stop offset="100%" stopColor="#9C7147" />
                  </linearGradient>

                  <linearGradient id="sparkleGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF7E6" />
                    <stop offset="100%" stopColor="#C59B6D" />
                  </linearGradient>

                  <filter id="softGlow" x="-20%" y="-40%" width="140%" height="180%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Flowing Hair Ribbon Layer 1 (Upper silky strand) */}
                <motion.path
                  d="M 55 112 C 135 55, 225 148, 310 96 C 390 48, 468 136, 545 86"
                  fill="none"
                  stroke="url(#hairBase)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  animate={{ pathLength: 1, opacity: 0.95 }}
                  transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Flowing Hair Ribbon Layer 2 (Secondary warm strand) */}
                <motion.path
                  d="M 62 122 C 145 72, 225 162, 314 108 C 396 58, 474 144, 540 98"
                  fill="none"
                  stroke="#C59B6D"
                  strokeOpacity="0.45"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.05, delay: 0.08, ease: 'easeOut' }}
                />

                {/* Trimmed stray wisp gently drifting down after the snip */}
                <motion.path
                  d="M 165 116 C 245 146, 330 105, 422 124 C 468 134, 505 124, 535 112"
                  fill="none"
                  stroke="#B87D56"
                  strokeOpacity="0.55"
                  strokeWidth="1.6"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                  initial={{ opacity: 0.65, y: 0 }}
                  animate={{ opacity: [0.65, 0.55, 0], y: [0, 8, 28] }}
                  transition={{ duration: 1.25, delay: 0.75, ease: 'easeInOut' }}
                />

                {/* Radiant golden styled trail illuminated right behind the shears */}
                <motion.path
                  d="M 85 104 C 155 62, 232 140, 312 96 C 392 52, 466 130, 535 90"
                  fill="none"
                  stroke="url(#goldTrail)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  filter="url(#softGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1], opacity: [0, 1, 0.85] }}
                  transition={{ duration: 1.55, delay: 0.22, ease: [0.4, 0, 0.2, 1] }}
                />

                {/* Golden sparkles appearing along the snip path */}
                {SPARKLES.map((s) => (
                  <FourPointStar key={s.id} {...s} />
                ))}

                {/* Gliding Precision Hairdressing Shears Group */}
                <motion.g
                  initial={{ x: 75, y: 108, opacity: 0, rotate: -14 }}
                  animate={{
                    x: [75, 165, 255, 345, 435, 515],
                    y: [108, 92, 114, 88, 108, 86],
                    rotate: [-14, -8, -16, -6, -13, -10],
                    opacity: [0, 1, 1, 1, 1, 0.9],
                  }}
                  transition={{
                    duration: 1.65,
                    delay: 0.15,
                    ease: [0.35, 0, 0.25, 1],
                  }}
                >
                  {/* Upper Shear Blade + Finger Ring (animated rhythmic snip) */}
                  <motion.g
                    animate={{ rotate: [0, -24, 2, -22, 2, -20, 0] }}
                    transition={{
                      duration: 1.55,
                      delay: 0.2,
                      ease: 'easeInOut',
                    }}
                    style={{ transformOrigin: '0px 0px' }}
                  >
                    {/* Honed upper blade pointing right */}
                    <path
                      d="M -6 -2 L 46 -7 C 51 -7.5, 54 -5, 52 -3 L 4 3 Z"
                      fill="url(#bladeMetal)"
                      stroke="#1A1817"
                      strokeWidth="0.6"
                    />
                    {/* Upper shank + finger loop */}
                    <path
                      d="M -4 -1 L -28 -11"
                      stroke="url(#bladeMetal)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="-37"
                      cy="-15"
                      r="9.5"
                      fill="none"
                      stroke="url(#bladeMetal)"
                      strokeWidth="3"
                    />
                    {/* Finger rest tang */}
                    <path
                      d="M -46 -18 C -51 -20, -54 -17, -56 -14"
                      fill="none"
                      stroke="#DFC3A0"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </motion.g>

                  {/* Lower Shear Blade + Thumb Ring (counter-rotates for crisp snip) */}
                  <motion.g
                    animate={{ rotate: [0, 22, -2, 20, -2, 18, 0] }}
                    transition={{
                      duration: 1.55,
                      delay: 0.2,
                      ease: 'easeInOut',
                    }}
                    style={{ transformOrigin: '0px 0px' }}
                  >
                    {/* Honed lower blade pointing right */}
                    <path
                      d="M -6 2 L 46 7 C 51 7.5, 54 5, 52 3 L 4 -3 Z"
                      fill="url(#bladeMetal)"
                      stroke="#1A1817"
                      strokeWidth="0.6"
                    />
                    {/* Lower shank + thumb loop */}
                    <path
                      d="M -4 1 L -26 12"
                      stroke="url(#bladeMetal)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="-35"
                      cy="16"
                      r="9.5"
                      fill="none"
                      stroke="url(#bladeMetal)"
                      strokeWidth="3"
                    />
                  </motion.g>

                  {/* Brass Center Pivot Screw */}
                  <circle cx="0" cy="0" r="3.6" fill="#C59B6D" stroke="#1A1817" strokeWidth="1" />
                  <circle cx="0" cy="0" r="1.2" fill="#FFF7E6" />
                </motion.g>
              </svg>
            </div>

            {/* Brand Title Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 text-center"
            >
              <h2 className="font-serif text-2xl sm:text-4xl font-medium tracking-[0.06em] text-[#FAF8F5]">
                FACEBOOK-3{' '}
                <span className="italic font-normal text-[#DFC3A0]">Unisex Family Salon</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm tracking-[0.22em] uppercase text-[#C59B6D]/90">
                Precision Cuts · Radiant Style · City Centre Mall, Bharuch
              </p>
            </motion.div>

            {/* Minimal progress hairline */}
            <div className="mt-7 h-[2px] w-44 overflow-hidden rounded-full bg-[#FAF8F5]/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B87D56] via-[#DFC3A0] to-[#C59B6D]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.25, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
