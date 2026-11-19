import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  Star,
  Clock,
  MapPin,
  ArrowRight,
  PhoneCall,
  RotateCcw,
  Sparkles,
  Play,
  ArrowDownRight,
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { MagneticButton } from './MotionPrimitives';

const EASE_LUXURY = [0.22, 1, 0.36, 1];

export default function Hero({ onReplayIntro, introComplete }) {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 48]);
  const badgeParallaxY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -36]);
  const sealParallaxY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -24]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.07]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="atelier-paper relative overflow-hidden bg-[#FAF8F5] pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24"
    >
      {/* Subtle warm editorial drifting background gradients */}
      <div
        className="animate-ambient-drift pointer-events-none absolute -top-28 right-0 h-[580px] w-[580px] rounded-full opacity-55 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(197,155,109,0.34) 0%, rgba(242,237,230,0) 70%)',
        }}
      />
      <div
        className="animate-ambient-drift pointer-events-none absolute -bottom-32 -left-24 h-[440px] w-[440px] rounded-full opacity-40 blur-3xl"
        style={{
          animationDelay: '-5s',
          background:
            'radial-gradient(circle, rgba(184,125,86,0.22) 0%, rgba(242,237,230,0) 70%)',
        }}
      />

      <div className="site-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* Left Editorial Copy with Haute-Couture Typography */}
          <div className="lg:col-span-6">
            {/* Editorial Masthead Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.65, delay: 0.04, ease: EASE_LUXURY }}
              className="mb-6 flex flex-wrap items-center gap-2.5"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C59B6D]/45 bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1A1817] shadow-xs backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-[#B87D56]" />
                <span>Facebook-3 Unisex Family Salon</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1A1817]/10 bg-[#F2EDE6]/90 px-3 py-1.5 text-[11px] font-semibold text-[#5E554E]">
                <Star className="h-3 w-3 fill-[#C59B6D] text-[#C59B6D]" />
                <span>{SALON_INFO.rating}★ Justdial</span>
              </span>
            </motion.div>

            {/* Primary Editorial Headline with Dramatic Roman + Italic Contrast */}
            <h1 className="font-serif text-[2.65rem] font-semibold leading-[1.03] tracking-[-0.02em] text-[#1A1817] sm:text-6xl lg:text-[3.75rem] xl:text-[4.45rem]">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: '108%', opacity: 0 }}
                  animate={introComplete ? { y: '0%', opacity: 1 } : { y: '108%', opacity: 0 }}
                  transition={{ duration: 0.85, delay: 0.12, ease: EASE_LUXURY }}
                >
                  Precision Cuts,
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block font-display-serif font-medium italic text-gold-foil"
                  initial={{ y: '108%', opacity: 0 }}
                  animate={introComplete ? { y: '0%', opacity: 1 } : { y: '108%', opacity: 0 }}
                  transition={{ duration: 0.85, delay: 0.22, ease: EASE_LUXURY }}
                >
                  Radiant Style
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block text-[2.2rem] sm:text-5xl lg:text-[3.1rem] xl:text-[3.65rem] font-normal text-[#1A1817]/92"
                  initial={{ y: '108%', opacity: 0 }}
                  animate={introComplete ? { y: '0%', opacity: 1 } : { y: '108%', opacity: 0 }}
                  transition={{ duration: 0.85, delay: 0.32, ease: EASE_LUXURY }}
                >
                  for Every Generation.
                </motion.span>
              </span>
            </h1>

            {/* Brand Sub-identity & Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.75, delay: 0.38, ease: EASE_LUXURY }}
              className="mt-6 max-w-xl text-base leading-relaxed text-[#5E554E] sm:text-[1.08rem]"
            >
              Bharuch’s warm luxury sanctuary—affectionately known as{' '}
              <span className="font-semibold text-[#1A1817]">Fb3 Unisex Salon</span>. From
              sculpted cuts, caramel balayage, and mirror-shine keratin smoothing to
              glowing facials, festive makeup, and foot reflexology at City Centre Mall.
            </motion.p>

            {/* Focused Primary & Secondary CTA Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.75, delay: 0.46, ease: EASE_LUXURY }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <motion.a
                  href="#book"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                  className="btn-shimmer group inline-flex items-center gap-3 rounded-full border border-[#C59B6D]/40 bg-[#1A1817] px-7 py-4 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-[#FAF8F5] shadow-[0_14px_34px_rgba(26,24,23,0.22)] transition-colors duration-300 hover:border-[#B87D56] hover:bg-[#B87D56]"
                >
                  <span>Book Your Visit</span>
                  <ArrowRight className="h-4 w-4 text-[#DFC3A0] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-white" />
                </motion.a>
              </MagneticButton>

              <motion.a
                href="#brand-film"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                className="group inline-flex items-center gap-3 rounded-full border border-[#1A1817]/16 bg-white/90 pl-2.5 pr-5 py-2.5 text-xs sm:text-[13px] font-semibold tracking-wide text-[#1A1817] shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-[#C59B6D] hover:bg-[#F2EDE6]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1817] text-[#DFC3A0] transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#B87D56] group-hover:text-white">
                  <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                </span>
                <span>Watch Brand Film</span>
              </motion.a>
            </motion.div>

            {/* Understated Editorial Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.7, delay: 0.54, ease: EASE_LUXURY }}
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-[#5E554E]"
            >
              <a
                href="#services"
                className="group inline-flex items-center gap-1.5 uppercase tracking-[0.16em] text-[#1A1817] transition hover:text-[#B87D56]"
              >
                <span>Explore Ritual Menu</span>
                <ArrowDownRight className="h-3.5 w-3.5 text-[#C59B6D] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <span className="h-3 w-[1px] bg-[#1A1817]/15" />
              <button
                type="button"
                onClick={onReplayIntro}
                className="group inline-flex items-center gap-1.5 uppercase tracking-[0.16em] text-[#5E554E] transition hover:text-[#1A1817] cursor-pointer"
                title="Replay opening hair-cutting animation"
              >
                <RotateCcw className="h-3.5 w-3.5 text-[#C59B6D] transition-transform duration-500 group-hover:-rotate-180" />
                <span>Replay Intro</span>
              </button>
            </motion.div>
          </div>

          {/* Right Multi-Layered Luxury Editorial Arch Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 26 }}
            animate={
              introComplete
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.94, y: 26 }
            }
            transition={{ duration: 0.95, delay: 0.16, ease: EASE_LUXURY }}
            style={{ y: imageParallaxY }}
            className="relative lg:col-span-6"
          >
            <div className="relative mx-auto max-w-xl lg:max-w-none pt-3 pr-2 sm:pr-5">
              {/* Architectural Offset Champagne Arch Hairline Frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-1 right-0 sm:right-1 left-5 bottom-4 rounded-[2.2rem] rounded-t-[11rem] sm:rounded-t-[15rem] border border-[#C59B6D]/45"
              />

              {/* Rotating Editorial Atelier Seal (Top-Right Shoulder) */}
              <motion.a
                href="#about"
                aria-label="Rated 4.8 stars on Justdial in Bharuch"
                style={{ y: sealParallaxY }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={introComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE_LUXURY }}
                className="hidden sm:flex absolute -right-3 top-6 z-30 h-28 w-28 items-center justify-center rounded-full border border-[#C59B6D]/50 bg-[#1A1817]/94 text-[#DFC3A0] shadow-[0_16px_38px_rgba(26,24,23,0.28)] backdrop-blur-md transition-transform hover:scale-105"
              >
                <svg
                  viewBox="0 0 120 120"
                  className="animate-spin-slow h-24 w-24"
                  aria-hidden="true"
                >
                  <defs>
                    <path
                      id="heroSealPath"
                      d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                    />
                  </defs>
                  <text
                    fill="#DFC3A0"
                    fontSize="9.2"
                    fontWeight="600"
                    letterSpacing="2.4"
                  >
                    <textPath href="#heroSealPath" startOffset="0%">
                      FB3 UNISEX SALON • BHARUCH • 4.8★ •
                    </textPath>
                  </text>
                </svg>
                <span className="absolute font-serif text-base font-semibold text-[#FAF8F5]">
                  4.8★
                </span>
              </motion.a>

              {/* Main Arched Photography Frame */}
              <div className="group relative z-10 overflow-hidden rounded-[2.1rem] rounded-t-[10.5rem] sm:rounded-t-[14.5rem] border border-[#C59B6D]/40 bg-[#1A1817] shadow-[0_32px_80px_rgba(26,24,23,0.18)]">
                <div className="gallery-sheen relative aspect-[4/4.3] sm:aspect-[16/13] lg:aspect-[16/12.5] max-h-[600px] w-full overflow-hidden">
                  <motion.div style={{ scale: imageScale }} className="h-full w-full">
                    <img
                      src="/images/hero-salon.jpg"
                      alt="Warm modern interior of FACEBOOK-3 UNISEX FAMILY SALON with backlit mirrors and stylist crafting a precision haircut"
                      className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.04]"
                    />
                  </motion.div>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141211]/75 via-[#141211]/12 to-transparent" />

                {/* Editorial Frosted Glass Caption Strip */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.7, delay: 0.45, ease: EASE_LUXURY }}
                  className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-[#141211]/72 px-4 py-3.5 text-[#FAF8F5] backdrop-blur-md"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#DFC3A0]">
                      <Sparkles className="h-3 w-3 sparkle-pulse" />
                      <span>Men · Women · Kids</span>
                    </div>
                    <p className="mt-0.5 font-serif text-base sm:text-lg font-medium text-[#FAF8F5]">
                      Crafted Hair, Glowing Skin &amp; Quiet Luxury
                    </p>
                  </div>
                  <a
                    href="#brand-film"
                    aria-label="Jump to brand film"
                    className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DFC3A0]/50 bg-[#DFC3A0]/15 text-[#DFC3A0] transition hover:bg-[#DFC3A0] hover:text-[#141211]"
                  >
                    <Play className="ml-0.5 h-4 w-4 fill-current" />
                  </a>
                </motion.div>
              </div>

              {/* Floating Live Hours & City Centre Mall Card (Left Edge) */}
              <motion.div
                style={{ y: badgeParallaxY }}
                className="hidden sm:block absolute -left-6 bottom-28 z-20"
              >
                <motion.div
                  initial={{ opacity: 0, x: -24, scale: 0.92 }}
                  animate={
                    introComplete
                      ? {
                          opacity: 1,
                          x: 0,
                          scale: 1,
                          y: shouldReduceMotion ? 0 : [0, -7, 0],
                        }
                      : { opacity: 0, x: -24, scale: 0.92 }
                  }
                  transition={{
                    opacity: { duration: 0.7, delay: 0.42 },
                    x: { duration: 0.7, delay: 0.42, ease: EASE_LUXURY },
                    scale: { duration: 0.7, delay: 0.42, ease: EASE_LUXURY },
                    y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.1 },
                  }}
                  className="flex items-center gap-3 rounded-2xl border border-[#C59B6D]/45 bg-[#FAF8F5]/95 px-4 py-3 shadow-[0_18px_42px_rgba(26,24,23,0.16)] backdrop-blur-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1817] text-[#DFC3A0]">
                    <Clock className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1A1817]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      Open Daily
                    </p>
                    <p className="text-xs font-medium text-[#5E554E]">10:00 AM – 9:00 PM</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Architectural 4-Pillar Editorial Information Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.75, delay: 0.56, ease: EASE_LUXURY }}
          className="mt-14 lg:mt-16 rounded-3xl border border-[#1A1817]/10 bg-white/85 shadow-[0_12px_36px_rgba(26,24,23,0.05)] backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 divide-y divide-[#1A1817]/8 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            <div className="flex items-center gap-3.5 p-5 sm:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F2EDE6] text-[#B87D56]">
                <MapPin className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#B87D56]">
                  Prime Location
                </p>
                <p className="mt-0.5 text-sm font-semibold text-[#1A1817]">
                  City Centre Mall, 1st Floor
                </p>
                <p className="text-xs text-[#5E554E]">Shop 164–175 · Bharuch</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-5 sm:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F2EDE6] text-[#B87D56]">
                <Star className="h-4.5 w-4.5 fill-[#C59B6D] text-[#C59B6D]" />
              </span>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#B87D56]">
                  Guest Reputation
                </p>
                <p className="mt-0.5 text-sm font-semibold text-[#1A1817]">
                  4.8★ Rated on Justdial
                </p>
                <p className="text-xs text-[#5E554E]">Trusted across Bharuch</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-5 sm:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F2EDE6] text-[#B87D56]">
                <Clock className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#B87D56]">
                  Walk-Ins Welcome
                </p>
                <p className="mt-0.5 text-sm font-semibold text-[#1A1817]">
                  Open Daily Until 9 PM
                </p>
                <p className="text-xs text-[#5E554E]">Mon – Sun · 10 AM – 9 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-5 sm:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#1A1817] text-[#DFC3A0]">
                <PhoneCall className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#B87D56]">
                  Instant Salon Desk
                </p>
                <a
                  href={SALON_INFO.phones[0].href}
                  className="mt-0.5 block text-sm font-semibold text-[#1A1817] transition hover:text-[#B87D56]"
                >
                  {SALON_INFO.phones[0].display}
                </a>
                <a
                  href={SALON_INFO.phones[1].href}
                  className="block text-xs text-[#5E554E] transition hover:text-[#B87D56]"
                >
                  {SALON_INFO.phones[1].display}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
