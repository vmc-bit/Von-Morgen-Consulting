import React, { useRef } from 'react';
import { Shield, Sparkles, Scale, HeartHandshake, Layers, Check, Trophy, ShieldAlert } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function IndependentBrokerSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const brandCategories = [
    {
      title: 'Premium-Heizsysteme & Solar',
      desc: 'Herausragende Marken mit lebenslanger Ausrichtung und maximaler Langlebigkeit sowie zertifizierte Installations- und Solarmodul-Partner.',
      brands: ['Viessmann', 'Bosch', 'Buderus', 'Vaillant'],
      color: 'border-gold/30 bg-zinc-900/40 text-gold'
    },
    {
      title: 'Smart Energy & Speicher-Pioniere',
      desc: 'Sektorenkopplung und innovative Hybrid-Wechselrichter mit höchstem Wirkungsgrad.',
      brands: ['Sigenergy', 'Aiko Solar', 'SMA Solar', 'BYD'],
      color: 'border-gold/30 bg-zinc-900/40 text-gold'
    },
    {
      title: 'Kostensieger & Energie-Optimierer',
      desc: 'Deutsche Großhandelskonditionen und kontinuierliche Tarifoptimierungen für Strom & Gas.',
      brands: ['Energieoptimierungen Deutschland', 'Teleson', 'Trina Solar', 'Huawei'],
      color: 'border-gold/30 bg-zinc-900/40 text-gold'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Persönlicher Erstkontakt',
      text: 'Unser Münchner Expertenteam analysiert herstellerneutral Ihre Rechnungen, Dachpotentiale oder Immobilienpläne.'
    },
    {
      num: '02',
      title: 'Ganzheitliche Angebotserfassung',
      text: 'Wir vergleichen Dutzende Premium-Hersteller, Energie-Lieferanten oder Immobilien-Interessenten bundesweit.'
    },
    {
      num: '03',
      title: 'Profitabilitätsrechnung',
      text: 'Sie erhalten eine glasklare Rentabilitätsrechnung mit sämtlichen zustehenden Bundesförderungen oder Immobilienbewertungen.'
    },
    {
      num: '04',
      title: 'Schnittstelle & Qualitätssicherung',
      text: 'Wir übergeben das vorkonfigurierte Projekt an zertifizierte Meisterbetriebe in unserem exklusiven Partnernetzwerk.'
    }
  ];

  return (
    <section ref={containerRef} id="ueber-uns" className="py-24 bg-black bg-dot-matrix relative overflow-hidden border-t border-b border-zinc-900">
      {/* Decorative vector background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-[10%] right-[5%] w-96 h-96 rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-96 h-96 rounded-full bg-gold/5 blur-[120px]" />
      </motion.div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold font-display">
            Unsere Philosophie
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
            100% Unabhängig. Keine Herstellerbindung. <br />
            <span className="text-gold-gradient font-medium italic">
              Einzig Ihrem Erfolg verpflichtet.
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Als herstellerunabhängiger Makler und Beratungsdienstleister agiert <strong>Von Morgen Consulting</strong> im reinen Kundeninteresse. 
            Wir sind kein klassischer Verkäufer einer einzelnen Hausmarke. Unser Münchener Expertenteam fungiert als Ihr neutraler Broker: 
            Wir vergleichen den gesamten Markt in den Segmenten <strong>Photovoltaik, Wärmepumpen, Strom- &amp; Gastarife</strong> sowie 
            <strong>Immobilien-Vermittlung</strong>, um für Sie das absolute Maximum an Rendite und Wirtschaftlichkeit herauszuholen.
          </p>
        </div>

        {/* Dynamic 3-Card Broker Value Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Neutrality */}
          <div className="bg-zinc-950/90 p-8 border border-zinc-900/80 hover:border-gold/30 transition-all duration-300 corner-notches shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
            <div className="w-12 h-12 border border-gold/40 text-gold flex items-center justify-center mb-6 bg-black">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-3">
              Volle Markttransparenz
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Ob High-End Premiumklasse aus Deutschland (Viessmann, Buderus, Vaillant), smarte Speicher- & Modulinnovatoren (Sigenergy, Aiko Solar ABC) oder exklusive Partnerkooperationen &amp; Meisterbetriebe (Energieoptimierung Deutschland, Teleson sowie Sol Living als qualifizierter Handwerkspartner): Wir legen Vor- und Nachteile aller Optionen ungeschönt für Sie offen.
            </p>
          </div>

          {/* Connection */}
          <div className="bg-zinc-950/90 p-8 border border-zinc-900/80 hover:border-gold/30 transition-all duration-300 corner-notches shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
            <div className="w-12 h-12 border border-gold/40 text-gold flex items-center justify-center mb-6 bg-black">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-3">
              Das Bindeglied zu den Besten
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Wir schützen Sie vor überteuerten Angeboten und mangelhaften Ausführungen. Wir verhandeln Tarife und Konditionen und übergeben Ihr Vorhaben nur an handverlesene, hochqualifizierte Partner unseres Netzwerks.
            </p>
          </div>

          {/* Consultation Quality */}
          <div className="bg-zinc-950/90 p-8 border border-zinc-900/80 hover:border-gold/30 transition-all duration-300 corner-notches shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
            <div className="w-12 h-12 border border-gold/40 text-gold flex items-center justify-center mb-6 bg-black">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-3">
              Kombinierte System-Vorteile
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Durch die Vernetzung von Solaranlagen mit intelligenten Wärmepumpen, optimierten Reststromverträgen und dem Kernwert Ihrer Immobilie entsteht ein echter, messbarer Vermögensaufbau. Alles aus einer Hand.
            </p>
          </div>
        </div>

        {/* Brand / Product Spectrum Showcase */}
        <div className="bg-zinc-950 border border-gold/15 p-8 lg:p-12 mt-16 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center space-x-2.5 bg-black border border-gold/20 rounded-full px-3.5 py-1">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-300">
                  Hersteller-Spektrum
                </span>
              </div>
              <h3 className="font-serif font-normal text-2xl lg:text-3xl text-white">
                Vom Marktführer bis zum Geheimtipp
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Weil wir unabhängig sind, haben wir Verträge mit allen führenden Großhändlern und bundesweiten Partnerbetrieben. Das sichert Ihnen vollen Zugriff auf geprüfte Spitzenleistung und direkten Förderservice.
              </p>
              
              <div className="pt-2">
                <blockquote className="border-l border-gold pl-4 py-1 italic text-xs text-gold">
                  &quot;Wir suchen das Crème-de-la-Crème Produkt für Ihre individuelle Lebenssituation.&quot;
                </blockquote>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {brandCategories.map((cat, idx) => (
                <div key={idx} className={`p-6 border border-zinc-900 bg-black/60 backdrop-blur-sm space-y-4 hover:border-gold/30 transition-all duration-300`}>
                  <h4 className="font-display font-bold text-xs tracking-wider uppercase text-white">{cat.title}</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">{cat.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cat.brands.map((brand, bIdx) => (
                      <span key={bIdx} className="px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase bg-zinc-900 border border-zinc-800 text-gold">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Process Flow 'Der Ablauf' */}
        <div className="mt-20 pt-16 border-t border-zinc-900">
          <h3 className="text-center font-serif font-normal text-2xl sm:text-3xl text-white mb-12">
            Ihr Weg mit Von Morgen Consulting
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                <div className="font-display font-medium text-4xl text-gold/10 group-hover:text-gold/20 transition-colors duration-300 absolute -top-5 left-0">
                  {step.num}
                </div>
                <div className="relative pt-4 space-y-2">
                  <h4 className="font-display font-bold text-sm tracking-wide text-white group-hover:text-gold transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {step.text}
                  </p>
                </div>
                {/* Visual horizontal separator lines between steps for desktop */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-[40%] right-[-15%] w-[20%] border-t border-dashed border-gold/10 pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
