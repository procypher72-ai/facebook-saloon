import { motion } from 'framer-motion';
import {
  Users,
  Award,
  ShieldCheck,
  MapPin,
  Star,
  Quote,
  BadgeCheck,
} from 'lucide-react';
import { WHY_CHOOSE_FEATURES, TESTIMONIALS, SALON_INFO } from '../data/salonData';
import { AnimatedCounter, SpotlightCard } from './MotionPrimitives';

const ICONS = [Users, Award, ShieldCheck, MapPin];

const RATING_PILLARS = [
  { label: 'Precision Haircuts & Styling', score: '4.9', percent: 98 },
  { label: 'Hygiene & Salon-Grade Products', score: '4.9', percent: 96 },
  { label: 'Warm Family Ambience', score: '4.8', percent: 94 },
];

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function WhyChooseUs() {
  return (
    <section id="about" className="atelier-paper relative scroll-mt-20 bg-[#FAF8F5] py-20 sm:py-28">
      <div className="site-container">
        {/* Top Editorial Split */}
        <div className="grid items-start gap-12 lg:grid-cols-12 xl:gap-16">
          {/* Left Narrative + Enhanced Justdial 4.8★ Trust Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-[#B87D56]">
              Why Bharuch Families Choose Us
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#1A1817] sm:text-5xl xl:text-[3.3rem]">
              Crafted for{' '}
              <span className="font-display-serif italic font-medium text-gold-foil">
                Every Generation
              </span>{' '}
              Under One Roof
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#5E554E] xl:text-[1.06rem]">
              Known across Bharuch as{' '}
              <strong className="font-semibold text-[#1A1817]">
                FACEBOOK-3 UNISEX FAMILY SALON
              </strong>{' '}
              (and affectionately by regulars as{' '}
              <span className="text-[#1A1817]">Facebook Unisex Salon</span> or{' '}
              <span className="text-[#1A1817]">Fb3 Unisex Salon</span>), we blend
              luxury salon craft with the warmth of a welcoming neighborhood studio.
            </p>

            {/* Featured Obsidian Justdial 4.8★ Trust Card with Breakdown Bars */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="luxury-grain relative mt-8 overflow-hidden rounded-[2rem] border border-[#C59B6D]/45 bg-[#141211] p-6 sm:p-7 text-[#FAF8F5] shadow-[0_24px_55px_rgba(26,24,23,0.18)]"
            >
              {/* Gold top accent hairline */}
              <div className="hairline-gold absolute inset-x-0 top-0 h-[2px]" />

              <div className="relative z-10 flex items-center justify-between gap-4">
                <div>
                  <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#DFC3A0]">
                    <BadgeCheck className="h-3.5 w-3.5 text-[#C59B6D]" />
                    Verified Guest Love
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <AnimatedCounter
                      value={parseFloat(SALON_INFO.rating)}
                      decimals={1}
                      duration={1.5}
                      className="font-serif text-5xl font-bold text-[#FAF8F5]"
                    />
                    <span className="text-sm font-medium text-[#DFC3A0]">/ 5.0</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0, rotate: -35 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          type: 'spring',
                          stiffness: 340,
                          damping: 18,
                          delay: 0.15 + idx * 0.08,
                        }}
                      >
                        <Star className="h-4.5 w-4.5 fill-[#C59B6D] text-[#C59B6D]" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="rounded-full border border-[#C59B6D]/35 bg-[#FAF8F5]/[0.06] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#DFC3A0]">
                    Justdial Top Rated
                  </span>
                </div>
              </div>

              <p className="relative z-10 mt-3 text-sm leading-relaxed text-[#FAF8F5]/78">
                Rated <strong className="text-[#DFC3A0]">4.8★ on Justdial</strong> across
                guest reviews in Bharuch for precision hairstyling, spotless hygiene, and
                courteous family-friendly service.
              </p>

              {/* Subtle Champagne Rating Pillar Mini-Bars */}
              <div className="relative z-10 mt-5 space-y-3 border-t border-[#FAF8F5]/10 pt-5">
                {RATING_PILLARS.map((pillar) => (
                  <div key={pillar.label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#FAF8F5]/75">{pillar.label}</span>
                      <span className="font-semibold text-[#DFC3A0]">{pillar.score}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#FAF8F5]/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pillar.percent}%` }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-[#B87D56] via-[#C59B6D] to-[#DFC3A0]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right 2x2 Feature Cards with Oversized Editorial Numerals & Spotlight Tilt */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7 xl:gap-6">
            {WHY_CHOOSE_FEATURES.map((feature, index) => {
              const Icon = ICONS[index];
              const serial = String(index + 1).padStart(2, '0');
              return (
                <SpotlightCard
                  key={feature.title}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="atelier-card group relative overflow-hidden rounded-[1.85rem] border border-[#1A1817]/10 p-6 sm:p-7 xl:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#C59B6D]/60"
                >
                  {/* Translucent Editorial Watermark Numeral */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -bottom-5 select-none font-display-serif text-[6.5rem] font-semibold leading-none text-[#C59B6D]/[0.11] transition-colors duration-500 group-hover:text-[#C59B6D]/[0.2]"
                  >
                    {serial}
                  </span>

                  <div className="relative z-20 flex items-center justify-between gap-2">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C59B6D]/30 bg-[#F2EDE6] text-[#B87D56] shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-[#1A1817] group-hover:text-[#DFC3A0]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-[#C59B6D]/30 bg-[#F2EDE6]/80 px-3 py-1 text-[10.5px] font-semibold tracking-wide text-[#5E554E]">
                      {feature.metric}
                    </span>
                  </div>
                  <h3 className="relative z-20 mt-6 font-serif text-2xl font-semibold text-[#1A1817]">
                    {feature.title}
                  </h3>
                  <p className="relative z-20 mt-2.5 text-sm xl:text-[15px] leading-relaxed text-[#5E554E]">
                    {feature.description}
                  </p>
                </SpotlightCard>
              );
            })}
          </div>
        </div>

        {/* Guest Reflections / Testimonials Row */}
        <div className="mt-18 border-t border-[#C59B6D]/25 pt-14">
          <div className="mb-9 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#B87D56]">
                Client Impressions
              </p>
              <h3 className="mt-1.5 font-serif text-2xl font-semibold text-[#1A1817] sm:text-4xl">
                Stories From Our{' '}
                <span className="font-display-serif italic font-medium text-gold-foil">
                  Bharuch Guests
                </span>
              </h3>
            </div>
            <p className="text-xs font-medium text-[#5E554E]">
              Consistent care across haircuts, color, skin rituals &amp; festive makeup
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 xl:gap-8">
            {TESTIMONIALS.map((review, idx) => (
              <motion.blockquote
                key={review.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="atelier-card relative flex flex-col justify-between overflow-hidden rounded-[1.85rem] border border-[#1A1817]/10 p-6 xl:p-8 transition-colors duration-300 hover:border-[#C59B6D]/55"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2EDE6] text-[#B87D56]">
                      <Quote className="h-4 w-4" />
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-[#C59B6D] text-[#C59B6D]"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-5 font-display-serif text-[1.15rem] sm:text-[1.22rem] italic leading-relaxed text-[#1A1817]/90">
                    “{review.quote}”
                  </p>
                </div>

                <footer className="mt-6 flex items-center gap-3 border-t border-[#1A1817]/8 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C59B6D]/50 bg-[#1A1817] font-serif text-xs font-semibold tracking-wider text-[#DFC3A0]">
                    {getInitials(review.name)}
                  </div>
                  <div>
                    <p className="font-serif text-base font-semibold text-[#1A1817]">
                      {review.name}
                    </p>
                    <p className="text-xs font-medium text-[#B87D56]">{review.service}</p>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
