import React, { useState } from 'react';
import { 
  MessageSquare, X, ArrowRight, CheckCircle2, Sparkles, 
  PhoneCall, Briefcase, Zap, Flame, Sun, Smartphone, Send, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveConciergeProps {
  onOpenCareers: () => void;
  onOpenPartner: () => void;
  onStartConfigurator: (product: 'photovoltaik' | 'waermepumpe' | 'strom_gas' | 'immobilien' | 'beratung_komplett') => void;
}

type ChatState = 'idle' | 'welcome' | 'solar' | 'heat' | 'career' | 'callback' | 'callback_success';

export default function InteractiveConcierge({ 
  onOpenCareers, 
  onOpenPartner, 
  onStartConfigurator 
}: InteractiveConciergeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<ChatState>('welcome');
  const [telNumber, setTelNumber] = useState('');
  const [callbackName, setCallbackName] = useState('');
  
  // Solar mini-calculator states
  const [sqm, setSqm] = useState(60);
  const estKwp = (sqm * 0.2).toFixed(1);
  const estSavings = Math.round(sqm * 0.2 * 950 * 0.36); // kwp * yield * price

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!telNumber) return;
    
    // Save locally
    try {
      const stored = localStorage.getItem('von_morgen_career_apps') || '[]';
      const apps = JSON.parse(stored);
      apps.unshift({
        id: `callback_${Date.now()}`,
        job: 'callback_request_elvin',
        name: callbackName || 'Anonymer Rückruf',
        phone: telNumber,
        email: 'via-chat@conversational.de',
        experience: 'neuling',
        message: 'Angefordert über den virtuellen Berater Elvin Kaguri.',
        earliestStart: 'Ab sofort',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('von_morgen_career_apps', JSON.stringify(apps));
    } catch (err) {
      console.error(err);
    }

    setState('callback_success');
    setTelNumber('');
    setCallbackName('');
  };

  return (
    <div id="interactive-concierge-root" className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {/* Expanded Chat Dialog */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="absolute bottom-16 right-0 w-[340px] sm:w-[380px] bg-zinc-950 border border-gold/30 rounded-2xl shadow-[0_15px_50px_rgba(197,168,92,0.18)] overflow-hidden"
          >
            {/* Header with Elvin's Portrait Placeholder */}
            <div className="relative bg-gradient-to-r from-zinc-900 to-black p-4 border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Simulated luxury avatar */}
                <div className="relative w-11 h-11 rounded-full bg-zinc-900 border border-gold/40 flex items-center justify-center text-gold font-serif text-sm font-semibold">
                  EK
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-zinc-950 rounded-full animate-pulse z-10" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h5 className="text-white text-xs font-bold uppercase tracking-wider font-display">Elvin Kaguri</h5>
                    <span className="bg-gold/10 text-gold text-[8px] px-1.5 py-0.5 rounded uppercase font-bold tracking-widest font-mono border border-gold/20">Geschäftsleitung</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 block mt-0.5 font-sans flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5" />
                    München Zentrale (Online)
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bubble Area */}
            <div className="p-4 space-y-4 max-h-[360px] overflow-y-auto bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-xs">
              
              {/* Back button if not welcome */}
              {state !== 'welcome' && (
                <button 
                  onClick={() => setState('welcome')}
                  className="text-[10px] text-gold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  ← Zurück zur Übersicht
                </button>
              )}

              {/* WELCOME BUBBLES */}
              {state === 'welcome' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3.5">
                  <div className="bg-zinc-900/60 p-3.5 rounded-2xl rounded-tl-none border border-zinc-900/80 text-zinc-200 leading-relaxed">
                    Grüß Gott! Schön, dass Sie den Weg zu uns gefunden haben. <br/><br/>
                    Als herstellerunabhängiger Broker helfen wir Ihnen dabei, von erstklassigen PV-Konditionen, extremen 70% KfW-Förderungen oder Top-Karriereeinstiegen im Sektor zu profitieren.
                  </div>
                  <div className="bg-zinc-900/60 p-3.5 rounded-2xl rounded-tl-none border border-zinc-900/80 text-zinc-300">
                    <strong className="text-gold">Wie kann ich Ihnen heute persönlich weiterhelfen?</strong> Selectieren Sie einfach Ihre Option:
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-2">
                    <button 
                      onClick={() => setState('solar')}
                      className="w-full p-3 bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-900 hover:border-gold/30 text-zinc-200 hover:text-white transition rounded-xl text-left flex items-center justify-between group cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <Sun className="w-4 h-4 text-gold" />
                        <span>Soll ich auf Photovoltaik umsteigen?</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-gold transition-colors" />
                    </button>

                    <button 
                      onClick={() => setState('heat')}
                      className="w-full p-3 bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-900 hover:border-gold/30 text-zinc-200 hover:text-white transition rounded-xl text-left flex items-center justify-between group cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <Flame className="w-4 h-4 text-gold" />
                        <span>Habe ich Anspruch auf 70% Zuschuss?</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-gold transition-colors" />
                    </button>

                    <button 
                      onClick={() => setState('career')}
                      className="w-full p-3 bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-900 hover:border-gold/30 text-zinc-200 hover:text-white transition rounded-xl text-left flex items-center justify-between group cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <Briefcase className="w-4 h-4 text-gold animate-bounce" />
                        <span className="font-semibold text-gold">Karriere &amp; Provisionsjobs</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold transition-colors" />
                    </button>

                    <button 
                      onClick={() => setState('callback')}
                      className="w-full p-3 bg-black/40 hover:bg-gold/5 border border-gold/20 hover:border-gold text-gold transition rounded-xl text-left flex items-center justify-between group cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <PhoneCall className="w-4 h-4 text-gold animate-pulse" />
                        <span>24h-Rückruf mit mir vereinbaren</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PV MINI ESTIMATOR */}
              {state === 'solar' && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="bg-zinc-900/60 p-3 rounded-2xl border border-zinc-900 text-zinc-350 leading-relaxed">
                    <span className="text-gold font-semibold uppercase text-[9px] block mb-1">Interaktive Potenzial-Schätzung:</span>
                    Verschieben Sie den Regler Ihrer nutzbaren Dach- oder Gartenfläche, um das solare Potenzial kalkulieren zu lassen.
                  </div>

                  {/* Slider Control */}
                  <div className="bg-zinc-950 p-3 border border-zinc-900 rounded-xl space-y-2">
                    <label className="text-[10px] text-zinc-400 block justify-between flex">
                      <span>Dachfläche (m²):</span>
                      <span className="text-gold font-bold">{sqm} m²</span>
                    </label>
                    <input 
                      type="range" 
                      min="30" 
                      max="200" 
                      step="5"
                      value={sqm} 
                      onChange={(e) => setSqm(parseInt(e.target.value))}
                      className="w-full accent-gold cursor-pointer"
                    />
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-900 text-center">
                      <div>
                        <span className="text-[9px] text-zinc-500 block">Anlagengröße</span>
                        <span className="text-white font-semibold text-xs">{estKwp} kWp</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 block">Autarke Ersparnis</span>
                        <span className="text-gold font-bold text-xs">ca. {estSavings} € / Jahr</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      onStartConfigurator('photovoltaik');
                      setIsOpen(false);
                      setTimeout(() => {
                        const rec = document.getElementById('konfigurator');
                        if (rec) rec.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="w-full py-2.5 bg-gold text-black uppercase tracking-wider font-bold text-[10px] text-center hover:bg-gold-light transition rounded-lg block cursor-pointer"
                  >
                    Solar-Konfigurator starten
                  </button>
                </motion.div>
              )}

              {/* HEATING & KFW INFO */}
              {state === 'heat' && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div className="bg-zinc-900/60 p-3.5 rounded-2xl rounded-tl-none border border-zinc-900/80 text-zinc-200 leading-relaxed space-y-3">
                    <p>🔥 <strong>Das neue KfW-Förderpaket 2026:</strong></p>
                    <p>Wer jetzt seine fossile Heizung (Öl, alte Gastherme) gegen eine moderne, emissionsfreie Luft-Wasser-Wärmepumpe tauscht, erhält bis zu <strong>70% Direkt-Zuschuss</strong> vom Staat erstattet.</p>
                    <p className="text-gold font-semibold">Wir planen herstellerunabhängig (Viessmann, Buderus, Vaillant, Bosch) und wickeln den KfW-Behördenantrag komplett für Sie ab.</p>
                  </div>

                  <button 
                    onClick={() => {
                      onStartConfigurator('waermepumpe');
                      setIsOpen(false);
                      setTimeout(() => {
                        const rec = document.getElementById('konfigurator');
                        if (rec) rec.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="w-full py-2.5 bg-gold text-black uppercase tracking-wider font-bold text-[10px] text-center hover:bg-gold-light transition rounded-lg block cursor-pointer"
                  >
                    KfW-Förderprüfung starten
                  </button>
                </motion.div>
              )}

              {/* CAREERS INFO PANEL */}
              {state === 'career' && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3.5">
                  <div className="bg-zinc-900/60 p-3 rounded-2xl border border-zinc-900 text-zinc-300 leading-relaxed">
                    <span className="text-gold font-bold uppercase text-[9px] block mb-1">Karriere &amp; Partnerschaften:</span>
                    Wir wachsen rasant und suchen motivierte Verstärkung für unsere München-Zentrale, das B2B-Netzwerk und 100% Homeoffice!
                  </div>

                  <div className="space-y-2 bg-zinc-950 p-3 border border-zinc-900 rounded-xl">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold tracking-wider block">Unsere Provisionsfokus-Stellen:</span>
                    
                    <div className="border-b border-zinc-900 pb-1.5 pt-0.5">
                      <p className="font-semibold text-white">📞 Telefonist / Terminierer (m/w/d)</p>
                      <p className="text-zinc-400 text-[10px] leading-snug">Null Fixum, herstellerunabhängige Warm-Ansprache. <strong>150 € bis 500 €</strong> pro abgeschlossenem Termin.</p>
                    </div>

                    <div className="border-b border-zinc-900 pb-1.5 pt-1.5">
                      <p className="font-semibold text-white">🚪 Door-to-Dollar Advisor (m/w/d)</p>
                      <p className="text-zinc-400 text-[10px] leading-snug">Direkte Vor-Ort-Terminierung im starken Netzwerk. <strong>250 € bis 850 €</strong> Provision pro verkaufter Anlage.</p>
                    </div>

                    <div className="pt-1.5">
                      <p className="font-semibold text-white">💼 Handelsvertreter / Partner (m/w/d)</p>
                      <p className="text-zinc-400 text-[10px] leading-snug">Klare Verkaufspreislisten, freies Teambuilding, prozentuale Beteiligung direkt am Gesamtumsatz.</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      onOpenCareers();
                    }}
                    className="w-full py-2.5 bg-gold text-black uppercase tracking-wider font-bold text-[10px] text-center hover:bg-gold-light transition rounded-lg block cursor-pointer"
                  >
                    Offene Stellen einsehen &amp; Bewerben
                  </button>
                </motion.div>
              )}

              {/* CALLBACK REQUEST FORM */}
              {state === 'callback' && (
                <form onSubmit={handleCallbackSubmit} className="space-y-3 pt-1">
                  <div className="bg-zinc-900/60 p-3 rounded-2xl border border-zinc-900 text-zinc-350 leading-relaxed mb-2">
                    Tragen Sie Ihre Kontaktdaten ein – ich oder einer unserer Berater rufen Sie innerhalb von 24h verlässlich zurück.
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 block">Ihr Name / Vorname</label>
                    <input 
                      type="text"
                      required
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      placeholder="z.B. Edi Neumann"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold py-2 px-2.5 text-xs text-white placeholder-zinc-650 outline-none rounded"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 block">Telefonnummer *</label>
                    <input 
                      type="tel"
                      required
                      value={telNumber}
                      onChange={(e) => setTelNumber(e.target.value)}
                      placeholder="z.B. +49 176 998822"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold py-2 px-2.5 text-xs text-white placeholder-zinc-650 outline-none rounded"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-2 bg-gold text-black uppercase tracking-widest font-bold text-[10px] hover:bg-gold-light transition rounded cursor-pointer"
                  >
                    Rückruf veranlassen
                  </button>
                </form>
              )}

              {/* CALLBACK SUCCESS */}
              {state === 'callback_success' && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-gold/15 border border-gold rounded-full flex items-center justify-center mx-auto text-gold animate-bounce">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h6 className="text-sm font-serif text-white">Anfrage erhalten!</h6>
                  <p className="text-zinc-400 leading-relaxed text-[11px] max-w-[240px] mx-auto">
                    Wir rufen Sie wunschgemäß auf Ihrer Telefonnummer zurück. Das Gespräch ist zu 100% kostenfrei und herstellerunabhängig.
                  </p>
                  <button 
                    onClick={() => setState('welcome')} 
                    className="text-gold uppercase tracking-widest text-[9px] hover:underline block mx-auto cursor-pointer"
                  >
                    Zurück zur Übersicht
                  </button>
                </motion.div>
              )}

            </div>

            {/* Bottom mini status bar */}
            <div className="bg-black py-2.5 px-4 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
              <span className="flex items-center">
                <Star className="w-3 h-3 text-gold mr-1 fill-gold" /> von_morgen_bot v2.6
              </span>
              <span>Ansprechzeit &lt; 2 Std.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button widget */}
      <motion.button
        id="concierge-trigger-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-zinc-900 border border-gold hover:border-gold-light hover:bg-black rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(197,168,92,0.35)] relative cursor-pointer group pointer-events-auto"
        aria-label="Interaktiver virtueller Berater"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="open-x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-gold" />
            </motion.div>
          ) : (
            <motion.div key="closed-msg" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}>
              <MessageSquare className="w-6 h-6 text-gold group-hover:animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-[8px] font-bold text-black border-2 border-zinc-950 rounded-full flex items-center justify-center animate-bounce">
                !
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient surrounding rotating ring */}
        <span className="absolute inset-0 rounded-full border border-gold/10 group-hover:border-gold/30 animate-ping pointer-events-none scale-105" />
      </motion.button>
    </div>
  );
}
