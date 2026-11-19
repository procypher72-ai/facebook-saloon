import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Check,
  Sparkles,
  ArrowUpRight,
  Plus,
  LayoutGrid,
  BookOpen,
} from 'lucide-react';
import { SERVICE_CATEGORIES, SERVICES } from '../data/salonData';
import { SpotlightCard } from './MotionPrimitives';

export default function ServicesSection({
  onSelectService,
  visitCombo = [],
  onToggleComboService,
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'menu'

  const filteredServices =
    activeCategory === 'All'
      ? SERVICES
      : SERVICES.filter((service) => service.category === activeCategory);

  return (
    <section
      id="services"
      className="relative scroll-mt-20 bg-[#F2EDE6]/70 py-20 sm:py-28"
    >
      {/* Top subtle champagne divider */}
      <div aria-hidden="true" className="hairline-gold absolute inset-x-0 top-0 h-[1px]" />

      <div className="site-container">
        {/* Section Header + Category Tabs + View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#B87D56]">
              <Sparkles className="h-3.5 w-3.5" />
              Curated Ritual Menu
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#1A1817] sm:text-5xl xl:text-[3.35rem]">
              Tailored Hair, Skin &amp;{' '}
              <span className="font-display-serif italic font-medium text-gold-foil">
                Relaxation Rituals
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5E554E] xl:text-[1.08rem]">
              Every appointment begins with a personal consultation—ensuring your haircut,
              color tone, facial, or spa ritual complements your features, hair texture,
              and lifestyle effortlessly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 self-start lg:self-auto">
            {/* Category Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter salon services by category"
              className="inline-flex flex-wrap gap-1.5 rounded-full border border-[#1A1817]/10 bg-[#FAF8F5] p-1.5 shadow-xs"
            >
              {SERVICE_CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`relative rounded-full px-4 py-2 text-xs sm:text-[13px] font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'text-[#FAF8F5]'
                        : 'text-[#5E554E] hover:text-[#1A1817]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeServiceTab"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-[#1A1817]"
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>

            {/* Visual Cards vs Classic Editorial Menu Sheet Switcher */}
            <div
              aria-label="Switch menu display layout"
              className="inline-flex items-center rounded-full border border-[#C59B6D]/35 bg-[#FAF8F5] p-1 shadow-xs self-start"
            >
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                aria-pressed={viewMode === 'cards'}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-[#1A1817] text-[#DFC3A0]'
                    : 'text-[#5E554E] hover:text-[#1A1817]'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('menu')}
                aria-pressed={viewMode === 'menu'}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  viewMode === 'menu'
                    ? 'bg-[#1A1817] text-[#DFC3A0]'
                    : 'text-[#5E554E] hover:text-[#1A1817]'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Price Menu</span>
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === 'cards' ? (
            /* Editorial Visual Cards Grid */
            <motion.div
              key="cards-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              layout
              className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, index) => {
                  const isInCombo = visitCombo.some((s) => s.id === service.id);
                  const serial = String(
                    SERVICES.findIndex((s) => s.id === service.id) + 1
                  ).padStart(2, '0');

                  return (
                    <SpotlightCard
                      as="article"
                      layout
                      key={service.id}
                      initial={{ opacity: 0, y: 26, scale: 0.97 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.08 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.55,
                        delay: (index % 3) * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`atelier-card group flex flex-col overflow-hidden rounded-[1.85rem] border transition-all duration-300 hover:-translate-y-1.5 ${
                        isInCombo
                          ? 'border-[#C59B6D] ring-2 ring-[#C59B6D]/25'
                          : 'border-[#1A1817]/10 hover:border-[#C59B6D]/60'
                      }`}
                    >
                      {/* Clean High-Res Image Header (Uncluttered Photography) */}
                      <div className="gallery-sheen relative aspect-[16/10.5] w-full overflow-hidden bg-[#E7DFD3]">
                        <img
                          src={service.image}
                          alt={service.alt}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-107"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141211]/55 via-transparent to-[#141211]/15" />

                        {/* Single Refined Top Row */}
                        <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between gap-2">
                          <span className="rounded-full border border-white/20 bg-[#141211]/72 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#DFC3A0] backdrop-blur-md">
                            {service.category}
                          </span>
                          {service.badge && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#DFC3A0]/55 bg-[#FAF8F5]/94 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9E653F] shadow-sm backdrop-blur-md">
                              <Sparkles className="h-2.5 w-2.5" />
                              {service.badge}
                            </span>
                          )}
                        </div>

                        {/* Subtle Editorial Serial Number */}
                        <span className="pointer-events-none absolute bottom-3 left-4 z-20 font-display-serif text-3xl font-semibold leading-none text-[#FAF8F5]/90 drop-shadow-sm">
                          {serial}
                        </span>
                      </div>

                      {/* Crisp Gold-Ruled Price & Duration Info Bar */}
                      <div className="relative z-20 flex items-center justify-between border-b border-[#C59B6D]/25 bg-[#F2EDE6]/55 px-6 py-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5E554E]">
                          <Clock className="h-3.5 w-3.5 text-[#B87D56]" />
                          {service.duration}
                        </span>
                        <span className="font-serif text-base font-bold text-[#1A1817]">
                          <span className="mr-1 font-sans text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#B87D56]">
                            From
                          </span>
                          {service.startingPrice}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="relative z-20 flex flex-1 flex-col p-6 xl:p-7">
                        <h3 className="font-serif text-2xl font-semibold text-[#1A1817] transition-colors group-hover:text-[#B87D56]">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#5E554E]">
                          {service.summary}
                        </p>

                        {/* Sub-services checklist */}
                        <ul className="mt-5 space-y-2 border-t border-[#1A1817]/8 pt-4">
                          {service.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-xs sm:text-[13px] font-medium text-[#1A1817]/85"
                            >
                              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F2EDE6] text-[#B87D56]">
                                <Check className="h-2.5 w-2.5" />
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Card Footer CTAs */}
                        <div className="mt-auto flex items-center gap-2.5 pt-6">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => onSelectService(service.title)}
                            className="btn-shimmer group/btn inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#1A1817]/15 bg-[#F2EDE6]/85 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1817] transition-colors duration-300 hover:border-[#1A1817] hover:bg-[#1A1817] hover:text-[#FAF8F5] cursor-pointer"
                          >
                            <span>Request Service</span>
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </motion.button>

                          {onToggleComboService && (
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.94 }}
                              onClick={() => onToggleComboService(service)}
                              aria-pressed={isInCombo}
                              title={
                                isInCombo
                                  ? `Remove ${service.title} from visit estimate`
                                  : `Add ${service.title} to visit estimate`
                              }
                              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                                isInCombo
                                  ? 'border-[#1A1817] bg-[#1A1817] text-[#DFC3A0]'
                                  : 'border-[#C59B6D]/50 bg-white text-[#B87D56] hover:border-[#1A1817] hover:text-[#1A1817]'
                              }`}
                            >
                              {isInCombo ? (
                                <>
                                  <Check className="h-3.5 w-3.5" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="h-3.5 w-3.5" />
                                  <span>Visit</span>
                                </>
                              )}
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </SpotlightCard>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Classic Printed Atelier Spa Menu View */
            <motion.div
              key="menu-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mt-12 overflow-hidden rounded-[2rem] border border-[#C59B6D]/40 bg-[#FAF8F5] p-6 sm:p-10 lg:p-12 shadow-[0_24px_65px_rgba(26,24,23,0.08)]"
            >
              {/* Menu Sheet Header */}
              <div className="flex flex-col items-center justify-between gap-3 border-b border-[#C59B6D]/30 pb-6 text-center sm:flex-row sm:text-left">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#B87D56]">
                    FACEBOOK-3 UNISEX FAMILY SALON · BHARUCH
                  </p>
                  <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#1A1817]">
                    Signature Salon Menu &amp; Indicative Tariffs
                  </h3>
                </div>
                <span className="rounded-full border border-[#C59B6D]/40 bg-[#F2EDE6] px-4 py-1.5 text-xs font-semibold text-[#1A1817]">
                  Tap “+ Visit” to build your combo estimate
                </span>
              </div>

              <div className="mt-6 grid gap-x-12 gap-y-8 lg:grid-cols-2">
                {filteredServices.map((service) => {
                  const isInCombo = visitCombo.some((s) => s.id === service.id);
                  const serial = String(
                    SERVICES.findIndex((s) => s.id === service.id) + 1
                  ).padStart(2, '0');

                  return (
                    <div
                      key={service.id}
                      className={`group rounded-2xl border p-5 transition-all ${
                        isInCombo
                          ? 'border-[#C59B6D] bg-[#F2EDE6]/70'
                          : 'border-[#1A1817]/8 bg-white/70 hover:border-[#C59B6D]/50 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-display-serif text-xl font-semibold text-[#C59B6D]">
                          {serial}
                        </span>
                        <h4 className="font-serif text-xl font-semibold text-[#1A1817]">
                          {service.title}
                        </h4>
                        <span className="hidden sm:block flex-1 border-b border-dotted border-[#C59B6D]/55" />
                        <span className="ml-auto font-serif text-xl font-bold text-[#1A1817]">
                          {service.startingPrice}
                        </span>
                      </div>

                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[#5E554E]">
                        <span className="font-semibold uppercase tracking-[0.14em] text-[#B87D56]">
                          {service.category}
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3 text-[#C59B6D]" />
                          {service.duration}
                        </span>
                        {service.badge && (
                          <>
                            <span>·</span>
                            <span className="font-semibold text-[#1A1817]">
                              ★ {service.badge}
                            </span>
                          </>
                        )}
                      </div>

                      <ul className="mt-3.5 grid gap-1.5 sm:grid-cols-2 text-xs text-[#5E554E]">
                        {service.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-1.5">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C59B6D]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex items-center gap-2 border-t border-[#1A1817]/8 pt-3.5">
                        <button
                          type="button"
                          onClick={() => onSelectService(service.title)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#1A1817] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FAF8F5] transition hover:bg-[#B87D56] cursor-pointer"
                        >
                          <span>Book</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                        {onToggleComboService && (
                          <button
                            type="button"
                            onClick={() => onToggleComboService(service)}
                            className={`inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold transition cursor-pointer ${
                              isInCombo
                                ? 'border-[#1A1817] bg-[#1A1817] text-[#DFC3A0]'
                                : 'border-[#C59B6D]/50 bg-[#FAF8F5] text-[#B87D56] hover:border-[#1A1817] hover:text-[#1A1817]'
                            }`}
                          >
                            {isInCombo ? (
                              <>
                                <Check className="h-3 w-3" />
                                <span>In Visit Combo</span>
                              </>
                            ) : (
                              <>
                                <Plus className="h-3 w-3" />
                                <span>Add to Visit</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicative pricing disclaimer */}
        <p className="mt-8 text-center text-xs text-[#5E554E]">
          *Indicative starting prices &amp; durations shown for reference. Exact quotes vary
          by hair length, texture, and personalized consultation at the salon.
        </p>
      </div>
    </section>
  );
}
