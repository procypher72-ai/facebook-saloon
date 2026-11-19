import { Sparkles, Scissors } from 'lucide-react';

const MARQUEE_ITEMS = [
  'Precision Haircuts',
  'Dimensional Balayage',
  'Mirror-Shine Keratin',
  'Radiance Facials',
  'Festive & Bridal Makeup',
  'Botanical Foot Reflexology',
  '4.8★ Rated on Justdial',
  'Men · Women · Kids',
  'Open Daily Until 9:00 PM',
];

function MarqueeGroup() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {MARQUEE_ITEMS.map((item, idx) => (
        <div key={item} className="flex items-center gap-8">
          <span className="font-serif text-sm sm:text-base tracking-[0.08em] text-[#FAF8F5]/90">
            {item}
          </span>
          {idx % 2 === 0 ? (
            <Sparkles className="h-3.5 w-3.5 text-[#DFC3A0]" aria-hidden="true" />
          ) : (
            <Scissors className="h-3.5 w-3.5 -rotate-45 text-[#C59B6D]" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function LuxuryMarquee() {
  return (
    <div
      aria-label="Salon highlights"
      className="marquee-wrapper relative overflow-hidden border-y border-[#C59B6D]/30 bg-[#1A1817] py-4 select-none"
    >
      {/* Soft edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-[#1A1817] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-[#1A1817] to-transparent" />

      <div className="animate-marquee">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </div>
  );
}
