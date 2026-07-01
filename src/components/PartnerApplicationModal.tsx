import React, { useState } from 'react';
import { 
  X, CheckCircle2, ArrowRight, Building2, User, Phone, Mail, 
  MapPin, Loader2, Sparkles, ShieldCheck, ThumbsUp, Layers, Users
} from 'lucide-react';
import { motion } from 'motion/react';

interface PartnerApplicationModalProps {
  onClose: () => void;
}

export default function PartnerApplicationModal({ onClose }: PartnerApplicationModalProps) {
  const [partnerType, setPartnerType] = useState<'shk' | 'pv' | 'immobilien' | 'hybrid'>('pv');
  const [cooperationMode, setCooperationMode] = useState<'qualified' | 'exclusive' | 'performance'>('qualified');
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form Fields
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCodes, setZipCodes] = useState('');
  const [monthlyCapacity, setMonthlyCapacity] = useState('5-10');
  const [experienceYears, setExperienceYears] = useState('3-5');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API registration of partner lead request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div 
      id="partner-application-overlay"
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-2xl bg-zinc-950 border border-zinc-900 shadow-2xl relative overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-900 bg-black flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-ping" />
            <span className="text-xs font-mono text-gold uppercase tracking-widest font-bold">B2B Lead-Netzwerk</span>
            <h3 className="font-serif text-base text-white uppercase hidden sm:inline-block">/ Partner werden</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-900 transition"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 relative z-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                <div className="space-y-6">
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <h4 className="font-serif text-2xl text-white leading-snug">
                      Wachsen Sie mit vorqualifizierten <span className="text-gold-gradient italic">B2B Leads</span>
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm">
                      Wir verbinden Fachhandwerker &amp; Makler mit hochkarätigen regionalen Kundenanfragen. Wählen Sie Ihren Bereich und das passende Kooperationsmodell.
                    </p>
                  </div>

                  {/* Partner Type Selection */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                      1. Wählen Sie Ihren Fachbereich:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'pv', title: 'Photovoltaik Partner', desc: 'Solaranlagen & Speicher' },
                        { id: 'shk', title: 'SHK Fachbetrieb', desc: 'Wärmepumpen & Heizung' },
                        { id: 'immobilien', title: 'Immobilienmakler', desc: 'Objektakquise & Vermittlung' }
                      ].map((item) => {
                        const isSelected = partnerType === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setPartnerType(item.id as any)}
                            className={`p-4 text-left border cursor-pointer transition rounded ${
                              isSelected 
                                ? 'border-gold bg-gold/5' 
                                : 'border-zinc-900 bg-zinc-950 hover:border-zinc-800'
                            }`}
                          >
                            <span className={`text-xs font-bold uppercase block ${isSelected ? 'text-gold' : 'text-zinc-300'}`}>
                              {item.title}
                            </span>
                            <span className="text-[10px] text-zinc-500 block mt-1">
                              {item.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cooperation Models Selector */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                      2. Wählen Sie das Kooperationsmodell:
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { 
                          id: 'qualified', 
                          title: 'Qualifizierte Leads', 
                          desc: 'Exklusiver Gebietsschutz', 
                          details: 'Maximal 2 bis 3 Partner pro Region gewährleistet hohe Abschlussquoten.' 
                        },
                        { 
                          id: 'exclusive', 
                          title: 'Exklusive Leads', 
                          desc: 'Individuelle Anfrage', 
                          details: 'Komplett exklusive Alleinbelieferung für Ihr Gebiet. Muss separat verhandelt werden.' 
                        },
                        { 
                          id: 'performance', 
                          title: 'Performance Marketing', 
                          desc: 'Meta Ads Kampagne', 
                          details: 'Ad-Management & Kampagnensteuerung für Ihre eigene Marke gegen transparente monatliche Dienstleistungs-Pauschale.' 
                        }
                      ].map((item) => {
                        const isSelected = cooperationMode === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setCooperationMode(item.id as any)}
                            className={`p-4 text-left border cursor-pointer transition rounded flex flex-col justify-between ${
                              isSelected 
                                ? 'border-gold bg-gold/10' 
                                : 'border-zinc-900 bg-zinc-950 hover:border-zinc-800'
                            }`}
                          >
                            <div>
                              <span className={`text-xs font-bold uppercase block ${isSelected ? 'text-gold' : 'text-zinc-300'}`}>
                                {item.title}
                              </span>
                              <span className="text-[10px] text-gold-gradient font-semibold block mt-0.5">
                                {item.desc}
                              </span>
                              <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">
                                {item.details}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Trust list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-900/30 p-4 border border-zinc-900 rounded">
                    <div className="flex items-start text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-gold mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Vorqualifiziert &amp; Heiß:</strong> Telefonisch geprüfter Bedarf, Budget, Gegebenheiten und Zeitrahmen vor Weitergabe.</span>
                    </div>
                    <div className="flex items-start text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-gold mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Umfassender Gebietsschutz:</strong> Maximal zwei bis drei Partner pro exklusiver Region. Keine Über-Verteilung.</span>
                    </div>
                    <div className="flex items-start text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-gold mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Exklusiv-Leads optionierbar:</strong> Auf ausdrücklichen Wunsch vermitteln wir exklusive Leads. Hierfür ist stets eine individuelle Anfrage nötig.</span>
                    </div>
                    <div className="flex items-start text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-gold mr-3 mt-0.5 flex-shrink-0" />
                      <span><strong>Performance Marketing:</strong> Meta-Werbeanzeigen, Werbebudget-Steuerung &amp; Anzeigenmanagement im transparenten Pauschalpaket.</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full inline-flex items-center justify-center py-3 bg-gold text-black uppercase tracking-widest text-xs font-bold transition hover:bg-gold-light pointer-events-auto cursor-pointer rounded font-sans"
                    >
                      Weiter zu Ihren Firmendaten
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center space-x-2 text-xs text-gold font-mono mb-2">
                    <Building2 className="w-4 h-4" />
                    <span>Firmendetails &amp; Einzugsgebiet angeben</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-zinc-400">Firmenname *</label>
                      <input 
                        type="text" 
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="z.B. Solartechnik Von Morgen GmbH" 
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold py-2.5 px-3 text-xs text-white placeholder-zinc-600 outline-none transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-zinc-400">Ansprechpartner *</label>
                      <input 
                        type="text" 
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="z.B. Max Mustermann" 
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold py-2.5 px-3 text-xs text-white placeholder-zinc-600 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-zinc-400">E-Mail-Adresse *</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@firma.de" 
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold py-2.5 px-3 text-xs text-white placeholder-zinc-600 outline-none transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-zinc-400">Telefonnummer *</label>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0170 1234567" 
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold py-2.5 px-3 text-xs text-white placeholder-zinc-600 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-zinc-400">Wunsch-PLZ-Einzugsgebiet *</label>
                    <input 
                      type="text" 
                      required
                      value={zipCodes}
                      onChange={(e) => setZipCodes(e.target.value)}
                      placeholder="z.B. 80, 81, 82 (Raum München) oder ganz Bayern" 
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold py-2.5 px-3 text-xs text-white placeholder-zinc-600 outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-zinc-400">Kapazität (Leads pro Monat)</label>
                      <select 
                        value={monthlyCapacity}
                        onChange={(e) => setMonthlyCapacity(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold py-2.5 px-3 text-xs text-white outline-none transition"
                      >
                        <option value="1-5">1 bis 5 Leads</option>
                        <option value="5-10">5 bis 10 Leads</option>
                        <option value="10-25">10 bis 25 Leads</option>
                        <option value="25+">25+ Leads (Gewerbekapazität)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-zinc-400">Bestehung des Betriebs</label>
                      <select 
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold py-2.5 px-3 text-xs text-white outline-none transition"
                      >
                        <option value="neu">Neu gegründet (&lt; 1 Jahr)</option>
                        <option value="1-3">1 bis 3 Jahre</option>
                        <option value="3-5">3 bis 5 Jahre</option>
                        <option value="5+">Über 5 Jahre Markterfahrung</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pt-2">
                    <input type="checkbox" id="terms-partner" required className="mt-1 accent-gold" />
                    <label htmlFor="terms-partner" className="text-[10px] text-zinc-500 leading-relaxed">
                      Ich stimme zu, dass meine Daten zum Zweck der Partnerprüfung, Kontaktaufnahme und Zusendung von Test-Leads gemäß der Datenschutzerklärung von Von Morgen verarbeitet werden dürfen. *
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full sm:w-1/3 py-2.5 bg-transparent hover:bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-xs transition"
                    >
                      Zurück
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-2/3 py-2.5 bg-gold text-black hover:bg-gold-light font-bold uppercase tracking-widest text-xs transition flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Wird geprüft...</span>
                        </>
                      ) : (
                        <>
                          <span>Partnerschaft anfragen</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 bg-gold/10 border border-gold rounded-full flex items-center justify-center mx-auto text-gold animate-bounce">
                <ThumbsUp className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h4 className="font-serif text-2xl text-white">Anfrage erfolgreich übermittelt!</h4>
                <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto">
                  Vielen Dank für Ihr Interesse an unserem exklusiven Lead-Netzwerk. Ein Fachberater aus unserem B2B-Team wird Ihre Kapazitäten prüfen und sich innerhalb der nächsten 24 Stunden telefonisch bei Ihnen melden.
                </p>
              </div>

               {/* Summary overview */}
              <div className="max-w-md mx-auto border border-zinc-900 bg-zinc-950 p-4 space-y-2 text-left text-xs rounded">
                <div className="flex justify-between border-b border-zinc-900 pb-1.5 text-zinc-500">
                  <span>Firmenname:</span>
                  <span className="text-white font-bold">{companyName || 'Ihr Fachbetrieb'}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900 pb-1.5 text-zinc-500">
                  <span>Sektor / Fachbereich:</span>
                  <span className="text-gold font-bold uppercase">
                    {partnerType === 'pv' && 'Photovoltaik (Solar)'}
                    {partnerType === 'shk' && 'Wärmepumpen (SHK)'}
                    {partnerType === 'immobilien' && 'Immobilien & Vermittlung'}
                    {partnerType === 'hybrid' && 'Hybrid / Sektorenübergreifend'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-zinc-900 pb-1.5 text-zinc-500">
                  <span>Kooperations-Modell:</span>
                  <span className="text-white font-bold">
                    {cooperationMode === 'qualified' && 'Qualifizierte Leads (Gebietsschutz)'}
                    {cooperationMode === 'exclusive' && 'Exklusive Leads (Einzelanfrage)'}
                    {cooperationMode === 'performance' && 'Performance Marketing (Meta Ads)'}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Status:</span>
                  <span className="text-teal-400 font-bold flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    Prüfung durch Elvin Kaguri läuft
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gold text-black uppercase tracking-widest text-xs font-bold transition hover:bg-gold-light pointer-events-auto cursor-pointer"
                >
                  Schließen &amp; zurück
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
