import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Expand, X, Sparkles, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../data/salonData';

export default function GallerySection({ onSelectService }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxState, setLightboxState] = useState({ item: null, direction: 0 });
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imagePanEven = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['-5%', '5%']);
  const imagePanOdd = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['5%', '-5%']);

  const visibleItems =
    activeFilter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const lightboxItem = lightboxState.item;
  const activeLightboxIndex = lightboxItem
    ? visibleItems.findIndex((i) => i.id === lightboxItem.id)
    : -1;

  const openLightbox = (item) => setLightboxState({ item, direction: 0 });
  const closeLightbox = () => setLightboxState({ item: null, direction: 0 });

  const stepLightbox = (dir) => {
    if (visibleItems.length < 2 || activeLightboxIndex === -1) return;
    const nextIdx =
      (activeLightboxIndex + dir + visibleItems.length) % visibleItems.length;
    setLightboxState({ item: visibleItems[nextIdx], direction: dir });
  };

  useEffect(() => {
    if (!lightboxItem) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxState({ item: null, direction: 0 });
      } else if (e.key === 'ArrowRight') {
        setLightboxState((prev) => {
          if (!prev.item || visibleItems.length < 2) return prev;
          const idx = visibleItems.findIndex((i) => i.id === prev.item.id);
          if (idx === -1) return prev;
          return {
            item: visibleItems[(idx + 1) % visibleItems.length],
            direction: 1,
          };
        });
      } else if (e.key === 'ArrowLeft') {
        setLightboxState((prev) => {
          if (!prev.item || visibleItems.length < 2) return prev;
          const idx = visibleItems.findIndex((i) => i.id === prev.item.id);
          if (idx === -1) return prev;
          return {
            item: visibleItems[(idx - 1 + visibleItems.length) % visibleItems.length],
            direction: -1,
          };
        });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxItem, visibleItems]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative scroll-mt-20 bg-[#F2EDE6]/65 py-20 sm:py-28"
    >
      <div className="site-container">
        {/* Header + Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#B87D56]">
              <Sparkles className="h-3.5 w-3.5" />
              Style &amp; Salon Lookbook
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#1A1817] sm:text-5xl xl:text-[3.3rem]">
              Modern Looks for{' '}
              <span className="font-display-serif italic font-medium text-gold-foil">
                Men, Women &amp; Families
              </span>
            </h2>
            <p className="mt-3 text-base xl:text-[1.06rem] text-[#5E554E]">
              Explore real salon inspirations—precision fades, luminous balayage,
              mirror-smooth keratin, festive glam, and tranquil spa rituals.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter gallery images"
            className="inline-flex flex-wrap gap-1.5 rounded-full border border-[#1A1817]/10 bg-[#FAF8F5] p-1.5 shadow-xs self-start lg:self-auto"
          >
            {GALLERY_CATEGORIES.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(category)}
                  className={`relative rounded-full px-4 py-2 text-xs sm:text-[13px] font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#FAF8F5]'
                      : 'text-[#5E554E] hover:text-[#1A1817]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeGalleryTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#1A1817]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Responsive Editorial Bento Lookbook Grid */}
        <motion.div
          layout
          className="mt-12 grid auto-rows-[250px] sm:auto-rows-[275px] xl:auto-rows-[305px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, idx) => {
              const serial = String(idx + 1).padStart(2, '0');
              return (
                <motion.button
                  layout
                  key={item.id}
                  type="button"
                  data-cursor="view"
                  onClick={() => openLightbox(item)}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.08 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{
                    duration: 0.55,
                    delay: (idx % 4) * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className={`group gallery-sheen relative overflow-hidden rounded-[1.85rem] border border-[#1A1817]/10 bg-[#E7DFD3] text-left shadow-[0_10px_30px_rgba(26,24,23,0.06)] transition-shadow duration-300 hover:border-[#C59B6D]/65 hover:shadow-[0_24px_54px_rgba(26,24,23,0.18)] focus:outline-none focus:ring-2 focus:ring-[#C59B6D] cursor-pointer ${
                    activeFilter === 'All' ? item.span : ''
                  }`}
                >
                  <motion.div
                    style={{ y: idx % 2 === 0 ? imagePanEven : imagePanOdd, scale: 1.14 }}
                    className="h-full w-full"
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141211]/86 via-[#141211]/18 to-[#141211]/10 opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

                  {/* Top Row: Editorial Index + Expand Icon */}
                  <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-between">
                    <span className="rounded-full border border-white/15 bg-[#141211]/60 px-2.5 py-0.5 font-display-serif text-xs font-semibold tracking-widest text-[#DFC3A0] backdrop-blur-md">
                      {serial}
                    </span>
                    <span className="flex h-9 w-9 scale-75 items-center justify-center rounded-full border border-white/25 bg-[#141211]/65 text-[#FAF8F5] opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <Expand className="h-4 w-4" />
                    </span>
                  </div>

                  {/* Bottom Editorial Caption */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-5 text-[#FAF8F5] transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-block rounded-full border border-[#DFC3A0]/35 bg-[#141211]/55 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#DFC3A0] backdrop-blur-sm">
                        {item.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#DFC3A0] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Inspect
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-lg sm:text-xl font-medium leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#FAF8F5]/78 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Enhanced Editorial Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#141211]/92 p-4 backdrop-blur-lg"
            role="dialog"
            aria-modal="true"
            aria-label={lightboxItem.title}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="luxury-grain relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-[#C59B6D]/40 bg-[#141211] shadow-2xl"
            >
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close image preview"
                className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#141211]/80 text-[#FAF8F5] backdrop-blur-md transition hover:bg-[#C59B6D] hover:text-[#141211] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Main Slide Stage */}
              <div className="relative flex h-[54vh] sm:h-[60vh] items-center justify-center overflow-hidden bg-black/50">
                {visibleItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => stepLightbox(-1)}
                      aria-label="Previous gallery look"
                      className="absolute left-3 sm:left-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#141211]/75 text-[#FAF8F5] backdrop-blur-md transition hover:border-[#DFC3A0] hover:bg-[#C59B6D] hover:text-[#141211] cursor-pointer"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => stepLightbox(1)}
                      aria-label="Next gallery look"
                      className="absolute right-3 sm:right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#141211]/75 text-[#FAF8F5] backdrop-blur-md transition hover:border-[#DFC3A0] hover:bg-[#C59B6D] hover:text-[#141211] cursor-pointer"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                <AnimatePresence mode="wait" custom={lightboxState.direction}>
                  <motion.img
                    key={lightboxItem.id}
                    src={lightboxItem.image}
                    alt={lightboxItem.alt}
                    initial={{
                      opacity: 0,
                      x: lightboxState.direction * 45,
                      scale: 0.98,
                    }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      x: lightboxState.direction * -45,
                      scale: 0.98,
                    }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="max-h-full max-w-full object-contain px-14 py-4"
                  />
                </AnimatePresence>

                <span className="absolute bottom-3 left-4 z-20 hidden sm:inline-block rounded-full bg-[#141211]/75 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#FAF8F5]/60 backdrop-blur-md">
                  ← / → Navigate · ESC Close
                </span>
                <span className="absolute bottom-3 right-4 z-20 rounded-full bg-[#141211]/80 px-3 py-1 text-[11px] font-semibold tracking-widest text-[#DFC3A0] backdrop-blur-md">
                  {activeLightboxIndex + 1} / {visibleItems.length}
                </span>
              </div>

              {/* Caption + Direct Pre-filled Booking CTA */}
              <div className="relative z-20 flex flex-col justify-between gap-3 border-t border-[#FAF8F5]/10 p-5 sm:p-6 text-[#FAF8F5] sm:flex-row sm:items-center">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#DFC3A0]">
                    {lightboxItem.category} · FACEBOOK-3 UNISEX FAMILY SALON
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl font-medium">
                    {lightboxItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FAF8F5]/75">
                    {lightboxItem.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const targetService = lightboxItem.serviceTitle || 'Haircuts & Styling';
                    closeLightbox();
                    if (onSelectService) {
                      onSelectService(targetService);
                    }
                  }}
                  className="btn-shimmer shrink-0 rounded-full bg-gradient-to-r from-[#C59B6D] to-[#DFC3A0] px-5 py-2.5 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#141211] transition hover:brightness-105 cursor-pointer"
                >
                  Book This Look
                </button>
              </div>

              {/* Thumbnail Filmstrip */}
              {visibleItems.length > 1 && (
                <div className="relative z-20 flex items-center gap-2 overflow-x-auto border-t border-[#FAF8F5]/10 bg-black/35 px-5 py-3">
                  {visibleItems.map((thumb, idx) => {
                    const isCurrent = thumb.id === lightboxItem.id;
                    return (
                      <button
                        key={thumb.id}
                        type="button"
                        onClick={() =>
                          setLightboxState({
                            item: thumb,
                            direction: idx >= activeLightboxIndex ? 1 : -1,
                          })
                        }
                        aria-label={`View ${thumb.title}`}
                        className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border transition-all cursor-pointer ${
                          isCurrent
                            ? 'border-[#DFC3A0] ring-2 ring-[#DFC3A0]/40 opacity-100 scale-105'
                            : 'border-white/15 opacity-55 hover:opacity-90'
                        }`}
                      >
                        <img
                          src={thumb.image}
                          alt={thumb.title}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
