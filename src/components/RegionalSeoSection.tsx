import React, { useState } from 'react';
import { 
  MapPin, Shield, Zap, Sparkles, Building2, Flame, RefreshCw, 
  ChevronRight, Award, Trophy, Info, HeartHandshake, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RegionalSeoSectionProps {
  onStartConfigurator: () => void;
}

export default function RegionalSeoSection({ onStartConfigurator }: RegionalSeoSectionProps) {
  // 16 Federal States with targeted SEO information
  const bundeslaender = [
    {
      id: 'bayern',
      name: 'Bayern',
      capital: 'München',
      solarMandate: 'Solarpflicht für Gewerbebauten & Sanierungen',
      subsidies: 'PV-Speicherförderung regional, KfW-Heizungstausch',
      shkStrength: 'Über 140 zertifizierte SHK-Meisterpartner',
      pvHighlight: 'Beste solare Einstrahlungswerte im Voralpenland',
      realEstateNote: 'Premium-Dossiers für München, Starnberg & Tegernsee',
      seoTagline: 'Ihr führender Broker für Solaranlagen, Wärmepumpen & Immobilienverkäufe im Freistaat Bayern.'
    },
    {
      id: 'baden_wuerttemberg',
      name: 'Baden-Württemberg',
      capital: 'Stuttgart',
      solarMandate: 'Vollständige Solarpflicht auch für Neubau-Wohngebäude',
      subsidies: 'Landesförderung Klimaschutz Plus, KfW-Zuschuss',
      shkStrength: 'Flächendeckendes Fachhandwerker-Netzwerk',
      pvHighlight: 'Herausragende Solarerträge im Rheingrabengebiet',
      realEstateNote: 'Hohe Immobilienwerte im Raum Stuttgart & Bodensee',
      seoTagline: 'Nachhaltige Energiesparlösungen, Stromtarifoptimierung & Sachwertbewertung im Ländle.'
    },
    {
      id: 'nrw',
      name: 'Nordrhein-Westfalen',
      capital: 'Düsseldorf',
      solarMandate: 'Solarpflicht für Neubauten & Parkplätze ab 35 Stellplätzen',
      subsidies: 'Förderung für PV-Speicher (progres.nrw), KfW-Mittel',
      shkStrength: 'Höchste Netzdichte an SHK- & Elektroinnungsbetrieben',
      pvHighlight: 'Ideal für Ost/West-Dächer im dicht besiedelten Raum',
      realEstateNote: 'Energetische Aufwertung von Zechenhäusern & Villen',
      seoTagline: 'Ihr Partner für klimafreundliche Wärmepumpen, PV-Komplettsysteme & Immobilien-Vertrieb in NRW.'
    },
    {
      id: 'hessen',
      name: 'Hessen',
      capital: 'Wiesbaden',
      solarMandate: 'Solarpflicht auf Landesgebäuden & großen Gewerbeflächen',
      subsidies: 'Landeszuschüsse für Energieeffizienzberatungen',
      shkStrength: 'Ausgesuchte Installationspartner im Rhein-Main-Gebiet',
      pvHighlight: 'Starke Ertragswerte im Taunus, Odenwald & Spessart',
      realEstateNote: 'Exzellente Off-Market Deals im Ballungsraum Frankfurt',
      seoTagline: 'Maximale Unabhängigkeit mit Aiko ABC-Solarmodulen und hocheffizienten Kälte-Heizsystemen in Hessen.'
    },
    {
      id: 'niedersachsen',
      name: 'Niedersachsen',
      capital: 'Hannover',
      solarMandate: 'Solarpflicht für Neubau ab 75 m² Nutzfläche stufenweise',
      subsidies: 'Niedersächsische Landes-Wohnraumförderung (NBank)',
      shkStrength: 'Erfahrenes Partnernetzwerk für ländliche Räume',
      pvHighlight: 'Hervorragend geeignet für großflächige landwirtschaftliche Dächer',
      realEstateNote: 'Stabile Nachfrage in Ballungsräumen wie Hannover & Braunschweig',
      seoTagline: 'Drahtlose Energiekommunikation mit Sigenergy SigenStor und Heizungsevolution für Niedersachsen.'
    },
    {
      id: 'berlin_brandenburg',
      name: 'Berlin & Brandenburg',
      capital: 'Berlin / Potsdam',
      solarMandate: 'Solargesetz Berlin (mind. 30% der Dachfläche für Photovoltaik)',
      subsidies: 'SolarPLUS Berlin (Zuschüsse für Speicher & Gutachten)',
      shkStrength: 'Smarte Metropolen-Handwerker und SHK-Engineers',
      pvHighlight: 'Sehr hohe solare Bestrahlungswerte im flachen Brandenburg',
      realEstateNote: 'Höchstwert-Vermarktung von Luxusvillen & Berliner Altbauten',
      seoTagline: 'Unabhängige Tarifoptimierung (Teleson) & herstellerfreie Systembroker-Beratung in Berlin-Brandenburg.'
    },
    {
      id: 'sachsen',
      name: 'Sachsen',
      capital: 'Dresden',
      solarMandate: 'Fokus auf solare Dachnutzung & Energiespeicher',
      subsidies: 'Sächsisches SAB-Förderprogramm Energie/Klimaschutz',
      shkStrength: 'Kompetente Energie-Zunftbetriebe mit Sachkundenachweis',
      pvHighlight: 'Silicon Saxony: Technologischer Spitzenstandort',
      realEstateNote: 'Attraktive Rendite-Immobilien in Leipzig, Dresden & Chemnitz',
      seoTagline: 'Ihr regionaler Anlaufpunkt für modernste Speicherkopplung und Strom-Gas-Großhandelskonditionen.'
    },
    {
      id: 'hamburg_bremen_schleswig',
      name: 'Norddeutschland (HH, HB, SH)',
      capital: 'Kiel / Hamburg',
      solarMandate: 'Solarpflicht SH ab Dachsanierung, Hamburg Gesetz',
      subsidies: 'Hamburger Klimaschutzförderung (IFB Hamburg)',
      shkStrength: 'Windfest- und sturmerprobte Photovoltaikmontage',
      pvHighlight: 'Hohe Erträge an Küstenstandorten durch kühlenden Seewind',
      realEstateNote: 'Premium-Wohnlagen auf Sylt, in Hamburg-Blankenese & Bremen',
      seoTagline: 'Klimasichere Wärmepumpen (Viessmann, Bosch) und hocheffiziente Meereswind-Energienutzung im Norden.'
    },
  ];

  const [selectedStateId, setSelectedStateId] = useState<string>('bayern');
  const currentState = bundeslaender.find(state => state.id === selectedStateId) || bundeslaender[0];

  return (
    <section 
      id="seo-regional"
      className="py-20 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden"
    >
      {/* Background visual geometry */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header segment with German SEO keywords */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-zinc-900/80 border border-gold/30 text-gold px-3.5 py-1 text-[10px] uppercase font-bold tracking-wider font-display">
            <MapPin className="w-3.5 h-3.5" />
            <span>Deutschlandweit für Sie vor Ort</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            Regionales ExpertenNetzwerk in <span className="text-gold-gradient italic">allen Bundesländern</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Ob in Bayern, Baden-Württemberg, NRW oder Schleswig-Holstein: Als unabhängige Broker-Beratung Von Morgen analysieren wir die exakten Gesetzesvorgaben Ihrer Region und vermitteln erstklassige lokale Meisterbetriebe zu herstellerneutralen B2B-Vorteilskonditionen.
          </p>
        </div>

        {/* Dynamic Regional Finder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* State List Button Column */}
          <div className="lg:col-span-4 flex flex-col gap-2 bg-black/40 border border-zinc-900/80 p-3 sm:p-5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 font-mono mb-2 px-3 block">
              Bundesländer Regionen
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 max-h-[360px] lg:max-h-none overflow-y-auto pr-1">
              {bundeslaender.map((state) => {
                const isSelected = state.id === selectedStateId;
                return (
                  <button
                    key={state.id}
                    onClick={() => setSelectedStateId(state.id)}
                    className={`flex items-center justify-between px-4 py-3 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gold text-black font-bold border-l-4 border-gold-dark'
                        : 'bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800'
                    }`}
                  >
                    <span className="text-xs tracking-wide">{state.name}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-zinc-600'}`} />
                  </button>
                );
              })}
            </div>
            <div className="mt-4 px-3 py-2 bg-zinc-900/60 border border-zinc-800 text-[10px] text-zinc-400 leading-normal">
              💡 <strong>Bundeslandspezifisch:</strong> Durch Auswahl Ihrer Region passen wir das Beratungsprofil im Anfrage-Konfigurator perfekt an Ihre lokalen Solargesetze an.
            </div>
          </div>

          {/* Active State Detail Panel with Rich SEO Text */}
          <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 p-6 sm:p-10 flex flex-col justify-between relative shadow-xl">
            
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />

            {/* Content Area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentState.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* State Title */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-zinc-900 pb-5">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-gold uppercase block">Service-Bereich Deutschland</span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                      Von Morgen Consulting {' '}
                      <span className="text-gold font-sans font-normal border-b border-gold/40">{currentState.name}</span>
                    </h3>
                  </div>
                  <div className="text-left sm:text-right mt-2 sm:mt-0">
                    <span className="text-[10px] text-zinc-500 font-mono block">Regionales Hauptbüro</span>
                    <span className="text-xs text-white font-semibold">{currentState.capital}, DE</span>
                  </div>
                </div>

                {/* Sub-tagline */}
                <p className="text-zinc-300 font-light text-xs sm:text-sm italic leading-relaxed bg-zinc-900/30 p-3.5 border border-zinc-900/80">
                  „{currentState.seoTagline}“
                </p>

                {/* Specific features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  
                  {/* Solar details */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold flex items-center">
                      <Zap className="w-3.5 h-3.5 mr-2" />
                      Photovoltaik &amp; Solarpflicht
                    </span>
                    <h4 className="text-xs text-white font-semibold">{currentState.solarMandate}</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      Unsere herstellerneutralen Systemkonfigurationen berücksichtigen exakt die lokalen Bauvorschriften des Landes {currentState.name}. Profitieren Sie von der überlegenen Effizienz der <strong>Aiko Solar ABC-Module</strong>.
                    </p>
                  </div>

                  {/* Heating details */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold flex items-center">
                      <Flame className="w-3.5 h-3.5 mr-2" />
                      Wärmepumpen-Förderung
                    </span>
                    <h4 className="text-xs text-white font-semibold">{currentState.subsidies}</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      Im Bundesland **{currentState.name}** unterstützen wir Sie beim Abruf maximaler KfW-Förderungen von bis zu 70% für erstklassige Heizungstechnik von <strong>Viessmann</strong> (Vitocal) &amp; <strong>Bosch</strong>.
                    </p>
                  </div>

                  {/* Installations Strength */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold flex items-center">
                      <HeartHandshake className="w-3.5 h-3.5 mr-2" />
                      Meisterhandwerker-Netzwerk
                    </span>
                    <h4 className="text-xs text-white font-semibold">{currentState.shkStrength}</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      Wir arbeiten mit erstklassigen, regional geprüften Installationspartnern (SHK-Meister-Betrieben und Sol Living) zusammen, die eine rasche und fachgerechte Umsetzung garantieren.
                    </p>
                  </div>

                  {/* Key values & real estate */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold flex items-center">
                      <Building2 className="w-3.5 h-3.5 mr-2" />
                      Immobilien &amp; Sanierung
                    </span>
                    <h4 className="text-xs text-white font-semibold">{currentState.realEstateNote}</h4>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      Für Verkäufer im Bundesland **{currentState.name}** erstellen wir kostenfreie Marktwertermittlungen und Energieausweise gemäß GEG-Leitlinien für maximale Immobilienwerte.
                    </p>
                  </div>

                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    <span className="text-xs font-semibold text-zinc-300">Netzkapazitäten in {currentState.name} aktuell frei</span>
                  </div>
                  <span className="text-[10px] uppercase text-zinc-400 text-right">
                    Aktueller Regional-Status: <strong className="text-emerald-400 font-bold">In Betrieb</strong>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Actions Row */}
            <div className="border-t border-zinc-900 pt-6 mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-zinc-500 text-[10px] leading-relaxed max-w-md">
                * Die herstellerunabhängige Beratung von Morgen deckt jeden Landkreis in {currentState.name} ab. Anfragen werden nach der Postleitzahl automatisch Ihrem optimalen Regionalpartner zugewiesen.
              </span>
              <button
                onClick={onStartConfigurator}
                className="inline-flex items-center justify-center px-6 py-3 bg-gold hover:bg-gold-light text-black text-xs font-bold uppercase tracking-widest transition cursor-pointer self-start sm:self-center"
              >
                In {currentState.name} anfragen
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
