import React, { useState, useRef } from 'react';
import { Sun, Flame, Sparkles, HandCoins, ArrowRight, Zap, CheckCircle2, Building, RefreshCw, BarChart3, TrendingUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ProductType } from '../types';
import DetailedSubpagesModal from './DetailedSubpagesModal';

import pvImg from '../assets/images/pv_luxury_solar_1782141807378.jpg';
import heatpumpImg from '../assets/images/heatpump_luxury_warm_1782141825836.jpg';
import energyGridImg from '../assets/images/energy_grid_luxury_1782141843043.jpg';
import realEstateImg from '../assets/images/munich_real_estate_1782141858851.jpg';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse coordinates relative to the card dimensions (-0.5 to 0.5)
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Max 3D tilt offset in degrees - subtle and exquisite
    const maxRotate = 7; 
    
    const rotX = -((y - yc) / yc) * maxRotate;
    const rotY = ((x - xc) / xc) * maxRotate;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ease-out select-none ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? 1.025 : 1,
        y: isHovered ? -6 : 0,
        boxShadow: isHovered 
          ? "0 25px 60px -15px rgba(213, 178, 101, 0.18)" 
          : "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
        mass: 0.5
      }}
    >
      {/* 3D dynamic glint lighting sheen overlay */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay transition-opacity duration-350"
          style={{
            background: `radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 245, 215, 0.45), transparent 80%)`,
          }}
          ref={(el) => {
            if (el && cardRef.current) {
              // Map continuous calculated gradient positions that follow the tilt accentuation
              cardRef.current.style.setProperty('--mouse-x', `${(rotateY + 7) * 7.14}%`);
              cardRef.current.style.setProperty('--mouse-y', `${(-rotateX + 7) * 7.14}%`);
            }
          }}
        />
      )}
      
      {/* High-contrast precision gold boundary highlight */}
      <div 
        className={`absolute inset-0 border transition-all duration-500 pointer-events-none z-20 ${
          isHovered ? 'border-gold/35' : 'border-zinc-800'
        }`}
      />

      {/* Layer separation depth effect for all inner content */}
      <div style={{ transform: "translateZ(20px)" }} className="h-full relative z-0">
        {children}
      </div>
    </motion.div>
  );
}

interface ProductSectionsProps {
  onSelectService: (service: ProductType) => void;
}

