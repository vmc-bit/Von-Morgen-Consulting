import React, { useRef } from 'react';
import { Sun, Flame, Zap, Home, ArrowRight, ShieldCheck, Sparkles, MapPin, Award } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ProductType } from '../types';

interface HeroSectionProps {
  onSelectService: (service: ProductType) => void;
  onOpenCalculator: () => void;
  onBookAppointment: () => void;
}

export default function HeroSection({ onSelectService, onOpenCalculator, onBookAppointment }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div ref={containerRef} className="relative bg-black bg-grid-gold pt-28 pb-20 md:py-36 overflow-hidden">
      {/* Exquisite ambient golden glow backdrops */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute top-0 left-0 right-0 h-full w-full pointer-events-none overflow-hidden z-0"
      >
        {/* Extreme High-Resolution Background Beam */}
        <div className="absolute top-0 right-0 w-[4px] h-full bg-gradient-to-b from-transparent via-gold/15 to-transparent blur-[1px]" />
        <div className="absolute top-[-30%] left-[-15%] w-[70%] h-[80%] rounded-full bg-gold/15 blur-[130px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[70%] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute top-[20%] left-[60%] -translate-x-1/2 w-[45%] h-[45%] rounded-full bg-gold/5 blur-[100px] animate-pulse-slow" />

        {/* Floating high-tech ambient particle rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-12 -left-12 w-48 h-48 border border-gold/5 rounded-full pointer-events-none"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-10 w-96 h-96 border border-gold/5 rounded-full border-dashed pointer-events-none"
        />
        <motion.div 
          animate={{ 
            x: [0, 15, -15, 0],
            y: [0, -20, 20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-3 h-3 bg-gold/20 rounded-full blur-[2px] pointer-events-none"
        />
        <motion.div 
          animate={{ 
            x: [0, -25, 25, 0],
            y: [0, 15, -15, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-gold/10 rounded-full blur-[3px] pointer-events-none"
        />
      </motion.div>

      <div className="relative max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Upper trust badge */}
        <div className="flex justify-center md:justify-start">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2.5 bg-zinc-950 border border-gold/30 rounded-full px-5 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-transparent border border-gold">
              <Sparkles className="w-2.5 h-2.5 text-gold" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-300 font-display">
              Unabhängiges Makler- & Partnernetzwerk — Bundesweit
            </span>
          </motion.div>
        </div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-6 space-y-7 text-center md:text-left">
            
            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs font-bold uppercase tracking-[0.35em] text-gold font-display"
              >
                Von Morgen. Für Morgen.
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif font-normal text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]"
              >
                Wir bringen Qualität, <br />
                <span className="text-gold-gradient font-semibold">Menschen &amp; Märkte</span> zusammen.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal max-w-xl mx-auto md:mx-0"
            >
              <strong>Von Morgen Consulting</strong> ist Ihr zu 100% herstellerunabhängiger Premium-Partner. 
              Mit unserem Hauptsitz in <strong>München</strong> und einem starken, bundesweiten Partnernetzwerk vermitteln wir 
              maßgeschneiderte Lösungen in den Bereichen erneuerbare Energien, Energieeffizienz und Immobilien. 
              Neutral, transparent und mit Fokus auf maximalen Mehrwert.
            </motion.p>

            {/* Premium quick assurances of the elite broker */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 max-w-lg mx-auto md:mx-0 bg-zinc-950 p-4 border border-gold/15 shadow-[0_10px_35px_rgba(0,0,0,0.5)] relative"
            >
              <div className="text-center p-2 border-r border-zinc-800">
                <p className="text-xl sm:text-2xl font-display font-medium text-gold">München</p>
                <p className="text-[9px] uppercase tracking-wider font-semibold text-zinc-400 mt-1">Stammsitz</p>
              </div>
              <div className="text-center p-2 border-r border-zinc-800">
                <p className="text-xl sm:text-2xl font-display font-medium text-gold">100%</p>
                <p className="text-[9px] uppercase tracking-wider font-semibold text-zinc-400 mt-1">Neutralität</p>
              </div>
              <div className="text-center p-2">
                <p className="text-xl sm:text-2xl font-display font-medium text-gold">Bundesweit</p>
                <p className="text-[9px] uppercase tracking-wider font-semibold text-zinc-400 mt-1">Partnernetz</p>
              </div>
            </motion.div>

            {/* Big primary action bars */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4.5 justify-center md:justify-start"
            >
              <button
                onClick={() => onSelectService('beratung_komplett')}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gold border border-gold hover:bg-black text-black hover:text-gold text-xs uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(197,168,92,0.15)] transition-all duration-300 cursor-pointer"
              >
                Kostenlose Fachberatung
                <ArrowRight className="w-4 h-4 ml-2.5" />
              </button>
              <button
                onClick={onBookAppointment}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-gold hover:text-white text-xs uppercase tracking-widest font-bold border border-gold hover:border-white transition-all duration-300 cursor-pointer shadow-[0_0_12px_rgba(197,168,92,0.06)]"
              >
                Termin jetzt buchen 📅
              </button>
              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs uppercase tracking-widest font-bold border border-zinc-800 hover:border-zinc-700 transition-all duration-300 cursor-pointer"
              >
                Wirtschaftlichkeit prüfen
              </button>
            </motion.div>

            {/* Bottom mini-trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start text-[11px] text-zinc-400 font-semibold tracking-wide uppercase"
            >
              <span className="flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 text-gold mr-1.5" /> Volle Transparenz
              </span>
              <span className="flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 text-gold mr-1.5" /> Premium-Schutz
              </span>
              <span className="flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 text-gold mr-1.5" /> Geprüfte Partner
              </span>
            </motion.div>
          </div>

          {/* Right quick product entry cards (All 4 sectors) */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              
              {/* Box 1: Photovoltaik Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                onClick={() => onSelectService('photovoltaik')}
                className="group relative cursor-pointer overflow-hidden bg-zinc-950/75 hover:bg-zinc-950 border border-zinc-900 hover:border-gold/50 p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl pointer-events-none group-hover:bg-gold/10" />
                <div className="flex items-start space-x-3.5">
                  <div className="flex-shrink-0 p-2 border border-gold/30 text-gold bg-black">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-sm tracking-wide text-white group-hover:text-gold transition-colors">
                      Photovoltaik
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                      Herstellerunabhängige Solarsysteme, Heimspeicher &amp; Wallboxen im transparenten Renditevergleich.
                    </p>
                  </div>
                </div>
                <div className="pt-3.5 flex items-center text-[10px] uppercase tracking-wider font-bold text-gold group-hover:underline">
                  Auswertung anfordern
                  <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>

              {/* Box 2: Wärmepumpen Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                onClick={() => onSelectService('waermepumpe')}
                className="group relative cursor-pointer overflow-hidden bg-zinc-950/75 hover:bg-zinc-950 border border-zinc-900 hover:border-gold/50 p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl pointer-events-none group-hover:bg-gold/10" />
                <div className="flex items-start space-x-3.5">
                  <div className="flex-shrink-0 p-2 border border-gold/30 text-gold bg-black">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-sm tracking-wide text-white group-hover:text-gold transition-colors">
                      Wärmepumpen
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                      Hocheffiziente Luft-Wasser-Systeme mit natürlichen Kältemitteln. Bis zu 70% KfW-Förderservice.
                    </p>
                  </div>
                </div>
                <div className="pt-3.5 flex items-center text-[10px] uppercase tracking-wider font-bold text-gold group-hover:underline">
                  Förderprüfung starten
                  <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>

              {/* Box 3: Strom & Gas Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                onClick={() => onSelectService('strom_gas')}
                className="group relative cursor-pointer overflow-hidden bg-zinc-950/75 hover:bg-zinc-950 border border-zinc-900 hover:border-gold/50 p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl pointer-events-none group-hover:bg-gold/10" />
                <div className="flex items-start space-x-3.5">
                  <div className="flex-shrink-0 p-2 border border-gold/30 text-gold bg-black">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-sm tracking-wide text-white group-hover:text-gold transition-colors">
                      Strom &amp; Gas
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                      Laufende Energiekosten-Optimierung für Privat- &amp; Gewerbeobjekte mit maßgeschneiderten Großhandelstarifen.
                    </p>
                  </div>
                </div>
                <div className="pt-3.5 flex items-center text-[10px] uppercase tracking-wider font-bold text-gold group-hover:underline">
                  Vergleich anfordern
                  <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>

              {/* Box 4: Immobilien Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                onClick={() => onSelectService('immobilien')}
                className="group relative cursor-pointer overflow-hidden bg-zinc-950/75 hover:bg-zinc-950 border border-zinc-900 hover:border-gold/50 p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl pointer-events-none group-hover:bg-gold/10" />
                <div className="flex items-start space-x-3.5">
                  <div className="flex-shrink-0 p-2 border border-gold/30 text-gold bg-black">
                    <Home className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-sm tracking-wide text-white group-hover:text-gold transition-colors">
                      Premium Immobilien
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                      Immobilien Von Morgen: Professioneller Immobilienverkauf, Wertermittlung &amp; Energieeffizienzoptimierung.
                    </p>
                  </div>
                </div>
                <div className="pt-3.5 flex items-center text-[10px] uppercase tracking-wider font-bold text-gold group-hover:underline">
                  Bewertung beauftragen
                  <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>

            </div>

            {/* Sektorenübergreifende Beratung Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              onClick={() => onSelectService('beratung_komplett')}
              className="mt-4 bg-zinc-950 border border-gold/20 p-4 flex items-center justify-between cursor-pointer hover:border-gold transition-all duration-300 shadow-md"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                <span className="text-[11px] text-zinc-300 tracking-wide">
                  <strong>Synergievorteil:</strong> Energiekonzepte &amp; Immobilien komplett vernetzen.
                </span>
              </div>
              <span className="text-gold text-[10px] uppercase tracking-wider font-bold flex items-center flex-shrink-0 ml-2">
                Alles anfragen <ArrowRight className="w-3 h-3 ml-1" />
              </span>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
}
