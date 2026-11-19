import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, X, ChevronUp, ChevronDown, ArrowRight } from 'lucide-react';

/**
 * Floating luxury bottom visit-combo estimator pill.
 * Appears smoothly whenever a guest adds 1+ services via "+ Add to Visit".
 */
export default function ServiceComboEstimator({
  selectedServices,
  onRemoveService,
  onClearAll,
  onReserveCombo,
}) {
  const [expanded, setExpanded] = useState(false);

  const count = selectedServices.length;
  const totalPrice = selectedServices.reduce((sum, s) => sum + (s.priceValue || 0), 0);
  const totalMin = selectedServices.reduce((sum, s) => sum + (s.minMins || 0), 0);
  const totalMax = selectedServices.reduce((sum, s) => sum + (s.maxMins || 0), 0);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          key="visit-estimator"
          initial={{ opacity: 0, y: 48, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 48, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed bottom-5 left-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2"
        >
          <div className="overflow-hidden rounded-3xl border border-[#C59B6D]/50 bg-[#1A1817]/95 text-[#FAF8F5] shadow-[0_24px_60px_rgba(26,24,23,0.42)] backdrop-blur-xl">
            {/* Expandable selected services drawer */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden border-b border-[#FAF8F5]/10"
                >
                  <div className="flex flex-wrap items-center gap-2 px-5 py-3.5">
                    {selectedServices.map((service) => (
                      <span
                        key={service.id}
                        className="inline-flex items-center gap-2 rounded-full border border-[#C59B6D]/35 bg-[#FAF8F5]/8 px-3 py-1 text-xs font-medium text-[#FAF8F5]"
                      >
                        <span>{service.title}</span>
                        <span className="text-[#DFC3A0]">{service.startingPrice}</span>
                        <button
                          type="button"
                          onClick={() => onRemoveService(service.id)}
                          aria-label={`Remove ${service.title}`}
                          className="rounded-full p-0.5 text-[#FAF8F5]/65 transition hover:bg-[#FAF8F5]/15 hover:text-white cursor-pointer"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setExpanded(false);
                        onClearAll();
                      }}
                      className="ml-auto text-[11px] font-medium text-[#FAF8F5]/60 underline decoration-[#C59B6D]/50 underline-offset-4 transition hover:text-[#DFC3A0] cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Compact summary bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-3.5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  aria-expanded={expanded}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#C59B6D]/40 bg-[#2C2725] text-[#DFC3A0] transition hover:border-[#DFC3A0] cursor-pointer"
                  title="Toggle selected services list"
                >
                  {expanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#DFC3A0]">
                      <Sparkles className="h-3 w-3" />
                      Your Visit ({count} {count === 1 ? 'Service' : 'Services'})
                    </span>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs sm:text-sm">
                    <motion.span
                      key={totalPrice}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-serif text-base sm:text-lg font-semibold text-[#FAF8F5]"
                    >
                      Est. ₹{totalPrice.toLocaleString('en-IN')}*
                    </motion.span>
                    <span className="inline-flex items-center gap-1 text-xs text-[#FAF8F5]/70">
                      <Clock className="h-3 w-3 text-[#C59B6D]" />
                      {totalMin} – {totalMax} min*
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onReserveCombo}
                  className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C59B6D] to-[#DFC3A0] px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#1A1817] shadow-md transition hover:brightness-105 cursor-pointer"
                >
                  <span>Reserve {count > 1 ? 'Combo' : 'Visit'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
