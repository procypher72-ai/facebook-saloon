import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  Calendar,
  Sparkles,
  RotateCcw,
  MessageCircle,
  Users,
  Copy,
  Check,
} from 'lucide-react';
import { SALON_INFO, SERVICES } from '../data/salonData';
import { MagneticButton } from './MotionPrimitives';

const TIME_SLOTS = [
  { label: 'Morning', range: '10:30 AM – 12:00 PM', value: '10:30 AM – 12:00 PM (Morning)' },
  { label: 'Midday', range: '12:00 PM – 2:30 PM', value: '12:00 PM – 2:30 PM (Midday)' },
  { label: 'Afternoon', range: '3:00 PM – 5:30 PM', value: '3:00 PM – 5:30 PM (Afternoon)' },
  { label: 'Evening', range: '5:30 PM – 7:30 PM', value: '5:30 PM – 7:30 PM (Evening)' },
  { label: 'Late Eve', range: '7:30 PM – 8:45 PM', value: '7:30 PM – 8:45 PM (Late Evening)' },
];

const VISIT_DAYS = ['Today', 'Tomorrow', 'This Weekend', 'Pick Date'];
const GUEST_TYPES = ['Women', 'Men', 'Kids', 'Family Combo'];

function BookingFormCard({ initialService, initialNotes, isHighlighted }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guestType: initialService === 'Family Combo / Multiple Services' ? 'Family Combo' : 'Women',
    service: initialService || SERVICES[0].title,
    visitDay: 'Today',
    customDate: '',
    preferredTime: TIME_SLOTS[2].value,
    notes: initialNotes || '',
  });
  const [error, setError] = useState('');
  const [shakeKey, setShakeKey] = useState(0);
  const [confirmation, setConfirmation] = useState(null);

  const selectedServiceObj = SERVICES.find((s) => s.title === formData.service);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const cleanedPhone = formData.phone.replace(/\s+/g, '');

    if (trimmedName.length < 2) {
      setError('Please enter your name so our salon desk can greet you.');
      setShakeKey((k) => k + 1);
      return;
    }
    if (cleanedPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile or phone number.');
      setShakeKey((k) => k + 1);
      return;
    }
    if (formData.visitDay === 'Pick Date' && !formData.customDate) {
      setError('Please pick your preferred appointment date.');
      setShakeKey((k) => k + 1);
      return;
    }

    const refCode = `FB3-${Math.floor(1000 + Math.random() * 9000)}`;
    const dayLabel =
      formData.visitDay === 'Pick Date' && formData.customDate
        ? formData.customDate
        : formData.visitDay;

    setConfirmation({
      ...formData,
      name: trimmedName,
      dayLabel,
      refCode,
    });
  };

  const handleReset = () => {
    setConfirmation(null);
    setError('');
    setFormData({
      name: '',
      phone: '',
      guestType: 'Women',
      service: SERVICES[0].title,
      visitDay: 'Today',
      customDate: '',
      preferredTime: TIME_SLOTS[2].value,
      notes: '',
    });
  };

  const buildWhatsAppLink = (conf) => {
    const lines = [
      `Hello FACEBOOK-3 Unisex Family Salon!`,
      `Appointment Request (${conf.refCode})`,
      `• Name: ${conf.name}`,
      `• Phone: ${conf.phone}`,
      `• Guest: ${conf.guestType}`,
      `• Service: ${conf.service}`,
      `• Day: ${conf.dayLabel}`,
      `• Slot: ${conf.preferredTime}`,
      conf.notes ? `• Notes: ${conf.notes}` : null,
    ].filter(Boolean);
    return `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <div className="atelier-card relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-[#C59B6D]/40 p-6 sm:p-9 xl:p-10">
      {/* Subtle gold top hairline */}
      <div className="hairline-gold absolute inset-x-0 top-0 h-[2px]" />

      <AnimatePresence mode="wait">
        {confirmation ? (
          /* Luxury Digital Salon Appointment Pass */
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="flex flex-1 flex-col items-center justify-center py-3 text-center"
          >
            <div className="relative flex h-14 w-14 items-center justify-center">
              {[
                { x: -36, y: -24, delay: 0.05 },
                { x: 38, y: -22, delay: 0.1 },
                { x: -40, y: 12, delay: 0.14 },
                { x: 40, y: 14, delay: 0.08 },
                { x: 0, y: -40, delay: 0.12 },
              ].map((p, idx) => (
                <motion.span
                  key={idx}
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.2, 1.2, 0.3],
                    x: p.x,
                    y: p.y,
                  }}
                  transition={{ duration: 0.9, delay: p.delay, ease: 'easeOut' }}
                  className="pointer-events-none absolute h-2 w-2 rounded-full bg-gradient-to-br from-[#DFC3A0] to-[#B87D56]"
                />
              ))}
              <motion.div
                initial={{ scale: 0.4, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C59B6D]/60 bg-[#141211] text-[#DFC3A0] shadow-lg"
              >
                <CheckCircle2 className="h-7 w-7" />
              </motion.div>
            </div>

            <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-semibold text-[#1A1817]">
              Chair Request Prepared, {confirmation.name}
            </h3>
            <p className="mt-1.5 max-w-md text-xs sm:text-sm leading-relaxed text-[#5E554E]">
              Send your digital pass on WhatsApp or call our desk to confirm immediately.
            </p>

            {/* Luxury Perforated Appointment Ticket */}
            <div className="mt-6 w-full max-w-md overflow-hidden rounded-3xl border border-[#C59B6D]/45 bg-white text-left shadow-[0_16px_42px_rgba(26,24,23,0.1)]">
              <div className="luxury-grain flex items-center justify-between bg-[#141211] px-5 py-4 text-[#FAF8F5]">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#DFC3A0]">
                    FB3 Priority Salon Pass
                  </p>
                  <p className="mt-0.5 font-serif text-lg font-semibold">
                    {confirmation.service}
                  </p>
                </div>
                <span className="rounded-xl border border-[#C59B6D]/50 bg-[#FAF8F5]/8 px-3 py-1.5 font-mono text-xs font-bold tracking-wider text-[#DFC3A0]">
                  {confirmation.refCode}
                </span>
              </div>

              {/* Perforated Ticket Cutout */}
              <div className="relative flex h-5 items-center bg-[#FAF8F5]">
                <span className="h-5 w-2.5 rounded-r-full border-r border-y border-[#C59B6D]/35 bg-[#F2EDE6]" />
                <div className="pass-perforation mx-2 h-2 flex-1" />
                <span className="h-5 w-2.5 rounded-l-full border-l border-y border-[#C59B6D]/35 bg-[#F2EDE6]" />
              </div>

              <div className="space-y-2.5 bg-[#FAF8F5] px-5 pb-5 pt-2 text-xs sm:text-sm">
                <div className="flex justify-between gap-4 border-b border-[#1A1817]/8 pb-2">
                  <span className="text-[#5E554E]">Guest</span>
                  <span className="font-semibold text-[#1A1817]">
                    {confirmation.name} · {confirmation.guestType}
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#1A1817]/8 pb-2">
                  <span className="text-[#5E554E]">Phone</span>
                  <span className="font-semibold text-[#1A1817]">
                    {confirmation.phone}
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#1A1817]/8 pb-2">
                  <span className="text-[#5E554E]">Day &amp; Slot</span>
                  <span className="text-right font-semibold text-[#1A1817]">
                    {confirmation.dayLabel} · {confirmation.preferredTime}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#5E554E]">Location</span>
                  <span className="text-right font-semibold text-[#1A1817]">
                    City Centre Mall, Shop 164–175
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={buildWhatsAppLink(confirmation)}
                target="_blank"
                rel="noreferrer"
                className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-[#1E3A2F] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#FAF8F5] shadow-md transition hover:bg-[#166534]"
              >
                <MessageCircle className="h-4 w-4 text-emerald-300" />
                <span>Send Pass on WhatsApp</span>
              </a>
              <a
                href={SALON_INFO.phones[0].href}
                className="inline-flex items-center gap-2 rounded-full bg-[#1A1817] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#FAF8F5] transition hover:bg-[#B87D56]"
              >
                <Phone className="h-3.5 w-3.5 text-[#DFC3A0]" />
                <span>Call Desk</span>
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-full border border-[#1A1817]/20 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1817] transition hover:bg-[#F2EDE6] cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>New Request</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-1 flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-[#C59B6D]/25 pb-5">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B87D56]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Concierge Reservation Desk
                </span>
                <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#1A1817]">
                  Reserve Your Chair
                </h3>
              </div>
              <span className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C59B6D]/35 bg-[#1A1817] text-[#DFC3A0] shadow-xs">
                <Calendar className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-6 space-y-5">
              {/* Step 01: Guest Details */}
              <div>
                <p className="mb-3 flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#B87D56]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1A1817] text-[10px] text-[#DFC3A0]">
                    01
                  </span>
                  Guest Details
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1817]"
                    >
                      Full Name *
                    </label>
                    <input
                      id="booking-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g., Aarav Patel"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1.5 w-full rounded-2xl border border-[#1A1817]/15 bg-white px-4 py-3 text-sm text-[#1A1817] placeholder:text-[#5E554E]/50 transition focus:border-[#C59B6D] focus:outline-none focus:ring-2 focus:ring-[#C59B6D]/25"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1817]"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1.5 w-full rounded-2xl border border-[#1A1817]/15 bg-white px-4 py-3 text-sm text-[#1A1817] placeholder:text-[#5E554E]/50 transition focus:border-[#C59B6D] focus:outline-none focus:ring-2 focus:ring-[#C59B6D]/25"
                    />
                  </div>
                </div>
              </div>

              {/* Guest Type Quick Pills */}
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1817]">
                  <Users className="h-3.5 w-3.5 text-[#B87D56]" />
                  Booking For
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {GUEST_TYPES.map((type) => {
                    const active = formData.guestType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, guestType: type }))
                        }
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                          active
                            ? 'border-[#1A1817] bg-[#1A1817] text-[#DFC3A0] shadow-xs'
                            : 'border-[#1A1817]/14 bg-white text-[#5E554E] hover:border-[#C59B6D] hover:text-[#1A1817]'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 02: Ritual & Schedule */}
              <div className="border-t border-[#1A1817]/8 pt-5">
                <p className="mb-3 flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#B87D56]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1A1817] text-[10px] text-[#DFC3A0]">
                    02
                  </span>
                  Ritual &amp; Preferred Timing
                </p>

                <motion.div
                  initial={isHighlighted ? { scale: 1.02 } : false}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 20 }}
                >
                  <label
                    htmlFor="booking-service"
                    className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1817]"
                  >
                    Select Service
                  </label>
                  <select
                    id="booking-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`mt-1.5 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-medium text-[#1A1817] transition-all focus:border-[#C59B6D] focus:outline-none focus:ring-2 focus:ring-[#C59B6D]/25 ${
                      isHighlighted
                        ? 'border-[#C59B6D] ring-2 ring-[#C59B6D]/20'
                        : 'border-[#1A1817]/15'
                    }`}
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} — From {s.startingPrice}
                      </option>
                    ))}
                    <option value="Family Combo / Multiple Services">
                      Family Combo / Multiple Services
                    </option>
                  </select>

                  {selectedServiceObj && (
                    <div className="mt-2 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-[#C59B6D]/30 bg-[#F2EDE6]/80 px-3.5 py-1 text-[11px] font-semibold text-[#5E554E]">
                      <span className="text-[#1A1817]">
                        Indicative: {selectedServiceObj.startingPrice}
                      </span>
                      <span className="text-[#C59B6D]">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3 text-[#B87D56]" />
                        {selectedServiceObj.duration}
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* Preferred Day Pills */}
                <div className="mt-4">
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1817]">
                    Preferred Day
                  </span>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {VISIT_DAYS.map((day) => {
                      const active = formData.visitDay === day;
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, visitDay: day }));
                            if (error) setError('');
                          }}
                          className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                            active
                              ? 'border-[#C59B6D] bg-[#F2EDE6] text-[#1A1817] shadow-xs'
                              : 'border-[#1A1817]/14 bg-white text-[#5E554E] hover:border-[#C59B6D] hover:text-[#1A1817]'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                    {formData.visitDay === 'Pick Date' && (
                      <input
                        type="date"
                        name="customDate"
                        aria-label="Pick preferred appointment date"
                        value={formData.customDate}
                        onChange={handleChange}
                        className="rounded-full border border-[#C59B6D] bg-white px-3.5 py-1.5 text-xs font-medium text-[#1A1817] focus:outline-none focus:ring-2 focus:ring-[#C59B6D]/30"
                      />
                    )}
                  </div>
                </div>

                {/* Interactive Visual Time-Slot Chips */}
                <div className="mt-4">
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1817]">
                    Preferred Time Slot
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {TIME_SLOTS.map((slot) => {
                      const active = formData.preferredTime === slot.value;
                      return (
                        <button
                          key={slot.value}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, preferredTime: slot.value }))
                          }
                          className={`rounded-2xl border px-3 py-2 text-left transition cursor-pointer ${
                            active
                              ? 'border-[#1A1817] bg-[#1A1817] text-[#FAF8F5] shadow-xs'
                              : 'border-[#1A1817]/12 bg-white text-[#1A1817] hover:border-[#C59B6D]'
                          }`}
                        >
                          <span
                            className={`block text-[10px] font-bold uppercase tracking-[0.16em] ${
                              active ? 'text-[#DFC3A0]' : 'text-[#B87D56]'
                            }`}
                          >
                            {slot.label}
                          </span>
                          <span
                            className={`mt-0.5 block text-[11px] font-medium ${
                              active ? 'text-[#FAF8F5]/90' : 'text-[#5E554E]'
                            }`}
                          >
                            {slot.range}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Optional Note */}
              <div>
                <label
                  htmlFor="booking-notes"
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1817]"
                >
                  Notes / Selected Combo{' '}
                  <span className="font-normal normal-case tracking-normal text-[#5E554E]">
                    (Optional)
                  </span>
                </label>
                <textarea
                  id="booking-notes"
                  name="notes"
                  rows={2}
                  placeholder="e.g., Haircut for 2 adults + 1 child, or festive makeup consultation"
                  value={formData.notes}
                  onChange={handleChange}
                  className="mt-1.5 w-full resize-none rounded-2xl border border-[#1A1817]/15 bg-white px-4 py-2.5 text-sm text-[#1A1817] placeholder:text-[#5E554E]/50 focus:border-[#C59B6D] focus:outline-none focus:ring-2 focus:ring-[#C59B6D]/25"
                />
              </div>

              {error && (
                <motion.p
                  key={shakeKey}
                  initial={{ x: 0 }}
                  animate={{ x: [0, -8, 8, -5, 5, 0] }}
                  transition={{ duration: 0.38 }}
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <div className="mt-6">
              <MagneticButton className="w-full" strength={0.1}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                  className="btn-shimmer w-full rounded-full border border-[#C59B6D]/45 bg-[#1A1817] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF8F5] shadow-[0_14px_30px_rgba(26,24,23,0.2)] transition-colors duration-300 hover:border-[#B87D56] hover:bg-[#B87D56] cursor-pointer"
                >
                  Generate Priority Salon Pass
                </motion.button>
              </MagneticButton>
              <p className="mt-3 text-center text-xs text-[#5E554E]">
                Prefer speaking directly? Call{' '}
                <a
                  href={SALON_INFO.phones[0].href}
                  className="font-semibold text-[#1A1817] underline decoration-[#C59B6D] underline-offset-4 hover:text-[#B87D56]"
                >
                  {SALON_INFO.phones[0].display}
                </a>
                .
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LocationBookingSection({ bookingPreset }) {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(SALON_INFO.fullAddress).catch(() => {});
    }
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2200);
  };

  return (
    <section
      id="location"
      className="relative scroll-mt-20 bg-[#F2EDE6]/80 py-20 sm:py-28"
    >
      <div className="site-container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#B87D56]">
            <MapPin className="h-3.5 w-3.5" />
            Visit Us or Reserve Your Slot
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#1A1817] sm:text-5xl xl:text-[3.3rem]">
            Location, Hours &amp;{' '}
            <span className="font-display-serif italic font-medium text-gold-foil">
              Appointments
            </span>
          </h2>
          <p className="mt-3 text-base xl:text-[1.06rem] text-[#5E554E]">
            Drop in during your City Centre Mall visit or request a preferred slot
            below—walk-ins and family bookings are always welcome until 9:00 PM.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 xl:gap-10">
          {/* Left Column: Address, Phones, Hours & Embedded Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 lg:col-span-6"
          >
            {/* Contact Details Card */}
            <div className="atelier-card rounded-[2rem] border border-[#1A1817]/10 p-6 sm:p-8">
              <div className="space-y-6">
                {/* Address with One-Click Copy */}
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#C59B6D]/30 bg-[#F2EDE6] text-[#B87D56]">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B87D56]">
                        Salon Address
                      </p>
                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="inline-flex items-center gap-1 rounded-full border border-[#1A1817]/12 bg-[#FAF8F5] px-2.5 py-1 text-[10.5px] font-semibold text-[#5E554E] transition hover:border-[#C59B6D] hover:text-[#1A1817] cursor-pointer"
                      >
                        {copiedAddress ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-[#B87D56]" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="mt-1 font-serif text-xl font-semibold text-[#1A1817]">
                      {SALON_INFO.addressLine1}
                    </p>
                    <p className="mt-0.5 text-sm text-[#5E554E]">
                      {SALON_INFO.addressLine2}
                    </p>
                  </div>
                </div>

                {/* Clickable Phone Numbers */}
                <div className="flex items-start gap-4 border-t border-[#1A1817]/8 pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#C59B6D]/30 bg-[#F2EDE6] text-[#B87D56]">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div className="w-full">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B87D56]">
                      Call Our Salon Desk
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-3">
                      {SALON_INFO.phones.map((phone) => (
                        <a
                          key={phone.href}
                          href={phone.href}
                          className="group inline-flex items-center gap-2 rounded-full border border-[#C59B6D]/45 bg-[#F2EDE6]/85 px-4 py-2 text-sm font-semibold text-[#1A1817] transition hover:border-[#1A1817] hover:bg-[#1A1817] hover:text-[#FAF8F5]"
                        >
                          <Phone className="h-3.5 w-3.5 text-[#B87D56] transition-colors group-hover:text-[#DFC3A0]" />
                          <span>{phone.display}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-4 border-t border-[#1A1817]/8 pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#C59B6D]/30 bg-[#F2EDE6] text-[#B87D56]">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B87D56]">
                        Opening Hours
                      </p>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                        Open Daily Until 9:00 PM
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-[#1A1817]">
                      {SALON_INFO.hoursDetailed}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map + Directions Card */}
            <div className="atelier-card flex flex-1 flex-col overflow-hidden rounded-[2rem] border border-[#1A1817]/10">
              <div className="relative h-64 sm:h-72 flex-1 min-h-[260px] w-full bg-[#E7DFD3]">
                <iframe
                  title="City Centre Mall, Station Road, Mangal Bazar, Bharuch Map"
                  src={SALON_INFO.mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 grayscale-[18%] contrast-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-between gap-3 border-t border-[#1A1817]/8 p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="font-serif text-lg font-semibold text-[#1A1817]">
                    City Centre Mall, Bharuch
                  </p>
                  <p className="text-xs text-[#5E554E]">
                    1st Floor · Shop No. 164–175 · Station Road / Mangal Bazar
                  </p>
                </div>
                <a
                  href={SALON_INFO.mapsQueryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-shimmer inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#1A1817] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#FAF8F5] transition hover:bg-[#B87D56]"
                >
                  <Navigation className="h-3.5 w-3.5 text-[#DFC3A0]" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Keyed Concierge Reservation Desk */}
          <motion.div
            id="book"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="scroll-mt-24 lg:col-span-6"
          >
            <BookingFormCard
              key={bookingPreset?.id ?? 0}
              initialService={bookingPreset?.service || ''}
              initialNotes={bookingPreset?.notes || ''}
              isHighlighted={(bookingPreset?.id ?? 0) > 0}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
