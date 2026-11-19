import { MapPin, Phone, Clock, ArrowUpRight, Sparkles } from 'lucide-react';
import { InstagramIcon as Instagram, FacebookIcon as Facebook } from './SocialIcons';
import { SALON_INFO } from '../data/salonData';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="luxury-grain relative overflow-hidden bg-[#141211] text-[#FAF8F5]">
      <div className="hairline-gold absolute inset-x-0 top-0 h-[1.5px]" />

      <div className="site-container relative z-10 pt-16 pb-10 lg:pt-20">
        {/* Pre-Footer Luxury Invitation Band */}
        <div className="mb-14 flex flex-col justify-between gap-6 rounded-[2rem] border border-[#C59B6D]/30 bg-gradient-to-r from-[#FAF8F5]/[0.06] via-[#C59B6D]/[0.08] to-[#FAF8F5]/[0.04] p-7 sm:p-9 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.26em] text-[#DFC3A0]">
              <Sparkles className="h-3.5 w-3.5 sparkle-pulse" />
              Ready for Your Next Look?
            </span>
            <h2 className="mt-2 font-serif text-2xl sm:text-4xl font-semibold text-[#FAF8F5]">
              Visit Bharuch’s{' '}
              <span className="font-display-serif italic font-medium text-gold-foil-light">
                Warm Luxury Salon
              </span>{' '}
              Today
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#book"
              className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C59B6D] to-[#DFC3A0] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#141211] shadow-md transition hover:brightness-105"
            >
              <span>Book Appointment</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={SALON_INFO.phones[0].href}
              className="inline-flex items-center gap-2 rounded-full border border-[#FAF8F5]/20 bg-[#FAF8F5]/[0.05] px-5 py-3.5 text-xs font-semibold tracking-wide text-[#FAF8F5] transition hover:border-[#DFC3A0] hover:text-[#DFC3A0]"
            >
              <Phone className="h-3.5 w-3.5 text-[#DFC3A0]" />
              <span>{SALON_INFO.phones[0].display}</span>
            </a>
          </div>
        </div>

        {/* Main Columns */}
        <div className="grid gap-12 xl:gap-16 border-b border-[#FAF8F5]/10 pb-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column with FB3 Monogram Crest */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C59B6D]/55 bg-[#221E1C] text-[#DFC3A0]">
                <span className="pointer-events-none absolute inset-[3px] rounded-full border border-[#C59B6D]/35" />
                <span className="font-display-serif text-base font-semibold tracking-wider">
                  FB3
                </span>
              </span>
              <div>
                <h2 className="font-serif text-xl font-semibold tracking-wide text-[#FAF8F5]">
                  {SALON_INFO.name}
                </h2>
                <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#C59B6D]">
                  Facebook Unisex Salon · Fb3 Unisex Salon
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#FAF8F5]/68">
              Precision cuts, radiant hair color, silky keratin smoothing, glowing
              skincare, festive makeup, and relaxing foot therapy—welcoming men,
              women, and families across Bharuch, Gujarat.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SALON_INFO.socials.instagram.url}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FAF8F5]/15 bg-[#FAF8F5]/5 text-[#DFC3A0] transition hover:border-[#C59B6D] hover:bg-[#C59B6D] hover:text-[#141211]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SALON_INFO.socials.facebook.url}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FAF8F5]/15 bg-[#FAF8F5]/5 text-[#DFC3A0] transition hover:border-[#C59B6D] hover:bg-[#C59B6D] hover:text-[#141211]"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C59B6D]">
              Explore Salon
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#FAF8F5]/75">
              <li>
                <a href="#brand-film" className="transition hover:text-[#DFC3A0]">
                  Official Brand Film
                </a>
              </li>
              <li>
                <a href="#services" className="transition hover:text-[#DFC3A0]">
                  Services &amp; Tariff Menu
                </a>
              </li>
              <li>
                <a href="#transformations" className="transition hover:text-[#DFC3A0]">
                  Before &amp; After Studio
                </a>
              </li>
              <li>
                <a href="#gallery" className="transition hover:text-[#DFC3A0]">
                  Style &amp; Salon Lookbook
                </a>
              </li>
              <li>
                <a href="#about" className="transition hover:text-[#DFC3A0]">
                  Why Choose Fb3
                </a>
              </li>
              <li>
                <a href="#book" className="transition hover:text-[#DFC3A0]">
                  Reserve Your Chair
                </a>
              </li>
            </ul>
          </div>

          {/* Visit & Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C59B6D]">
              Visit Us in Bharuch
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-[#FAF8F5]/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C59B6D]" />
                <span>{SALON_INFO.fullAddress}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#C59B6D]" />
                <div className="flex flex-col gap-1">
                  {SALON_INFO.phones.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="transition hover:text-[#DFC3A0]"
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-[#C59B6D]" />
                <span>Open Daily · 10:00 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Subtle Architectural Brand Watermark */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs text-[#FAF8F5]/55 sm:flex-row">
          <p>
            © {CURRENT_YEAR} {SALON_INFO.name}, Bharuch. All rights reserved.
          </p>
          <p>4.8★ Rated on Justdial · City Centre Mall, Station Road / Mangal Bazar</p>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none mt-8 select-none overflow-hidden text-center"
        >
          <p className="font-display-serif text-[clamp(3rem,10.5vw,9.5rem)] font-semibold leading-[0.86] tracking-[0.06em] text-[#DFC3A0]/[0.06]">
            FACEBOOK-3
          </p>
        </div>
      </div>
    </footer>
  );
}
