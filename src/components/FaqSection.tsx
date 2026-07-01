import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqSection() {
  const faqs: FaqItem[] = [
    {
      q: 'Ist die Beratung durch Von Morgen Consulting wirklich kostenlos? Wie finanzieren Sie sich?',
      a: 'Ja, unsere persönliche Erstberatung und die Erstellung Ihres V-Checks ist für Sie zu 100% kostenfrei. Wir finanzieren uns über standardisierte Beratungsprovisionen unserer kooperierenden Partnerbetriebe und Energiegesellschaften. Da wir mit allen großen Herstellern, Installationspartnern und Gas-/Strom-Lieferanten in ganz Deutschland kooperieren, bleibt unsere Beratung absolut unabhängig und neutral. Sie erhalten stets das passendste System für Ihre Wünsche.'
    },
    {
      q: 'Wie genau setzt sich die 70% Wärmepumpen-Förderung zusammen?',
      a: 'Die staatliche Säule setzt sich wie folgt zusammen: 1) 30% Grundförderung für jeden primären Heizungswechsel. 2) 20% Klimageschwindigkeit-Bonus für den Austausch funktionstüchtiger, fossiler Erzeuger (wie Öl-/Gas-Thermen). 3) 5% Effizienz-Bonus bei Nutzung natürlicher Kältemittel (z.B. Propan R290). Hinzu können einkommensabhängige Boni kommen (insgesamt gedeckelt bei 70%, was bei 30.000 € Investition bis zu 21.000 € Rückzahlung bedeutet). Wir haken diese Subventionen rechtssicher für Sie ab!'
    },
    {
      q: 'Was unterscheidet Premium-Fabrikate wie Viessmann von asiatischen Solar-Alternativen?',
      a: 'Europäische Premiumhersteller wie Viessmann, Bosch oder Buderus überzeugen durch hochentwickelte, langlebige Strömungs- und Kältetechnik, flüsterleise Akustik und exzellenten Kundendienst. Namhafte asiatische Erzeuger wie Jinko Solar, Longi, Huawei oder BYD sind wiederum unschlagbare Weltmarktführer bei Batteriezellen, PV-Wechselrichtern und Modul-Kosteneffizienz. Als unabhängiger Broker kombinieren wir für Sie die jeweiligen Sektorensieger zu einem optimalen Gesamtsystem.'
    },
    {
      q: 'Wie funktioniert die Strom- & Gastarifoptimierung bei Ihnen?',
      a: 'Als unabhängige Makler analysieren wir Ihre aktuellen Abschlagsbeträge und vergleichen diese mit exklusiven B2B-Großhandelskontingenten. Durch unsere Bündelungseffekte erzielen wir bundesweit signifikante Einsparungen bei renommierten Energieversorgern – sowohl für Großgewerbe als auch für Privatkunden. 100% papierlos und transparent erledigt.'
    },
    {
      q: 'Was bietet der Bereich "Immobilien von Morgen"?',
      a: 'Die energetische Qualität bestimmt heute mehr denn je den Marktwert einer Immobilie. In diesem Sektor unterstützen wir Verkäufer, Käufer und Erben dabei, den echten Verkehrswert einer Immobilie einzuschätzen, Sanierungsstau zu beziffern und Gebäude gezielt energetisch aufzuwerten, um den bestmöglichen Vermarktungspreis in München und bundesweit zu erzielen.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-black bg-dot-matrix relative overflow-hidden border-t border-zinc-900">
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-[30%] right-[5%] w-96 h-96 rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="max-w-[850px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Headings */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold font-display">
            FAQ — Häufige Fragen
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
            Antworten für vollkommene Transparenz
          </h2>
          <p className="text-zinc-400 text-sm">
            Haben Sie Fragen zu staatlichen Förderungen, unserer herstellerunabhängigen Arbeitsweise oder dem Sektorwechsel? Hier finden Sie schnelle Klarheit.
          </p>
        </div>

        {/* FAQ Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={idx} 
                className={`bg-zinc-950 border transition-all duration-300 ${
                  isOpen ? 'border-gold shadow-lg shadow-gold/5' : 'border-zinc-900 hover:border-zinc-800'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex justify-between items-center focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-normal text-white text-sm sm:text-base pr-4">
                    {faq.q}
                  </span>
                  <span className={`p-1.5 bg-zinc-900 text-zinc-400 transition-transform ${isOpen && 'rotate-180 text-gold bg-zinc-950 border border-gold/30'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-zinc-400 text-xs sm:text-sm leading-relaxed border-t border-zinc-900 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Security / Trust callout block */}
        <div className="mt-16 p-6 bg-zinc-950 border border-zinc-900 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-zinc-900 text-gold px-3 py-1 text-[10px] uppercase tracking-wider font-mono font-bold border border-gold/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Unabhängigkeitsversprechen</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg mx-auto">
            Sie wünschen eine persönliche Erstberatung oder einen ganzheitlichen V-Check für Ihr Vorhaben? Gerne berechnen wir unverbindlich Ihr Sparpotenzial.
          </p>
          <div className="pt-2">
            <a 
              href="#konfigurator"
              className="text-xs font-bold text-gold hover:text-white uppercase tracking-widest transition underline underline-offset-4"
            >
              Jetzt unverbindlichen Sektor-Check anfragen &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
