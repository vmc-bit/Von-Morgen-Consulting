import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: 'photovoltaik' | 'waermepumpe' | 'strom_gas' | 'immobilien' | 'beratung_komplett';
}

export default function AppointmentBookingModal({ isOpen, onClose }: AppointmentBookingModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-3xl h-[85vh] bg-zinc-950 border border-zinc-900 rounded-2xl shadow-3xl overflow-hidden flex flex-col z-10"
          >
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

            <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-white">
                Beratungstermin eintragen
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="calendly-inline-widget flex-1"
              data-url="https://calendly.com/vmcmeet/partnerwerden"
              style={{ minWidth: '320px', height: '100%' }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
