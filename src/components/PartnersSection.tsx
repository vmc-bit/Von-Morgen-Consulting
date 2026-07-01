import React from 'react';
import { Handshake, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface BrandLogo {
  name: string;
  type: 'Hersteller' | 'Infrastruktur' | 'Netzwerk' | 'Partner' | 'Technik & Handwerk (Solar)';
  badge: string;
}

interface PartnersSectionProps {
  onOpenPartner?: () => void;
}

export default function PartnersSection({ onOpenPartner }: PartnersSectionProps) {
  const partners: BrandLogo[] = [
    // 1. Hersteller (Zuerst)
    { name: 'Viessmann', type: 'Hersteller', badge: 'Wärmepumpen' },
    { name: 'Buderus', type: 'Hersteller', badge: 'Heizsysteme' },
    { name: 'Vaillant', type: 'Hersteller', badge: 'Klimasysteme' },
    { name: 'Bosch', type: 'Hersteller', badge: 'Smart Home' },
    
    // 2. Infrastruktur
    { name: 'Sigenergy', type: 'Infrastruktur', badge: 'SigenStor' },
    { name: 'AIKO Solar', type: 'Infrastruktur', badge: 'ABC Module' },
    { name: 'BYD', type: 'Infrastruktur', badge: 'LFP Speicher' },
    { name: 'SMA', type: 'Infrastruktur', badge: 'Wechselrichter' },
    
    // 3. Netzwerke & Partner (Zuletzt)
    { name: 'Teleson', type: 'Netzwerk', badge: 'Energiebroker' },
    { name: 'Energieoptimierung DE', type: 'Netzwerk', badge: 'Gebäude-Audits' },
    { name: 'Sol Living', type: 'Technik & Handwerk (Solar)', badge: 'Zertifizierter Installationspartner' },
    { name: '800 Solar', type: 'Technik & Handwerk (Solar)', badge: 'Balkonkraftwerke & PV-Installateur' },
    { name: 'Haushirsch', type: 'Partner', badge: 'Immobilienpartner' },
    { name: 'Live Now Immobilien', type: 'Partner', badge: 'Immobilienkooperation' },
    { name: 'Maklerplan', type: 'Partner', badge: 'Maklerkooperation' },
    { name: 'Fleischer Winkler', type: 'Partner', badge: 'Bau- & Wohnkonzepte' }
  ];

  // Repeat the list exactly once for mathematically perfect seamless percentage looping
  const doubledPartners = [...partners, ...partners];

  return (
    <section 
      id="partner" 
      className="py-20 bg-zinc-950 border-t border-b border-zinc-900/80 relative overflow-hidden select-none"
    >
      {/* Soft background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gold/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Simplified Aesthetic Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-zinc-900/60 border border-gold/20 text-gold px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest font-mono rounded-full">
            <Handshake className="w-3.5 h-3.5" />
            <span>Maklerunabhängiges Brokerage</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
            Unser erstklassiges <span className="text-gold-gradient italic">Partnernetzwerk</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-light">
            Wir vergleichen und kombinieren herstellerunabhängig die stärksten Systemmarken und zertifizierten regionalen Handwerkspartner für Sie – abgestimmt auf optimale Energieausbeute und B2B-Vorteilskonditionen.
          </p>
        </div>

        {/* Endless Rolling Logo Animation Track */}
        <div className="relative py-8 my-6 overflow-hidden">
          {/* Luxurious Gradient Fade Mask Overlay Left */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent z-20 pointer-events-none" />
          
          {/* Luxurious Gradient Fade Mask Overlay Right */}
          <div className="absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-zinc-950 via-zinc-950/90 to-transparent z-20 pointer-events-none" />

          {/* Endless Marquee Track utilizing Motion */}
          <div className="flex w-full overflow-hidden">
            <motion.div 
              className="flex gap-4 sm:gap-6 shrink-0 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: 28,
                repeat: Infinity,
              }}
            >
              {doubledPartners.map((item, idx) => (
                <div 
                  key={`${item.name}-${idx}`}
                  className="flex flex-col items-center justify-center min-w-[180px] sm:min-w-[220px] h-24 bg-zinc-900/40 hover:bg-zinc-900/85 border border-zinc-900/60 hover:border-gold/30 p-4 transition-all duration-300 relative group rounded"
                >
                  {/* Subtle visual bracket accents */}
                  <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-zinc-800 group-hover:border-gold/50 transition-colors" />
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-zinc-800 group-hover:border-gold/50 transition-colors" />
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-zinc-800 group-hover:border-gold/50 transition-colors" />
                  <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-zinc-800 group-hover:border-gold/50 transition-colors" />

                  {/* Top category label */}
                  <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase group-hover:text-gold transition-colors pb-1">
                    {item.type}
                  </span>

                  {/* Brand Typography Representation (Designed as clean corporate vector-style logos) */}
                  <span 
                    className="font-serif text-sm sm:text-base text-zinc-300 group-hover:text-white tracking-wide font-medium transition-colors"
                    style={{ fontFamily: '"Cinzel", "Times New Roman", Georgia, serif' }}
                  >
                    {item.name}
                  </span>

                  {/* Technical badge */}
                  <span className="text-[9px] text-zinc-650 font-sans mt-1 group-hover:text-zinc-400 transition-colors">
                    {item.badge}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dedicated B2B Partner-Cooperation Card Grid */}
        <div className="mt-16 bg-black border border-zinc-900 rounded-lg overflow-hidden p-6 sm:p-8 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[10px] uppercase tracking-widest text-gold font-mono font-bold bg-gold/5 px-2.5 py-1 rounded">
                B2B Handwerk- &amp; Installationskooperation
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white">
                Werden Sie regionaler <span className="text-gold-gradient italic">Lead- &amp; Marketingpartner</span>
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Von Morgen Consulting liefert exklusive, telefonisch vorqualifizierte Anfragen für Solartechnik in Ihrer Region oder erstellt maßgeschneiderte Performance-Marketing-Kampagnen zur Stärkung Ihrer eigenen Marke.
              </p>
            </div>

            {onOpenPartner && (
              <button
                onClick={onOpenPartner}
                className="w-full lg:w-auto inline-flex items-center justify-center px-6 py-3 bg-gold hover:bg-gold-light text-black text-xs font-bold uppercase tracking-widest transition rounded shrink-0 cursor-pointer"
              >
                Kooperation anfragen
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-zinc-900/80">
            <div className="space-y-1">
              <h4 className="text-white text-xs font-bold font-serif uppercase tracking-wider">
                Exklusiver Gebietsschutz
              </h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                Maximal zwei bis drei Handwerkspartner pro Region, um gesunde Margen und hohe Abschlussquoten für qualifizierte Leads zu garantieren.
              </p>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-white text-xs font-bold font-serif uppercase tracking-wider flex items-center">
                Exklusiv-Leads auf Anfrage
              </h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                Auf ausdrücklichen Wunsch können Leads auch komplett exklusiv für Ihr Einzugsgebiet generiert werden. Die Abstimmung erfolgt stets individuell.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-white text-xs font-bold font-serif uppercase tracking-wider">
                Performance Marketing Option
              </h4>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                Wahlweise nutzen wir Werbebudgets, schalten Meta-Werbeanzeigen (Facebook &amp; Instagram) und übernehmen das Anzeigen-Management für Sie zu einer festen monatlichen Pauschalgebühr (Service-Fee).
              </p>
            </div>
          </div>
        </div>

        {/* Minimal Understated Notice */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-zinc-900/60 pt-8 text-center sm:text-left animate-fade-in">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-8 h-8 rounded bg-zinc-900 border border-gold/10 flex items-center justify-center text-gold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-wider block">Garantierte Unabhängigkeit</span>
              <p className="text-white text-xs font-semibold">Keine Exklusivverpflichtung gegenüber einzelnen Konzernen</p>
            </div>
          </div>

          <a
            href="#konfigurator"
            className="flex items-center justify-center px-5 py-2.5 bg-zinc-900 border border-gold/30 hover:border-gold hover:bg-gold/10 text-gold hover:text-white text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer"
          >
            Smarte Beratung Starten
            <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
          </a>
        </div>

      </div>
    </section>
  );
}
