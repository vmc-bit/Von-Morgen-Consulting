import React, { useState } from 'react';
import { 
  X, CheckCircle2, ArrowRight, User, Phone, Mail, 
  Loader2, Sparkles, ShieldCheck, ThumbsUp, Briefcase, DollarSign, Target, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CareersModalProps {
  onClose: () => void;
}

type JobType = 'telefonist' | 'd2d' | 'vertreter' | 'franchise';

interface JobDetails {
  id: JobType;
  title: string;
  role: string;
  income: string;
  badge: string;
  shortDesc: string;
  uspList: string[];
  tasks: string[];
}

export default function CareersModal({ onClose }: CareersModalProps) {
  const [selectedJob, setSelectedJob] = useState<JobType>('vertreter');
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('1-3');
  const [message, setMessage] = useState('');
  const [earliestStart, setEarliestStart] = useState('');

  const jobs: JobDetails[] = [
    {
      id: 'telefonist',
      title: 'Telefonist / Terminierer (m/w/d)',
      role: 'Sektorenübergreifende Terminierung / Inside Sales',
      income: '150 € bis 500 € pro abgeschlossenem Termin (Reines Provisionsmodell / Kein Basisgehalt)',
      badge: '100% Homeoffice / Freie Zeiteinteilung',
      shortDesc: 'Sie sind die vertriebliche Stimme von Von Morgen Consulting. Sie telefonieren mit herstellerunabhängig interessierten Kunden, qualifizieren diese vor und planen Termine für unsere Berater. Wir zahlen Spitzenprovisionen ganz ohne Fixum basierend auf Ihren vereinbarten, erfolgreich durchgeführten Kundenterminen.',
      uspList: [
        'Hervorragende Vergütung: 150 € bis 500 € Provision pro erfolgreich abgeschlossenem Kundentermin',
        'Reines, leistungsorientiertes Provisionsmodell ohne starres Basisgehalt – wer mehr leistet, verdient exponentiell mehr',
        'Sektorenübergreifend aufgestellt: Photovoltaik, Wärmepumpen, Strom- & Gastarife sowie Immobiliensales',
        'Modernste Infrastruktur: Zugang zu Profi-CRM, Telefonie-Tools und bereits qualifizierten Datenquellen'
      ],
      tasks: [
        'Herzliche, kompetente telefonische Erstansprache potenzieller Solar-, Heizungs- oder Wechselinteressenten',
        'Strukturierte Bedarfs- und Vorqualifizierung (Eigentum, Objektbeschaffenheit, Stromkosten)',
        'Sektorenübergreifende Terminvereinbarung für unser Außendienstnetzwerk',
        'Akkurate CRM-Pflege und direkte digitale Übergabe der ergiebigen Kundentermine'
      ]
    },
    {
      id: 'd2d',
      title: 'Door to Dollar / D2D Advisor (m/w/d)',
      role: 'Vor-Ort-Direktkontakt & Nahbereich-Terminierung',
      income: '250 € bis 850 € Provision pro verkaufter Anlage (Realisierte Abschlüsse)',
      badge: 'Direkter Kundenkontakt / Sektorenübergreifend',
      shortDesc: 'Sie gehen direkt dorthin, wo das Geschäft entsteht. Vor Ort in qualifizierten Wohngebieten sensibilisieren Sie Hausbesitzer für die Energiewende und sichern Termine in Kooperation mit unserem starken Partnernetzwerk. Pro vermittelter Anlage, die über Ihre Termine verkauft wird, erhalten Sie Top-Provisionen.',
      uspList: [
        'Hocheffektive Promotion: 250 € bis zu 850 € Provision pro erfolgreich verkaufter Komplettanlage',
        'Perfekte Synergie: Sie legen den Grundstein vor Ort, unser herstellerunabhängiges Partnernetzwerk schließt ab',
        'Sektorenübergreifendes Spektrum: PV-Anlagen, Wärmepumpen, vorteilhafte Energie-Tarife und Hausvermittlung',
        'Freie Zeiteinteilung und flexible Einsatzmöglichkeiten in lukrativen, vorab ausgewerteten Regionen'
      ],
      tasks: [
        'Aktive, sympathische Ansprache von Hauseigentümern direkt vor Ort an der Tür (Door-to-Door / Door-to-Dollar)',
        'Terminabstimmung für professionelle, detaillierte Beratungsgespräche',
        'Enger Austausch und Kooperation mit den regionalen Vertriebskollaborateuren',
        'Erhöhung der lokalen Marktdurchdringung durch zielgerichtete Gebietsbearbeitung'
      ]
    },
    {
      id: 'vertreter',
      title: 'Handelsvertreter / Beratungspartner (m/w/d)',
      role: 'Premium Energie- und Immobiliensales (B2C / B2B)',
      income: 'Attraktive Umsatzbeteiligung & Teambuilding-Override (Realistisch 10.000 €+ mtl.)',
      badge: 'Verkaufspreisliste / Teambuilding-Ausrichtung',
      shortDesc: 'Als freier Handelsvertreter oder Kooperationspartner erhalten Sie von uns keine komplexen Abgabepreislisten, sondern eine klare, fixe Verkaufspreisliste. Sie vermitteln direkt zu festen Preisen und erhalten eine hervorragende prozentuale Umsatzbeteiligung am Abschluss. Perfekt geeignet, um sich ein eigenes Unter-Team aufzubauen!',
      uspList: [
        'Klare Verkaufspreisliste: Keine komplexen Abgabepreisrechnungen, transparente feste Verkaufspreise',
        'Starke prozentuale Beteiligung direkt an jedem generierten Brutto-Verkaufsumsatz',
        'Teambuilding-Zulagen: Bauen Sie eigene Verkäufer und Mitarbeiter auf, schulen Sie diese und partizipieren Sie prozentual an deren Teamvolumen',
        'Sektorenübergreifende Spitzen-Portfolios: Solar/PV, Speicher, Wärmepumpen, Strom- & Gasvertrieb sowie Immobilienmaklerei'
      ],
      tasks: [
        'Beratung von Eigentümern und B2B-Entscheidern basierend auf unserer festen Verkaufspreisliste',
        'Planung maßgeschneiderter Energiesysteme (Solarkonzerte, Wärmepumpen) und Abschlüsse vor Ort',
        'Eigenständiger Aufbau, Rekrutierung und Betreuung von Vertriebsassistenten oder Unter-Vermittlern',
        'Schnittstellenfunktion zum Gesamtnetzwerk – Sie bringen den Deal, wir weisen die Montage an'
      ]
    },
    {
      id: 'franchise',
      title: 'Franchise-Agentur / Regionalleiter (m/w/d)',
      role: 'Auf- & Ausbau eines übergeordneten Beratungscenters',
      income: 'Maximale Hebel über exklusive Großhandels-Einkaufspreislisten (20.000 €+ mtl.)',
      badge: 'Echter Gebietsschutz & fertige Funnels',
      shortDesc: 'Übernehmen Sie die unternehmerische Führung in Ihrer Postleitzahlregion. Sie bekommen exklusiven, übergeordneten Gebietsschutz und arbeiten mit festen handwerklichen Abgabepreislisten unseres Netzwerks.',
      uspList: [
        'Echter, vertraglich zugesicherter und übergeordneter Gebietsschutz in Ihrem Postleitzahlgebiet',
        'Arbeit mit exklusiven Einkaufsvorteilen und festen Abgabepreislisten des Partnernetzwerks',
        'Sektorenübergreifend lizenziert: PV-Anlagen, Wärmepumpen, Direktstrom- & Gasvertrieb sowie Immobilienmaklersparte',
        'Umfassender Systemzugang zu Leadfokussierten Funnels, IT-Infrastruktur und HR-Sourcing'
      ],
      tasks: [
        'Aufbau, Organisation und strategische Führung Ihres regionalen Berater- & Telefonistenteams',
        'Repräsentanz der Corporate Identity von Von Morgen Consulting in Ihrem Schutzgebiet',
        'Sicherung der Vertriebsgeschwindigkeit und Qualitätsstandards bei Vor-Ort-Audits',
        'Pflege regionaler Multiplikatoren, Verwalter und B2B-Kooperationen'
      ]
    }
  ];

  const currentJob = jobs.find(j => j.id === selectedJob) || jobs[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated API call or local persistence saving
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Save application to local logs if possible
      try {
        const stored = localStorage.getItem('von_morgen_career_apps') || '[]';
        const apps = JSON.parse(stored);
        apps.unshift({
          id: `app_${Date.now()}`,
          job: selectedJob,
          name,
          email,
          phone,
          experience,
          message,
          earliestStart,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('von_morgen_career_apps', JSON.stringify(apps));
      } catch (e) {
        console.error(e);
      }
    }, 1500);
  };

  return (
    <div 
      id="careers-application-overlay"
      className="fixed inset-0 z-[110] overflow-y-auto bg-black/98 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        className="w-full max-w-4xl bg-zinc-950 border border-zinc-900 shadow-2xl relative overflow-hidden my-4"
      >
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-900 bg-black flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-mono text-gold uppercase tracking-widest font-bold">Wachstumskurs 2026</span>
            <h3 className="font-serif text-sm text-zinc-300 uppercase hidden sm:inline-block">/ Karriere &amp; Kooperation</h3>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center space-x-2 px-3 py-1.5 bg-zinc-900 text-gold hover:text-white hover:bg-zinc-850 border border-gold/20 hover:border-gold/50 transition cursor-pointer text-xs font-mono font-bold uppercase tracking-wider"
            aria-label="Zurück zur Startseite"
            id="careers-header-back-btn"
          >
            <span>← Zurück zur Startseite</span>
          </button>
        </div>

        {/* Modal Main Area (split-screen on desktop for elegant hierarchy) */}
        <div className="grid grid-cols-1 md:grid-cols-12 relative z-10">
          
          {/* LEFT PANEL: Job Selections & Perks */}
          <div className="md:col-span-5 bg-zinc-900/10 border-b md:border-b-0 md:border-r border-zinc-900 p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Verstärkung gesucht</span>
              <h4 className="font-serif text-xl text-white">
                Gestalten Sie die <span className="text-gold-gradient italic">Energiewende</span> aktiv mit
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Als führender, konzernunabhängiger Broker bieten wir Ihnen perfekte Karrierebedingungen mit null Projektrisiko und Top-Funnels.
              </p>
            </div>

            {/* Position Picker Cards */}
            <div className="space-y-3 pt-2">
              <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
                Offene Karrierepfade:
              </label>
              <div className="space-y-2.5">
                {jobs.map((job) => {
                  const isSelected = selectedJob === job.id;
                  return (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => {
                        setSelectedJob(job.id);
                        if (step === 2) setStep(1); // Reset step, let them read details
                      }}
                      className={`w-full p-4 text-left border transition relative block cursor-pointer ${
                        isSelected 
                          ? 'border-gold bg-gold/5' 
                          : 'border-zinc-900 bg-black/40 hover:border-zinc-800'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 text-gold">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                      <span className={`text-xs font-bold uppercase block tracking-wider ${isSelected ? 'text-gold' : 'text-zinc-300'}`}>
                        {job.title}
                      </span>
                      <span className="text-[10px] text-zinc-500 block mt-1 leading-snug">
                        {job.role}
                      </span>
                      <div className="mt-2 flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-gold/80" />
                        <span className="text-[9px] font-mono text-zinc-400 tracking-wide font-semibold">{job.income.split('(')[0]}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* General Benefits Summary */}
            <div className="bg-zinc-950/80 border border-zinc-900/60 p-4 space-y-3.5">
              <span className="text-[9px] font-mono uppercase text-gold tracking-widest block font-bold">Ihre Vorteile bei VM:</span>
              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li className="flex items-start">
                  <ShieldCheck className="w-4 h-4 text-gold mr-2.5 flex-shrink-0 mt-0.5" />
                  <span><strong>Kein Projektrisiko:</strong> Keine Haftung, reiner Fokus auf Verkaufsabschlüsse.</span>
                </li>
                <li className="flex items-start">
                  <Target className="w-4 h-4 text-gold mr-2.5 flex-shrink-0 mt-0.5" />
                  <span><strong>Echte Spitzenprovisionen:</strong> Überdurchschnittliches Einkommen, wöchentliche Abrechnung.</span>
                </li>
                <li className="flex items-start">
                  <Briefcase className="w-4 h-4 text-gold mr-2.5 flex-shrink-0 mt-0.5" />
                  <span><strong>Full Backoffice Support:</strong> Planung und Meister-Montage werden komplett zentral erledigt.</span>
                </li>
              </ul>
            </div>

            {/* Back to Home Page quick action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-gold/30 text-zinc-300 hover:text-gold uppercase tracking-widest text-[10px] font-mono font-bold transition cursor-pointer flex items-center justify-center space-x-2"
                id="careers-sidebar-back-btn"
              >
                <span>← Zurück zur Startseite</span>
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: Details / Dynamic Application Form */}
          <div className="md:col-span-7 p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <div className="space-y-6">
                  {step === 1 ? (
                    <motion.div 
                      key="details"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      {/* Job Header Info */}
                      <div className="space-y-3 pb-4 border-b border-zinc-900">
                        <div className="inline-flex items-center space-x-2 bg-gold/10 text-gold text-[9px] font-mono uppercase font-bold tracking-widest px-2.5 py-0.5 border border-gold/20">
                          <span>{currentJob.badge}</span>
                        </div>
                        <h4 className="font-serif text-2xl text-white tracking-tight">{currentJob.title}</h4>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{currentJob.shortDesc}</p>
                      </div>

                      {/* Job Tasks vs USPs Split Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Tasks Column */}
                        <div className="space-y-3">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Verantwortungsbereich:</span>
                          <ul className="space-y-2 text-xs text-zinc-300">
                            {currentJob.tasks.map((task, is) => (
                              <li key={is} className="flex items-start leading-relaxed">
                                <span className="text-gold font-mono mr-2 text-[10px] select-none mt-0.5">0{is + 1}.</span>
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* USP Column */}
                        <div className="space-y-3">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Das bringen wir mit:</span>
                          <ul className="space-y-2 text-xs text-zinc-400">
                            {currentJob.uspList.map((usp, iu) => (
                              <li key={iu} className="flex items-start leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold mr-2.5 mt-1.5 flex-shrink-0" />
                                <span>{usp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Earning potential banner */}
                      <div className="bg-zinc-900/30 border border-zinc-800/80 p-4 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded bg-zinc-900 border border-gold/20 flex items-center justify-center text-gold">
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">Einkommen &amp; Verdienst</span>
                          <p className="text-white text-xs font-semibold leading-relaxed">{currentJob.income}</p>
                        </div>
                      </div>

                      {/* Continue to registration */}
                      <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="w-full sm:w-2/3 inline-flex items-center justify-center py-3 bg-gold text-black uppercase tracking-widest text-xs font-bold transition hover:bg-gold-light cursor-pointer font-sans"
                          id="careers-apply-now-btn"
                        >
                          Jetzt direkt bewerben
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                        <button
                          type="button"
                          onClick={onClose}
                          className="w-full sm:w-1/3 py-3 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-zinc-400 hover:text-white font-bold uppercase tracking-wider text-xs transition cursor-pointer"
                          id="careers-step1-cancel-btn"
                        >
                          Zurück / Home
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form 
                      onSubmit={handleSubmit}
                      key="form"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono text-gold uppercase tracking-wider block font-bold">Bewerbungsformular</span>
                        <h4 className="font-serif text-lg text-white">Stelle: {currentJob.title}</h4>
                        <p className="text-zinc-500 text-xs">Füllen Sie das Kurzprofil aus – wir melden uns innerhalb von 24h bei Ihnen.</p>
                      </div>

                      {/* Form rows */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-wider text-zinc-400">Name / Vorname *</label>
                          <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="z.B. Robert Neumann" 
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
                            placeholder="z.B. +49 176 1234567" 
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
                            placeholder="z.B. r.neumann@gmail.com" 
                            className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold py-2.5 px-3 text-xs text-white placeholder-zinc-600 outline-none transition"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-wider text-zinc-400">Frühestmöglicher Start *</label>
                          <input 
                            type="text" 
                            required
                            value={earliestStart}
                            onChange={(e) => setEarliestStart(e.target.value)}
                            placeholder="z.B. Ab sofort / 1 Monat Kündigungsfrist" 
                            className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold py-2.5 px-3 text-xs text-white placeholder-zinc-600 outline-none transition"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-zinc-400">Bisherige Vertriebs- / Branchenerfahrung</label>
                        <select 
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold py-2.5 px-3 text-xs text-white outline-none transition"
                        >
                          <option value="neuling">Quereinsteiger (Keine Vertriebserfahrung)</option>
                          <option value="1-3">1 bis 3 Jahre Vertriebserfahrung</option>
                          <option value="3-5">3 bis 5 Jahre (vorzugsweise PV / Strom / Baukooperation)</option>
                          <option value="5+">Mehr als 5 Jahre (Branchen-Profi / Agenturleiter)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-zinc-400">Kurze Nachricht / Warum sollten wir Sie nehmen? (Optional)</label>
                        <textarea 
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Teilen Sie uns kurz mit, warum Sie perfekt zu Von Morgen Consulting passen."
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold py-2 px-3 text-xs text-white placeholder-zinc-700 outline-none transition resize-none"
                        />
                      </div>

                      {/* Consent checkbox */}
                      <div className="flex items-start space-x-3 pt-1">
                        <input type="checkbox" id="terms-career" required className="mt-1 accent-gold" />
                        <label htmlFor="terms-career" className="text-[9px] text-zinc-500 leading-relaxed">
                          Ich bin damit einverstanden, dass meine Bewerbungsdaten gemäß den Datenschutzbestimmungen von Von Morgen Consulting zum Zweck der Kontaktaufnahme und des Bewerbungsprozesses verarbeitet und gespeichert werden. *
                        </label>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-4 flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-full sm:w-1/3 py-2.5 bg-transparent hover:bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-xs transition cursor-pointer"
                        >
                          Zurück
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full sm:w-2/3 py-2.5 bg-gold text-black hover:bg-gold-light font-bold uppercase tracking-widest text-xs transition flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Übermittlung läuft...</span>
                            </>
                          ) : (
                            <>
                              <span>Bewerbung absenden</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="w-16 h-16 bg-gold/10 border border-gold rounded-full flex items-center justify-center mx-auto text-gold animate-bounce">
                    <ThumbsUp className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-serif text-2xl text-white">Bewerbung eingegangen!</h4>
                    <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto">
                      Vielen Dank, <strong>{name}</strong>! Ihre Bewerbung als <strong>{currentJob.title}</strong> wurde erfolgreich erfasst. Unser HR-Team prüft Ihre Angaben und wird sich innerhalb der nächsten 24 bis 48 Stunden telefonisch oder per E-Mail bei Ihnen melden.
                    </p>
                  </div>

                  {/* Summary of what they entered */}
                  <div className="max-w-xs mx-auto border border-zinc-900 bg-zinc-950 p-4 space-y-2 text-left text-xs">
                    <div className="flex justify-between border-b border-zinc-900 pb-1.5 text-zinc-500">
                      <span>Bewerber:</span>
                      <span className="text-white font-bold">{name}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-900 pb-1.5 text-zinc-500">
                      <span>Position:</span>
                      <span className="text-gold font-bold uppercase">{selectedJob}</span>
                    </div>
                    <div className="flex justify-between text-zinc-500">
                      <span>Prüf-Status:</span>
                      <span className="text-teal-400 font-bold flex items-center">
                        <Sparkles className="w-3.5 h-3.5 mr-1 text-gold animate-pulse" />
                        Priorisierte Sichtung
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2.5 bg-gold text-black uppercase tracking-widest text-xs font-bold transition hover:bg-gold-light pointer-events-auto cursor-pointer flex items-center justify-center space-x-2 mx-auto"
                      id="careers-success-back-btn"
                    >
                      <span>← Zurück zur Startseite</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
