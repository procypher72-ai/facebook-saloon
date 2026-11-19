import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useInView,
  animate,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUp, MessageCircle, Phone, Calendar } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

/**
 * Razor-thin champagne gold scroll progress indicator along the sticky header.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#B87D56] via-[#DFC3A0] to-[#C59B6D]"
    />
  );
}

/**
 * Interactive pointer-tracking champagne spotlight + subtle 3D spring micro-tilt card.
 */
export function SpotlightCard({ children, className = '', as = 'div', ...props }) {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, { stiffness: 220, damping: 24 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 220, damping: 24 });

  const spotlightBg = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(197, 155, 109, 0.16), transparent 72%)`;

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    rotateX.set(-py * 4.5);
    rotateY.set(px * 4.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(-300);
    mouseY.set(-300);
    rotateX.set(0);
    rotateY.set(0);
  };

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        shouldReduceMotion
          ? undefined
          : {
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              transformPerspective: 1100,
              transformStyle: 'preserve-3d',
            }
      }
      className={`relative ${className}`}
      {...props}
    >
      {/* Dynamic golden spotlight aura following the cursor */}
      <motion.div
        aria-hidden="true"
        style={{ background: spotlightBg }}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </MotionTag>
  );
}

/**
 * Smooth animated decimal/integer counter triggered once when scrolled into view.
 */
export function AnimatedCounter({ value = 4.8, decimals = 1, duration = 1.4, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (shouldReduceMotion) {
      node.textContent = value.toFixed(decimals);
      return;
    }
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        node.textContent = latest.toFixed(decimals);
      },
    });

    return () => controls.stop();
  }, [isInView, value, decimals, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {shouldReduceMotion ? value.toFixed(decimals) : (0).toFixed(decimals)}
    </span>
  );
}

/**
 * Magnetic spring wrapper for luxury primary CTAs on desktop pointers.
 */
export function MagneticButton({ children, className = '', strength = 0.22 }) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shouldReduceMotion ? undefined : { x: smoothX, y: smoothY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Floating luxury WhatsApp Concierge + Back-to-Top cluster (desktop)
 * plus a refined mobile bottom sticky action dock when scrolled.
 */
export function FloatingBackToTop({ hasEstimatorBar = false }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello FACEBOOK-3 Unisex Family Salon! I would like to inquire about booking an appointment at City Centre Mall, Bharuch.'
  )}`;

  return (
    <>
      {/* Desktop / Tablet Floating Concierge Cluster */}
      <div
        className={`hidden sm:flex fixed right-5 z-40 flex-col items-end gap-3 transition-all duration-300 ${
          hasEstimatorBar ? 'bottom-24 lg:bottom-6' : 'bottom-6'
        }`}
      >
        {/* Floating WhatsApp Salon Concierge */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp with FACEBOOK-3 Unisex Family Salon"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.07, y: -2 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 360, damping: 24 }}
          className="group relative flex h-12 items-center gap-2 rounded-full border border-[#C59B6D]/55 bg-[#141211]/95 px-4 text-[#DFC3A0] shadow-[0_14px_34px_rgba(26,24,23,0.3)] backdrop-blur-md transition-colors hover:border-[#25D366]/65 hover:bg-[#1E3A2F] hover:text-white"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <MessageCircle className="h-4.5 w-4.5" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
            WhatsApp
          </span>
        </motion.a>

        {/* Spring Back-to-Top Pill */}
        <AnimatePresence>
          {visible && (
            <motion.button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll back to top"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 20 }}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 360, damping: 24 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C59B6D]/55 bg-[#141211]/92 text-[#DFC3A0] shadow-[0_14px_34px_rgba(26,24,23,0.28)] backdrop-blur-md transition-colors hover:bg-[#B87D56] hover:text-[#FAF8F5] cursor-pointer"
            >
              <ArrowUp className="h-4.5 w-4.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Sleek Mobile-Only Bottom Concierge Dock (auto-hides when Visit Estimator bar is open) */}
      <AnimatePresence>
        {visible && !hasEstimatorBar && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="sm:hidden fixed bottom-4 left-4 right-4 z-40"
          >
            <div className="flex items-center justify-between gap-2 rounded-full border border-[#C59B6D]/50 bg-[#141211]/95 p-1.5 text-[#FAF8F5] shadow-[0_18px_45px_rgba(20,18,17,0.45)] backdrop-blur-xl">
              <a
                href={SALON_INFO.phones[0].href}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FAF8F5]/90"
              >
                <Phone className="h-3.5 w-3.5 text-[#DFC3A0]" />
                <span>Call</span>
              </a>
              <span className="h-5 w-[1px] bg-[#FAF8F5]/15" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-300"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="#book"
                className="btn-shimmer flex flex-[1.2] items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#C59B6D] to-[#DFC3A0] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#141211]"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Book</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
