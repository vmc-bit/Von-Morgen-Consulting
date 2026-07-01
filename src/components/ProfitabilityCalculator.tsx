import React, { useState, useEffect } from 'react';
import { Sliders, Sun, Flame, DollarSign, Leaf, RefreshCw, BarChart3, HelpCircle, ArrowRight } from 'lucide-react';
import { calculateEnergySavings } from '../utils/calculator';
import { CalculatorInputs, ProductType } from '../types';

interface ProfitabilityCalculatorProps {
  initialProduct: ProductType;
  onApplySavingsToLead: (savingsData: any, inputs: CalculatorInputs) => void;
}

export default function ProfitabilityCalculator({ initialProduct, onApplySavingsToLead }: ProfitabilityCalculatorProps) {
  const [product, setProduct] = useState<ProductType>(initialProduct);
  const [electricityPrice, setElectricityPrice] = useState(0.36); // €/kWh
  const [annualElectricity, setAnnualElectricity] = useState(4200); // kWh
  const [currentHeatingCost, setCurrentHeatingCost] = useState(2400); // €/Jahr
  const [roofSize, setRoofSize] = useState(55); // sqm
  const [hasBattery, setHasBattery] = useState(true);
  const [budget, setBudget] = useState(15000);
  const [showCelebration, setShowCelebration] = useState(false);

  // Sync with prop when it shifts from outside
  useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);

  const [results, setResults] = useState(
    calculateEnergySavings({
      product,
      electricityPrice,
      annualElectricity,
      currentHeatingCost,
      roofSize,
      hasBattery,
      budget
    })
  );

  useEffect(() => {
    const calculated = calculateEnergySavings({
      product,
      electricityPrice,
      annualElectricity,
      currentHeatingCost,
      roofSize,
      hasBattery,
      budget
    });
    setResults(calculated);
  }, [product, electricityPrice, annualElectricity, currentHeatingCost, roofSize, hasBattery, budget]);

  const handleApply = () => {
    const inputs: CalculatorInputs = {
      product,
      electricityPrice,
      annualElectricity,
      currentHeatingCost,
      roofSize,
      hasBattery,
      budget
    };
    onApplySavingsToLead(results, inputs);
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
    }, 6000);
  };

  // Helper values
  const cumulative20YearsValue = results.annualSavingsEur * 20;
  const netInvestmentCost = results.investmentCostEur - results.subsidiesEur;

  return (
    <section id="rechner" className="py-24 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white relative overflow-hidden border-b border-zinc-900/80">
      {/* Visual Ambient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[65%] bg-gold/10 rounded-full blur-[160px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold font-display">
            Interaktive Kalkulation
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
            Individueller Wirtschafts- & Sparrechner
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Geben Sie Ihre aktuellen Verbrauchsdaten ein. Unsere Berechnungsformel verfüttert marktgetreue, tagesaktuelle Richtwerte für Ertrag, staatliche Fördersätze und Hardwarekosten, um Ihre Amortisation und Rendite transparent anzuzeigen.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: sliders */}
          <div className="lg:col-span-6 bg-zinc-950/80 p-6 sm:p-8 border border-zinc-900 space-y-6">
            <h3 className="font-display font-medium text-sm uppercase tracking-wider text-white flex items-center">
              <Sliders className="w-4 h-4 text-gold mr-2" />
              Ihre Parameter konfigurieren
            </h3>

            {/* Sektorauswahl Segment */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Untersuchter Sektor</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'photovoltaik', label: 'Solar (PV)', icon: Sun, color: 'hover:border-gold' },
                  { id: 'waermepumpe', label: 'Heizung (WP)', icon: Flame, color: 'hover:border-gold' },
                  { id: 'beratung_komplett', label: 'Beide Sektoren', icon: RefreshCw, color: 'hover:border-gold' }
                ].map((item) => {
                  const Icon = item.icon;
                  const active = product === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setProduct(item.id as ProductType)}
                      className={`flex flex-col items-center justify-center py-3.5 px-2 rounded-none border text-center transition-all cursor-pointer ${
                        active
                          ? 'border-gold bg-zinc-900 text-white font-semibold'
                          : 'border-zinc-805 bg-black/60 text-zinc-400 ' + item.color
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-2 ${active ? 'text-gold' : 'text-zinc-500'}`} />
                      <span className="text-[11px] tracking-wide uppercase font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conditionally reveal PV Sliders */}
            {(product === 'photovoltaik' || product === 'beratung_komplett') && (
              <div className="space-y-4 pt-2 border-t border-zinc-905">
                <p className="text-[10px] uppercase tracking-widest font-bold text-gold">Photovoltaik Einstellungen</p>
                
                {/* Roof size */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-zinc-400">Verfügbare Dachfläche (Süden/Osten/Westen)</span>
                    <span className="text-white font-display font-medium text-sm">{roofSize} m²</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="200"
                    step="5"
                    value={roofSize}
                    onChange={(e) => setRoofSize(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>15 m² (Kleindach)</span>
                    <span>ca. {results.pvCapacitykWp} kWp Leistung</span>
                    <span>200 m² (Gewerbe)</span>
                  </div>
                </div>

                {/* Grid battery checkbox */}
                <div className="flex items-center justify-between p-3.5 bg-zinc-900/40 border border-zinc-905">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-zinc-200 block">Mit Batteriespeicher (Heimspeicher)</span>
                    <span className="text-[10px] text-zinc-500 block">Erhöht den Eigenverbrauch massiv von 30% auf 80%</span>
                  </div>
                  <input
                     type="checkbox"
                     checked={hasBattery}
                     onChange={(e) => setHasBattery(e.target.checked)}
                     className="w-4 h-4 rounded border-zinc-800 text-gold focus:ring-gold bg-zinc-950 accent-gold cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Common electricity Slider */}
            <div className="space-y-2 border-t border-zinc-905 pt-4">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-400">Eigener Stromverbrauch pro Jahr</span>
                <span className="text-white font-display font-medium text-sm">{annualElectricity.toLocaleString('de-DE')} kWh</span>
              </div>
              <input
                type="range"
                min="1000"
                max="15000"
                step="250"
                value={annualElectricity}
                onChange={(e) => setAnnualElectricity(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>1.000 kWh (Single)</span>
                <span>4.500 kWh (Durchschnitts-Familie)</span>
                <span>15.000 kWh (Mit Auto/Wärmepumpe)</span>
              </div>
            </div>

            {/* Conditionally reveal HP Slider */}
            {(product === 'waermepumpe' || product === 'beratung_komplett') && (
              <div className="space-y-4 pt-4 border-t border-zinc-905">
                <p className="text-[10px] uppercase tracking-widest font-bold text-gold font-sans">Heizung Einstellungen</p>
                
                {/* Current heating bill */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-zinc-400">Bisherige Heizkosten je Jahr (Gas/Öl/Holz)</span>
                    <span className="text-white font-display font-medium text-sm">{currentHeatingCost.toLocaleString('de-DE')} €</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="8000"
                    step="100"
                    value={currentHeatingCost}
                    onChange={(e) => setCurrentHeatingCost(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>500 €</span>
                    <span>2.500 € (Durchschnitt)</span>
                    <span>8.000 € (Altbau/Großhaus)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Global Electricity Tariff Slider */}
            <div className="pt-4 border-t border-zinc-905">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-400">Aktueller Stromtarif bei Ihrem Versorger</span>
                <span className="text-white font-display font-medium text-sm">{electricityPrice * 100} Cent/kWh</span>
              </div>
              <input
                type="range"
                min="0.25"
                max="0.55"
                step="0.01"
                value={electricityPrice}
                onChange={(e) => setElectricityPrice(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-500"
              />
            </div>
          </div>

          {/* Right panel: economic feedback KPIs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 3 Main KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Box 1: Annual Savings */}
              <div className="bg-zinc-950 p-4 border border-zinc-900 text-center">
                <span className="block text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Ersparnis / Jahr</span>
                <span className="block text-xl font-bold font-display text-gold mt-1">
                  ~{results.annualSavingsEur.toLocaleString('de-DE')} €
                </span>
                <span className="block text-[8px] text-zinc-500 uppercase font-bold tracking-tight mt-1">Sofort-Rendite</span>
              </div>

              {/* Box 2: State Aid / Benefit Rate */}
              <div className="bg-zinc-950 p-4 border border-zinc-900 text-center">
                <span className="block text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Förderquote</span>
                <span className="block text-xl font-bold font-display text-white mt-1">
                  {product === 'photovoltaik' 
                    ? '0% MwSt.' 
                    : (product === 'waermepumpe' || product === 'beides' || product === 'beratung_komplett')
                    ? 'Bis zu 70%'
                    : product === 'strom_gas'
                    ? 'Gebührenfrei'
                    : 'Gefördert'}
                </span>
                <span className="block text-[8px] text-zinc-500 uppercase font-bold tracking-tight mt-1">
                  {product === 'photovoltaik' 
                    ? 'Voll befreit' 
                    : (product === 'waermepumpe' || product === 'beides' || product === 'beratung_komplett')
                    ? 'KfW-Sondersatz'
                    : product === 'strom_gas'
                    ? '100% Wechselbonus'
                    : 'Staatliche Hilfe'}
                </span>
              </div>

              {/* Box 3: Payback period (Average Ranges instead of precise price calculations) */}
              <div className="bg-zinc-950 p-4 border border-zinc-900 text-center">
                <span className="block text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Amortisation</span>
                <span className="block text-xl font-bold font-display text-gold mt-1">
                  {product === 'photovoltaik' 
                    ? 'ca. 8-12 J.' 
                    : (product === 'waermepumpe')
                    ? 'ca. 7-11 J.'
                    : (product === 'beides' || product === 'beratung_komplett')
                    ? 'ca. 7-10 J.'
                    : product === 'strom_gas'
                    ? 'Sofort'
                    : 'ca. 1-4 J.'}
                </span>
                <span className="block text-[8px] text-zinc-500 uppercase font-bold tracking-tight mt-1">Reguläre Nutzzeit</span>
              </div>

              {/* Box 4: CO2 Reduced */}
              <div className="bg-zinc-950 p-4 border border-zinc-900 text-center">
                <span className="block text-[9px] text-zinc-500 font-bold uppercase tracking-wider">CO2 Ersparnis</span>
                <span className="block text-xl font-bold font-display text-white mt-1">
                  {results.co2ReducedTons} t
                </span>
                <span className="block text-[8px] text-zinc-500 uppercase font-bold tracking-tight mt-1">pro Betriebsjahr</span>
              </div>
            </div>

            {/* Premium Benefits Card Stack instead of strict sales price bar chart */}
            <div className="bg-zinc-950/80 p-6 border border-zinc-900 space-y-6">
              <h4 className="font-display font-medium text-xs uppercase tracking-wider text-white flex items-center">
                <BarChart3 className="w-4 h-4 text-gold mr-2" />
                Ihre finanziellen Vorteile &amp; Kostenschutz
              </h4>

              <div className="space-y-4">
                <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded space-y-1.5 text-left transition-all hover:bg-zinc-900/60">
                  <div className="flex items-center space-x-2 text-gold font-bold uppercase tracking-wider text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>Herstellerunabhängiger B2B-Vorteil</span>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Als freie und firmenunabhängige Makler sind wir nicht an einzelne Marken gebunden. Ob deutsche Traditionshersteller wie <strong>Viessmann, Vaillant, Buderus, Bosch</strong> oder erstklassige asiatische Technologieführer (Sigen, BYD, AIKO) – wir konfigurieren das System passend zu Ihrem Budget und realisieren bis zu <strong>25% Ersparnis</strong> gegenüber starren Markenportfolios.
                  </p>
                </div>

                <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded space-y-1.5 text-left transition-all hover:bg-zinc-900/60">
                  <div className="flex items-center space-x-2 text-gold font-bold uppercase tracking-wider text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>Volle Ausschöpfung staatlicher Fördergelder</span>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Wir analysieren, welche KfW- und BAFA-Zuschüsse (Klimageschwindigkeitsbonus, Einkommensbonus, Effizienz-Bonus) für Sie anwendbar sind. Bei Wärmepumpen holen wir schlüsselfertig **bis zu 70%** Direkthilfe für Sie heraus – inklusive vollständiger Übernahme des Papierkrams durch unsere Experten.
                  </p>
                </div>

                <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded space-y-1.5 text-left transition-all hover:bg-zinc-900/60">
                  <div className="flex items-center space-x-2 text-gold font-bold uppercase tracking-wider text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>Sektorenkopplung &amp; Inflationsschutz</span>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Nutzen Sie Ihre selbst erzeugte Solarenergie, um den Großteil des Heizstrombedarfs Ihrer neuen Wärmepumpe CO₂-neutral und kostenfrei abzudecken. Dadurch schützen Sie sich vollständig vor willkürlichen Steigerungen der Gas-, Öl- und Netzstrompreise.
                  </p>
                </div>

                {/* Accumulated 20 year benefits box */}
                <div className="mt-4 p-4.5 bg-black border border-gold/15 space-y-2.5 text-left rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] text-zinc-500 font-bold uppercase block">Aufsummierte Ersparnis über 20 Jahre</span>
                      <span className="text-xl font-bold font-display text-gold block mt-0.5">
                        +{cumulative20YearsValue.toLocaleString('de-DE')} €
                      </span>
                    </div>
                    <div className="bg-gold/10 px-2.5 py-0.5 border border-gold/30 text-[8px] font-extrabold text-gold uppercase rounded-full">
                      Sicherer Vermögenswert
                    </div>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Über die reguläre Betriebsdauer spart diese Investition ein Vielfaches der Anschaffungskosten ein und bewirkt eine erhebliche, dauerhafte Entlastung Ihres persönlichen oder betrieblichen Budgets.
                  </p>
                </div>
              </div>

              {/* V-Check Callout */}
              <div className="p-3.5 bg-zinc-950 text-[11px] text-zinc-400 leading-relaxed border border-zinc-900 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  💡 <strong>Wie vermitteln wir am günstigsten?</strong> Als herstellerunabhängiger Makler verfassen wir aus Ihren Wünschen ein detailliertes Pflichtenheft. Mit diesem holen wir konkurrierende Angebote von zertifizierten Meisterbetrieben und führenden Herstellern (Viessmann, Vaillant, Buderus, BYD, Sigen) ein, um Ihnen stets den Bestpreis zu sichern.
                </span>
              </div>

              {showCelebration && (
                <div className="p-4 bg-gold/10 border border-gold/45 text-gold text-xs leading-relaxed space-y-1.5 rounded animate-pulse">
                  <div className="flex items-center space-x-2 font-bold uppercase tracking-wider text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>✓ Berechnung erfolgreich übertragen!</span>
                  </div>
                  <p className="text-zinc-300">
                    Ihre Werte (Ersparnis: <strong>{results.annualSavingsEur.toLocaleString('de-DE')} €/Jahr</strong>) wurden in das große Beratungsformular geladen. Die Seite wurde soeben automatisch dorthin fokussiert.
                  </p>
                </div>
              )}

              {/* Big conversion bridge */}
              <button
                onClick={handleApply}
                className="w-full inline-flex items-center justify-center p-3.5 bg-gold hover:bg-gold-light text-black font-bold tracking-wider uppercase text-xs transition-all pointer-events-auto cursor-pointer group"
              >
                Ertragsberechnung in das Beratungsformular übernehmen
                <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" />
              </button>

            </div>

          </div>

        </div>

        {/* Praxis-Musterbeispiele & Wirtschaftlichkeit */}
        <div className="mt-12 bg-zinc-950/90 border border-zinc-900 p-6 sm:p-10 space-y-8">
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] text-gold uppercase font-bold block mb-1">
              RECHTLICH GEPRÜFTE MUSTERKALKULATIONEN (ENERGIEWENDE 2026)
            </span>
            <h3 className="text-xl font-serif font-medium text-white tracking-tight">
              Anschaffungskoeffizienten &amp; Ertragserwartung aus der Praxis
            </h3>
            <p className="text-xs text-zinc-400 mt-2 max-w-4xl">
              Wir arbeiten frei von Herstellervorgaben. Je nach Komponentenauswahl variieren die Einstandspreise, weshalb wir im Folgenden die realistischsten Praxisbeispiele inklusive der anwendbaren staatlichen Direkthilfe aufschlüsseln.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* PV Example Card */}
            <div className="bg-black/40 border border-zinc-900 p-6 flex flex-col justify-between space-y-6 relative hover:border-zinc-800 transition duration-300">
              <div className="absolute top-0 right-0 transform translate-x-0 -translate-y-0.5 bg-gold/10 border-l border-b border-gold/30 px-3 py-1 text-[9px] font-mono font-bold text-gold uppercase tracking-wider">
                Solar-Musterfall
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-none bg-gold/5 border border-gold/20 flex items-center justify-center">
                    <Sun className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide">10 kWp PV-Anlage + 10 kWh Speicher</h4>
                    <p className="text-[11px] text-zinc-400">Komplettsystem inkl. Montage &amp; Anmeldung</p>
                  </div>
                </div>

                <div className="h-px bg-zinc-900" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Muster-Investition (Brutto):</span>
                    <span className="font-mono text-zinc-200 font-bold">17.000 € – 23.000 €</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Mehrwertsteuer (MwSt. 0%):</span>
                    <span className="font-mono text-emerald-500 font-bold">0 € (0% Steuersatz)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Eigenstrom-Abdeckung (Autarkie):</span>
                    <span className="font-mono text-gold font-bold">bis zu 75% - 80%</span>
                  </div>
                </div>

                <div className="p-3.5 bg-zinc-900/30 border border-zinc-900 text-xs text-zinc-400 leading-relaxed">
                  💡 <strong>Wirtschaftlichkeitsanalyse:</strong> Eine PV-Anlage dieser Dimension sichert sich über 10 bis 20 Jahre Erträge, die Ihre Anschaffungskosten dank gesparter Netzbezüge und EEG-Einspeisevergütung mehrfach amortisieren.
                </div>
              </div>

              <div className="pt-2">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase block font-mono">Gesamtprognose (20 J.)</span>
                    <span className="text-sm font-bold text-white">Sichere Rendite</span>
                  </div>
                  <span className="text-xs text-gold font-bold font-mono">8% - 11% p.a.</span>
                </div>
              </div>
            </div>

            {/* Heat Pump Example Card */}
            <div className="bg-black/40 border border-zinc-900 p-6 flex flex-col justify-between space-y-6 relative hover:border-zinc-800 transition duration-300">
              <div className="absolute top-0 right-0 transform translate-x-0 -translate-y-0.5 bg-emerald-500/10 border-l border-b border-emerald-500/30 px-3 py-1 text-[9px] font-mono font-bold text-[#10b981] uppercase tracking-wider">
                Heizungs-Musterfall
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-none bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-[#10b981]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide">Hocheffiziente Wärmepumpe</h4>
                    <p className="text-[11px] text-zinc-400">Luft-Wasser-Technik namhafter Hersteller</p>
                  </div>
                </div>

                <div className="h-px bg-zinc-900" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Muster-Investition (Brutto):</span>
                    <span className="font-mono text-zinc-200">34.000 € – 42.000 €</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#10b981] font-semibold flex items-center gap-1">Staatliche Förderung (Erstattung):</span>
                    <span className="font-mono text-[#10b981] font-bold">bis zu -21.000 €</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white font-bold flex items-center gap-1">Echte Eigenleistung des Kunden:</span>
                    <span className="font-mono text-white font-bold bg-zinc-900 px-2 py-0.5 border border-zinc-800">nur 14.000 € – 15.000 €</span>
                  </div>
                </div>

                <div className="p-3.5 bg-zinc-900/30 border border-zinc-900 text-xs text-zinc-400 leading-relaxed">
                  🔥 <strong>Rentabilitäts-Hebel:</strong> Wenn Sie aktuell Öl- oder Gaskosten von <strong>2.000 € bis 3.000 € pro Jahr</strong> haben, amortisiert sich dieser unschlagbar geringe Eigenanteil von ca. 14k-15k € bereits nach kürzester Zeit!
                </div>
              </div>

              <div className="pt-2">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase block font-mono">Ihr Investitionsschutz</span>
                    <span className="text-sm font-bold text-white">Staatlich Gesichert</span>
                  </div>
                  <span className="text-xs text-[#10b981] font-bold font-mono">Bafa &amp; KfW 2026</span>
                </div>
              </div>
            </div>

          </div>

          {/* Value Market alert notice banner */}
          <div className="p-4 bg-zinc-900/40 border border-zinc-900/80 rounded-none flex items-start sm:items-center gap-4 text-left">
            <div className="p-2.5 bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold uppercase shrink-0">
              MARKTPROGNOSE
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <strong>Krisenschutz durch eigene Energieerzeugung:</strong> Wir wissen alle selber, was gerade auf der Welt passiert. Die Preise für Netzstrom, Gas und Heizöl werden über kurz oder lang <strong>definitiv steigen und nicht mehr fallen</strong>. Eine einmalige Investition in herstellerunabhängige, intelligent gesteuerte Photovoltaik und Sektorenheizung ist die sicherste Form, Ihr Vermögen vor dieser unvermeidbaren Energie-Inflation zu schützen.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
