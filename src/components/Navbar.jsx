import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, Menu, X, MapPin, Star, Clock } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { ScrollProgressBar, MagneticButton } from './MotionPrimitives';

const NAV_LINKS = [
  { label: 'Brand Film', href: '#brand-film', id: 'brand-film' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Transformations', href: '#transformations', id: 'transformations' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Lookbook', href: '#gallery', id: 'gallery' },
  { label: 'Location', href: '#location', id: 'location' },
];

function getLiveSalonStatus() {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 10 && hour < 20) {
    return { label: 'Open Now · Until 9:00 PM', isOpen: true };
  }
  if (hour === 20) {
    return { label: 'Open Now · Closing at 9:00 PM', isOpen: true };
  }
  return { label: 'Opens Daily · 10:00 AM – 9:00 PM', isOpen: false };
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const liveStatus = getLiveSalonStatus();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-28% 0px -52% 0px', threshold: [0.1, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* Slim Editorial Atelier Announcement Ribbon (collapses smoothly on scroll) */}
      <div
        className={`hidden md:block overflow-hidden bg-[#141211] text-[#FAF8F5] transition-all duration-300 ${
          scrolled ? 'max-h-0 opacity-0 border-b-0' : 'max-h-11 opacity-100 border-b border-[#C59B6D]/25'
        }`}
      >
        <div className="site-container flex h-9 items-center justify-between text-[11px] tracking-[0.14em] uppercase">
          <div className="flex items-center gap-5 text-[#FAF8F5]/80">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                {liveStatus.isOpen && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                    liveStatus.isOpen ? 'bg-emerald-400' : 'bg-[#DFC3A0]'
                  }`}
                />
              </span>
              <span className="text-[#DFC3A0] font-semibold">{liveStatus.label}</span>
            </span>
            <span className="h-3 w-[1px] bg-[#FAF8F5]/15" />
            <a
              href="#location"
              className="inline-flex items-center gap-1.5 transition hover:text-[#DFC3A0]"
            >
              <MapPin className="h-3 w-3 text-[#C59B6D]" />
              <span>City Centre Mall · Shop 164–175, Bharuch</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-[#FAF8F5]/80">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#DFC3A0]">
              <Star className="h-3 w-3 fill-[#C59B6D] text-[#C59B6D]" />
              <span>4.8★ Rated on Justdial</span>
            </span>
            <span className="h-3 w-[1px] bg-[#FAF8F5]/15" />
            <a
              href={SALON_INFO.phones[1].href}
              className="transition hover:text-[#DFC3A0]"
            >
              Landline: {SALON_INFO.phones[1].display}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Surface */}
      <div
        className={`relative transition-all duration-300 ${
          scrolled
            ? 'border-b border-[#C59B6D]/25 bg-[#FAF8F5]/94 shadow-[0_12px_36px_rgba(26,24,23,0.08)] backdrop-blur-xl'
            : 'border-b border-[#1A1817]/8 bg-[#FAF8F5]/88 backdrop-blur-md'
        }`}
      >
        <div className="site-container flex items-center justify-between py-3 lg:py-3.5">
          {/* Bespoke FB3 Monogram Crest + Brand Identity */}
          <a href="#top" className="group flex items-center gap-3 focus:outline-none">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#1A1817] shadow-[0_6px_18px_rgba(26,24,23,0.2)] transition-transform duration-300 group-hover:scale-105">
              <span className="pointer-events-none absolute inset-[3px] rounded-full border border-[#C59B6D]/60 transition-colors duration-300 group-hover:border-[#DFC3A0]" />
              <span className="font-display-serif text-[15px] font-semibold tracking-[0.06em] text-[#DFC3A0]">
                FB3
              </span>
            </div>
            <div className="leading-tight">
              <span className="block font-serif text-base sm:text-[1.15rem] font-semibold tracking-[0.06em] text-[#1A1817]">
                FACEBOOK-3
              </span>
              <span className="block text-[9.5px] sm:text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#B87D56]">
                Unisex Family Salon · Bharuch
              </span>
            </div>
          </a>

          {/* Desktop Nav Links with Scroll-Spy Gold Pill Line */}
          <nav aria-label="Primary" className="hidden items-center gap-7 xl:gap-9 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative py-1.5 text-[13.5px] xl:text-sm font-medium tracking-[0.02em] transition-colors ${
                    isActive
                      ? 'text-[#1A1817]'
                      : 'text-[#5E554E] hover:text-[#1A1817]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive ? (
                    <motion.span
                      layoutId="activeNavIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[#B87D56] via-[#C59B6D] to-[#DFC3A0]"
                    />
                  ) : (
                    <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 rounded-full bg-[#C59B6D]/70 transition-all duration-300 group-hover:w-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 xl:gap-3.5 md:flex">
            <a
              href={SALON_INFO.phones[0].href}
              className="group inline-flex items-center gap-2 rounded-full border border-[#1A1817]/14 bg-[#F2EDE6]/85 px-4 py-2 text-xs font-semibold tracking-wide text-[#1A1817] transition-all hover:border-[#C59B6D] hover:bg-white hover:shadow-sm"
            >
              <Phone className="h-3.5 w-3.5 text-[#B87D56] transition-transform duration-300 group-hover:rotate-12" />
              <span>{SALON_INFO.phones[0].display}</span>
            </a>
            <MagneticButton>
              <motion.a
                href="#book"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-shimmer inline-flex items-center gap-2 rounded-full border border-[#C59B6D]/40 bg-[#1A1817] px-5 xl:px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#FAF8F5] shadow-[0_8px_22px_rgba(26,24,23,0.18)] transition-colors hover:border-[#B87D56] hover:bg-[#B87D56]"
              >
                <Calendar className="h-3.5 w-3.5 text-[#DFC3A0]" />
                <span>Book Now</span>
              </motion.a>
            </MagneticButton>
          </div>

          {/* Mobile Quick Call + Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={SALON_INFO.phones[0].href}
              aria-label={`Call ${SALON_INFO.phones[0].display}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#C59B6D]/45 bg-[#F2EDE6] text-[#1A1817]"
            >
              <Phone className="h-4 w-4 text-[#B87D56]" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1A1817]/15 bg-white text-[#1A1817] shadow-xs cursor-pointer"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-[#C59B6D]/20 bg-[#FAF8F5] md:hidden"
            >
              <div className="flex flex-col space-y-1 px-5 py-5">
                <div className="mb-3 flex items-center justify-between rounded-2xl border border-[#C59B6D]/30 bg-[#1A1817] px-4 py-2.5 text-[11px] text-[#FAF8F5]">
                  <span className="inline-flex items-center gap-2 font-semibold text-[#DFC3A0]">
                    <Clock className="h-3.5 w-3.5" />
                    {liveStatus.label}
                  </span>
                  <span className="font-semibold text-[#DFC3A0]">4.8★</span>
                </div>

                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-[#1A1817] transition hover:bg-[#F2EDE6]"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-[#C59B6D]">→</span>
                  </a>
                ))}
                <div className="mt-3 flex flex-col gap-2.5 border-t border-[#1A1817]/10 pt-4">
                  <a
                    href={SALON_INFO.phones[0].href}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1A1817]/15 bg-[#F2EDE6] px-4 py-3 text-sm font-semibold text-[#1A1817]"
                  >
                    <Phone className="h-4 w-4 text-[#B87D56]" />
                    Call {SALON_INFO.phones[0].display}
                  </a>
                  <a
                    href="#book"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1A1817] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#FAF8F5]"
                  >
                    <Calendar className="h-4 w-4 text-[#DFC3A0]" />
                    Book Appointment
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gold Scroll Progress Hairline */}
        <ScrollProgressBar />
      </div>
    </header>
  );
}
