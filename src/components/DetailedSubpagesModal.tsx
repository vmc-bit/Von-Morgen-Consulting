import React, { useState } from 'react';
import { 
  X, Sun, Flame, RefreshCw, Building, CheckCircle2, Award, 
  HelpCircle, Sparkles, TrendingUp, Cpu, ShieldCheck, Zap, 
  ArrowRight, HardDrive, BarChart3, Info, Pocket, HandCoins
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductType } from '../types';
import Check24Widget from './Check24Widget';

interface DetailedSubpagesModalProps {
  initialSector: 'photovoltaik' | 'waermepumpe' | 'strom_gas' | 'immobilien';
  onClose: () => void;
  onSelectService: (service: ProductType) => void;
}

export default function DetailedSubpagesModal({ initialSector, onClose, onSelectService }: DetailedSubpagesModalProps) {
  const [activeTab, setActiveTab] = useState<'photovoltaik' | 'waermepumpe' | 'strom_gas' | 'immobilien'>(initialSector);

  const tabs = [
    { id: 'photovoltaik', label: 'Photovoltaik Sektor', icon: Sun, color: 'text-gold' },
    { id: 'waermepumpe', label: 'Wärmepumpen Sektor', icon: Flame, color: 'text-red-400' },
    { id: 'strom_gas', label: 'Strom & Gas Tarifoptimierung', icon: RefreshCw, color: 'text-teal-400' },
    { id: 'immobilien', label: 'Immobilien von Morgen', icon: Building, color: 'text-gold' },
  ] as const;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="detailed-subpages-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-0 md:p-6"
    >
      <div className="w-full h-full md:h-auto md:max-w-6xl md:max-h-[92vh] bg-zinc-950 border border-zinc-900 shadow-2xl flex flex-col relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[50%] h-[150px] bg-gold/5 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[50%] h-[150px] bg-gold/5 rounded-full blur-[90px] pointer-events-none" />

        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-900 bg-black flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <h2 className="font-serif text-lg text-white uppercase tracking-[0.2em]">
              Sektoren-Exzellenz &amp; Detailanalyse
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 transition border border-zinc-900"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (Responsive Scrollable) */}
        <div className="bg-zinc-900/60 border-b border-zinc-900 flex overflow-x-auto scrollbar-none relative z-10">
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2.5 py-4 px-6 text-xs font-semibold uppercase tracking-wider whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-gold text-gold bg-black/40' 
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <IconComp className={`w-4 h-4 ${tab.color}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Content Panel */}
        <div className="flex-grow overflow-y-auto p-6 md:p-10 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              {/* PHOTOVOLTAIK SUBPAGE */}
              {activeTab === 'photovoltaik' && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center space-x-2.5 bg-zinc-900 border border-gold/30 text-gold px-3.5 py-1 text-[10px] uppercase font-bold tracking-wider font-display">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Sektor Solarstrom-Architektur</span>
                      </div>
                      <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                        Photovoltaik: Machen Sie Ihr Dach zum <span className="text-gold-gradient italic">ertragsstarken Solarkraftwerk</span>
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                        Strompreise sind unberechenbar und schwanken extrem. Mit einer herstellerunabhängig geplanten Solaranlage sichern Sie sich jahrzehntelang vor steigenden Netzentgelten. Wir analysieren Ihr Solarpotenzial herstellerneutral und vermitteln die Crème de la Crème erstklassiger Wechselrichter- und Batteriespeicher-Systeme.
                      </p>
                    </div>

                    <div className="lg:col-span-5 bg-black p-6 border border-zinc-900">
                      <span className="text-[10px] uppercase tracking-widest text-gold font-mono font-bold block mb-4">
                        Wirtschaftlichkeit &amp; Rendite-Fakten
                      </span>
                      <div className="space-y-3.5 text-xs text-zinc-300">
                        <div className="flex justify-between py-2 border-b border-zinc-900">
                          <span>Ø Jährliche Rendite (München):</span>
                          <strong className="text-gold">14% - 19%</strong>
                        </div>
                        <div className="flex justify-between py-2 border-b border-zinc-900">
                          <span>Schnitt Amortisationszeit Klasse:</span>
                          <strong className="text-white">&lt; 8,5 Jahre</strong>
                        </div>
                        <div className="flex justify-between py-2 border-b border-zinc-900">
                          <span>Mehrwertsteuer-Vorteil (§12 Abs. 3 UStG):</span>
                          <strong className="text-gold">0% Umsatzsteuer</strong>
                        </div>
                        <div className="flex justify-between py-2">
                          <span>Einkommensteuer-Vorteil:</span>
                          <strong className="text-white">100% Steuerfrei (bis 30 kWp)</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detail Technical Information: AIKO and Sigenergy */}
                  <div className="border-t border-zinc-900 pt-10">
                    <h4 className="font-serif text-xl tracking-wider text-white mb-6">
                      Premium-Hardware &amp; Marktführer im Detail
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* AIKO Solar card */}
                      <div className="p-6 bg-zinc-900/40 border border-zinc-900 hover:border-gold/20 transition-all duration-300">
                        <div className="h-9 flex items-center justify-between mb-4">
                          <span className="text-xs uppercase tracking-wider text-gold font-bold">AIKO Solar</span>
                          <span className="text-[10px] uppercase tracking-widest bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5">ABC-Technologie</span>
                        </div>
                        <h5 className="font-serif text-lg text-white mb-3">Maximale Effizienz &amp; Pure Eleganz</h5>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light mb-4 text-justify">
                          AIKO Solar ist der weltweit führende Innovationspionier bei der sogenannten 
                          <strong> ABC (All Back Contact) Technologie</strong>. Durch die Verlagerung aller elektrischen 
                          Kontakte auf die Rückseite des Moduls fangen die Zellen das Sonnenlicht barrierefrei ein. Das Ergebnis:
                        </p>
                        <ul className="text-xs text-zinc-300 space-y-2">
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Weltrekord-Wirkungsgrad von über <strong>24.0%</strong>!</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Exzellenter Temperaturkoeffizient von nur -0,26%/°C.</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Edle Pure-Black-Ästhetik gänzlich ohne störende Silber-Kontakte.</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Hervorragendes Verhalten bei Verschattung &amp; diffusgeschütztem Licht.</li>
                        </ul>
                      </div>

                      {/* Sigenergy card */}
                      <div className="p-6 bg-zinc-900/40 border border-zinc-900 hover:border-gold/20 transition-all duration-300">
                        <div className="h-9 flex items-center justify-between mb-4">
                          <span className="text-xs uppercase tracking-wider text-gold font-bold">Sigenergy SigenStor</span>
                          <span className="text-[10px] uppercase tracking-widest bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5">5-in-1 Speicher</span>
                        </div>
                        <h5 className="font-serif text-lg text-white mb-3">Das visionäre Rundum-Energiesystem</h5>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light mb-4 text-justify">
                          Das System <strong>SigenStor von Sigenergy</strong> ist das weltweit erste revolutionäre 
                          einfache stackbare <strong>5-in-1 Energie-Speichersystem</strong>. Es bündelt sämtliche dezentralen Module in einem eleganten Gehäuse:
                        </p>
                        <ul className="text-xs text-zinc-300 space-y-2">
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Inverter + Battery PCS + EV DC Charger + Battery Pack + EMS.</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Integrierter DC-Schnelllader für direkte E-Auto-Ladung über Solar-Speicher.</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> KI-gestütztes Energiemanagement zur Prognoseoptimierung Ihres Lastgangs.</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Höchster Brandschutz: 5-Sterne-Sicherheit &amp; integriertes Lösch-Aerosol in den Modulen.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Sol Living Partner Callout */}
                  <div className="p-6 bg-black border border-zinc-900 relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-xl" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <span className="text-[9px] uppercase tracking-widest text-gold font-mono font-bold block">
                          Zertifiziertes Handwerk
                        </span>
                        <h4 className="font-serif text-lg text-white">
                          Realisierung durch Sol Living &amp; exklusive Meisterbetriebe
                        </h4>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
                          Keine unbekannten Subunternehmer! Ihr Solar-Vorhaben wird schlüsselfertig von <strong>Sol Living</strong> und unseren zertifizierten lokalen Meisterbetrieben montiert, elektrisch angeschlossen, beim Netzbetreiber angemeldet und direkt in Rekordzeit in Betrieb genommen.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectService('photovoltaik');
                        }}
                        className="inline-flex items-center justify-center px-4 py-2.5 bg-gold text-black uppercase tracking-widest text-[10px] font-bold transition hover:bg-gold-light whitespace-nowrap self-start md:self-center"
                      >
                        PV-Check anfordern
                        <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* WÄRMEPUMPEN SUBPAGE */}
              {activeTab === 'waermepumpe' && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center space-x-2.5 bg-zinc-900 border border-gold/30 text-gold px-3.5 py-1 text-[10px] uppercase font-bold tracking-wider font-display">
                        <Flame className="w-3.5 h-3.5 text-red-400" />
                        <span>Sektor Heizungstechnik-Evolution</span>
                      </div>
                      <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                        Wärmepumpen: Heizen Sie hocheffizient mit kostenloser <span className="text-gold-gradient italic">Umweltwärme</span>
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                        Der Abschied von fossilen Brennstoffen war finanziell nie lohnender. Moderne Kältemittel-Wärmepumpen entziehen der Umluft wertvolle Wärmeenergie und heizen Ihre Wohnräume selbst bei extremen Minusgraden kostengünstig und absolut krisensicher. Wir vermitteln etablierte Spitzenklasse führender Marken.
                      </p>
                    </div>

                    <div className="lg:col-span-5 bg-black p-6 border border-zinc-900">
                      <span className="text-[10px] uppercase tracking-widest text-gold font-mono font-bold block mb-4">
                        KfW-Förderung 2026 im Überblick
                      </span>
                      <div className="space-y-3 text-xs text-zinc-300">
                        <div className="flex justify-between py-1.5 border-b border-zinc-900">
                          <span>Grundförderung für alle Wohngebäude:</span>
                          <span className="text-gold font-bold">30 %</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-zinc-900">
                          <span>Klima-Geschwindigkeitsbonus (Speed-Bonus):</span>
                          <span className="text-white font-bold">+ 20 %</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-zinc-900">
                          <span>Effizienzbonus (für natürliches Kältemittel R290):</span>
                          <span className="text-gold font-bold">+ 5 %</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-zinc-900">
                          <span>Einkommensabhängiger Zusatzbonus (eligible):</span>
                          <span className="text-white font-bold">+ 30 %</span>
                        </div>
                        <div className="flex justify-between py-2 font-bold text-white bg-zinc-900/50 px-2 mt-2">
                          <span>Maximaler staatlicher Zuschuss (gedecckelt):</span>
                          <span className="text-gold">70 % (bis zu 21.000 €)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detail Technical Information: Viessmann Vitocal */}
                  <div className="border-t border-zinc-900 pt-10">
                    <h4 className="font-serif text-xl tracking-wider text-white mb-6">
                      Premium Heiztechnik – Viessmann Vitocal im Fokus
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Viessmann Vitocal 250-A Card */}
                      <div className="p-6 bg-zinc-900/40 border border-zinc-900 hover:border-gold/20 transition-all duration-300">
                        <div className="h-9 flex items-center justify-between mb-4">
                          <span className="text-xs uppercase tracking-wider text-gold font-bold">Viessmann Vitocal 250-A / 150-A</span>
                          <span className="text-[10px] uppercase tracking-widest bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5">Propangas R290</span>
                        </div>
                        <h5 className="font-serif text-lg text-white mb-3">Die Revolution für die Gebäudesanierung</h5>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light mb-4 text-justify">
                          Die <strong>Vitocal-Serie von Viessmann</strong> wurde speziell für die herstellerneutrale Sanierung von 
                          Bestandsgebäuden konzipiert, die mit herkömmlichen Heizkörpern beheizt werden. Sie ist extrem emissionsarm und zukunftssicher:
                        </p>
                        <ul className="text-xs text-zinc-300 space-y-2">
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Enorme Vorlauftemperatur von bis zu <strong>70°C</strong> bei -10°C Außentemperatur.</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Verwendung von <strong>R290 (Propan)</strong>: Extrem umweltfreundlich (GWP = 3).</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> <strong>Advanced Acoustic Design (AAD)</strong>: Flüsterleise im Betrieb (unter 35 dB(A) im Super Silent Mode).</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Sensationelle Arbeitszahl (COP) von bis zu 5.3 für minimalen Stromverbrauch.</li>
                        </ul>
                      </div>

                      {/* BOSCH Compress 5800i Card */}
                      <div className="p-6 bg-zinc-900/40 border border-zinc-900 hover:border-gold/20 transition-all duration-300">
                        <div className="h-9 flex items-center justify-between mb-4">
                          <span className="text-xs uppercase tracking-wider text-gold font-bold">Bosch Compress 5800i AW</span>
                          <span className="text-[10px] uppercase tracking-widest bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5">Premium Design</span>
                        </div>
                        <h5 className="font-serif text-lg text-white mb-3">Maximale Effizienz in formschönem Gehäuse</h5>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light mb-4 text-justify">
                          Die <strong>Compress 5800i AW</strong> setzt Maßstäbe in Sachen Schalldämpfung, Platzeinsparung und zeitloser Optik. Sie ist die perfekte Symbiose aus Technologie und schwedischem Schalldesign:
                        </p>
                        <ul className="text-xs text-zinc-300 space-y-2">
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Monoblock-Bauweise sorgt für absolute Dichtigkeit und einfaches Handling.</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Nutzt das zukunftssichere Propan-Kältemittel für volle 5% Extra-Förderung.</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Elegantes Glas-Frontdesign für die moderne Garage oder Kellerwand.</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Modulierender Verdichter passt die Leistung exakt an Ihren stündlichen Heizbedarf an.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Sektorenkopplung & Smart-Grid Info */}
                  <div className="p-6 bg-zinc-900/50 border border-zinc-900">
                    <h5 className="font-display font-bold text-xs uppercase tracking-widest text-gold mb-3 flex items-center">
                      <Cpu className="w-4 h-4 mr-2" />
                      Sektoren-Kopplung: Die Symbiose aus Solar &amp; Heizung
                    </h5>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      Eine Wärmepumpe wird erst durch die Kopplung mit einer Photovoltaikanlage zum unschlagbaren Sparwunder. 
                      Dank moderner <strong>SG-Ready (Smart Grid) Schnittstellen</strong> kommunizieren z.B. Ihre <strong>Aiko ABC Module</strong> 
                      und der <strong>Sigenergy SigenStor Batteriespeicher</strong> direkt mit Ihrer <strong>Viessmann Vitocal</strong>. 
                      Sobald Ihre PV-Anlage tagsüber kostenlose Überschüsse produziert, schaltet die Wärmepumpe automatisch in den 
                      Speicher-Lade-Modus und heizt den Pufferspeicher oder Ihr Haus für die kalte Nacht auf — Heizen für absolut 0 Cent!
                    </p>
                  </div>
                </div>
              )}

              {/* STROM & GAS SUBPAGE */}
              {activeTab === 'strom_gas' && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center space-x-2.5 bg-zinc-900 border border-gold/30 text-gold px-3.5 py-1 text-[10px] uppercase font-bold tracking-wider font-display">
                        <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
                        <span>Sektor Digitale Tarifoptimierung</span>
                      </div>
                      <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                        Strom &amp; Gas: Sparen Sie bares Geld durch exklusive <span className="text-gold-gradient italic">Großhandels-Tarife</span>
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                        Verbraucher zahlen systematisch zu viel für die Energiegrundversorgung. Als Ihr unabhängiger Broker sichten wir täglich Großhandels-Konditionen und exklusive Sondertarife für Strom und Gas, die auf Vergleichsportalen oft gar nicht gelistet sind. Wir übernehmen den kompletten formalen Wechselservice – vollkommen kostenfrei für Sie.
                      </p>
                    </div>

                    <div className="lg:col-span-5 bg-black p-6 border border-zinc-900">
                      <span className="text-[10px] uppercase tracking-widest text-gold font-mono font-bold block mb-4">
                        Einsparmöglichkeiten im Schnitt
                      </span>
                      <div className="space-y-4 text-xs text-zinc-300">
                        <div className="bg-zinc-950 p-4 border border-zinc-900">
                          <p className="text-[10px] text-zinc-500 font-bold uppercase">Durchschnittliche Ersparnis (Privathaushalt)</p>
                          <div className="flex justify-between items-baseline mt-1">
                            <span className="text-white text-xs">Strom- &amp; Gastarifwechsel</span>
                            <span className="text-gold font-bold text-lg">bis zu 450 € / Jahr</span>
                          </div>
                        </div>

                        <div className="bg-zinc-950 p-4 border border-zinc-900">
                          <p className="text-[10px] text-zinc-500 font-bold uppercase">Durchschnittliche Ersparnis (Gewerbebetrieb)</p>
                          <div className="flex justify-between items-baseline mt-1">
                            <span className="text-white text-xs">Gewerbe-Großhandelskonditionen</span>
                            <span className="text-gold font-bold text-lg">bis zu 3.200 € / Jahr</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Strategic Partner Networks: Teleson & Energieoptimierungen Deutschland */}
                  <div className="border-t border-zinc-900 pt-10">
                    <h4 className="font-serif text-xl tracking-wider text-white mb-6">
                      Unsere Großhandels-Schnittstellen im Betrieb
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* TELESON card */}
                      <div className="p-6 bg-zinc-900/40 border border-zinc-900 hover:border-gold/20 transition-all duration-300">
                        <div className="h-9 flex items-center justify-between mb-4">
                          <span className="text-xs uppercase tracking-wider text-gold font-bold">Teleson Vertriebspartner</span>
                          <span className="text-[10px] uppercase tracking-widest bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5">Direktschnittstelle</span>
                        </div>
                        <h5 className="font-serif text-lg text-white mb-3">Deutschlands führender Energievermittler</h5>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light mb-4 text-justify">
                          Über unsere strategische Direktanbindung an **Teleson** können wir auf ein exklusives Energieportfolio von über 80 namhaften Partnergesellschaften bundesweit zugreifen. Dies ermöglicht uns:
                        </p>
                        <ul className="text-xs text-zinc-300 space-y-2">
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Exklusive Tarife direkt von E.ON, Vattenfall, EnBW, LichtBlick &amp; Co.</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> <strong>Langfristige Preisgarantien</strong> von bis zu 24–36 Monaten gegen Inflation.</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Spezialkonditionen für Wärmestrom, Wärmepumpenstrom und Ladestrom von E-Autos.</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> 100% lückenloser digitaler Kündigungs- und Übergabeservice.</li>
                        </ul>
                      </div>

                      {/* Energieoptimierungen Deutschland card */}
                      <div className="p-6 bg-zinc-900/40 border border-zinc-900 hover:border-gold/20 transition-all duration-300">
                        <div className="h-9 flex items-center justify-between mb-4">
                          <span className="text-xs uppercase tracking-wider text-gold font-bold">Energieoptimierungen Deutschland</span>
                          <span className="text-[10px] uppercase tracking-widest bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5">Effizienzberatung</span>
                        </div>
                        <h5 className="font-serif text-lg text-white mb-3">Nachhaltige Reduktion &amp; Verbrauchsaudits</h5>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light mb-4 text-justify">
                          Unser starker Partner **Energieoptimierungen Deutschland** steht für umfassende Verbrauchskonzepte, Energie-Audits für den Mittelstand und anspruchsvolle Privatbauten zur permanenten Energiekostensenkung:
                        </p>
                        <ul className="text-xs text-zinc-300 space-y-2">
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Erfassung detaillierter betrieblicher Lastgänge &amp; Einsparungsprüfungen.</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Beratung zu gesetzlichen Entlastungen der Stromsteuer (StromStG).</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Technische Maßnahmenberatung für Wärmerückgewinnung und Peak Shaving.</li>
                          <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> Jährliche automatische Optimierungsschleifen, falls Marktpreise sinken.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Live-Check24 integration section */}
                  <div className="border-t border-zinc-900 pt-8">
                    <h4 className="font-serif text-xl tracking-wider text-white mb-3">
                      Direkter &amp; Interaktiver Vergleichsrechner 
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                      Sondieren Sie hier sofort und ohne Verpflichtung die herstellerunabhängigen Konditionen direkt über die sichere Schnittstelle unseres Vergleichspartners:
                    </p>
                    <Check24Widget />
                  </div>

                  {/* 100% Security Guarantee */}
                  <div className="p-5 border border-zinc-900 bg-black flex items-start space-x-4">
                    <div className="p-2 bg-zinc-900 border border-gold/20 text-gold flex-shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-white">Gesetzlicher Grundversorgungsschutz in Deutschland</p>
                      <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                        In Deutschland ist eine Unterbrechung der Strom- oder Gasversorgung durch einen Tarifwechsel gesetzlich unmöglich. 
                        Sollte ein Energieunternehmen ausfallen oder der Übergang verzögert sein, springt der lokale Grundversorger 
                        (z.B. Stadtwerke München) nahtlos und vollautomatisch ein. Sie sind somit zu jedem Zeitpunkt zu 100% ununterbrochen mit Energie versorgt.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* IMMOBILIEN SUBPAGE */}
              {activeTab === 'immobilien' && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center space-x-2.5 bg-zinc-900 border border-gold/30 text-gold px-3.5 py-1 text-[10px] uppercase font-bold tracking-wider font-display">
                        <Building className="w-3.5 h-3.5" />
                        <span>Sektor Immobilien-Wertschöpfung</span>
                      </div>
                      <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                        Immobilien Von Morgen: Premium-Vermittlung mit <span className="text-gold-gradient italic">energetischem Mehrwert</span>
                      </h3>
                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                        Der Einbau modernster Photovoltaikanlagen oder Wärmepumpen steigert den Verkaufswert einer Immobilie im Raum München und bundesweit massiv. Wir vermitteln und vermarkten Wohnungen, Wohnhäuser und Grundstücke, bewerten Ihre Immobilie marktgerecht und verknüpfen den Verkauf mit unserem tiefen energetischen Know-how. Ein unschlagbares Argument für anspruchsvolle Käufer.
                      </p>
                    </div>

                    <div className="lg:col-span-5 bg-black p-6 border border-zinc-900">
                      <span className="text-[10px] uppercase tracking-widest text-gold font-mono font-bold block mb-4">
                        Der Hebeleffekt beim Immobilien-Verkauf
                      </span>
                      <div className="space-y-3.5 text-xs text-zinc-300">
                        <div className="flex justify-between py-2 border-b border-zinc-900">
                          <span>Aufwertung durch Energieklasse G &rarr; B:</span>
                          <strong className="text-gold">bis zu +25% Marktwert</strong>
                        </div>
                        <div className="flex justify-between py-2 border-b border-zinc-900">
                          <span>Käufer-Nachfrage für sanierte Häuser:</span>
                          <strong className="text-white">+85% Höheres Interesse</strong>
                        </div>
                        <div className="flex justify-between py-2 border-b border-zinc-900">
                          <span>Notwendiger Energiebedarfsausweis:</span>
                          <strong className="text-gold">GEG-Konformität</strong>
                        </div>
                        <div className="flex justify-between py-2">
                          <span>Münchener Einzugsgebiete Solln &amp; co.:</span>
                          <strong className="text-white">Exzellente Off-Market Renditen</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Depth parameters: Sanierung & Energieausweise */}
                  <div className="border-t border-zinc-900 pt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sanierungsberatung Card */}
                    <div className="p-6 bg-zinc-900/40 border border-zinc-900 hover:border-gold/20 transition-all duration-300">
                      <h5 className="font-serif text-lg text-white mb-3">Energetische Aufwertung vor Vermarktung</h5>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light mb-4 text-justify">
                        Unrenovierte Altbauten leiden am heutigen Markt unter drastischen Preisabschlägen („Sanierungsstau-Abschlag“). 
                        Wir transformieren dieses Problem in einen handfesten finanziellen Vorteil für Sie:
                      </p>
                      <ul className="text-xs text-zinc-300 space-y-2">
                        <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> **Wertgutachten**: Wir kalkulieren den realen Wertgewinn durch Solaranlagen oder Wärmepumpen.</li>
                        <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> **Fördertransfer**: Wir bereiten für Käufer sofort abrufbare Modernisierungskonzepte inklusive zustehender KfW-Förderungen vor.</li>
                        <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> **Investoren-Schnittstelle**: Direkte Ansätze für Bauträger und Family Offices in München.</li>
                      </ul>
                    </div>

                    {/* Energieausweis Card */}
                    <div className="p-6 bg-zinc-900/40 border border-zinc-900 hover:border-gold/20 transition-all duration-300">
                      <h5 className="font-serif text-lg text-white mb-3">Energieausweise nach Gebäudeenergiegesetz (GEG)</h5>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light mb-4 text-justify">
                        Der Gesetzgeber schreibt bei jedem Verkauf oder jeder Neuvermietung zwingend die Vorlage eines gültigen Energieausweises vor. Wir regeln das rechtssicher für Sie:
                      </p>
                      <ul className="text-xs text-zinc-300 space-y-2">
                        <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> **Bedarfsausweis**: Detaillierte bauphysikalische Erfassung aller Wände, Fenster und Dachsegmente.</li>
                        <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> **Verbrauchsausweis**: Erstellung anhand der lückenlosen Heizkostenrechnungen der letzten drei Jahre.</li>
                        <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-gold mr-2.5 flex-shrink-0" /> **Effizienz-Klasseneinstufung**: Offizielle Zertifizierung von Klasse A+ bis H inklusive Modernisierungsempfehlungen.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Off Market and Premium Network */}
                  <div className="p-6 bg-black border border-zinc-900">
                    <h5 className="font-display font-bold text-xs uppercase tracking-widest text-gold mb-3 flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      Diskrete Off-Market Abwicklung für premium Immobilien
                    </h5>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      Nicht jedes hochkarätige Anwesen im Großraum München sollte öffentlich auf Massenportalen auftauchen. 
                      Wir betreiben ein exklusives, hochkarätiges Off-Market-Netzwerk. Wir matchen Ihre Immobilie direkt mit 
                      geprüften, kaufkräftigen Investoren und Privatkäufern aus unserer herstellerneutralen Finanzierungsdatenbank. 
                      Das garantiert Ihnen absolute Privatsphäre, eine schnelle Verhandlungsphase und exzellente Verkaufserlöse.
                    </p>
                  </div>
                </div>
              )}

              {/* Action bar common inside the modal */}
              <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center space-x-3 text-zinc-400 text-xs">
                  <Info className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Sicherheit und Transparenz der Daten garantiert durch herstellerfreie Beratung von Morgen.</span>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      onClose();
                      const target = document.getElementById('konfigurator');
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 bg-gold hover:bg-gold-light text-black text-xs font-bold uppercase tracking-widest transition cursor-pointer"
                  >
                    Bedarfsprüfung starten
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
