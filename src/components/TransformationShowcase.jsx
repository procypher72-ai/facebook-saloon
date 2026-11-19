import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scissors,
  Sparkles,
  Clock,
  ArrowRight,
  MoveHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { TRANSFORMATIONS } from '../data/salonData';
import { MagneticButton } from './MotionPrimitives';

export default function TransformationShowcase({ onSelectService }) {
  const [activeId, setActiveId] = useState(TRANSFORMATIONS[0].id);
  const [splitPercent, setSplitPercent] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef(null);

  const active =
    TRANSFORMATIONS.find((item) => item.id === activeId) || TRANSFORMATIONS[0];

  const updateSplitFromClientX = (clientX) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(8, Math.min(92, raw));
    setSplitPercent(clamped);
    if (!hasInteracted) setHasInteracted(true);
  };

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateSplitFromClientX(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updateSplitFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSplitPercent((p) => Math.max(8, p - 6));
      setHasInteracted(true);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSplitPercent((p) => Math.min(92, p + 6));
      setHasInteracted(true);
    }
  };

  const handleSelectPreset = (id) => {
    setActiveId(id);
    setSplitPercent(50);
  };

  return (
    <section
      id="transformations"
      className="atelier-paper relative scroll-mt-20 overflow-hidden bg-[#FAF8F5] py-20 sm:py-28"
    >
      <div className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-12 xl:gap-16">
          {/* Left Editorial Narrative & Visual Thumbnail Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#B87D56]">
              <Sparkles className="h-3.5 w-3.5" />
              Interactive Transformation Preview
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#1A1817] sm:text-5xl xl:text-[3.3rem]">
              Slide the Shears to{' '}
              <span className="font-display-serif italic font-medium text-gold-foil">
                Reveal the Glow
              </span>
            </h2>
            <p className="mt-4 text-base xl:text-[1.06rem] leading-relaxed text-[#5E554E]">
              Drag the golden scissors handle left or right to experience the luminous
              difference our signature keratin, dimensional balayage, and festive glam
              sessions bring to life.
            </p>

            {/* Visual Thumbnail Preset Tabs */}
            <div
              role="tablist"
              aria-label="Choose salon transformation preview"
              className="mt-7 grid grid-cols-3 gap-2.5"
            >
              {TRANSFORMATIONS.map((item) => {
                const isActive = item.id === active.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectPreset(item.id)}
                    className={`group relative flex flex-col items-center gap-2 rounded-2xl border p-2.5 text-center transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#C59B6D] bg-[#1A1817] text-[#FAF8F5] shadow-[0_12px_28px_rgba(26,24,23,0.16)]'
                        : 'border-[#1A1817]/10 bg-white/85 text-[#5E554E] hover:border-[#C59B6D]/55 hover:text-[#1A1817]'
                    }`}
                  >
                    <div
                      className={`h-11 w-11 overflow-hidden rounded-full border-2 transition ${
                        isActive ? 'border-[#DFC3A0]' : 'border-[#E7DFD3]'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.tabLabel}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <span className="text-[11px] font-semibold leading-tight">
                      {item.tabLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Transformation Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="atelier-card mt-5 rounded-3xl border border-[#C59B6D]/30 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A1817]">
                    {active.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C59B6D]/35 bg-[#F2EDE6] px-3 py-1 text-xs font-semibold text-[#9E653F]">
                    <Clock className="h-3.5 w-3.5" />
                    {active.duration}
                  </span>
                </div>
                <p className="mt-2.5 text-sm xl:text-[15px] leading-relaxed text-[#5E554E]">
                  {active.resultNote}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#1A1817]/8 pt-5">
                  <MagneticButton>
                    <button
                      type="button"
                      onClick={() => onSelectService(active.serviceTitle)}
                      className="btn-shimmer group inline-flex items-center gap-2.5 rounded-full bg-[#1A1817] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#FAF8F5] shadow-md transition-colors hover:bg-[#B87D56] cursor-pointer"
                    >
                      <span>Book This Look</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </MagneticButton>
                  <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B87D56]">
                    {Math.round(100 - splitPercent)}% After
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Draggable Before / After Curtain in Champagne Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-[2.35rem] border border-[#C59B6D]/35 bg-[#F2EDE6]/80 p-2.5 sm:p-3 shadow-[0_28px_72px_rgba(26,24,23,0.14)]">
              <div
                ref={stageRef}
                data-cursor="drag"
                role="slider"
                tabIndex={0}
                aria-label={`Compare before and after for ${active.title}. Use left and right arrow keys or drag handle.`}
                aria-valuemin={8}
                aria-valuemax={92}
                aria-valuenow={Math.round(splitPercent)}
                onKeyDown={handleKeyDown}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="relative aspect-[4/3] sm:aspect-[16/10.5] w-full overflow-hidden rounded-[1.8rem] border border-[#C59B6D]/35 bg-[#1A1817] select-none touch-none cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-[#C59B6D]"
              >
                {/* Full-bleed AFTER (Radiant Styled Result) */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`after-${active.id}`}
                    src={active.image}
                    alt={active.afterLabel}
                    initial={{ opacity: 0.4, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.45 }}
                    draggable={false}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                {/* Clipped BEFORE Layer */}
                <div
                  style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                  <img
                    src={active.image}
                    alt={active.beforeLabel}
                    draggable={false}
                    style={{ filter: active.beforeFilter }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#1A1817]/18" />
                </div>

                {/* Subtle bottom gradient for badge legibility */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#141211]/75 via-[#141211]/20 to-transparent" />

                {/* Smart Auto-Fading Before / After Badges */}
                <div
                  style={{ opacity: splitPercent < 24 ? 0.25 : 1 }}
                  className="pointer-events-none absolute left-4 top-4 sm:left-6 sm:top-6 z-10 transition-opacity duration-200"
                >
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-[#141211]/75 px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#FAF8F5]/90 backdrop-blur-md">
                    {active.beforeLabel}
                  </span>
                </div>
                <div
                  style={{ opacity: splitPercent > 76 ? 0.25 : 1 }}
                  className="pointer-events-none absolute right-4 bottom-4 sm:right-6 sm:bottom-6 z-10 transition-opacity duration-200"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DFC3A0]/55 bg-[#141211]/85 px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#DFC3A0] backdrop-blur-md">
                    <Sparkles className="h-3 w-3" />
                    {active.afterLabel}
                  </span>
                </div>

                {/* Golden Vertical Divider Line + Draggable Tactile Shears Handle */}
                <div
                  style={{ left: `${splitPercent}%` }}
                  className="pointer-events-none absolute inset-y-0 z-20 -translate-x-1/2"
                >
                  <div className="h-full w-[2px] bg-gradient-to-b from-[#DFC3A0]/40 via-[#FFF2DC] to-[#DFC3A0]/40 shadow-[0_0_18px_rgba(223,195,160,0.85)]" />

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    <ChevronLeft className="h-4 w-4 text-[#FFF2DC] drop-shadow-md" />
                    <div className="relative">
                      {!hasInteracted && (
                        <span className="absolute -inset-2.5 animate-ping rounded-full bg-[#DFC3A0]/35" />
                      )}
                      <motion.div
                        animate={
                          isDragging
                            ? { scale: 1.12 }
                            : !hasInteracted
                              ? { scale: [1, 1.07, 1] }
                              : { scale: 1 }
                        }
                        transition={
                          !hasInteracted && !isDragging
                            ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                            : { type: 'spring', stiffness: 360, damping: 24 }
                        }
                        className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#DFC3A0] bg-[#141211] text-[#DFC3A0] shadow-[0_14px_34px_rgba(0,0,0,0.5)]"
                      >
                        <span className="pointer-events-none absolute inset-1 rounded-full border border-[#DFC3A0]/35" />
                        <Scissors className="h-5 w-5 -rotate-45" />
                      </motion.div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#FFF2DC] drop-shadow-md" />
                  </div>
                </div>

                {/* Subtle First-Time Drag Hint */}
                <AnimatePresence>
                  {!hasInteracted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="pointer-events-none absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#FAF8F5]/94 px-3.5 py-1.5 text-[11px] font-semibold text-[#1A1817] shadow-sm backdrop-blur-md"
                    >
                      <MoveHorizontal className="h-3.5 w-3.5 text-[#B87D56]" />
                      <span>Drag to compare</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
