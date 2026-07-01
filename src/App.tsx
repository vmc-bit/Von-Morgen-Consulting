import React, { useState, useEffect } from 'react';
import { 
  Database, UserCheck, Calendar, Activity, CheckCircle2, Award, 
  MapPin, HelpCircle, Phone, Mail, ArrowUp, Sparkles, Sun, Flame, Scale
} from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import IndependentBrokerSection from './components/IndependentBrokerSection';
import AboutUs from './components/AboutUs';
import ProductSections from './components/ProductSections';
import ProfitabilityCalculator from './components/ProfitabilityCalculator';
import InteractiveConfigurator from './components/InteractiveConfigurator';
import RegionalSeoSection from './components/RegionalSeoSection';
import FaqSection from './components/FaqSection';
import PartnerApplicationModal from './components/PartnerApplicationModal';
import CareersModal from './components/CareersModal';
import PartnersSection from './components/PartnersSection';
import InteractiveConcierge from './components/InteractiveConcierge';
import Logo from './components/Logo';
import LegalSectionModal from './components/LegalSectionModal';
import AppointmentBookingModal from './components/AppointmentBookingModal';
import { Lead, ProductType, CalculatorInputs } from './types';

// Mock Seed Data (including Strom & Gas and Immobilien)
const MOCK_LEADS: Lead[] = [
  {
    id: 'lead_seed_1',
    product: 'beratung_komplett',
    houseType: 'einfamilienhaus',
    ownership: 'eigentuemer',
    heatingType: 'oel',
    annualElectricity: 6450,
    roofSize: 85,
    batteryStorage: true,
    currentSituation: 'Exklusives Einfamilienhaus in München-Bogenhausen mit alter Ölheizung (Heizölbedarf hoch). Wir wollen komplett autark werden.',
    targetSituation: 'Photovoltaikanlage gekoppelt mit Hochtemperatur-Wärmepumpe und Sig Energy Batteriespeicher.',
    subsidiesInterest: true,
    name: 'Maximilian Schäfer',
    email: 'm.schaefer@von-morgen.de',
    phone: '0172 8844910',
    zipCode: '81675',
    budget: 35000,
    status: 'neu',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hrs ago
    notes: 'Kunde wünscht Premiummarken (Viessmann und Sig Energy). Telefonisch ab 16 Uhr erreichbar.'
  },
  {
    id: 'lead_seed_2',
    product: 'strom_gas',
    houseType: 'gewerbe',
    ownership: 'eigentuemer',
    heatingType: 'gas',
    annualElectricity: 45000,
    roofSize: 0,
    batteryStorage: false,
    energyCurrentCost: 14200,
    energySwitchSubsidies: true,
    currentSituation: 'Mittelständisches Bürogebäude in München mit extrem hohen Strom- und Gastarifen beim lokalen Grundversorger.',
    targetSituation: 'Wechsel zu Großhandelskauf-Konditionen über das Partnernetzwerk von Von Morgen Consulting.',
    subsidiesInterest: false,
    name: 'Sabine Weber (Weber Consulting)',
    email: 's.weber@weber-consulting.de',
    phone: '089 4545892',
    zipCode: '80331',
    budget: 0,
    status: 'kontaktiert',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(), // 18 hrs ago
    notes: 'Erstes Angebot zur Tarifoptimierung verschickt. Einsparpotential liegt bei ca. 4.200 € pro Jahr.'
  },
  {
    id: 'lead_seed_3',
    product: 'immobilien',
    houseType: 'mehrfamilienhaus',
    ownership: 'eigentuemer',
    heatingType: 'gas',
    annualElectricity: 12000,
    roofSize: 180,
    batteryStorage: false,
    propertyAction: 'verkaufen',
    propertyAreaSqm: 450,
    propertyEstimatedValue: 1850000,
    currentSituation: 'Mehrfamilienhaus in München-Solln soll energetisch am Markt positioniert und bestmöglich verkauft werden.',
    targetSituation: 'Vermittlung über das bundesweite Investorennetzwerk inklusive vorheriger Sanierungsberatung.',
    subsidiesInterest: true,
    name: 'Dr. Thomas Keller',
    email: 'keller.solln@web.de',
    phone: '0151 4569123',
    zipCode: '81479',
    budget: 0,
    status: 'berechnung_erstellt',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    notes: 'Objektwertanalyse wurde per Express-Kurier zugestellt. Sanierungskonzept für Heizungsoptimierung liegt vor.'
  }
];

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('photovoltaik');
  
  // Bridge parameters from calculator into form
  const [calculatorImport, setCalculatorImport] = useState<{
    results: any;
    inputs: CalculatorInputs;
  } | null>(null);

  // Layout view controls
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showCareersModal, setShowCareersModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'impressum' | 'datenschutz' | 'agb'>('impressum');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentDefaultService, setAppointmentDefaultService] = useState<ProductType>('beratung_komplett');
  const [newLeadNotification, setNewLeadNotification] = useState<string | null>(null);

  // Newsletter Signup State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      setNewsletterStatus('error');
      setNewsletterError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setNewsletterStatus('error');
      setNewsletterError('Bitte geben Sie eine korrekte E-Mail-Adresse an.');
      return;
    }

    setNewsletterStatus('loading');

    setTimeout(() => {
      try {
        const stored = localStorage.getItem('von_morgen_newsletter_leads');
        const list = stored ? JSON.parse(stored) : [];
        
        // Prevent duplicate signup in localStorage
        if (list.some((item: any) => item.email.toLowerCase() === newsletterEmail.toLowerCase())) {
          setNewsletterStatus('success');
          setNewsletterEmail('');
          return;
        }

        const newLead = {
          id: 'news_' + Math.random().toString(36).substr(2, 9),
          email: newsletterEmail.trim(),
          createdAt: new Date().toISOString(),
          status: 'subscribed',
          tags: ['newsletter', 'energy_tips']
        };

        list.push(newLead);
        localStorage.setItem('von_morgen_newsletter_leads', JSON.stringify(list));
        
        setNewsletterStatus('success');
        setNewsletterEmail('');
      } catch (err) {
        setNewsletterStatus('error');
        setNewsletterError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
      }
    }, 800);
  };

  const openLegalModal = (tab: 'impressum' | 'datenschutz' | 'agb') => {
    setLegalModalTab(tab);
    setShowLegalModal(true);
  };

  const openBookAppointment = (service?: ProductType) => {
    if (service) {
      setAppointmentDefaultService(service);
    } else {
      setAppointmentDefaultService('beratung_komplett');
    }
    setShowAppointmentModal(true);
  };

  // Load inquiries on mount
  useEffect(() => {
    const raw = localStorage.getItem('von_morgen_leads');
    if (raw) {
      try {
        setLeads(JSON.parse(raw));
      } catch (e) {
        setLeads(MOCK_LEADS);
        localStorage.setItem('von_morgen_leads', JSON.stringify(MOCK_LEADS));
      }
    } else {
      setLeads(MOCK_LEADS);
      localStorage.setItem('von_morgen_leads', JSON.stringify(MOCK_LEADS));
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    const reloadLeads = () => {
      const updatedRaw = localStorage.getItem('von_morgen_leads');
      if (updatedRaw) {
        try {
          setLeads(JSON.parse(updatedRaw));
        } catch (err) {
          // ignore
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('von_morgen_lead_submitted', reloadLeads);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('von_morgen_lead_submitted', reloadLeads);
    };
  }, []);

  // Update localStorage helper
  const syncLeads = (updatedList: Lead[]) => {
    setLeads(updatedList);
    localStorage.setItem('von_morgen_leads', JSON.stringify(updatedList));
  };

  // Lead CRUD handlers for the advisor board demo
  const handleLeadSubmitted = (newLead: Lead) => {
    const nextLeads = [newLead, ...leads];
    syncLeads(nextLeads);
    
    // Show quick toast notification pointing to Berater dashboard
    setNewLeadNotification(newLead.name);
    setTimeout(() => setNewLeadNotification(null), 10000);
  };

  const handleUpdateStatus = (id: string, nextStatus: Lead['status'], notes?: string) => {
    const nextLeads = leads.map(l => {
      if (l.id === id) {
        return { ...l, status: nextStatus, notes: notes ?? l.notes };
      }
      return l;
    });
    syncLeads(nextLeads);
  };

  const handleDeleteLead = (id: string) => {
    const nextLeads = leads.filter(l => l.id !== id);
    syncLeads(nextLeads);
  };

  const handleSeedMockData = () => {
    const merged = [...MOCK_LEADS, ...leads.filter(l => !l.id.startsWith('lead_seed_'))];
    syncLeads(merged);
  };

  const handleClearAllLeads = () => {
    syncLeads([]);
  };

  // Bridge calculator outputs to inquiry steps
  const handleApplySavingsToLead = (results: any, inputs: CalculatorInputs) => {
    setCalculatorImport({ results, inputs });
    
    // Smoothly focus/navigate to query configurator card
    const target = document.getElementById('konfigurator');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromHero = (service: ProductType) => {
    setSelectedProduct(service);
    
    // Scroll to configurator card
    const target = document.getElementById('konfigurator');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white relative selection:bg-gold selection:text-black" id="main-landing">
      
      {/* Sticky beautiful header */}
      <Navbar 
        onStartConfigurator={() => {
          setSelectedProduct('beratung_komplett');
          const t = document.getElementById('konfigurator');
          if (t) t.scrollIntoView({ behavior: 'smooth' });
        }} 
        onPartnerBecome={() => setShowPartnerModal(true)}
        onBookAppointment={() => openBookAppointment()}
      />

      {/* Hero core stage */}
      <HeroSection 
        onSelectService={handleSelectServiceFromHero}
        onOpenCalculator={() => {
          document.getElementById('rechner')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onBookAppointment={() => openBookAppointment()}
      />

      {/* Unabhängiger Makler / Broker USP info split */}
      <IndependentBrokerSection />

      {/* Über Uns & Unsere Geschichte + 4 Leitwerte aus Teambild */}
      <AboutUs 
        onStartConfigurator={() => {
          setSelectedProduct('beratung_komplett');
          const t = document.getElementById('konfigurator');
          if (t) t.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Fachpartner und Premium-Marken von A-Z */}
      <PartnersSection onOpenPartner={() => setShowPartnerModal(true)} />

      {/* Deep dives: PV, WP, Strom, and Real Estate technical values */}
      <ProductSections 
        onSelectService={(service) => {
          setSelectedProduct(service);
          document.getElementById('konfigurator')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Dynamic Savings simulator sliders */}
      <ProfitabilityCalculator 
        initialProduct={selectedProduct}
        onApplySavingsToLead={handleApplySavingsToLead}
      />

      {/* Interactive Multi-step consultation capture form */}
      <InteractiveConfigurator 
        preselectedProduct={selectedProduct}
        importedCalculations={calculatorImport}
        onLeadSubmitted={handleLeadSubmitted}
      />

      {/* Regional SEO Bundersländer Network section */}
      <RegionalSeoSection 
        onStartConfigurator={() => {
          setSelectedProduct('beratung_komplett');
          const t = document.getElementById('konfigurator');
          if (t) t.scrollIntoView({ behavior: 'smooth' });
        }} 
      />

      {/* Akkordeon FAQs */}
      <FaqSection />

      {/* Partner Application Modal B2B */}
      {showPartnerModal && (
        <PartnerApplicationModal onClose={() => setShowPartnerModal(false)} />
      )}

      {/* Careers Modal (Telefonist, Außendienst, Franchise) */}
      {showCareersModal && (
        <CareersModal onClose={() => setShowCareersModal(false)} />
      )}

      {/* Legal documents (Impressum, Datenschutz, AGB) */}
      <LegalSectionModal 
        isOpen={showLegalModal} 
        onClose={() => setShowLegalModal(false)} 
        initialTab={legalModalTab} 
      />

      {/* Appointment calendar booking modal */}
      <AppointmentBookingModal 
        isOpen={showAppointmentModal} 
        onClose={() => setShowAppointmentModal(false)}
        defaultService={appointmentDefaultService}
      />

      {/* Toast Notification for Lead Submissions */}
      {newLeadNotification && (
        <div className="fixed bottom-24 right-6 z-[60] p-4 bg-zinc-950 border border-gold rounded-lg shadow-2xl flex items-center space-x-4 max-w-sm animate-bounce text-white">
          <Logo variant="emblem" iconSize="w-8 h-8" />
          <div className="flex-grow">
            <p className="text-xs font-bold font-serif tracking-tight text-white">Anfrage erhalten!</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">{newLeadNotification}</p>
          </div>
        </div>
      )}

      {/* Interactive Concierge Floating Assistant */}
      <InteractiveConcierge 
        onOpenCareers={() => setShowCareersModal(true)}
        onOpenPartner={() => setShowPartnerModal(true)}
        onStartConfigurator={handleSelectServiceFromHero}
      />

      {/* Back to top utility */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 bg-black/90 hover:bg-gold text-white hover:text-black p-3 border border-zinc-800 hover:border-gold flex items-center justify-center shadow-lg transition cursor-pointer"
          aria-label="Nach oben scrollen"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Global Brand Footer */}
      <footer className="bg-black text-zinc-400 py-20 px-4 border-t border-zinc-900 relative z-10">
        {/* Newsletter Signup Banner inside Footer */}
        <div className="max-w-[1300px] mx-auto pb-12 mb-12 border-b border-zinc-900/80 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-2">
            <span className="text-[10px] font-mono tracking-[0.2em] text-gold uppercase font-bold block animate-pulse">Von Morgen News</span>
            <h3 className="font-serif text-lg sm:text-xl text-white font-medium">Energie-Tipps &amp; Fördermittel-Updates erhalten</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Erhalten Sie regelmäßig praxisnahe Tipps zur Senkung Ihrer Energiekosten, exklusive Einblicke in aktuelle KfW-Förderungen und Markt-Updates direkt von unseren Experten.
            </p>
          </div>
          <div className="w-full lg:max-w-md">
            <form onSubmit={handleNewsletterSubmit} className="space-y-2" id="newsletter-form">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Ihre E-Mail-Adresse"
                  disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                  className="flex-grow bg-zinc-950 border border-zinc-850 focus:border-gold py-2.5 px-3.5 text-xs text-white rounded-none outline-none transition font-mono placeholder-zinc-800 disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-light text-black text-xs font-bold uppercase tracking-wider transition cursor-pointer flex-shrink-0 disabled:opacity-50 flex items-center justify-center space-x-1.5 font-bold"
                >
                  {newsletterStatus === 'loading' ? (
                    <span>Lädt...</span>
                  ) : (
                    <>
                      <span>Anmelden</span>
                      <Mail className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
              
              {newsletterStatus === 'success' && (
                <div className="text-[11px] text-emerald-400 font-mono flex items-center space-x-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>✓ Danke! Sie wurden erfolgreich eingetragen. Ihr erster Energie-Tipp ist auf dem Weg.</span>
                </div>
              )}

              {newsletterStatus === 'error' && (
                <div className="text-[11px] text-red-400 font-mono flex items-center space-x-1.5 mt-1.5">
                  <span>⚠️ {newsletterError}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <Logo variant="footer-full" iconSize="w-12 h-12" />
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ihr herstellerunabhängiger Premium-Partner. Von unserem Hauptsitz in München aus steuern wir ein bundesweites Partnernetzwerk, um Qualität, Menschen und Märkte zusammenzubringen.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-xs uppercase tracking-[0.2em] text-white mb-5 font-bold">Die vier Sektoren</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#photovoltaik" className="hover:text-gold transition">Photovoltaikanlagen mit Speicher</a></li>
              <li><a href="#waermepumpe" className="hover:text-gold transition">Heizungswechsel & Wärmepumpen</a></li>
              <li><a href="#strom-gas" className="hover:text-gold transition">Strom- & Gastarifoptimierung</a></li>
              <li><a href="#immobilien" className="hover:text-gold transition">Immobilien von Morgen</a></li>
              <li className="pt-2 border-t border-zinc-900">
                <button 
                  onClick={() => setShowPartnerModal(true)} 
                  className="hover:text-white text-gold font-mono text-[10px] uppercase font-bold tracking-wider text-left transition cursor-pointer"
                >
                  🤝 Lead-Partner werden (SHK/PV/Markler)
                </button>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => setShowCareersModal(true)} 
                  className="hover:text-white text-gold font-mono text-[10px] uppercase font-bold tracking-wider text-left transition cursor-pointer"
                >
                  💼 Karriere &amp; Offene Stellen (m/w/d)
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xs uppercase tracking-[0.2em] text-white mb-5 font-bold">Hersteller-Matrix</h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li><span className="text-zinc-500 font-mono text-[10px] block">PREMIUM-MARKEN:</span> Viessmann, Buderus, Bosch, Vaillant</li>
              <li><span className="text-zinc-500 font-mono text-[10px] block">SMART INFRASTRUCTURE:</span> Sigenergy, Aiko Solar ABC, SMA, BYD</li>
              <li><span className="text-zinc-500 font-mono text-[10px] block">TECHNIK- &amp; HANDWERK:</span> Energieoptimierung Deutschland, Teleson, Sol Living, 800 Solar</li>
              <li><span className="text-zinc-500 font-mono text-[10px] block">IMMOBILIEN- &amp; MAKLERNETZWERK:</span> Haushirsch, Live Now Immobilien, Maklerplan, Fleischer Winkler</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xs uppercase tracking-[0.2em] text-white mb-5 font-bold">Standort &amp; Kontakt</h4>
            <ul className="space-y-3 text-xs text-zinc-400">
              <li className="flex items-center"><Phone className="w-3.5 h-3.5 mr-2.5 text-gold" /> Festnetz: +49 821 20950331</li>
              <li className="flex items-center"><Phone className="w-3.5 h-3.5 mr-2.5 text-gold" /> Mobil 1: +49 176 / 40549090</li>
              <li className="flex items-center"><Phone className="w-3.5 h-3.5 mr-2.5 text-gold" /> Mobil 2: +49 176 / 24265901</li>
              <li className="flex items-center"><Mail className="w-3.5 h-3.5 mr-2.5 text-gold" /> {`info@von-morgen-consulting.de`}</li>
              <li className="pt-2">
                <strong className="text-white block font-serif tracking-wider uppercase text-[10px] mb-1">Von Morgen Consulting</strong> 
                Blumenauerstrasse 8, 80689 München
                <span className="block text-zinc-500 font-mono text-[10px] mt-1">Ansprechpartner: Elvin Kaguri</span>
              </li>
              <li className="pt-3 flex flex-wrap gap-4 text-[10px] text-zinc-500 font-mono uppercase tracking-wider text-left">
                <span onClick={() => setShowCareersModal(true)} className="text-gold hover:text-white font-bold cursor-pointer transition">Karriere / Jobs</span>
                <button type="button" onClick={() => openLegalModal('impressum')} className="hover:text-gold cursor-pointer transition focus:outline-none">Impressum</button>
                <button type="button" onClick={() => openLegalModal('datenschutz')} className="hover:text-gold cursor-pointer transition focus:outline-none">Datenschutz</button>
                <button type="button" onClick={() => openLegalModal('agb')} className="hover:text-gold cursor-pointer transition focus:outline-none">AGB</button>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-[1300px] mx-auto mt-16 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-500">
          <p>&copy; {currentYear} Von Morgen Consulting — Unabhängige Beratung & Vermittlung. Alle Rechte vorbehalten. &quot;V-Check 24&quot; ist eine eingetragene Marke von Von Morgen Consulting.</p>
        </div>
      </footer>

    </div>
  );
}
