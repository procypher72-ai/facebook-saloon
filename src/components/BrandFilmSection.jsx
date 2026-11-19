import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Sparkles,
  Film,
  ArrowRight,
} from 'lucide-react';
import salonBrandFilm from '../assets/gemini_generated_video_76462383.mp4';
import { MagneticButton } from './MotionPrimitives';

const FILM_CHAPTERS = [
  {
    number: '01',
    title: 'Precision Shears',
    subtitle: 'Slow-motion stainless-steel mastery',
    fraction: 0,
  },
  {
    number: '02',
    title: 'Keratin Silk',
    subtitle: 'Mirror-shine flowing hair glow',
    fraction: 0.25,
  },
  {
    number: '03',
    title: 'Radiance Skincare',
    subtitle: 'Serene warm-lit facial rituals',
    fraction: 0.5,
  },
  {
    number: '04',
    title: 'Family Sanctuary',
    subtitle: 'Warm gold & cream salon stations',
    fraction: 0.75,
  },
];

function formatTime(secs) {
  if (!secs || Number.isNaN(secs)) return '00:00';
  const total = Math.floor(secs);
  const mins = String(Math.floor(total / 60)).padStart(2, '0');
  const rem = String(total % 60).padStart(2, '0');
  return `${mins}:${rem}`;
}

