import React, { useState, useEffect } from 'react';
import { 
  Sun, Flame, RefreshCw, Home, User, Mail, Phone, MapPin, 
  Battery, Layers, Info, CheckCircle, Loader2, ArrowLeft, ArrowRight,
  Calculator, Zap, HelpCircle, Building, CircleDollarSign, Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Lead, ProductType, HouseType, OwnershipType, HeatingType } from '../types';

interface InteractiveConfiguratorProps {
  preselectedProduct: ProductType;
  importedCalculations: any | null;
  onLeadSubmitted: (lead: Lead) => void;
}

export default function InteractiveConfigurator({ 
  preselectedProduct, 
  importedCalculations,
  onLeadSubmitted 
}: InteractiveConfiguratorProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Config data keys
  const [product, setProduct] = useState<ProductType>(preselectedProduct);
  const [houseType, setHouseType] = useState<HouseType>('einfamilienhaus');
  const [ownership, setOwnership] = useState<OwnershipType>('eigentuemer');
  const [heatingType, setHeatingType] = useState<HeatingType>('gas');
  const [annualElectricity, setAnnualElectricity] = useState(4200);
  const [roofSize, setRoofSize] = useState(55);
  const [batteryStorage, setBatteryStorage] = useState(true);
  const [currentSituation, setCurrentSituation] = useState('');
  const [targetSituation, setTargetSituation] = useState('');
  const [subsidiesInterest, setSubsidiesInterest] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [budget, setBudget] = useState(15000);

  // Strom & Gas specific states
  const [energyCurrentCost, setEnergyCurrentCost] = useState(1800);
  const [energySwitchSubsidies, setEnergySwitchSubsidies] = useState(true);

  // Immobilien specific states
  const [propertyAction, setPropertyAction] = useState<'verkaufen' | 'kaufen' | 'vermieten' | 'bewertung' | 'beratung'>('verkaufen');
  const [propertyAreaSqm, setPropertyAreaSqm] = useState(120);
  const [propertyEstimatedValue, setPropertyEstimatedValue] = useState(450000);

  // Sync when product preselection changes from outer triggers
  useEffect(() => {
    setProduct(preselectedProduct);
  }, [preselectedProduct]);

  // Sync when calculator estimates are imported
  useEffect(() => {
    if (importedCalculations) {
      setProduct(importedCalculations.inputs.product);
      setAnnualElectricity(importedCalculations.inputs.annualElectricity);
      setRoofSize(importedCalculations.inputs.roofSize);
      setBatteryStorage(importedCalculations.inputs.hasBattery);
      setBudget(importedCalculations.inputs.budget);
      if (importedCalculations.inputs.currentHeatingCost > 0) {
        setHeatingType('gas'); // default assumption
      }
      
      // Jump directly to contact step or summary
      setStep(3);
    }
  }, [importedCalculations]);

  const totalSteps = 4;

  const validateStep = (): boolean => {
    setErrorMsg('');
    if (step === 1) {
      if (!product) {
        setErrorMsg('Bitte wählen Sie ein Produkt aus.');
        return false;
      }
    } else if (step === 2) {
      if (!houseType) {
        setErrorMsg('Bitte geben Sie die Gebäudeart an.');
        return false;
      }
      if (!ownership) {
        setErrorMsg('Bitte wählen Sie Ihr Eigentumsverhältnis.');
        return false;
      }
    } else if (step === 3) {
      if ((product === 'photovoltaik' || product === 'beratung_komplett') && !roofSize) {
        setErrorMsg('Bitte geben Sie die geschätzte Dachfläche an.');
        return false;
      }
    } else if (step === 4) {
      if (!name.trim()) {
        setErrorMsg('Bitte geben Sie Ihren vollständigen Namen an.');
        return false;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Bitte geben Sie eine gültige E-Mail-Adresse an.');
        return false;
      }
      if (!phone.trim() || phone.length < 6) {
        setErrorMsg('Bitte geben Sie eine Telefonnummer für die Absprache an.');
        return false;
      }
      if (!zipCode.trim() || zipCode.length < 5) {
        setErrorMsg('Bitte geben Sie eine gültige 5-stellige PLZ für Regionalpartner an.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);

    // Simulate database write
    setTimeout(() => {
      const generatedLead: Lead = {
        id: 'lead_' + Math.random().toString(36).substring(2, 11),
        product,
        houseType,
        ownership,
        heatingType,
        annualElectricity,
        roofSize,
        batteryStorage,
        energyCurrentCost: product === 'strom_gas' ? energyCurrentCost : undefined,
        energySwitchSubsidies: product === 'strom_gas' ? energySwitchSubsidies : undefined,
        propertyAction: product === 'immobilien' ? propertyAction : undefined,
        propertyAreaSqm: product === 'immobilien' ? propertyAreaSqm : undefined,
        propertyEstimatedValue: product === 'immobilien' ? propertyEstimatedValue : undefined,
        currentSituation: currentSituation || `${houseType === 'einfamilienhaus' ? 'Einfamilienhaus' : 'Immobile'} mit ${heatingType}-Heizung. Sektor: ${product}.`,
        targetSituation: targetSituation || `Ziel: Maximale Unabhängigkeit, Sektoroptimierung.`,
        subsidiesInterest,
        name,
        email,
        phone,
        zipCode,
        budget,
        createdAt: new Date().toISOString(),
        status: 'neu',
        calculatedSavings: importedCalculations?.results ? {
          annualSavingsEur: importedCalculations.results.annualSavingsEur,
          investmentCostEur: importedCalculations.results.investmentCostEur,
          subsidiesEur: importedCalculations.results.subsidiesEur,
          paybackYears: importedCalculations.results.paybackYears,
          co2ReducedTons: importedCalculations.results.co2ReducedTons
        } : undefined
      };

      onLeadSubmitted(generatedLead);
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const getProductLabel = (p: ProductType) => {
    if (p === 'photovoltaik') return 'Photovoltaik';
    if (p === 'waermepumpe') return 'Wärmepumpe';
    if (p === 'strom_gas') return 'Strom & Gas';
    if (p === 'immobilien') return 'Immobilien Von Morgen';
    return 'Photovoltaik & Wärmepumpe';
  };

  return (
    <section id="konfigurator" className="py-24 bg-zinc-950 bg-grid-gold border-t border-b border-zinc-900 relative overflow-hidden">
      {/* Decors */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="max-w-[850px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Card Frame */}
        <div id="config-form-card" className="bg-black border border-zinc-850 shadow-2xl overflow-hidden relative corner-notches">
          
          {/* Top colored gold aesthetic bar */}
          <div className="h-[3px] bg-gold-gradient w-full" />

          {/* Form Progress Header */}
          {!success && (
            <div className="px-6 py-6 sm:px-8 bg-zinc-950 border-b border-zinc-900 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-gold font-mono">
                  Schritt {step} von {totalSteps}
                </span>
                <h3 className="font-serif font-normal text-lg sm:text-xl text-white mt-1">
                  Exklusiver Beratungsantrag
                </h3>
              </div>
              
              {/* Progress dot indicators */}
              <div className="flex space-x-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 transition-all duration-300 ${
                      i + 1 === step 
                        ? 'w-10 bg-gold' 
                        : i + 1 < step 
                        ? 'w-4 bg-white/40' 
                        : 'w-2 bg-zinc-800'
                    }`} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Import Banner Alert */}
          {importedCalculations && !success && (
            <div className="px-6 sm:px-8 py-3.5 bg-zinc-900/40 border-b border-zinc-800 text-gold text-xs font-mono flex items-center gap-2">
              <Calculator className="w-4 h-4 text-gold flex-shrink-0" />
              <span>
                ✓ Sparrechner-Daten geladen: Amortisation ~{importedCalculations.results.paybackYears} Jahre | Sparpotential ~{importedCalculations.results.annualSavingsEur} €/Jahr.
              </span>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mx-6 sm:mx-8 mt-4 p-3 bg-red-950/20 border border-red-900/40 text-red-400 text-xs font-mono rounded-none flex items-center">
              <span className="mr-2">⚠</span> {errorMsg}
            </div>
          )}

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {success ? (
                /* SUCCESS VIEW */
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 border border-gold/40 text-gold flex items-center justify-center mx-auto bg-black">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-serif font-normal text-2xl text-white">
                      Anfrage diskret übermittelt
                    </h4>
                    <p className="text-zinc-400 text-sm max-w-lg mx-auto">
                      Vielen Dank, Herr/Frau <strong>{name}</strong>. Unser Beraterteam am Standort München analysiert nun herstellerneutral Ihre Objektdaten für den Postleitzahlbereich <strong>{zipCode}</strong>.
                    </p>
                  </div>

                  <div className="p-5 bg-zinc-950 border border-zinc-900 text-zinc-400 text-xs leading-relaxed max-w-md mx-auto text-left space-y-3">
                    <p className="font-bold text-white flex items-center tracking-wider uppercase text-[10px]">
                      <Zap className="w-4 h-4 text-gold mr-2" />
                      Ihr V-Check Fahrplan
                    </p>
                    <ul className="space-y-2 list-inside list-disc">
                      <li><strong>Erstanalyse:</strong> Wir entwerfen ein herstellerunabhängiges Ertragskonzept für Sie.</li>
                      <li><strong>Expertenkontakt:</strong> Wir melden uns in Kürze telefonisch unter <strong className="text-white">{phone}</strong>.</li>
                      <li><strong>Förderungsabzug:</strong> Wir beantragen vor Planungsstart eventuell zustehende BAFA/KfW-Subsidien (bis zu 70%).</li>
                      <li><strong>Premium-Netzwerk:</strong> Sie erhalten die optimierten Originalkonditionen direkt vermittelt.</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setSuccess(false);
                      setStep(1);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setZipCode('');
                    }}
                    className="mt-6 px-5 py-2.5 border border-zinc-800 hover:border-gold text-zinc-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                  >
                    Neue Beratung starten
                  </button>
                </motion.div>
              ) : (
                /* ACTIVE STEP WIZARD */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* STEP 1: Sektor / Sektorenabdeckung */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      <h4 className="font-serif font-normal text-lg sm:text-xl text-white mb-1">
                        Für welches Geschäftsfeld beantragen Sie Beratung?
                      </h4>
                      <p className="text-zinc-400 text-xs">
                        Von Morgen Consulting berät Sie absolut herstellerneutral. Wählen Sie Ihr gewünschtes Beratungsfeld:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {/* Option 1: PV */}
                        <div
                          onClick={() => setProduct('photovoltaik')}
                          className={`p-5 cursor-pointer relative transition-all duration-200 border ${
                            product === 'photovoltaik'
                              ? 'border-gold bg-zinc-900'
                              : 'border-zinc-850 bg-black hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="p-2 border border-gold/30 text-gold bg-zinc-950">
                              <Sun className="w-5 h-5" />
                            </div>
                            <input 
                              type="radio" 
                              checked={product === 'photovoltaik'} 
                              readOnly 
                              className="accent-gold h-4 w-4"
                            />
                          </div>
                          <span className="block font-bold tracking-wide uppercase text-white text-xs">Photovoltaik Sektor</span>
                          <span className="block text-[11px] text-zinc-400 mt-1">Eigenstromerzeugung, Heimspeichersysteme, Autarkiepläne</span>
                        </div>

                        {/* Option 2: WP */}
                        <div
                          onClick={() => setProduct('waermepumpe')}
                          className={`p-5 cursor-pointer relative transition-all duration-200 border ${
                            product === 'waermepumpe'
                              ? 'border-gold bg-zinc-900'
                              : 'border-zinc-850 bg-black hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="p-2 border border-gold/30 text-gold bg-zinc-950">
                              <Flame className="w-5 h-5" />
                            </div>
                            <input 
                              type="radio" 
                              checked={product === 'waermepumpe'} 
                              readOnly 
                              className="accent-gold h-4 w-4"
                            />
                          </div>
                          <span className="block font-bold tracking-wide uppercase text-white text-xs">Wärmepumpen Sektor</span>
                          <span className="block text-[11px] text-zinc-400 mt-1">Heizungsoptimierung, KfW-Subventionsanträge bis 70%</span>
                        </div>

                        {/* Option 3: Strom & Gas */}
                        <div
                          onClick={() => setProduct('strom_gas')}
                          className={`p-5 cursor-pointer relative transition-all duration-200 border ${
                            product === 'strom_gas'
                              ? 'border-gold bg-zinc-900'
                              : 'border-zinc-850 bg-black hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="p-2 border border-gold/30 text-gold bg-zinc-950">
                              <CircleDollarSign className="w-5 h-5" />
                            </div>
                            <input 
                              type="radio" 
                              checked={product === 'strom_gas'} 
                              readOnly 
                              className="accent-gold h-4 w-4"
                            />
                          </div>
                          <span className="block font-bold tracking-wide uppercase text-white text-xs">Strom- & Gasoptimierung</span>
                          <span className="block text-[11px] text-zinc-400 mt-1">Gewerbe- & Privattarife, exklusive Großhandelskauf-Konditionen</span>
                        </div>

                        {/* Option 4: Immobilien */}
                        <div
                          onClick={() => setProduct('immobilien')}
                          className={`p-5 cursor-pointer relative transition-all duration-200 border ${
                            product === 'immobilien'
                              ? 'border-gold bg-zinc-900'
                              : 'border-zinc-850 bg-black hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="p-2 border border-gold/30 text-gold bg-zinc-950">
                              <Building className="w-5 h-5" />
                            </div>
                            <input 
                              type="radio" 
                              checked={product === 'immobilien'} 
                              readOnly 
                              className="accent-gold h-4 w-4"
                            />
                          </div>
                          <span className="block font-bold tracking-wide uppercase text-white text-xs">Immobilien von Morgen</span>
                          <span className="block text-[11px] text-zinc-400 mt-1">Vermarktung, Wertanalyse & energetische Sanierungsberatung</span>
                        </div>

                        {/* Option 5: Beides */}
                        <div
                          onClick={() => setProduct('beratung_komplett')}
                          className={`p-5 cursor-pointer relative transition-all duration-205 border md:col-span-2 ${
                            product === 'beratung_komplett'
                              ? 'border-gold bg-zinc-900'
                              : 'border-zinc-850 bg-black hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="p-2 border border-gold/30 text-gold bg-zinc-950 flex items-center space-x-2">
                              <Compass className="w-5 h-5" />
                              <span className="text-[9px] uppercase tracking-wider font-bold bg-gold/10 px-2 py-0.5 border border-gold/20">All-In System</span>
                            </div>
                            <input 
                              type="radio" 
                              checked={product === 'beratung_komplett'} 
                              readOnly 
                              className="accent-gold h-4 w-4"
                            />
                          </div>
                          <span className="block font-bold tracking-wide uppercase text-white text-xs">Komplettberatung (Sektorenkopplung & Smart-Wohnen)</span>
                          <span className="block text-[11px] text-zinc-400 mt-1">Ganzheitlicher V-Check des kompletten Anwesens für maximale Wertsteigerung</span>
                        </div>
                      </div>

                      {/* Broker trust quote */}
                      <div className="bg-zinc-950 p-4 border border-zinc-900 text-[11px] text-zinc-400 italic mt-6">
                        🛡️ <strong>Unabhängigkeits-Garantie:</strong> Als neutrale Makler sind wir nicht an einzelne Fabrikanten gebunden. Unser Ziel ist die Crème de la Crème Anlage für Ihr exaktes Budget.
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Gebäudeart & Eigentum */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="font-serif font-normal text-lg sm:text-xl text-white">
                          Objekt- & Eigentumsstrukturen
                        </h4>
                        <p className="text-zinc-400 text-xs">
                          Diese Rahmenbedingungen steuern die baustatischen Optionen sowie die Bewilligungschancen der staatlichen KfW-Förderlinien.
                        </p>
                      </div>

                      {/* Building choice Grid */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Ausrichtung des Objekts</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { id: 'einfamilienhaus', label: 'Einfamilienhaus' },
                            { id: 'zweifamilienhaus', label: 'Zweifamilienhaus' },
                            { id: 'mehrfamilienhaus', label: 'Mehrfamilienhaus' },
                            { id: 'gewerbe', label: 'Gewerbe' }
                          ].map((b) => (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => setHouseType(b.id as HouseType)}
                              className={`py-3 px-2 text-center border text-xs font-semibold transition-all cursor-pointer ${
                                houseType === b.id
                                  ? 'border-gold bg-zinc-900 text-white font-bold'
                                  : 'border-zinc-850 bg-black hover:border-zinc-800 text-zinc-400'
                              }`}
                            >
                              {b.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Ownership status */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Eigentumsverhältnis</label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: 'eigentuemer', label: 'Ich bin der Eigentümer / Bauherr' },
                            { id: 'mieter', label: 'Ich bin Mieter / Pächter' }
                          ].map((o) => (
                            <button
                              key={o.id}
                              type="button"
                              onClick={() => setOwnership(o.id as OwnershipType)}
                              className={`p-4 text-left border text-xs font-bold tracking-wide uppercase transition-all flex items-center justify-between cursor-pointer ${
                                ownership === o.id
                                  ? 'border-gold bg-zinc-900 text-white'
                                  : 'border-zinc-855 bg-black hover:border-zinc-800 text-zinc-400'
                              }`}
                            >
                              <span>{o.label}</span>
                              <input 
                                type="radio" 
                                checked={ownership === o.id} 
                                readOnly 
                                className="accent-gold h-4 w-4"
                              />
                            </button>
                          ))}
                        </div>
                        {ownership === 'mieter' && (
                          <div className="p-4 bg-zinc-950 border border-zinc-900 text-zinc-400 text-xs leading-relaxed flex items-start gap-2">
                            <Info className="w-4 h-4 text-gold flex-shrink-0" />
                            <span>
                              Hinweis: Für den Einbau von Solaranlagen oder primären Wärmeerzeugern ist das Einverständnis der Eigentümerpartei vorschriftsmäßig. Wir stellen Ihnen hierzu gerne ein herstellerneutrales Informationsschreiben zur Verfügung.
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Technische Parameter */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="font-serif font-normal text-lg sm:text-xl text-white">
                          Objektdaten & technische Parameter
                        </h4>
                        <p className="text-zinc-400 text-xs">
                          Erfassen Sie für den Sektor {getProductLabel(product)} Ihre ungefähren Richtwerte. Unser Münchner Expertenteam simuliert tagesaktuelle Einsparmöglichkeiten.
                        </p>
                      </div>

                      {/* CONDITIONAL FOR PV AND BEIDES */}
                      {(product === 'photovoltaik' || product === 'beratung_komplett') && (
                        <div className="space-y-4 p-5 bg-zinc-950 border border-zinc-900">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">Photovoltaik Bedarf</span>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Roof size */}
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-zinc-400">Geschätzte Dachfläche in m²</label>
                              <div className="relative">
                                <input
                                  type="number"
                                  min="10"
                                  max="300"
                                  value={roofSize}
                                  onChange={(e) => setRoofSize(Number(e.target.value))}
                                  className="w-full pl-3 pr-10 py-2.5 bg-black border border-zinc-800 text-white outline-none focus:border-gold font-mono"
                                />
                                <span className="absolute right-3 top-3 text-zinc-500 text-xs">m²</span>
                              </div>
                            </div>

                            {/* Battery selection */}
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-zinc-400">Heimspeicher-Option</label>
                              <select
                                value={batteryStorage ? 'yes' : 'no'}
                                onChange={(e) => setBatteryStorage(e.target.value === 'yes')}
                                className="w-full px-3 py-3 bg-black border border-zinc-800 text-white outline-none focus:border-gold text-xs font-bold uppercase tracking-wide cursor-pointer"
                              >
                                <option value="yes">Ja, inkl. Speicher (für max. Autarkie)</option>
                                <option value="no">Nein, vorerst netzgekoppelt ohne Speicher</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CONDITIONAL FOR HP */}
                      {(product === 'waermepumpe' || product === 'beratung_komplett') && (
                        <div className="space-y-4 p-5 bg-zinc-950 border border-zinc-900">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">Wärmepumpen Parameter</span>

                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-400 block">Bisherige Heiztechnologie</label>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                              {[
                                { id: 'gas', label: 'Gas-Therme' },
                                { id: 'oel', label: 'Öl-Heizung' },
                                { id: 'strom', label: 'Nachtstrom' },
                                { id: 'holz', label: 'Holz/Pellet' },
                                { id: 'andere', label: 'Sonstige' }
                              ].map((h) => (
                                <button
                                  key={h.id}
                                  type="button"
                                  onClick={() => setHeatingType(h.id as HeatingType)}
                                  className={`py-2 px-1 text-center border text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                                    heatingType === h.id
                                      ? 'border-gold bg-zinc-900 text-white'
                                      : 'border-zinc-855 bg-black text-zinc-500 hover:border-zinc-800'
                                  }`}
                                >
                                  {h.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CONDITIONAL FOR STROM & GAS */}
                      {product === 'strom_gas' && (
                        <div className="space-y-4 p-5 bg-zinc-950 border border-zinc-900">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">Tarifoptimierung Tarife</span>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-zinc-400">Aktuelle Energiekosten pro Jahr (€)</label>
                              <div className="relative">
                                <input
                                  type="number"
                                  min="100"
                                  max="50000"
                                  value={energyCurrentCost}
                                  onChange={(e) => setEnergyCurrentCost(Number(e.target.value))}
                                  className="w-full pl-3 pr-10 py-2.5 bg-black border border-zinc-800 text-white outline-none focus:border-gold font-mono"
                                />
                                <span className="absolute right-3 top-3 text-zinc-500 text-xs">€/Jahr</span>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-zinc-400">Möchten Sie Ökostrom-Angebote prüfen?</label>
                              <select
                                value={energySwitchSubsidies ? 'yes' : 'no'}
                                onChange={(e) => setEnergySwitchSubsidies(e.target.value === 'yes')}
                                className="w-full px-3 py-3 bg-black border border-zinc-800 text-white outline-none focus:border-gold text-xs font-bold uppercase tracking-wide cursor-pointer"
                              >
                                <option value="yes">Ja, nur regenerative Erzeuger</option>
                                <option value="no">Unwichtig, rein preisoptimiert</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CONDITIONAL FOR IMMOBILIEN */}
                      {product === 'immobilien' && (
                        <div className="space-y-4 p-5 bg-zinc-950 border border-zinc-900">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">Immobilien Von Morgen Vorhaben</span>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="space-y-1 sm:col-span-1">
                              <label className="text-xs font-semibold text-zinc-400">Ihr Vorhaben</label>
                              <select
                                value={propertyAction}
                                onChange={(e: any) => setPropertyAction(e.target.value)}
                                className="w-full px-3 py-2.5 bg-black border border-zinc-800 text-white outline-none focus:border-gold text-xs font-bold uppercase cursor-pointer"
                              >
                                <option value="verkaufen">Verkaufen</option>
                                <option value="kaufen">Kaufen</option>
                                <option value="vermieten">Vermieten</option>
                                <option value="bewertung">Wertanalyse</option>
                                <option value="beratung">Sanierung</option>
                              </select>
                            </div>

                            <div className="space-y-1 sm:col-span-1">
                              <label className="text-xs font-semibold text-zinc-400">Fläche (m²)</label>
                              <input
                                type="number"
                                value={propertyAreaSqm}
                                onChange={(e) => setPropertyAreaSqm(Number(e.target.value))}
                                className="w-full px-3 py-2 bg-black border border-zinc-800 text-white outline-none focus:border-gold font-mono text-xs"
                              />
                            </div>

                            <div className="space-y-1 sm:col-span-1">
                              <label className="text-xs font-semibold text-zinc-400">Richtwert (€)</label>
                              <input
                                type="number"
                                value={propertyEstimatedValue}
                                onChange={(e) => setPropertyEstimatedValue(Number(e.target.value))}
                                className="w-full px-3 py-2 bg-black border border-zinc-800 text-white outline-none focus:border-gold font-mono text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* General electricity slider (keep for context if applicable) */}
                      {product !== 'immobilien' && product !== 'strom_gas' && (
                        <div className="space-y-1.5 pt-2">
                          <div className="flex justify-between items-center text-xs text-zinc-400 font-semibold">
                            <span>Ungefährer jährlicher Haushaltsstrombedarf</span>
                            <span className="text-white font-mono font-bold">{annualElectricity.toLocaleString('de-DE')} kWh/Jahr</span>
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
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* STEP 4: Kontaktdaten */}
                  {step === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="font-serif font-normal text-lg sm:text-xl text-white">
                          Persönliche Kontaktdaten & PLZ
                        </h4>
                        <p className="text-zinc-400 text-xs">
                          Geben Sie Ihre Kontaktdaten an, um Ihre herstellerunabhängige Berechnung zuzuordnen und die passenden Handwerksbetriebe aus Ihrer Region zu filtern.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-zinc-400 flex items-center uppercase tracking-wider">
                            <User className="w-3.5 h-3.5 mr-2 text-gold animate-pulse" />
                            Vollständig Name
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Muster Vorname Nachname"
                            className="w-full px-3.5 py-2.5 bg-black border border-zinc-800 text-white outline-none focus:border-gold text-sm"
                            required
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-zinc-400 flex items-center uppercase tracking-wider">
                            <Mail className="w-3.5 h-3.5 mr-2 text-gold" />
                            E-Mail-Adresse
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ihre.adresse@firma.de"
                            className="w-full px-3.5 py-2.5 bg-black border border-zinc-800 text-white outline-none focus:border-gold text-sm"
                            required
                          />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-zinc-400 flex items-center uppercase tracking-wider">
                            <Phone className="w-3.5 h-3.5 mr-2 text-gold" />
                            Telefonnummer
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="z.B. +49 (0) 171 ..."
                            className="w-full px-3.5 py-2.5 bg-black border border-zinc-800 text-white outline-none focus:border-gold text-sm"
                            required
                          />
                        </div>

                        {/* Zip Code */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-zinc-400 flex items-center uppercase tracking-wider">
                            <MapPin className="w-3.5 h-3.5 mr-2 text-gold" />
                            Postleitzahl des Objekts
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="z.B. 80331"
                            className="w-full px-3.5 py-2.5 bg-black border border-zinc-800 text-white outline-none focus:border-gold text-sm font-mono"
                            required
                          />
                        </div>
                      </div>

                      {/* Subsidies interest checkbox */}
                      <div className="flex items-start space-x-3 p-4 bg-zinc-950 border border-zinc-900">
                        <input
                          type="checkbox"
                          checked={subsidiesInterest}
                          onChange={(e) => setSubsidiesInterest(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-zinc-805 text-gold focus:ring-gold bg-black cursor-pointer"
                        />
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-white block">Staatliche Förderberatung miterledigen? (KfW BAFA bis 70%)</span>
                          <span className="text-[10px] text-zinc-500 block leading-normal">
                            Ja, sichten Sie bei der Ertragssimulation alle staatlich zustehenden Investitions-Zuschüsse und verhandlungssicheren Bankkredite.
                          </span>
                        </div>
                      </div>

                      {/* Privacy terms */}
                      <p className="text-[9px] text-zinc-500 leading-relaxed font-sans">
                        Mit Absenden Ihrer Anfrage stimmen Sie den diskreten Verarbeitungsregelungen von Von Morgen Consulting zu. Ihre Parameter werden zur herstellerunabhängigen Preissichtung bei lizenzierten Großhändlern verarbeitet und absolut vertraulich behandelt.
                      </p>
                    </motion.div>
                  )}

                  {/* BOTTOM ACTION BUTTONS */}
                  <div className="pt-6 border-t border-zinc-900 flex items-center justify-between">
                    {/* Back option */}
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center px-4 py-2.5 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-400 hover:text-white transition cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1.5" />
                        Zurück
                      </button>
                    ) : (
                      <div />
                    )}

                    {/* Next / Submit option */}
                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center px-5 py-2.5 bg-zinc-900 hover:bg-zinc-850 text-xs font-bold text-white transition cursor-pointer border border-zinc-850"
                      >
                        Weiter
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center px-6 py-3 bg-gold hover:bg-gold-light text-black font-bold tracking-wider uppercase text-xs transition disabled:opacity-50 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Prüfe Portfolio-Vorteile...
                          </>
                        ) : (
                          <>
                            Beratungsanfrage absenden
                            <CheckCircle className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
