import { motion } from 'framer-motion';
import { Heart, ExternalLink, Sparkles, Play, MessageCircle, ArrowRight } from 'lucide-react';
import { InstagramIcon as Instagram, FacebookIcon as Facebook } from './SocialIcons';
import { SALON_INFO, SOCIAL_POSTS } from '../data/salonData';
import { SpotlightCard, MagneticButton } from './MotionPrimitives';

export default function SocialCommunitySection() {
  const whatsappOfferUrl = `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello FACEBOOK-3 Unisex Family Salon! Please share your latest seasonal & family combo offers in Bharuch.'
  )}`;

  return (
    <section className="atelier-paper relative bg-[#FAF8F5] py-20 sm:py-28">
      <div className="site-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#B87D56]">
              <Sparkles className="h-3.5 w-3.5" />
              Social &amp; Style Community
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#1A1817] sm:text-5xl xl:text-[3.3rem]">
              Fresh Transformations &amp;{' '}
              <span className="font-display-serif italic font-medium text-gold-foil">
                Festive Offers
              </span>
            </h2>
            <p className="mt-3 text-base xl:text-[1.06rem] text-[#5E554E]">
              Follow{' '}
              <span className="font-semibold text-[#1A1817]">Fb3 Unisex Salon</span> on
              Instagram and Facebook for daily hair reels, seasonal Bharuch festive
              packages, and real before-and-after transformations.
            </p>
          </div>

          {/* Direct Social Follow Pills */}
          <div className="flex flex-wrap gap-3">
            <a
              href={SALON_INFO.socials.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#1A1817]/15 bg-white px-5 py-2.5 text-xs font-semibold tracking-wide text-[#1A1817] shadow-xs transition hover:border-[#C59B6D] hover:bg-[#1A1817] hover:text-[#FAF8F5]"
            >
              <Instagram className="h-4 w-4 text-[#B87D56] transition-colors group-hover:text-[#DFC3A0]" />
              <span>Follow Instagram</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-65" />
            </a>
            <a
              href={SALON_INFO.socials.facebook.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#1A1817]/15 bg-white px-5 py-2.5 text-xs font-semibold tracking-wide text-[#1A1817] shadow-xs transition hover:border-[#C59B6D] hover:bg-[#1A1817] hover:text-[#FAF8F5]"
            >
              <Facebook className="h-4 w-4 text-[#B87D56] transition-colors group-hover:text-[#DFC3A0]" />
              <span>Join on Facebook</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-65" />
            </a>
          </div>
        </motion.div>

        {/* Portrait Editorial Reel / Social Cards (Distinct 4:5 Lookbook Aesthetic) */}
        <div className="mt-12 grid gap-7 md:grid-cols-3 xl:gap-8">
          {SOCIAL_POSTS.map((post, index) => {
            const isInsta = post.platform === 'Instagram';
            const isReel = post.tag.toLowerCase().includes('reel');
            const linkHref = isInsta
              ? SALON_INFO.socials.instagram.url
              : SALON_INFO.socials.facebook.url;

            return (
              <SpotlightCard
                as="a"
                key={post.id}
                href={linkHref}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 26, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group gallery-sheen relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[2rem] border border-[#1A1817]/12 bg-[#1A1817] shadow-[0_16px_42px_rgba(26,24,23,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C59B6D]/70 hover:shadow-[0_26px_60px_rgba(26,24,23,0.2)]"
              >
                {/* Full-bleed Portrait Photography */}
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141211]/92 via-[#141211]/32 to-[#141211]/25" />

                {/* Top Floating Platform + Likes Strip */}
                <div className="relative z-20 flex items-center justify-between gap-2 p-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#141211]/72 px-3 py-1 text-[11px] font-semibold text-[#DFC3A0] backdrop-blur-md">
                    {isInsta ? (
                      <Instagram className="h-3.5 w-3.5" />
                    ) : (
                      <Facebook className="h-3.5 w-3.5" />
                    )}
                    <span>{post.platform}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-[#FAF8F5]/92 px-2.5 py-1 text-xs font-semibold text-[#1A1817] backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                    <Heart className="h-3 w-3 fill-[#B87D56] text-[#B87D56]" />
                    <span>{post.likes}</span>
                  </span>
                </div>

                {/* Subtle Center Play Ring for Reel Posts */}
                {isReel && (
                  <div className="relative z-20 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#DFC3A0]/65 bg-[#141211]/55 text-[#DFC3A0] backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#C59B6D] group-hover:text-[#141211]">
                    <Play className="ml-0.5 h-5 w-5 fill-current" />
                  </div>
                )}

                {/* Bottom Glass Editorial Story Overlay */}
                <div className="relative z-20 p-5 sm:p-6 text-[#FAF8F5]">
                  <span className="inline-block text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#DFC3A0]">
                    {post.tag}
                  </span>
                  <h3 className="mt-1.5 font-serif text-xl sm:text-2xl font-medium leading-snug text-[#FAF8F5] transition-colors group-hover:text-[#DFC3A0]">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13.5px] leading-relaxed text-[#FAF8F5]/78 line-clamp-2">
                    {post.caption}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3.5 text-[11px] font-medium text-[#FAF8F5]/70">
                    <span className="truncate">{post.meta}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#DFC3A0] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Obsidian VIP Festive & Family Offers Concierge Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="luxury-grain relative mt-12 overflow-hidden rounded-[2rem] border border-[#C59B6D]/40 bg-[#141211] p-7 sm:p-9 text-[#FAF8F5] shadow-[0_24px_55px_rgba(26,24,23,0.16)]"
        >
          <div className="hairline-gold absolute inset-x-0 top-0 h-[1.5px]" />
          <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#DFC3A0]">
                <Sparkles className="h-3.5 w-3.5 sparkle-pulse" />
                Seasonal &amp; Family Packages · Bharuch
              </span>
              <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#FAF8F5]">
                Planning a Wedding, Garba Night, or Family Weekend Refresh?
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#FAF8F5]/72">
                Message our City Centre Mall desk on WhatsApp for curated family combos,
                keratin + cut bundles, and festive group makeup slots.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <MagneticButton>
                <a
                  href={whatsappOfferUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-shimmer inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#C59B6D] to-[#DFC3A0] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#141211] shadow-md transition hover:brightness-105"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Ask for Festive Offers</span>
                </a>
              </MagneticButton>
              <a
                href="#book"
                className="inline-flex items-center gap-2 rounded-full border border-[#FAF8F5]/20 bg-[#FAF8F5]/[0.06] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#FAF8F5] transition hover:border-[#DFC3A0] hover:text-[#DFC3A0]"
              >
                <span>Reserve Chair</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
