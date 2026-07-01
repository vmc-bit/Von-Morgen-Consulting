import React, { useState } from 'react';
import { 
  Database, UserCheck, RefreshCw, Layers, Check, Calendar, 
  MapPin, Phone, Mail, FileText, Trash2, PlusCircle, AlertCircle, Sparkles, TrendingUp,
  CircleDollarSign, Building, Compass, X
} from 'lucide-react';
import { Lead } from '../types';
import { calculateLeadSavings } from '../utils/calculator';
import Logo from './Logo';

interface AdvisorDashboardProps {
  leads: Lead[];
  onUpdateStatus: (id: string, nextStatus: Lead['status'], notes?: string) => void;
  onDeleteLead: (id: string) => void;
  onSeedMockData: () => void;
  onClearAllLeads: () => void;
  onClose: () => void;
}

export default function AdvisorDashboard({
  leads,
  onUpdateStatus,
  onDeleteLead,
  onSeedMockData,
  onClearAllLeads,
  onClose
}: AdvisorDashboardProps) {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(leads[0]?.id || null);
  const [internalNotes, setInternalNotes] = useState('');
  const [statusInput, setStatusInput] = useState<Lead['status']>('neu');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('vmc_authenticated') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const activeLead = leads.find(l => l.id === selectedLeadId) || leads[0];

  React.useEffect(() => {
    if (activeLead) {
      setInternalNotes(activeLead.notes || '');
      setStatusInput(activeLead.status);
    }
  }, [activeLead?.id]);

  const handleUpdate = () => {
    if (activeLead) {
      onUpdateStatus(activeLead.id, statusInput, internalNotes);
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 3500);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validPasswords = ['vcheck24', 'vmc2026', 'partner2026', 'muenchen2026', 'münchen2026'];
    if (validPasswords.includes(passwordInput.trim().toLowerCase())) {
      setIsAuthenticated(true);
      sessionStorage.setItem('vmc_authenticated', 'true');
      setErrorMsg('');
    } else {
      setErrorMsg('Ungültiges Passwort. Bitte überprüfen Sie Ihre Eingabe.');
    }
  };

  // Safe KPI computations
  const totalInquiries = leads.length;
  const projectVolumeEur = leads.reduce((acc, lead) => {
    // Check if it's property or energy
    if (lead.product === 'immobilien') {
      return acc + (lead.propertyEstimatedValue || 0);
    }
    const calc = lead.calculatedSavings || calculateLeadSavings(lead);
    return acc + (calc?.investmentCostEur || 0);
  }, 0);

  const co2OffsetTons = leads.reduce((acc, lead) => {
    const calc = lead.calculatedSavings || calculateLeadSavings(lead);
    return acc + (calc?.co2ReducedTons || 0);
  }, 0);

  // Unabhängige Systemempfehlung logic for all sectors
  const getIndependentRecommendation = (lead: Lead) => {
    const isPv = lead.product === 'photovoltaik' || lead.product === 'beratung_komplett';
    const isWp = lead.product === 'waermepumpe' || lead.product === 'beratung_komplett';
    const isTarif = lead.product === 'strom_gas';
    const isImmo = lead.product === 'immobilien';

    let title = '';
    let description = '';

    if (lead.ownership === 'mieter' && !isTarif) {
      return {
        hardware: 'In Klärung (Mietverhältnis vorhanden)',
        detail: 'Zuerst schriftliche Bauherren-Genehmigung des Eigentümers für Sanierungen einholen. Bei Strom & Gas ist ein Direktwechsel sofort möglich.'
      };
    }

    if (isTarif) {
      const savingsEst = Math.round((lead.energyCurrentCost || 1800) * 0.22);
      title = `B2B Großhandels-Einkaufstarif (Wechsel zu Von Morgen Sonderkontingenten)`;
      description = `Durch die Bündelung im Partnernetzwerk vermitteln wir Sonderkonditionen mit garantierten Einsparungen von ca. ${savingsEst.toLocaleString('de-DE')} €/Jahr. ${lead.energySwitchSubsidies ? '100% zertifizierter deutscher Ökostrom.' : 'Fokus auf maximale Kostenbegrenzung.'}`;
    } else if (isImmo) {
      const actionLabel = lead.propertyAction === 'verkaufen' ? 'Bestwert-Vermarktung' : 'Wertanalyse & Sanierungsplan';
      const taxExempt = lead.propertyEstimatedValue && lead.propertyEstimatedValue > 500000 ? 'Inklusive rechtlich-steuerrechtlicher Prüfung über Partnerkanzleien.' : '';
      title = `${actionLabel} für Objekt Soll-Fläche (${lead.propertyAreaSqm || 120} m²)`;
      description = `Gezielte Platzierung über das bundesweite Partnernetzwerk von Von Morgen Consulting. Schätzung des Verkehrswertes: ca. ${(lead.propertyEstimatedValue || 450000).toLocaleString('de-DE')} €. ${taxExempt}`;
    } else {
      // Solar, WP, or Combined
      if (lead.budget >= 18000) {
        // Premium Class
        const pvSegment = isPv ? 'Sig Energy Sektorenkupplung mit Meyer Burger (EU) Glas-Glas Premiummodulen und hocheffizientem Storage Gateway' : '';
        const wpSegment = isWp ? 'Viessmann Vitocal 250-A Luft-Wasser-Wärmepumpe (Modernstes R290 Propan, flüsterleise)' : '';
        title = `Premium-Systemlösung: ${[pvSegment, wpSegment].filter(Boolean).join(' + ')}`;
        description = 'Konfiguration der obersten Güteklasse im V-Check. Ausgezeichnete Langlebigkeit, höchste Autarkiegrade & Premium-Kundenservice garantiert.';
      } else if (lead.budget >= 10000 && lead.budget < 18000) {
        // Mid Class / Smart Autarky
        const pvSegment = isPv ? 'SMA Tripower Smart Hybridwechsellrichter + Jinko Solar Tiger Neo Module' : '';
        const wpSegment = isWp ? 'Bosch Compress 5800i High-Design-Wärmepumpe' : '';
        title = `Smart-Autarkie Portfolio: ${[pvSegment, wpSegment].filter(Boolean).join(' + ')}`;
        description = 'Perfekte Balance für ein mittleres Investitionsbudget. Deutsche Wechselrichter-Technologie von SMA kombiniert mit weltmarktführenden Jinko Solar Zellen.';
      } else {
        // Inexpensive Asian high efficiency cost savers
        const pvSegment = isPv ? 'Huawei SUN2000 Hybrid-System + Longi Solar Explorer Module' : '';
        const wpSegment = isWp ? 'Buderus Logatherm WLW186 Wärmeerzeuger' : '';
        title = `Effizienz-Kostengewinner: ${[pvSegment, wpSegment].filter(Boolean).join(' + ')}`;
        description = 'Optimiert auf minimale Amortisationsdauer. Unschlagbare asiatische Skalierungsvorteile gepaart mit langlebiger Buderus Hydraulik.';
      }
    }

    return {
      hardware: title,
      detail: description
    };
  };

  const handleQuickEmail = (lead: Lead) => {
    const subjectMap: Record<string, string> = {
      photovoltaik: 'Ihre Photovoltaik-Anfrage bei Von Morgen Consulting',
      waermepumpe: 'Ihre Wärmepumpen-Anfrage bei Von Morgen Consulting',
      strom_gas: 'Ihre Tarifoptimierung (Strom & Gas) bei Von Morgen Consulting',
      immobilien: 'Ihre Immobilien-Analyse bei Von Morgen Consulting',
      beratung_komplett: 'Ihre ganzheitliche Sektorenberatung bei Von Morgen Consulting'
    };

    const getGreeting = (name: string) => {
      if (name.includes('Dr.') || name.includes('Prof.')) {
        return `Sehr geehrte(r) ${name}`;
      }
      return `Hallo ${name}`;
    };

    const getDetailsText = (l: Lead) => {
      const details: string[] = [];
      if (l.product === 'photovoltaik') {
        details.push(`- Ungefähre Dachfläche: ${l.roofSize} m²`);
        details.push(`- Heimspeicher gewünscht: ${l.batteryStorage ? 'Ja, integrierter Heimspeicher' : 'Nein, reines Einspeisesystem'}`);
        if (l.budget > 0) details.push(`- Geplanter Budgetrahmen: ca. ${l.budget.toLocaleString('de-DE')} €`);
      } else if (l.product === 'waermepumpe') {
        if (l.heatingType) details.push(`- Aktuelle Heizungsart: ${l.heatingType.toUpperCase()}-Heizung`);
        if (l.budget > 0) details.push(`- Geplanter Budgetrahmen: ca. ${l.budget.toLocaleString('de-DE')} €`);
      } else if (l.product === 'strom_gas') {
        if (l.energyCurrentCost) details.push(`- Aktuelle Energiekosten: ca. ${l.energyCurrentCost.toLocaleString('de-DE')} €/Jahr`);
        details.push(`- Ökostrom-Präferenz: ${l.energySwitchSubsidies ? 'Ja, 100% zertifizierter Ökostrom' : 'Rein preisoptimiert'}`);
      } else if (l.product === 'immobilien') {
        if (l.propertyAreaSqm) details.push(`- Wohn-/Grundstücksfläche: ca. ${l.propertyAreaSqm} m²`);
        if (l.propertyEstimatedValue) details.push(`- Ungefährer Marktwert: ca. ${l.propertyEstimatedValue.toLocaleString('de-DE')} €`);
        if (l.propertyAction) details.push(`- Gewünschte Aktion: ${l.propertyAction.toUpperCase()}`);
      } else if (l.product === 'beratung_komplett') {
        details.push(`- Kombinierte Sektorenberatung (Sektorenkupplung: PV + Wärmepumpe)`);
        details.push(`- Dachfläche: ${l.roofSize} m²`);
        if (l.heatingType) details.push(`- Aktuelle Heizungsart: ${l.heatingType.toUpperCase()}`);
        if (l.budget > 0) details.push(`- Geplanter Gesamt-Budgetrahmen: ca. ${l.budget.toLocaleString('de-DE')} €`);
      }
      return details.join('\n');
    };

    const introMap: Record<string, string> = {
      photovoltaik: `vielen Dank für Ihre Anfrage bezüglich einer Photovoltaik-Anlage. Wir haben Ihren V-Check analysiert und basierend auf Ihrer Dachfläche von ca. ${lead.roofSize} m² ein hocheffizientes System für Sie zusammengestellt.`,
      waermepumpe: `vielen Dank für Ihre Anfrage bezüglich einer modernen Wärmepumpen-Heizung. Wir haben Ihren Heizungsbedarf geprüft und eine zukunftssichere Heizlösung vorbereitet, um Ihre alte ${lead.heatingType || 'Gas/Öl'}-Therme abzulösen.`,
      strom_gas: 'vielen Dank für Ihre Anfrage zur Tarifoptimierung. Wir haben Ihre aktuellen Strom- und Gaskosten analysiert und ein attraktives Großhandels-Einkaufskontingent für Sie reserviert, das erhebliche Ersparnisse ermöglicht.',
      immobilien: `vielen Dank für Ihre Anfrage bezüglich Ihrer Immobilie. Wir haben Ihre Angaben geprüft und eine erste energetische Wertanalyse für Ihre Region ausgearbeitet.`,
      beratung_komplett: 'vielen Dank für Ihre ganzheitliche Anfrage bezüglich einer PV- und Wärmepumpen-Kombination. Als unabhängiger Berater haben wir für Sie eine optimal abgestimmte Sektorenkupplung entworfen, um maximale energetische Autarkie zu erzielen.'
    };

    const subject = subjectMap[lead.product] || 'Ihre Anfrage bei Von Morgen Consulting';
    const intro = introMap[lead.product] || 'vielen Dank für Ihre Anfrage bei Von Morgen Consulting.';
    const detailsBlock = getDetailsText(lead);

    const body = `${getGreeting(lead.name)},

${intro}

Hier sind die uns vorliegenden Eckdaten Ihrer Anfrage:
${detailsBlock}

Um die nächsten Schritte, Ihre staatlichen Fördermöglichkeiten und die genauen Details Ihrer unabhängigen Systemempfehlung unverbindlich zu besprechen, laden wir Sie herzlich zu einem kurzen Abstimmungsgespräch ein.

Bitte wählen Sie hier ganz bequem Ihren Wunschtermin aus:
https://calendly.com/vmcmeet/partnerwerden

Alternativ können Sie natürlich auch auf diese E-Mail antworten oder uns unter info@von-morgen-consulting.de kontaktieren.

Mit freundlichen Grüßen,
Ihr Team von Von Morgen Consulting
---
Von Morgen Consulting GmbH
info@von-morgen-consulting.de
https://von-morgen-consulting.de`;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const cc = 'info@von-morgen-consulting.de';

    const mailtoUrl = `mailto:${lead.email}?cc=${cc}&subject=${encodedSubject}&body=${encodedBody}`;
    window.open(mailtoUrl, '_blank');
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-black border-t border-zinc-900 p-6 sm:p-8 text-white relative z-20 animate-fade-in" id="advisor-portal">
        <div className="max-w-md mx-auto my-12 border border-zinc-900 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
          {/* Accent decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-1">
              <Logo variant="emblem" iconSize="w-12 h-12" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase font-bold">Geschützter Partnerbereich</span>
            <h3 className="text-xl font-serif text-white font-semibold">Backoffice Login</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dieses Portal enthält sensible personenbezogene Anfragedaten (DSGVO-konforme Sektorenberatung). Der Zugriff ist autorisierten Beratern und Fachpartnern vorbehalten.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="backoffice-password" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1.5 font-bold">
                Berater-Passwort eingeben
              </label>
              <input
                id="backoffice-password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-black border border-zinc-800 focus:border-gold py-2.5 px-3.5 text-xs text-white rounded-none outline-none transition font-mono placeholder-zinc-800"
                placeholder="••••••••"
                autoFocus
              />
              {errorMsg && (
                <div className="flex items-center space-x-1.5 mt-2 text-red-400 font-mono text-[9px]">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 animate-pulse" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            <div className="pt-1 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-2.5 border border-zinc-800 hover:bg-zinc-900 text-zinc-400 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 bg-gold hover:bg-gold-light text-black text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center space-x-2 font-bold"
              >
                <span>Einloggen</span>
                <UserCheck className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="text-center border-t border-zinc-900/60 pt-4">
            <span className="text-[8px] font-mono text-zinc-600 block">
              Sicherheitsrichtlinie: Datenübertragung ist TLS/SSL-verschlüsselt.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border-t border-zinc-900 p-6 sm:p-8 space-y-6 text-white relative z-20" id="advisor-portal">
      
      {/* Save success toast alert inside portal */}
      {saveSuccessMsg && (
        <div className="fixed top-24 right-6 z-50 p-4 bg-zinc-900 border border-gold text-gold font-mono text-xs uppercase tracking-wider shadow-2xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-gold" />
            <span>Kunden-Status diskret gespeichert</span>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-900 pb-6 gap-4">
        <div className="flex items-center space-x-4">
          <Logo variant="emblem" iconSize="w-11 h-11" />
          <div>
            <h3 className="text-lg font-serif font-normal text-white uppercase tracking-wider font-semibold">Von Morgen Consulting • Partner- & Beraterportal</h3>
            <p className="text-xs text-zinc-400">Interaktive Demo-Verwaltung für den tagesaktuellen V-Check, unabhängige Systemzuweisung & Tarifwechsel.</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onSeedMockData}
            className="px-3.5 py-1.5 bg-gold hover:bg-gold-light text-black text-xs font-bold uppercase tracking-wider flex items-center transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 mr-1.5" />
            Kunden laden
          </button>
          {leads.length > 0 && (
            <button
              onClick={onClearAllLeads}
              className="px-3 py-1.5 border border-zinc-800 hover:bg-red-950 hover:border-red-900 text-xs font-semibold text-zinc-500 hover:text-white flex items-center transition cursor-pointer"
            >
              <Trash2 className="w-4 h-4 mr-1.5" />
              Reset
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-400 hover:text-white transition cursor-pointer"
          >
            Schließen
          </button>
        </div>
      </div>

      {/* Firm KPIs Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* KPI 1 */}
        <div className="p-4 bg-zinc-950 border border-zinc-900 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold font-mono">Bearbeitbare leads</span>
            <span className="block text-2xl font-serif text-gold mt-1">{totalInquiries} Anfragen</span>
          </div>
          <Layers className="w-8 h-8 text-gold/10" />
        </div>

        {/* KPI 2 */}
        <div className="p-4 bg-zinc-950 border border-zinc-900 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold font-mono">Gesamtes Projektvolumen</span>
            <span className="block text-2xl font-serif text-white mt-1">~{projectVolumeEur.toLocaleString('de-DE')} €</span>
          </div>
          <TrendingUp className="w-8 h-8 text-white/10" />
        </div>

        {/* KPI 3 */}
        <div className="p-4 bg-zinc-950 border border-zinc-900 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold font-mono">CO2 Reduktionspotenzial</span>
            <span className="block text-2xl font-serif text-emerald-400 mt-1">~{co2OffsetTons.toFixed(1)} t / Jahr</span>
          </div>
          <Sparkles className="w-8 h-8 text-emerald-400/10" />
        </div>
      </div>

      {/* Main workspace layout */}
      {leads.length === 0 ? (
        <div className="p-12 text-center bg-zinc-950 border border-zinc-900 text-zinc-400 space-y-4">
          <AlertCircle className="w-12 h-12 text-zinc-700 mx-auto" />
          <div>
            <p className="font-bold text-sm text-zinc-300">Bisher keine Anfragen im Speicher</p>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
              Füllen Sie das Online-Anfrageformular aus, um einen Kunden zu simulieren, oder klicken Sie einfach auf <strong>&quot;Kunden laden&quot;</strong>, um das Portal zu befüllen!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left panel: lead list */}
          <div className="lg:col-span-4 bg-zinc-950 border border-zinc-900 max-h-[480px] overflow-y-auto">
            <div className="p-3 border-b border-zinc-900 sticky top-0 bg-zinc-950 z-10 flex justify-between items-center">
              <span className="text-xs font-bold text-zinc-400">Posteingang (Neueste zuerst)</span>
              <span className="text-[10px] border border-zinc-800 px-2 py-0.5 text-zinc-500">{leads.length}</span>
            </div>

            <div className="divide-y divide-zinc-900/60">
              {leads.map((lead) => {
                const isSelected = activeLead?.id === lead.id;
                const isAppointment = lead.notes?.includes('⚠️ DIREKT-TERMIN') || lead.currentSituation?.includes('Terminkalender');
                const statusColors = {
                  neu: 'bg-gold text-black font-bold',
                  kontaktiert: 'border border-zinc-700 text-zinc-300',
                  berechnung_erstellt: 'bg-zinc-800 text-gold border border-gold/20',
                  bereit_fuer_installateur: 'bg-white text-black font-bold',
                  abgeschlossen: 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                };
                
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected ? 'bg-zinc-900 border-l-2 border-gold font-medium' : 'hover:bg-zinc-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-200 flex items-center gap-1.5">
                        {lead.name}
                        {isAppointment && (
                          <span className="text-[9px] bg-gold/10 text-gold border border-gold/20 px-1 rounded font-mono">📅</span>
                        )}
                      </span>
                      <span className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-none font-mono ${statusColors[lead.status] || 'bg-zinc-800'}`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-gold" /> {lead.zipCode}</span>
                        <span className="font-semibold uppercase tracking-wider text-[9px] text-zinc-400">
                          {lead.product === 'beratung_komplett' ? 'PV & WP' : lead.product === 'strom_gas' ? 'Strom & Gas' : lead.product === 'immobilien' ? 'Immobilie' : 'Photovoltaik'}
                        </span>
                      </div>
                      {isAppointment && (
                        <span className="text-[8px] text-gold font-mono uppercase bg-gold/15 px-1 py-0.2 rounded">DIREKT-TERMIN</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right panel: lead process detail workspace */}
          <div className="lg:col-span-8 bg-zinc-950/20 border border-zinc-900 p-6 space-y-6">
            {activeLead ? (
              <>
                {/* Visual client overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Lead Master details */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Dossier-Datenblatt</span>
                      <span className="text-[9px] text-zinc-500 flex items-center font-mono">
                        <Calendar className="w-3 h-3 mr-1" /> {new Date(activeLead.createdAt).toLocaleString('de-DE')}
                      </span>
                    </div>

                    <h4 className="font-serif font-normal text-xl text-white tracking-wide uppercase">{activeLead.name}</h4>

                    <div className="space-y-2.5 text-xs text-zinc-300">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-zinc-600" />
                        <span className="text-zinc-500 font-mono text-[10px]">EMAIL:</span>
                        <a href={`mailto:${activeLead.email}`} className="hover:underline text-gold">{activeLead.email}</a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-zinc-600" />
                        <span className="text-zinc-500 font-mono text-[10px]">TELEFON:</span>
                        <a href={`tel:${activeLead.phone}`} className="hover:underline text-gold">{activeLead.phone}</a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-zinc-600" />
                        <span className="text-zinc-500 font-mono text-[10px]">PLZ REGION:</span>
                        <span className="font-semibold">{activeLead.zipCode} (München/Umland)</span>
                      </div>
                      {activeLead.budget > 0 && (
                        <div className="flex items-center space-x-2">
                          <Layers className="w-4 h-4 text-zinc-600" />
                          <span className="text-zinc-500 font-mono text-[10px]">BUDGET:</span>
                          <span className="font-bold text-white">{activeLead.budget.toLocaleString('de-DE')} €</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <UserCheck className="w-4 h-4 text-zinc-600" />
                        <span className="text-zinc-500 font-mono text-[10px]">BESTITZSTAND:</span>
                        <span className="font-bold text-gold uppercase tracking-wider text-[10px]">
                          {activeLead.ownership === 'eigentuemer' ? 'Eigentümer' : 'Mieter'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleQuickEmail(activeLead)}
                      className="mt-4 w-full py-2.5 bg-gold/10 border border-gold/30 hover:bg-gold hover:text-black text-gold text-xs font-bold uppercase tracking-wider transition duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Quick Email Senden</span>
                    </button>
                  </div>

                  {/* Technical requirements parameters */}
                  <div className="bg-zinc-950 p-4 border border-zinc-900 space-y-4">
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider font-mono block">Anforderungsprofil</span>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] block">GEBÄUDEART</span>
                        <span className="font-bold text-zinc-200 capitalize">{activeLead.houseType}</span>
                      </div>

                      {activeLead.product === 'strom_gas' ? (
                        <>
                          <div>
                            <span className="text-zinc-500 font-mono text-[10px] block">STROMTARIF IST</span>
                            <span className="font-bold text-zinc-200">{(activeLead.energyCurrentCost || 1800).toLocaleString('de-DE')} €/Jahr</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-zinc-500 font-mono text-[10px] block">ÖKOTARIF FOCUS</span>
                            <span className="font-bold text-gold">{activeLead.energySwitchSubsidies ? 'Ja, 100% Ökostrom' : 'Rein Preisoptimiert'}</span>
                          </div>
                        </>
                      ) : activeLead.product === 'immobilien' ? (
                        <>
                          <div>
                            <span className="text-zinc-500 font-mono text-[10px] block">MARKTWERT EST</span>
                            <span className="font-bold text-zinc-200">{(activeLead.propertyEstimatedValue || 450000).toLocaleString('de-DE')} €</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 font-mono text-[10px] block">FLÄCHE</span>
                            <span className="font-bold text-zinc-200">{activeLead.propertyAreaSqm || 120} m²</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-zinc-500 font-mono text-[10px] block">GEPLANTE AKTION</span>
                            <span className="font-bold text-gold capitalize tracking-wider">{activeLead.propertyAction || 'Verkaufen'}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          {activeLead.heatingType && (
                            <div>
                              <span className="text-zinc-500 font-mono text-[10px] block">HIST. HEIZUNG</span>
                              <span className="font-bold text-zinc-200 capitalize">{activeLead.heatingType}-Therme</span>
                            </div>
                          )}
                          <div>
                            <span className="text-zinc-500 font-mono text-[10px] block">DACHFLÄCHE</span>
                            <span className="font-bold text-zinc-200">{activeLead.roofSize} m²</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-zinc-500 font-mono text-[10px] block">SPEICHERWUNSCH</span>
                            <span className="font-bold text-zinc-200">{activeLead.batteryStorage ? 'Integrierter Heimspeicher' : 'Ohne Heimspeicher'}</span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="pt-3 border-t border-zinc-900 space-y-1">
                      <span className="text-zinc-500 text-[9px] block font-bold uppercase font-mono">Dossier-Sollbeschreibung</span>
                      <p className="text-[11px] text-zinc-400 italic leading-relaxed">
                        &quot;{activeLead.currentSituation}&quot;
                      </p>
                    </div>
                  </div>

                </div>

                {/* Intelligent Independent Matchmaker Module */}
                <div className="p-5 bg-zinc-950 border border-zinc-900 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-[10px] uppercase font-bold text-gold tracking-widest font-mono">
                      Systempartner Matchmaking (Von Morgen Consulting)
                    </span>
                  </div>

                  {(() => {
                    const rec = getIndependentRecommendation(activeLead);
                    return (
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold text-white block">Unabhängiger Vorschlag:</span>
                        <p className="text-sm font-semibold text-white font-display mt-1 bg-zinc-900/40 p-2.5 border border-zinc-850">{rec.hardware}</p>
                        <p className="text-xs text-zinc-400 leading-normal mt-1">{rec.detail}</p>
                      </div>
                    );
                  })()}
                </div>

                {/* Interactive State Updater */}
                <div className="p-5 bg-black border border-zinc-900 space-y-4">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider font-mono block">Beratungsprozess pflegen</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Status selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-medium">Kundenstatus aktualisieren</label>
                      <select
                        value={statusInput}
                        onChange={(e) => setStatusInput(e.target.value as Lead['status'])}
                        className="w-full bg-zinc-950 border border-zinc-800 text-xs font-bold uppercase tracking-wider p-2.5 text-slate-200 focus:outline-none focus:border-gold cursor-pointer"
                      >
                        <option value="neu">Neu / Eingang</option>
                        <option value="kontaktiert">Kunde kontaktiert</option>
                        <option value="berechnung_erstellt">V-Check Analyse berechnet</option>
                        <option value="bereit_fuer_installateur">An Fachpartner übermittelt</option>
                        <option value="abgeschlossen">Beratung erfolgreich abgeschlossen</option>
                      </select>
                    </div>

                    {/* Delete single button */}
                    <div className="flex items-end justify-end">
                      <button
                        onClick={() => {
                          if (confirm(`Möchten Sie das Dossier von ${activeLead.name} unwiderruflich aus der Datenbank entfernen?`)) {
                            onDeleteLead(activeLead.id);
                            setSelectedLeadId(null);
                          }
                        }}
                        className="px-3.5 py-2.5 border border-zinc-850 hover:bg-red-950 hover:border-red-900 text-xs font-bold uppercase tracking-wider text-zinc-550 hover:text-white transition flex items-center cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 mr-1.5" />
                        Eintrag löschen
                      </button>
                    </div>
                  </div>

                  {/* Consulting Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400 font-medium block">Interne Maklervermerke & Pflichtenheft</label>
                    <textarea
                      value={internalNotes}
                      onChange={(e) => setInternalNotes(e.target.value)}
                      placeholder="Erfassen Sie Gesprächsergebnisse, bevorzugte Fabrikate (z.B. Viessmann oder Buderus) und Tarifvergleiche..."
                      className="w-full h-20 bg-zinc-950 border border-zinc-850 p-2.5 text-xs text-zinc-350 outline-none focus:border-gold"
                    />
                  </div>

                  <button
                    onClick={handleUpdate}
                    className="inline-flex items-center px-4 py-2.5 bg-gold hover:bg-gold-light text-black text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    <Check className="w-4 h-4 mr-1.5" />
                    Änderungen speichern
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-zinc-600">
                Wählen Sie einen Lead aus der linken Spalte aus, um die Analyse zu beginnen.
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