export default function ProductSections({ onSelectService }: ProductSectionsProps) {
  const [openSector, setOpenSector] = useState<'photovoltaik' | 'waermepumpe' | 'strom_gas' | 'immobilien' | null>(null);

  // References and Scroll-Linked Parallax hooks for all 4 product sections
  const pvRef = useRef<HTMLElement>(null);
  const wpRef = useRef<HTMLElement>(null);
  const sgRef = useRef<HTMLElement>(null);
  const imRef = useRef<HTMLElement>(null);

  const scrollPv = useScroll({ target: pvRef, offset: ["start end", "end start"] });
  const scrollWp = useScroll({ target: wpRef, offset: ["start end", "end start"] });
  const scrollSg = useScroll({ target: sgRef, offset: ["start end", "end start"] });
  const scrollIm = useScroll({ target: imRef, offset: ["start end", "end start"] });

  const yPv = useTransform(scrollPv.scrollYProgress, [0, 1], ["-12%", "12%"]);
  const yWp = useTransform(scrollWp.scrollYProgress, [0, 1], ["-10%", "10%"]);
  const ySg = useTransform(scrollSg.scrollYProgress, [0, 1], ["-14%", "14%"]);
  const yIm = useTransform(scrollIm.scrollYProgress, [0, 1], ["-11%", "11%"]);

  return (
    <div className="space-y-0">
      
      {/* 1. PHOTOVOLTAIK SECTION */}
      <section ref={pvRef} id="photovoltaik" className="py-24 bg-zinc-950 bg-grid-white text-white relative overflow-hidden border-b border-zinc-900">
        {/* Decorative backdrop */}
        <motion.div style={{ y: yPv }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[40%] h-[50%] bg-gold/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-5 w-[30%] h-[40%] bg-gold/5 rounded-full blur-[140px]" />
        </motion.div>

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Grid Column - Slide in from left */}
            <motion.div 
              className="lg:col-span-5 space-y-6 order-last lg:order-first"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Premium Widescreen Photo Display */}
              <div className="group relative overflow-hidden border border-zinc-900 bg-zinc-950 p-1.5 rounded-2xl shadow-2xl hover:border-gold/30 transition-all duration-500">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                  {/* Subtle hover overlay and dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10 pointer-events-none group-hover:via-transparent transition-all duration-500" />
                  <img 
                    src={pvImg} 
                    alt="Smarte Solaranlagen & Speicher lösung - Von Morgen Consulting" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md border border-gold/40 text-gold text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono z-20">
                    Soll-Ist Renditeschätzung
                  </div>
                  <div className="absolute bottom-3 left-3 z-20 text-white font-serif italic text-xs opacity-90">
                    Smarte Solaranlagen & Speicher
                  </div>
                </div>
              </div>

              <TiltCard className="bg-black p-6 shadow-2xl">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gold/5 rounded-full blur-xl" />
                
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold mb-6 flex items-center">
                  <Zap className="w-4 h-4 text-gold mr-2" />
                  Das Ertragskonzept Photovoltaik
                </h4>

                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="flex items-start space-x-3.5 p-3.5 bg-zinc-900/45 border border-zinc-900/60">
                    <div className="text-[10px] font-bold text-black bg-gold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">1</div>
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wide text-white">Intelligenter Hybrid-Speicher</p>
                      <p className="text-zinc-400 text-xs mt-1 leading-relaxed">Erhöht den Eigenverbrauch Ihres Solarstroms von standardmäßig 30% auf bis zu 85%. Unabhängigkeit pur.</p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start space-x-3.5 p-3.5 bg-zinc-900/45 border border-zinc-900/60">
                    <div className="text-[10px] font-bold text-black bg-gold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">2</div>
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wide text-white">0% Mehrwertsteuer-Privileg</p>
                      <p className="text-zinc-400 text-xs mt-1 leading-relaxed">Absolut steuerfreier Kauf von Solarmodulen, Wechselrichtern und Speicher für den privaten Betrieb.</p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start space-x-3.5 p-3.5 bg-zinc-900/45 border border-zinc-900/60">
                    <div className="text-[10px] font-bold text-black bg-gold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">3</div>
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wide text-white">Sektorenkopplung & Smart Grid</p>
                      <p className="text-zinc-400 text-xs mt-1 leading-relaxed">Nutzen Sie Ihren kostengünstigen Solar-Mehrertrag zur direkten Energieversorgung Ihrer neuen Wärmepumpe.</p>
                    </div>
                  </div>
                </div>

                {/* Live KPI indicators */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-zinc-800">
                  <div className="bg-zinc-950 p-3 text-center border border-zinc-900">
                    <span className="text-xl font-bold font-display text-gold">~14-19%</span>
                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1 font-bold">Kapitalrendite</p>
                  </div>
                  <div className="bg-zinc-950 p-3 text-center border border-zinc-900">
                    <span className="text-xl font-bold font-display text-white">&lt; 8,5 Jahre</span>
                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1 font-bold">Amortisationszeit</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Explanatory Column - Slide in from right */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-gold/30 text-gold rounded-full px-3.5 py-1">
                <Sun className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-bold tracking-widest font-display">
                  Sektor Solarstrom
                </span>
              </div>
              
              <h3 className="font-serif font-normal text-3xl sm:text-4xl text-white tracking-tight">
                Photovoltaik: Machen Sie Ihr Dach zum <span className="text-gold-gradient italic">ertragsstarken Solarkraftwerk</span>
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
                Strompreise sind unberechenbar und schwanken extrem. Mit einer herstellerunabhängig geplanten Solaranlage sichern Sie sich jahrzehntelang vor steigenden Netzentgelten. Wir analysieren Ihr Solarpotenzial herstellerneutral und vermitteln die Crème de la Crème erstklassiger Wechselrichter- und Batteriespeicher-Systeme.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3 text-zinc-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span><strong>Premium-Portfolio:</strong> Unabhängige Kombinationen aus Sig Energy, SMA, Fronius, BYD, Trina und Jinko Solar.</span>
                </div>
                <div className="flex items-start space-x-3 text-zinc-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span><strong>Optimierte Smart-Speicher:</strong> Perfekte Dimensionierung auf Ihre tatsächliche Haushaltslastkurve.</span>
                </div>
                <div className="flex items-start space-x-3 text-zinc-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span><strong>Rundum-Sorglos-Planung:</strong> Komplette Wirtschaftlichkeitssimulation inklusive regionalem Netzanschlussdienst.</span>
                </div>
              </div>

              {/* Subsidies Alert Box */}
              <div className="bg-black/60 p-5 rounded-none border border-zinc-900 flex items-start space-x-4">
                <div className="p-2 bg-zinc-900 border border-gold/20 text-gold flex-shrink-0">
                  <HandCoins className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider text-white">Staatliche Privilegien & Erträge</p>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    Neben der 0% Mehrwertsteuer profitieren Sie von der gesetzlich fixierten Einspeisevergütung für nicht genutzten Solarstrom. Zudem sind alle PV-Renditen privater Anlagen bis 30 kWp in Deutschland komplett von der Einkommensteuer freigestellt.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onSelectService('photovoltaik')}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gold hover:bg-gold-light hover:text-black text-black font-bold tracking-wide uppercase text-xs transition-all pointer-events-auto cursor-pointer"
                >
                  Unverbindliche PV-Analyse starten
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </button>
                <button
                  onClick={() => setOpenSector('photovoltaik')}
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent hover:bg-zinc-900 border border-gold/40 hover:border-gold text-gold font-bold tracking-wide uppercase text-xs transition-all pointer-events-auto cursor-pointer"
                >
                  Ausführlichere Unterseite öffnen
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. WÄRMEPUMPEN SECTION */}
      <section ref={wpRef} id="waermepumpen" className="py-24 bg-black bg-grid-gold text-white relative overflow-hidden border-b border-zinc-900">
        {/* Decorative backdrop */}
        <motion.div style={{ y: yWp }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[40%] h-[50%] bg-gold/5 rounded-full blur-[140px]" />
        </motion.div>

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Explanatory Column - Slide in from left */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-gold/30 text-gold rounded-full px-3.5 py-1">
                <Flame className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-bold tracking-widest font-display">
                  Sektor Heizungstechnik
                </span>
              </div>
              
              <h3 className="font-serif font-normal text-3xl sm:text-4xl text-white tracking-tight">
                Wärmepumpe: Heizen Sie hocheffizient mit kostenloser <span className="text-gold-gradient italic">Umweltwärme</span>
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
                Der Abschied von fossilen Brennstoffen war finanziell nie lohnender. Moderne Wärmepumpen entziehen der Umluft wertvolle Wärmeenergie und heizen Ihre Wohnräume selbst bei extremen Minusgraden kostengünstig und absolut krisensicher. Wir vermitteln etablierte Spitzenklasse führender Marken.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3 text-zinc-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span><strong>Deutsche Traditionsmarken:</strong> Viessmann, Bosch, Buderus und Nibe – ultraleise im Betrieb, langlebig gefertigt.</span>
                </div>
                <div className="flex items-start space-x-3 text-zinc-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span><strong>Gebäude-Eignungsprüfung:</strong> Wir kalkulieren herstellerneutral Ihren Heizkörper-Vorlauf und Gebäudeheizlast.</span>
                </div>
                <div className="flex items-start space-x-3 text-zinc-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span><strong>Komplette Kreditanbahnung:</strong> Optimale Fördermittelnavigation für die KfW-Zuschüsse.</span>
                </div>
              </div>

              {/* Subsidies Alert Box */}
              <div className="bg-zinc-950 p-5 rounded-none border border-zinc-900 flex items-start space-x-4">
                <div className="p-2 bg-zinc-900 border border-gold/20 text-gold flex-shrink-0">
                  <HandCoins className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider text-white">KfW-Förderung 2026: Bis zu 70% geschenkt!</p>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    Der deutsche Staat zahlt beim Austausch Ihrer funktionstüchtigen alten Gas- oder Ölheizung gigantische Zuschüsse: 30% Grundförderung + 20% Speed-Klimabonus + 5% Effizienzbonus für natürliche Kältemittel. Maximal gedeckelt bei 70% der Investitionssumme (bis zu 21.000 € echte Ersparnis).
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onSelectService('waermepumpe')}
                  className="inline-flex items-center justify-center px-6 py-3 bg-zinc-900 hover:bg-gold hover:text-black border border-gold text-gold font-bold tracking-wide uppercase text-xs transition-all pointer-events-auto cursor-pointer"
                >
                  Heizungsanalyse & Beratung beantragen
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </button>
                <button
                  onClick={() => setOpenSector('waermepumpe')}
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent hover:bg-zinc-900 border border-gold/40 hover:border-gold text-gold font-bold tracking-wide uppercase text-xs transition-all pointer-events-auto cursor-pointer"
                >
                  Ausführlichere Unterseite öffnen
                </button>
              </div>
            </motion.div>

            {/* Visual Grid Column right side - Slide in from right */}
            <motion.div 
              className="lg:col-span-5 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Premium Widescreen Photo Display */}
              <div className="group relative overflow-hidden border border-zinc-900 bg-zinc-950 p-1.5 rounded-2xl shadow-2xl hover:border-gold/30 transition-all duration-500">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                  {/* Subtle hover overlay and dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10 pointer-events-none group-hover:via-transparent transition-all duration-500" />
                  <img 
                    src={heatpumpImg} 
                    alt="Hocheffiziente Wärmepumpen - Von Morgen Consulting" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md border border-gold/40 text-gold text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono z-20">
                    Fördereffizienz im Verbund
                  </div>
                  <div className="absolute bottom-3 left-3 z-20 text-white font-serif italic text-xs opacity-90">
                    Hocheffiziente Heizanlagen
                  </div>
                </div>
              </div>

              <TiltCard className="bg-black p-6 shadow-2xl">
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gold/5 rounded-full blur-xl" />
                
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold mb-6 flex items-center">
                  <Flame className="w-4 h-4 text-gold mr-2" />
                  Effizienz & Umweltbilanz
                </h4>

                <div className="space-y-4">
                  {/* Metric 1 */}
                  <div className="p-4 bg-zinc-950 border border-zinc-900 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Hebelwirkung</p>
                      <p className="font-display font-medium text-white text-xs mt-0.5">Aus 1 kWh Strom entsteht</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-gold">~4,1 kWh</span>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase mt-0.5">Wärmeenergie</p>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-4 bg-zinc-950 border border-zinc-900 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">CO2 Einsparung</p>
                      <p className="font-display font-medium text-white text-xs mt-0.5">Pro Betriebsjahr im Schnitt</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-white">~2,3 Tonnen</span>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase mt-0.5">CO2 Reduktion</p>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-4 bg-zinc-950 border border-zinc-900 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Staatlicher Eigenanteil</p>
                      <p className="font-display font-medium text-white text-xs mt-0.5">Maximaler Zuschusssatz</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-gold">70 %</span>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase mt-0.5">Finanzierungsbonus</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs italic text-center">
                  💡 Tipp von Morgen: Speisen Sie die hocheffiziente Wärmepumpe im Winter mit Ihrem günstigen PV-Strom für unschlagbar billige Heizkosten!
                </div>
              </TiltCard>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. STROM & GAS TARIFOPTIMIERUNG */}
      <section ref={sgRef} id="strom-gas" className="py-24 bg-zinc-950 bg-dot-matrix text-white relative overflow-hidden border-b border-zinc-900">
        {/* Decorative backdrop */}
        <motion.div style={{ y: ySg }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[40%] h-[40%] bg-gold/5 rounded-full blur-[140px]" />
        </motion.div>

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column left - Slide in from left */}
            <motion.div 
              className="lg:col-span-5 space-y-6 order-last lg:order-first"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Premium Widescreen Photo Display */}
              <div className="group relative overflow-hidden border border-zinc-900 bg-zinc-950 p-1.5 rounded-2xl shadow-2xl hover:border-gold/30 transition-all duration-500">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                  {/* Subtle hover overlay and dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10 pointer-events-none group-hover:via-transparent transition-all duration-500" />
                  <img 
                    src={energyGridImg} 
                    alt="Energiekosten-Tarifoptimierung - Von Morgen Consulting" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md border border-gold/40 text-gold text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono z-20">
                    Großhandelspreis-Radar
                  </div>
                  <div className="absolute bottom-3 left-3 z-20 text-white font-serif italic text-xs opacity-90">
                    Tarif- & Netzkostenoptimierung
                  </div>
                </div>
              </div>

              <TiltCard className="bg-black p-6 shadow-2xl">
                <div className="absolute top-0 left-0 w-20 h-20 bg-gold/5 rounded-full blur-xl" />

                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold mb-6 flex items-center">
                  <BarChart3 className="w-4 h-4 text-gold mr-2" />
                  Das Einsparpotential im Vergleich
                </h4>

                <div className="space-y-4">
                  <div className="p-4 bg-zinc-950 border border-zinc-900">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase">Durchschnittliche Ersparnis (Privat)</p>
                    <div className="flex justify-between items-baseline mt-1">
                      <span className="text-white text-xs">Strom- & Gastarifoptimierung</span>
                      <span className="text-gold font-bold text-lg">bis zu 450 € / Jahr</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1.5 mt-2 rounded-full overflow-hidden">
                      <div className="bg-gold h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-950 border border-zinc-900">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase">Durchschnittliche Ersparnis (Gewerbe)</p>
                    <div className="flex justify-between items-baseline mt-1">
                      <span className="text-white text-xs">Gewerbe-Sonderkonditionen</span>
                      <span className="text-gold font-bold text-lg">bis zu 3.200 € / Jahr</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1.5 mt-2 rounded-full overflow-hidden">
                      <div className="bg-gold h-full rounded-full" style={{ width: '90%' }} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-zinc-400 text-xs text-center">
                  🛡️ <strong>Wechselservice von Morgen:</strong> 100% kostenfrei &amp; lückenlos im Übergang. Keinerlei Abschaltungsgefahr.
                </div>
              </TiltCard>
            </motion.div>

            {/* Content Column right - Slide in from right */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-gold/30 text-gold rounded-full px-3.5 py-1">
                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                <span className="text-[10px] uppercase font-bold tracking-widest font-display">
                  Sektor Tarifoptimierung
                </span>
              </div>
              
              <h3 className="font-serif font-normal text-3xl sm:text-4xl text-white tracking-tight">
                Strom & Gas: Sparen Sie bares Geld durch <span className="text-gold-gradient italic">exklusive Großhandels-Tarife</span>
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
                Verbraucher zahlen systematisch zu viel für die Energiegrundversorgung. Als Ihr unabhängiger Broker sichten wir täglich Großhandels-Konditionen und exklusive Tarife für Strom und Gas, die auf Vergleichsportalen oft gar nicht gelistet sind. Wir übernehmen den kompletten formalen Wechselservice – vollkommen kostenfrei für Sie.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3 text-zinc-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span><strong>Kontinuierliche Überwachung:</strong> Kein lästiges Verpassen von Kündigungsfristen. Wir melden uns rechtzeitig bei Tarif-Upgrades.</span>
                </div>
                <div className="flex items-start space-x-3 text-zinc-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span><strong>Gewerbe-Sonderverträge:</strong> Echte B2B Netzkonditionen für Kleinbetriebe, Kanzleien, Praxen und mittelständische Unternehmen.</span>
                </div>
                <div className="flex items-start space-x-3 text-zinc-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span><strong>100% Ökostrom-Optionen:</strong> Verknüpfen Sie Ihren Fremdstrombezug auf Wunsch mit rein regenerativer Zukunftsenergie.</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onSelectService('strom_gas')}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gold hover:bg-gold-light hover:text-black text-black font-bold tracking-wide uppercase text-xs transition-all pointer-events-auto cursor-pointer"
                >
                  Kostenfreien Tarif-Check anfordern
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </button>
                <button
                  onClick={() => setOpenSector('strom_gas')}
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent hover:bg-zinc-900 border border-gold/40 hover:border-gold text-gold font-bold tracking-wide uppercase text-xs transition-all pointer-events-auto cursor-pointer"
                >
                  Ausführlichere Unterseite öffnen
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. IMMOBILIEN VON MORGEN */}
      <section ref={imRef} id="immobilien" className="py-24 bg-black bg-grid-white text-white relative overflow-hidden border-b border-zinc-900">
        {/* Decorative backdrop */}
        <motion.div style={{ y: yIm }} className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-gold/5 rounded-full blur-[140px]" />
        </motion.div>

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Explanatory Column - Slide in from left */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-gold/30 text-gold rounded-full px-3.5 py-1">
                <Building className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-bold tracking-widest font-display">
                  Sektor Immobilien Vermittlung
                </span>
              </div>
              
              <h3 className="font-serif font-normal text-3xl sm:text-4xl text-white tracking-tight">
                Immobilien Von Morgen: Premium-Vermittlung mit <span className="text-gold-gradient italic">energetischem Mehrwert</span>
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
                Der Einbau modernster Photovoltaikanlagen oder Wärmepumpen steigert den Verkaufswert einer Immobilie im Raum München und bundesweit massiv. Wir vermitteln und vermarkten Wohnungen, Wohnhäuser und Grundstücke, bewerten Ihre Immobilie marktgerecht und verknüpfen den Verkauf mit unserem tiefen energetischen Know-how. Ein unschlagbares Argument für anspruchsvolle Käufer.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3 text-zinc-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span><strong>Diskrete Off-Market Beratung:</strong> Vermittlung von Premium-Wohnwerten im Großraum München und ausgewählten Großstädten.</span>
                </div>
                <div className="flex items-start space-x-3 text-zinc-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span><strong>Energetische Sanierungsexpertise:</strong> Käufer erhalten direkt ein Sanierungskonzept mit Fördermitteln aus einer Hand ausgearbeitet.</span>
                </div>
                <div className="flex items-start space-x-3 text-zinc-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span><strong>Erstellung von Energieausweisen:</strong> Rechtssichere Erfassung aller Verbrauchs- und Bedarfskennzahlklassen.</span>
                </div>
              </div>

              {/* Box Info */}
              <div className="bg-zinc-950 p-5 rounded-none border border-zinc-900 flex items-start space-x-4">
                <div className="p-2 bg-zinc-900 border border-gold/20 text-gold flex-shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider text-white">Ihr Werte-Vorteil</p>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    Häuser der Energieeffizienzklasse A/B erzielen am Markt bis zu 25% höhere Erlöse als unrenovierte Altbauten. Wir begleiten Sie bei der Transformation vor oder während der Vermarktungsphase.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onSelectService('immobilien')}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gold hover:bg-gold-light hover:text-black text-black font-bold tracking-wide uppercase text-xs transition-all pointer-events-auto cursor-pointer"
                >
                  Immobilienberatung & Bewertung buchen
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </button>
                <button
                  onClick={() => setOpenSector('immobilien')}
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent hover:bg-zinc-900 border border-gold/40 hover:border-gold text-gold font-bold tracking-wide uppercase text-xs transition-all pointer-events-auto cursor-pointer"
                >
                  Ausführlichere Unterseite öffnen
                </button>
              </div>
            </motion.div>

            {/* Visual Grid Column right side - Slide in from right */}
            <motion.div 
              className="lg:col-span-5 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Premium Widescreen Photo Display */}
              <div className="group relative overflow-hidden border border-zinc-900 bg-zinc-950 p-1.5 rounded-2xl shadow-2xl hover:border-gold/30 transition-all duration-500">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                  {/* Subtle hover overlay and dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10 pointer-events-none group-hover:via-transparent transition-all duration-500" />
                  <img 
                    src={realEstateImg} 
                    alt="Premium Immobilien Vermittlung München - Von Morgen Consulting" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md border border-gold/40 text-gold text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono z-20">
                    Off-Market München & Bayern
                  </div>
                  <div className="absolute bottom-3 left-3 z-20 text-white font-serif italic text-xs opacity-90">
                    Premium-Immobilien Vermittlung
                  </div>
                </div>
              </div>

              <TiltCard className="bg-black p-6 shadow-2xl">
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gold/5 rounded-full blur-xl" />

                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold mb-6 flex items-center">
                  <Building className="w-4 h-4 text-gold mr-2" />
                  Maklerkompetenz & Netzwerk
                </h4>

                <div className="space-y-4">
                  <div className="p-4 bg-zinc-950 border border-zinc-900">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase">Hauptsitz & Einzugsgebiet</p>
                    <p className="font-serif italic text-white text-base mt-1">München & Region Bayern</p>
                    <p className="text-[10px] text-zinc-400 mt-1">Zudem bundesweites Partner-Maklernetzwerk für optimale Reichweite.</p>
                  </div>

                  <div className="p-4 bg-zinc-950 border border-zinc-900">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase">Mehrwert</p>
                    <p className="font-serif italic text-white text-base mt-1">Energetischer Vorsprung</p>
                    <p className="text-[10px] text-zinc-400 mt-1">Schnittstellenberatung: Solar-Nachrüstung bereits im Kaufpreis-Angebot inkludiert.</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

          </div>
        </div>
      </section>

      <AnimatePresence>
        {openSector !== null && (
          <DetailedSubpagesModal 
            initialSector={openSector} 
            onClose={() => setOpenSector(null)} 
            onSelectService={onSelectService} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