export default function BrandFilmSection() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const isInView = useInView(frameRef, { amount: 0.35 });

  const [isPlaying, setIsPlaying] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [theaterOpen, setTheaterOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
  });

  const frameScale = useTransform(
    smoothScroll,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0.95, 1]
  );
  const frameY = useTransform(
    smoothScroll,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [26, 0]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (theaterOpen) {
      video.pause();
      return;
    }

    if (isInView && !userPaused) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    } else if (!isInView) {
      video.pause();
    }
  }, [isInView, userPaused, theaterOpen]);

  useEffect(() => {
    if (!theaterOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setTheaterOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [theaterOpen]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      video.play().catch(() => {});
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeek = (fraction) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    video.currentTime = Math.max(0, Math.min(duration, duration * fraction));
    setCurrentTime(video.currentTime);
    setProgress(fraction * 100);
    if (video.paused) {
      setUserPaused(false);
      video.play().catch(() => {});
    }
  };

  const handleProgressBarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width) return;
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    handleSeek(fraction);
  };

  const activeChapterIdx =
    progress < 25 ? 0 : progress < 50 ? 1 : progress < 75 ? 2 : 3;

  return (
    <section
      ref={sectionRef}
      id="brand-film"
      className="luxury-grain relative scroll-mt-20 overflow-hidden bg-[#141211] py-20 sm:py-28 text-[#FAF8F5]"
    >
      {/* Warm champagne cinema ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-55 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(197,155,109,0.22) 0%, rgba(184,125,86,0.06) 45%, rgba(20,18,17,0) 74%)',
        }}
      />

      <div className="site-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C59B6D]/35 bg-[#FAF8F5]/[0.05] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#DFC3A0]">
              <Film className="h-3.5 w-3.5" />
              Inside FACEBOOK-3 · Official Brand Film
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-[#FAF8F5] sm:text-5xl xl:text-[3.35rem]">
              Step Inside Bharuch’s{' '}
              <span className="font-display-serif italic font-medium text-gold-foil-light">
                Luxury Family Salon
              </span>
            </h2>
            <p className="mt-3 text-base xl:text-lg leading-relaxed text-[#FAF8F5]/72">
              Experience the artistry, warm champagne ambience, silky keratin finishes,
              and serene skincare rituals waiting for you at City Centre Mall.
            </p>
          </div>

          <div className="self-start lg:self-auto">
            <MagneticButton>
              <a
                href="#book"
                className="btn-shimmer group inline-flex items-center gap-2.5 rounded-full border border-[#DFC3A0]/45 bg-gradient-to-r from-[#C59B6D] to-[#DFC3A0] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#141211] shadow-[0_12px_32px_rgba(197,155,109,0.28)] transition hover:brightness-105"
              >
                <span>Experience It Live</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Scroll-Scaled Luxury Cinema Video Frame */}
        <motion.div
          ref={frameRef}
          style={{ scale: frameScale, y: frameY }}
          className="mt-10 sm:mt-12"
        >
          <div className="relative p-2 sm:p-3 rounded-[2.3rem] border border-[#C59B6D]/30 bg-gradient-to-b from-[#FAF8F5]/[0.06] to-[#FAF8F5]/[0.02] shadow-[0_36px_90px_rgba(0,0,0,0.55)]">
            {/* Architectural Gold Corner Accents */}
            <span aria-hidden="true" className="pointer-events-none absolute left-5 top-5 z-30 h-5 w-5 border-l-2 border-t-2 border-[#DFC3A0]/65 rounded-tl-md" />
            <span aria-hidden="true" className="pointer-events-none absolute right-5 top-5 z-30 h-5 w-5 border-r-2 border-t-2 border-[#DFC3A0]/65 rounded-tr-md" />

            <div className="group relative overflow-hidden rounded-[1.8rem] border border-[#C59B6D]/35 bg-black">
              {/* Widescreen Cinema Viewport */}
              <div className="relative aspect-[16/9] max-h-[700px] w-full overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  src={salonBrandFilm}
                  poster="/images/hero-salon.jpg"
                  muted={isMuted}
                  loop
                  playsInline
                  preload="metadata"
                  onClick={togglePlay}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
                  onTimeUpdate={(e) => {
                    const vid = e.currentTarget;
                    setCurrentTime(vid.currentTime || 0);
                    if (vid.duration > 0) {
                      setProgress((vid.currentTime / vid.duration) * 100);
                    }
                  }}
                  className="h-full w-full object-cover cursor-pointer"
                />

                {/* Cinematic vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141211]/82 via-transparent to-[#141211]/38" />

                {/* Top Editorial HUD */}
                <div className="absolute inset-x-4 top-4 sm:inset-x-6 sm:top-6 z-20 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#141211]/72 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#DFC3A0] backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      {isPlaying && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#DFC3A0] opacity-75" />
                      )}
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C59B6D]" />
                    </span>
                    <span className="hidden sm:inline">FB3 Atelier · Cinema Reel</span>
                    <span className="sm:hidden">Cinema Reel</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute brand film' : 'Mute brand film'}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#141211]/72 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FAF8F5] backdrop-blur-md transition hover:border-[#DFC3A0]/60 hover:bg-[#141211] cursor-pointer"
                    >
                      {isMuted ? (
                        <VolumeX className="h-3.5 w-3.5 text-[#DFC3A0]" />
                      ) : (
                        <Volume2 className="h-3.5 w-3.5 text-[#DFC3A0]" />
                      )}
                      <span className="hidden sm:inline">
                        {isMuted ? 'Sound Off' : 'Sound On'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTheaterOpen(true)}
                      aria-label="Open brand film in theater mode"
                      data-cursor="view"
                      className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/15 bg-[#141211]/72 text-[#FAF8F5] backdrop-blur-md transition hover:border-[#DFC3A0]/60 hover:bg-[#C59B6D] hover:text-[#141211] cursor-pointer"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Center Pause Indicator Overlay */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.button
                      type="button"
                      onClick={togglePlay}
                      aria-label="Play brand film"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                      className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 sm:h-20 sm:w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#DFC3A0]/70 bg-[#141211]/82 text-[#DFC3A0] shadow-[0_18px_45px_rgba(0,0,0,0.55)] backdrop-blur-md transition hover:scale-105 hover:bg-[#C59B6D] hover:text-[#141211] cursor-pointer"
                    >
                      <Play className="ml-1 h-7 w-7 fill-current" />
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Bottom Glassmorphic Scrub Bar & Timecode */}
                <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 z-20 flex items-center gap-3 sm:gap-4 rounded-2xl border border-white/12 bg-[#141211]/78 px-3.5 py-2.5 sm:px-5 sm:py-3 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause brand film' : 'Play brand film'}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FAF8F5]/12 text-[#DFC3A0] transition hover:bg-[#C59B6D] hover:text-[#141211] cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause className="h-3.5 w-3.5 fill-current" />
                    ) : (
                      <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                    )}
                  </button>

                  <span className="hidden md:inline-block font-mono text-[11px] tracking-wider text-[#FAF8F5]/75 tabular-nums">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>

                  {/* Interactive champagne-gold progress scrubber */}
                  <button
                    type="button"
                    onClick={handleProgressBarClick}
                    aria-label="Seek brand film timeline"
                    className="group/scrub relative flex h-5 flex-1 items-center cursor-pointer"
                  >
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#FAF8F5]/20 transition-all group-hover/scrub:h-2">
                      <div
                        style={{ width: `${progress}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-[#B87D56] via-[#DFC3A0] to-[#FFF2DC] transition-[width] duration-150"
                      />
                    </div>
                  </button>

                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#DFC3A0]">
                    <Sparkles className="h-3 w-3" />
                    {FILM_CHAPTERS[activeChapterIdx].title}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Interactive Dark Atelier Scene Chapter Cards */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {FILM_CHAPTERS.map((chapter, idx) => {
              const isActive = activeChapterIdx === idx;
              return (
                <button
                  key={chapter.number}
                  type="button"
                  onClick={() => handleSeek(chapter.fraction)}
                  className={`group relative overflow-hidden rounded-2xl border p-4 sm:p-5 text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'border-[#C59B6D]/65 bg-[#FAF8F5]/[0.09] text-[#FAF8F5] shadow-[0_14px_34px_rgba(0,0,0,0.35)]'
                      : 'border-[#FAF8F5]/10 bg-[#FAF8F5]/[0.03] text-[#FAF8F5]/78 hover:border-[#C59B6D]/40 hover:bg-[#FAF8F5]/[0.06]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilmChapterBar"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-[#B87D56] via-[#DFC3A0] to-[#C59B6D]"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10.5px] font-bold uppercase tracking-[0.24em] ${
                        isActive ? 'text-[#DFC3A0]' : 'text-[#C59B6D]/75'
                      }`}
                    >
                      Scene {chapter.number}
                    </span>
                    <Play
                      className={`h-3 w-3 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-[#DFC3A0] fill-current' : 'text-[#FAF8F5]/40'
                      }`}
                    />
                  </div>
                  <p className="mt-2 font-serif text-base sm:text-lg font-semibold text-[#FAF8F5]">
                    {chapter.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-[#FAF8F5]/62">
                    {chapter.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Theater Lightbox Modal */}
      <AnimatePresence>
        {theaterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setTheaterOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#141211]/95 p-4 sm:p-8 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="FACEBOOK-3 Unisex Family Salon Brand Film Theater"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-[#C59B6D]/45 bg-black shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setTheaterOpen(false)}
                aria-label="Close theater view"
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#141211]/80 text-[#FAF8F5] backdrop-blur-md transition hover:bg-[#C59B6D] hover:text-[#141211] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
              <video
                src={salonBrandFilm}
                controls
                autoPlay
                playsInline
                className="max-h-[85vh] w-full bg-black object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
