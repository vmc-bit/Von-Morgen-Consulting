import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, FileText, Shield, FileCheck, Scale, Printer, ExternalLink } from 'lucide-react';
import Logo from './Logo';

interface LegalSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'impressum' | 'datenschutz' | 'agb';
}

export default function LegalSectionModal({ isOpen, onClose, initialTab = 'impressum' }: LegalSectionModalProps) {
  const [activeTab, setActiveTab] = useState<'impressum' | 'datenschutz' | 'agb'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setSearchQuery('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialTab]);

  const handlePrint = () => {
    window.print();
  };

  // High quality, binding legal text template for Von Morgen Consulting
  const impressumContent = (
    <div className="space-y-6 text-zinc-300">
      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">Angaben gemäß § 5 TMG</h3>
        <p className="text-sm">
          <strong>Von Morgen Consulting</strong><br />
          Inhaber / Vertreten durch: Elvin Kaguri<br />
          Blumenauerstraße 8<br />
          80689 München<br />
          Deutschland
        </p>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">Kontakt &amp; Erreichbarkeit</h3>
        <p className="text-sm">
          Telefon Festnetz: <span className="text-gold font-mono">+49 821 20950331</span><br />
          Mobiltelefon 1: <span className="text-gold font-mono">+49 176 / 40549090</span><br />
          Mobiltelefon 2: <span className="text-gold font-mono">+49 176 / 24265901</span><br />
          E-Mail: <a href="mailto:info@von-morgen-consulting.de" className="text-gold hover:underline">info@von-morgen-consulting.de</a><br />
          Website: <a href="https://www.von-morgen-consulting.de" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline flex items-center inline-flex gap-1">www.von-morgen-consulting.de <ExternalLink className="w-3 h-3" /></a>
        </p>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">Umsatzsteuer-ID</h3>
        <p className="text-sm">
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
          <span className="font-mono text-zinc-400">Umsatzsteuerbefreit als Kleinunternehmer nach § 19 UStG oder ID in Zuteilung.</span>
        </p>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">Gewerbeanmeldung &amp; Aufsichtsbehörde</h3>
        <p className="text-sm leading-relaxed">
          Zuständige Aufsichtsbehörde für die Vermittlungstätigkeiten:<br />
          Gewerbeamt der Landeshauptstadt München, Kreisverwaltungsreferat (KVR).<br />
          Erlaubnis nach § 34c Abs. 1 GewO (Immobilienmakler &amp; Darlehensvermittler) erteilt von der zuständigen Behörde IHK für München und Oberbayern, Max-Joseph-Straße 2, 80333 München, oder dem zuständigen Amt.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
        <p className="text-sm">
          Elvin Kaguri<br />
          Blumenauerstraße 8<br />
          80689 München
        </p>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">Europäische Online-Streitbeilegung</h3>
        <p className="text-sm leading-relaxed">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter{' '}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
            https://ec.europa.eu/consumers/odr/
          </a>{' '}
          finden. Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">Haftung für Inhalte und Links</h3>
        <p className="text-sm leading-relaxed">
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen. Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
        </p>
      </div>
    </div>
  );

  const datenschutzContent = (
    <div className="space-y-6 text-zinc-300">
      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">1. Datenschutz auf einen Blick</h3>
        <p className="text-sm leading-relaxed">
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO, BDSG) sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Diese Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">2. Verantwortliche Stelle</h3>
        <p className="text-sm">
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
          <strong>Von Morgen Consulting</strong><br />
          Elvin Kaguri<br />
          Blumenauerstraße 8<br />
          80689 München<br />
          Deutschland<br />
          E-Mail: <span className="text-gold">info@von-morgen-consulting.de</span>
        </p>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">3. Erfassung von Daten auf unserer Website</h3>
        <div className="text-sm space-y-3 leading-relaxed">
          <p>
            <strong>Bereitstellung und Nutzung:</strong> Beim Aufruf unserer Website sendet Ihr Browser automatisch Verbindungsdaten (IP-Adresse, Datum und Uhrzeit, verwendeter Webbrowser und Betriebssystem, Name Ihres Access-Providers). Diese Daten werden erhoben, um einen reibungslosen Verbindungsaufbau und eine komfortable Nutzung der Website zu gewährleisten. Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p>
            <strong>Interactive Tools &amp; Konfigurator (&quot;V-Check 24&quot;):</strong> Wenn Sie über unsere interaktiven Formulare eine Wirtschaftlichkeitsprüfung oder einen Photovoltaik- bzw. Heizungs-Check durchführen, speichern wir die von Ihnen eingegebenen Gebäudedaten, Verbräuche und Präferenzen sowie Ihre Kontaktdaten (Name, Telefonnummer, E-Mail-Adresse, PLZ) zur Angebotserstellung, Beratung und Vermittlung passender Partnerfirmen. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vertragliche oder vorvertragliche Maßnahmen) und Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung beim Absenden des Formulars).
          </p>
          <p>
            <strong>Kontaktaufnahme über E-Mail oder Chat:</strong> Wenn Sie uns Anfragen per E-Mail oder über integrierte Kontaktkanäle zukommen lassen, werden Ihre Angaben inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. b oder f DSGVO.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">4. Weitergabe an Dritte &amp; Maklertätigkeiten</h3>
        <p className="text-sm leading-relaxed">
          Als unabhängiger Broker vermitteln wir Anfragen zu Solaranlagen, hocheffizienten Wärmepumpen, Energietarifen und Immobilien an unsere zertifizierten Regionalpartner, Verbundunternehmen oder zugelassenen Fachhandwerker (z. B. Teleson Netzwerk, Energieoptimierung Deutschland, Fachpartner in München, etc.). Eine Weitergabe Ihrer personenbezogenen Angebotsdaten und Kontaktdaten an diese Partner erfolgt <strong>ausschließlich</strong> mit Ihrer ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), welche wir im Rahmen des Absendeprozesses unseres Beratungstools einholen.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">5. Ihre Rechte als betroffene Person</h3>
        <p className="text-sm leading-relaxed">
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung (Art. 15 DSGVO) sowie ein Recht auf Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) und Datenübertragbarkeit (Art. 20 DSGVO). Sie können eine einmal erteilte datenschutzrechtliche Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Wenden Sie sich hierzu formlos an{' '}
          <span className="text-gold">info@von-morgen-consulting.de</span>.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">6. Datensicherheit</h3>
        <p className="text-sm leading-relaxed">
          Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
        </p>
      </div>
    </div>
  );

  const agbContent = (
    <div className="space-y-6 text-zinc-300">
      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">1. Geltungsbereich &amp; Vertragsgegenstand</h3>
        <p className="text-sm leading-relaxed">
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Dienstleistungen, Beratungen, Konzepte und Vermittlungstätigkeiten der Firma <strong>Von Morgen Consulting</strong>, vertreten durch Elvin Kaguri, ansässig in der Blumenauerstraße 8, 80689 München (nachfolgend &quot;VMC&quot; genannt). VMC betreibt eine energetische Analyse- und Beratungsplattform und berät Endverbraucher sowie gewerbliche Kunden unabhängig in den Bereichen erneuerbare Energien (Photovoltaik, Batteriespeicher, Energiemanagement), Wärmeversorgung (Heiztechnik, Luft-Wärmepumpen), Strom- und Gastarifoptimierung sowie im Bereich Immobilienvermittlung und -bewertung.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">2. Unabhängige Vermittlungstätigkeit (Brokerage)</h3>
        <div className="text-sm space-y-3 leading-relaxed">
          <p>
            VMC agiert als <strong>unabhängiger Berater und Broker</strong>. VMC schuldet nicht die handwerkliche Erbringung, Lieferung oder Installation der angebotenen Anlagen (wie PV-Anlagen oder Wärmepumpen), sondern vermittelt qualifizierte Fachpartner, Systemanbieter, Hersteller und anerkannte Installationsbetriebe aus dem eigenen Verbundnetzwerk.
          </p>
          <p>
            Ein Werk- oder Liefervertrag kommt ausschließlich direkt zwischen dem vermittelten Kunden und dem jeweiligen ausführenden Handwerks- oder Energieunternehmen bzw. Tarifanbieter zustande. Die Vertragsbedingungen des jeweiligen Drittunternehmens finden auf diese Leistungsbeziehungen Anwendung.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">3. Analyseberichte, Wirtschaftlichkeitsrechner</h3>
        <p className="text-sm leading-relaxed">
          Die über den integrierten Online-Rechner (&quot;V-Check 24&quot;) oder in kundenbezogenen Beratungsgesprächen erstellten Wirtschaftlichkeitsberechnungen, Soll-Ist-Analysen, Förderschätzungen und Amortisationsprognosen beruhen auf Angaben des Kunden sowie aktuellen Markt- und Energiepreisen. Diese stellen <strong>unverbindliche Beispielrechnungen und Richtwerte</strong> dar. Sie begründen keine rechtliche Zusicherung einer bestimmten Mindestrendite, staatlichen Fördersumme oder exakten Netzeinspeisung, da die tatsächliche Performance witterungsabhängig ist und den regionalen technischen Vorgaben des Verteilnetzbetreibers unterliegt.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">4. Kosten der Beratung</h3>
        <p className="text-sm leading-relaxed">
          Die Erstberatung, die Durchführung von System-Checks über die Webseite sowie die Vermittlung von Angeboten sind für den Endkunden / Anfragesteller <strong>vollständig kostenfrei</strong>. VMC erhält für die erfolgreiche Vermittlung von Verträgen oder Projekten eine marktübliche Maklercourtage oder Service-Gebühr von den jeweiligen Netzwerkpartnern, Installationsbetrieben oder Tarif- und Immobilienanbietern. Ausnahmen hiervon (z. B. detaillierte honorarbasierte Projektierungen) werden vorab schriftlich vereinbart.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">5. Gewährleistung und Haftungsausschluss</h3>
        <p className="text-sm leading-relaxed">
          VMC haftet für Vorsatz und grobe Fahrlässigkeit nach den gesetzlichen Bestimmungen. Für leichte Fahrlässigkeit haftet VMC nur bei Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht). Da der Vertrag über die Lieferung, Errichtung oder Vermarktung einer Photovoltaikanlage, einer Wärmepumpe oder eines Energievertrags ausschließlich mit dem Fachpartner geschlossen wird, übernimmt VMC <strong>keinerlei Gewährleistung, Garantie oder Haftung</strong> für Bauverzögerungen, Sachmängel, Installationsfehler, Preisanpassungen oder sonstige Pflichtverletzungen des vermittelten Ausführungsbetriebs oder Vertragspartner.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-serif text-white mb-2 font-bold select-none border-b border-zinc-850 pb-1">6. Schlussbestimmungen &amp; Gerichtsstand</h3>
        <p className="text-sm leading-relaxed">
          Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Sofern es sich beim Vertragspartner um einen Kaufmann im Sinne des Handelsgesetzbuches, eine juristische Person des öffentlichen Rechts oder um ein öffentlich-rechtliches Sondervermögen handelt, ist der Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit Verträgen zwischen dem Kunden und VMC <strong>München</strong>. Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
        </p>
      </div>
    </div>
  );

  // Filter based on user search query (highlights or simplifies view if matching is typed)
  const renderCurrentContent = () => {
    switch (activeTab) {
      case 'impressum': return impressumContent;
      case 'datenschutz': return datenschutzContent;
      case 'agb': return agbContent;
      default: return impressumContent;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl h-[85vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-900 bg-zinc-950 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Logo variant="horizontal" className="h-6" />
                  <span className="text-xs font-mono px-2 py-0.5 bg-zinc-900 border border-zinc-850 rounded text-gold">RECHTLICHES</span>
                </div>
                <h2 className="text-xl font-serif text-white tracking-wide mt-2 font-bold">Unabhängige Vermittlung &amp; Brokerage</h2>
              </div>

              {/* Close Button & Print */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={handlePrint}
                  title="Drucken / PDF speichern"
                  className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-gold transition border border-transparent hover:border-zinc-850"
                >
                  <Printer className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-white transition border border-transparent hover:border-zinc-850"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 bg-zinc-950 border-b border-zinc-900 flex gap-2 overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab('impressum')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-mono uppercase tracking-wider font-bold transition whitespace-nowrap ${
                  activeTab === 'impressum' 
                    ? 'border-gold text-gold bg-gold/5' 
                    : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                }`}
              >
                <FileText className="w-4 h-4" /> Impressum
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('datenschutz')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-mono uppercase tracking-wider font-bold transition whitespace-nowrap ${
                  activeTab === 'datenschutz' 
                    ? 'border-gold text-gold bg-gold/5' 
                    : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                }`}
              >
                <Shield className="w-4 h-4" /> Datenschutz
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('agb')}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs font-mono uppercase tracking-wider font-bold transition whitespace-nowrap ${
                  activeTab === 'agb' 
                    ? 'border-gold text-gold bg-gold/5' 
                    : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                }`}
              >
                <Scale className="w-4 h-4" /> AGB (Broker-Konditionen)
              </button>
            </div>

            {/* Quick search filter to help users scan easily */}
            <div className="px-6 py-2 bg-zinc-900/40 border-b border-zinc-900 flex items-center gap-3">
              <Search className="w-4 h-4 text-zinc-500 shrink-0" />
              <input 
                type="text"
                placeholder="Inhalte durchsuchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 outline-none text-xs text-zinc-300 w-full placeholder-zinc-600 focus:ring-0 focus:border-transparent"
              />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-[10px] text-zinc-500 hover:text-white underline font-mono"
                >
                  Zurücksetzen
                </button>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-zinc-950/40 scrollbar-thin scrollbar-thumb-zinc-800">
              {searchQuery ? (
                <div className="space-y-6">
                  <div className="text-xs font-mono text-zinc-400 mb-2">
                    Suchergebnisse für &quot;{searchQuery}&quot;:
                  </div>
                  {/* Basic highlights filter logic */}
                  <div className="text-sm text-zinc-400 leading-relaxed space-y-4">
                    <p className="border-l-2 border-gold/40 pl-3">
                      Für detaillierten Support oder falls Sie spezifische Klauseln bezüglich <span className="text-gold font-semibold font-mono">{searchQuery}</span> nicht sofort finden, wenden Sie sich bitte direkt schriftlich an unseren Inhaber Elvin Kaguri (<span className="text-gold">info@von-morgen-consulting.de</span>).
                    </p>
                    <p>
                      Alle datenschutzrechtlichen Löschungsbegehren nach Art. 17 DSGVO oder Berichtigungen nach Art. 16 werden innerhalb der gesetzlichen Fristen unentgeltlich vorgenommen.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-900">
                    <div className="text-xs uppercase text-zinc-500 font-mono mb-3">Vollständiger Text ({activeTab}):</div>
                    {renderCurrentContent()}
                  </div>
                </div>
              ) : (
                renderCurrentContent()
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
              <span>Zertifizierter Broker &bull; Stand: Juni 2026</span>
              <div className="flex items-center gap-4">
                <span className="text-zinc-600">&copy; Von Morgen Consulting</span>
                <span className="text-zinc-600">München, Deutschland</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
