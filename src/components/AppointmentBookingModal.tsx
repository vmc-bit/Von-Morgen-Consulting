import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Calendar as CalendarIcon, Clock, CheckCircle, 
  ArrowRight, Shield, Video, Phone, Mail, User,
  Check, FileQuestion, Sparkles, Printer, ArrowLeft, Loader2
} from 'lucide-react';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: 'photovoltaik' | 'waermepumpe' | 'strom_gas' | 'immobilien' | 'beratung_komplett';
}

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  timeSlot: string;
  notes?: string;
  type: 'video' | 'phone';
  createdAt: string;
}

export default function AppointmentBookingModal({ isOpen, onClose, defaultService = 'beratung_komplett' }: AppointmentBookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState(defaultService);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [contactMethod, setContactMethod] = useState<'video' | 'phone'>('phone');
  
  // Client details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  // Processing animations
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState('');
  const [successData, setSuccessData] = useState<Appointment | null>(null);

  // Generate next 14 days list from today, skipping Sundays
  const [availableDays, setAvailableDays] = useState<Array<{ dateStr: string, label: string, weekday: string, slotsCount: number }>>([]);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedDate('');
      setSelectedTime('');
      setIsSubmitting(false);
      setSuccessData(null);
      document.body.style.overflow = 'hidden';
      
      // Calculate available days dynamically
      const days = [];
      const weekdaysGerman = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
      const monthsGerman = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
      
      let count = 0;
      let offset = 1; // start from tomorrow
      while (count < 10) {
        const d = new Date();
        d.setDate(d.getDate() + offset);
        
        // Skip Sundays (0)
        if (d.getDay() !== 0) {
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          const dateStr = `${year}-${month}-${day}`;
          
          days.push({
            dateStr,
            label: `${d.getDate()}. ${monthsGerman[d.getMonth()]}`,
            weekday: weekdaysGerman[d.getDay()],
            // Generate deterministic slots left (between 2 and 5 slots available)
            slotsCount: 3 + ((d.getDate() + d.getMonth()) % 3)
          });
          count++;
        }
        offset++;
      }
      setAvailableDays(days);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Available slots for a work day
  const timeSlots = [
    { time: '09:00 Uhr', duration: '30 Min', status: 'frei' },
    { time: '10:30 Uhr', duration: '30 Min', status: 'frei' },
    { time: '13:00 Uhr', duration: '30 Min', status: 'frei' },
    { time: '14:30 Uhr', duration: '30 Min', status: 'frei' },
    { time: '16:00 Uhr', duration: '30 Min', status: 'frei' },
    { time: '17:30 Uhr', duration: '30 Min', status: 'belegt' },
  ];

  // Map service ids to German labels
  const getServiceLabel = (srv: string) => {
    switch (srv) {
      case 'photovoltaik': return 'Photovoltaik & Speicher';
      case 'waermepumpe': return 'Hocheffiziente Wärmepumpe';
      case 'strom_gas': return 'Strom- & Gas-Tarifoptimierung';
      case 'immobilien': return 'Immobilienvermittlung / Bewertung';
      case 'beratung_komplett': return 'Ganzheitliche energetische Erstberatung';
      default: return 'Ganzheitliche Beratung';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Check if step 1 is valid
  const isStep1Valid = selectedDate && selectedTime && selectedService;

  // Check if step 2 is valid
  const isStep2Valid = formData.name.trim().length > 2 && 
                       formData.email.includes('@') && 
                       formData.phone.trim().length > 5;

  const handleSubmit = () => {
    if (!isStep2Valid) return;
    
    setIsSubmitting(true);
    setSubmitPhase('Verbindung mit Buchungsschnittstelle von Elvin Kaguri...');
    
    setTimeout(() => {
      setSubmitPhase('Prüfe Kalender-Verfügbarkeit des Zeitfensters...');
      
      setTimeout(() => {
        setSubmitPhase('Trage Termin ein & erstelle digitale Konferenz-Einladung...');
        
        setTimeout(() => {
          // Store appointment locally
          const newApp: Appointment = {
            id: 'app-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: getServiceLabel(selectedService),
            date: selectedDate,
            timeSlot: selectedTime,
            notes: formData.notes,
            type: contactMethod,
            createdAt: new Date().toISOString()
          };
          
          // Save to localStorage
          const existing = localStorage.getItem('von_morgen_appointments');
          const currentList = existing ? JSON.parse(existing) : [];
          currentList.push(newApp);
          localStorage.setItem('von_morgen_appointments', JSON.stringify(currentList));

          // Also inject a placeholder "Lead" or link so the advisor dashboard notice reacts!
          // We can push to 'von_morgen_leads' to let the advisor dashboard reflect a scheduled consultation!
          const existingLeadsRaw = localStorage.getItem('von_morgen_leads');
          const existingLeads = existingLeadsRaw ? JSON.parse(existingLeadsRaw) : [];
          
          const leadRepresentation = {
            id: 'lead-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            product: selectedService,
            houseType: 'einfamilienhaus',
            ownership: 'eigentuemer',
            heatingType: 'andere',
            annualElectricity: 4500,
            roofSize: 0,
            batteryStorage: false,
            currentSituation: `Gebucht über Online-Terminkalender: ${newApp.timeSlot} am ${newApp.date}`,
            targetSituation: `Thema: ${newApp.service} (${newApp.type === 'video' ? 'Video-Konferenz' : 'Telefonrückruf'})`,
            subsidiesInterest: true,
            name: newApp.name,
            email: newApp.email,
            phone: newApp.phone,
            zipCode: '80331',
            budget: 0,
            createdAt: newApp.createdAt,
            status: 'neu',
            notes: `⚠️ DIREKT-TERMIN am ${newApp.date} um ${newApp.timeSlot} (${newApp.type === 'video' ? 'Videoschalte' : 'Rückruf'}). Kundennotiz: ${newApp.notes || 'Keine'}`
          };
          existingLeads.unshift(leadRepresentation);
          localStorage.setItem('von_morgen_leads', JSON.stringify(existingLeads));
          
          // Send callback trigger so parent updates lists
          window.dispatchEvent(new Event('von_morgen_lead_submitted'));

          setSuccessData(newApp);
          setIsSubmitting(false);
          setStep(3);
        }, 1500);
      }, 1200);
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
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

          {/* Dialog Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-900 rounded-2xl shadow-3xl overflow-hidden flex flex-col z-10"
          >
            {/* Ambient golden top line */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

            {/* Header */}
            <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] bg-gold/10 border border-gold/30 text-gold px-2.5 py-1 rounded">
                  ERSTBERATUNG RECHTMÄSSIG RESERVIEREN
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-2 flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-gold" /> Beratungstermin eintragen
                </h3>
              </div>
              <button 
                type="button"
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-white transition border border-transparent hover:border-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Indicators */}
            {step < 3 && (
              <div className="px-6 py-3.5 bg-zinc-950/50 border-b border-zinc-900 flex items-center justify-between text-xs font-mono">
                <span className={`flex items-center gap-1.5 font-bold ${step === 1 ? 'text-gold' : 'text-zinc-500'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${step === 1 ? 'border-gold bg-gold/5 text-gold' : 'border-zinc-800 text-zinc-500'}`}>1</span>
                  Anliegen &amp; Zeitfenster
                </span>
                <div className="h-px bg-zinc-900 flex-1 mx-4" />
                <span className={`flex items-center gap-1.5 font-bold ${step === 2 ? 'text-gold' : 'text-zinc-500'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${step === 2 ? 'border-gold text-gold' : 'border-zinc-800 text-zinc-500'}`}>2</span>
                  Kontaktdetails
                </span>
              </div>
            )}

            {/* Modal Body Container */}
            <div className="p-6 overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-zinc-800 bg-zinc-950/40">
              
              {/* Submission Loader Screen */}
              {isSubmitting && (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                  <Loader2 className="w-12 h-12 text-gold animate-spin" />
                  <p className="text-sm font-semibold text-white">{submitPhase}</p>
                  <p className="text-xs text-zinc-500 font-mono">Von Morgen Consulting • Secure Broker Link</p>
                </div>
              )}

              {/* STEP 1: SERVICE & TIME SELECTOR */}
              {!isSubmitting && step === 1 && (
                <div className="space-y-6">
                  {/* Select Topic */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5">
                      1. Ihr Beratungsschwerpunkt
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { id: 'beratung_komplett', label: 'Komplett Energieberatung', desc: 'Individueller Rundum-Check' },
                        { id: 'photovoltaik', label: 'Photovoltaik & Speicher', desc: 'Solaranlagen u. Eigenverbrauch' },
                        { id: 'waermepumpe', label: 'Hocheffiziente Wärmepumpen', desc: 'Kälte- & Versorgungstechnik' },
                        { id: 'strom_gas', label: 'Strom & Gas Tarifvergleich', desc: 'Einkaufsbündelung B2B/B2C' },
                        { id: 'immobilien', label: 'Immobilien Vermittlung / Wert', desc: 'München & Oberbayern Region' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedService(item.id as any)}
                          className={`p-3.5 text-left border rounded-xl transition flex flex-col gap-1 focus:outline-none ${
                            selectedService === item.id 
                              ? 'border-gold bg-gold/5 text-white' 
                              : 'border-zinc-900 bg-zinc-950/55 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-950'
                          }`}
                        >
                          <span className={`text-xs font-bold ${selectedService === item.id ? 'text-gold' : 'text-zinc-200'}`}>{item.label}</span>
                          <span className="text-[10px] text-zinc-500">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Available Dates */}
                  <div>
                    <div className="flex justify-between items-center mb-2.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                        2. Tag wählen (Woche &amp; Folgewoche)
                      </label>
                      <span className="text-[10px] font-mono text-zinc-500">So. ist geschlossen</span>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-2">
                      {availableDays.map((day) => (
                        <button
                          key={day.dateStr}
                          type="button"
                          onClick={() => {
                            setSelectedDate(day.dateStr);
                            setSelectedTime(''); // Reset selected time when date changes
                          }}
                          className={`p-2 rounded-xl border flex flex-col items-center justify-center transition focus:outline-none ${
                            selectedDate === day.dateStr
                              ? 'border-gold bg-gold text-black font-semibold'
                              : 'border-zinc-900 bg-zinc-950/60 text-zinc-300 hover:border-zinc-800 hover:bg-zinc-950'
                          }`}
                        >
                          <span className={`text-[10px] font-mono uppercase ${selectedDate === day.dateStr ? 'text-black/80' : 'text-zinc-500'}`}>{day.weekday}</span>
                          <span className="text-xs font-bold mt-1">{day.label.split('.')[0]}</span>
                          <span className={`text-[8px] font-mono mt-1 ${selectedDate === day.dateStr ? 'text-black/80 bg-black/10 px-1 py-0.2 rounded' : 'text-gold'}`}>{day.slotsCount} frei</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slots for selected date */}
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2.5 pt-2 border-t border-zinc-900"
                    >
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                        3. Uhrzeit wählen (Rückruf - Elvin Kaguri persönlich)
                      </label>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {timeSlots.map((slot) => {
                          const isBelegt = slot.status === 'belegt';
                          return (
                            <button
                              key={slot.time}
                              disabled={isBelegt}
                              type="button"
                              onClick={() => setSelectedTime(slot.time)}
                              className={`p-2.5 rounded-xl border text-center relative focus:outline-none transition flex flex-col justify-center items-center ${
                                isBelegt 
                                  ? 'border-zinc-950 bg-zinc-950 text-zinc-600 cursor-not-allowed opacity-40 line-through'
                                  : selectedTime === slot.time
                                    ? 'border-gold bg-gold/10 text-white'
                                    : 'border-zinc-900 bg-zinc-950/60 text-zinc-300 hover:border-zinc-800 hover:bg-zinc-950'
                              }`}
                            >
                              <span className="text-xs font-bold">{slot.time}</span>
                              <span className="text-[9px] text-zinc-500 mt-0.5">{slot.duration}</span>
                              {selectedTime === slot.time && (
                                <div className="absolute top-1 right-1.5">
                                  <Check className="w-3 h-3 text-gold" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* STEP 2: CLIENT DETAILS FORM */}
              {!isSubmitting && step === 2 && (
                <div className="space-y-5">
                  <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-xl flex items-center justify-between text-xs font-mono text-zinc-300">
                    <div>
                      <span className="text-zinc-500">Ihr Termin: </span>
                      <span className="text-white font-bold">{new Date(selectedDate).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long' })}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">Uhrzeit: </span>
                      <span className="text-gold font-bold">{selectedTime}</span>
                    </div>
                  </div>

                  {/* Consultation Method */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Kommunikationskanal wählen
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setContactMethod('phone')}
                        className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition focus:outline-none ${
                          contactMethod === 'phone'
                            ? 'border-gold bg-gold/5 text-white'
                            : 'border-zinc-900 bg-zinc-950/60 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-950'
                        }`}
                      >
                        <Phone className={`w-5 h-5 ${contactMethod === 'phone' ? 'text-gold' : 'text-zinc-500'} mt-0.5 shrink-0`} />
                        <div>
                          <span className="block text-xs font-bold text-white">Rückruf auf Handynummer</span>
                          <span className="block text-[10px] text-zinc-500 mt-1">Elvin Kaguri ruft Sie per Telefon an</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setContactMethod('video')}
                        className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition focus:outline-none ${
                          contactMethod === 'video'
                            ? 'border-gold bg-gold/5 text-white'
                            : 'border-zinc-900 bg-zinc-950/60 text-zinc-400 hover:border-zinc-800 hover:bg-zinc-950'
                        }`}
                      >
                        <Video className={`w-5 h-5 ${contactMethod === 'video' ? 'text-gold' : 'text-zinc-500'} mt-0.5 shrink-0`} />
                        <div>
                          <span className="block text-xs font-bold text-white">Online Video-Konferenz</span>
                          <span className="block text-[10px] text-zinc-500 mt-1">Videolink (Google Meet) wird mitgeschickt</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Contact forms */}
                  <div className="space-y-4 pt-2 border-t border-zinc-900/40">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1">
                          <User className="w-3 w-3 text-gold" /> Vollständiger Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="z.B. Dr. Stefan Müller"
                          className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none focus:border-gold placeholder-zinc-700 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1">
                          <Phone className="w-3 w-3 text-gold" /> Telefonnummer (Wichtig)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="z.B. 0176 / 1234567"
                          className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none focus:border-gold placeholder-zinc-700 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1">
                        <Mail className="w-3 w-3 text-gold" /> E-Mail-Adresse (Terminbestätigung)
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="z.B. mail@stefan-mueller.de"
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none focus:border-gold placeholder-zinc-700 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1">
                        <FileQuestion className="w-3 w-3 text-gold" /> Besondere Fragen / Ihr Objekt (Optional)
                      </label>
                      <textarea
                        name="notes"
                        rows={2.5}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="z.B. Altbau aus 1982, Solaranlage soll mit Wärmepumpe gekoppelt werden."
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none focus:border-gold placeholder-zinc-700 transition resize-none"
                      />
                    </div>
                  </div>

                  {/* Trust indicator */}
                  <div className="p-3 bg-zinc-900/20 border border-zinc-900/50 rounded-xl flex items-start gap-2.5">
                    <Shield className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <p className="text-[10px] text-zinc-400 leading-relaxed">
                      <strong>Datenschutzgarantie:</strong> Ihre Kontaktdaten dienen ausschließlich der Durchführung des Erstgesprächs mit Elvin Kaguri gemäß DSGVO und werden streng vertraulich behandelt.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 3: SUCCESS CONFIRMATION DISPLAY */}
              {!isSubmitting && step === 3 && successData && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-gold/10 rounded-full border border-gold/40 flex items-center justify-center animate-bounce">
                      <CheckCircle className="w-9 h-9 text-gold" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-serif text-white font-bold">Termin erfolgreich eingetragen!</h4>
                    <p className="text-sm text-zinc-400 mt-2 max-w-md mx-auto">
                      Ein Kalendereintrag (Google Meet / ICS) für Ihr Erstgespräch mit Elvin Kaguri wurde generiert und reserviert.
                    </p>
                  </div>

                  {/* Elegant client boarding pass ticket mockup */}
                  <div className="max-w-md mx-auto border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900/60 rounded-2xl overflow-hidden shadow-2xl relative">
                    <div className="p-4 border-b border-zinc-900/80 bg-zinc-950/80 flex justify-between items-center text-[10px] font-mono text-zinc-400">
                      <span>VMC PLATINUM BOOKING</span>
                      <span className="text-gold font-bold">{successData.id}</span>
                    </div>
                    
                    <div className="p-6 text-left space-y-4">
                      {/* Grid */}
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                        <div>
                          <span className="text-zinc-500 uppercase text-[9px] block">BERATER:</span>
                          <span className="text-white font-serif italic text-sm font-bold">Elvin Kaguri</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 uppercase text-[9px] block">THEMA:</span>
                          <span className="text-white font-bold">{successData.service}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 uppercase text-[9px] block">DATUM:</span>
                          <span className="text-white font-bold">{new Date(successData.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 uppercase text-[9px] block">ZEITFENSTER:</span>
                          <span className="text-gold font-bold">{successData.timeSlot}</span>
                        </div>
                        <div className="col-span-2 border-t border-zinc-900 pt-3 flex items-center justify-between text-[11px]">
                          <span className="text-zinc-400">Termin-Typ:</span>
                          <span className="text-white font-bold flex items-center gap-1 shrink-0 uppercase tracking-widest text-[9px]">
                            {successData.type === 'video' ? (
                              <>
                                <Video className="w-3.5 h-3.5 text-gold" /> Google Video Meet
                              </>
                            ) : (
                              <>
                                <Phone className="w-3.5 h-3.5 text-gold" /> Telefonanruf (+49...)
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-950/90 border-t border-zinc-900 flex justify-between items-center">
                      <span className="text-[9px] text-zinc-500 font-mono">Mail gesendet an: {successData.email}</span>
                      <button
                        type="button"
                        onClick={handlePrint}
                        className="text-[10px] text-gold font-mono uppercase tracking-wider font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3 h-3" /> Drucken
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-500 max-w-sm mx-auto leading-relaxed">
                    💡 Sie erhalten in Kürze eine automatische Termin-Vorschlags-Mail mit dem Zugangs-ID-Link. Bitte halten Sie bei Telefonanrufen Ihr Handy empfangsbereit.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-zinc-900 bg-zinc-950 flex items-center justify-between">
              {step === 1 && (
                <>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-mono">
                    <Shield className="w-3.5 h-3.5 text-gold" /> Premium Broker Check 
                  </div>
                  <button
                    disabled={!isStep1Valid}
                    type="button"
                    onClick={() => setStep(2)}
                    className={`inline-flex items-center justify-center px-5 py-3 text-xs uppercase tracking-widest font-bold border cursor-pointer ${
                      isStep1Valid
                        ? 'bg-gold border-gold text-black hover:bg-black hover:text-gold transition-all duration-300'
                        : 'border-zinc-900 bg-zinc-900 text-zinc-600 cursor-not-allowed'
                    }`}
                  >
                    Weiter zur Person
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </>
              )}

              {step === 2 && !isSubmitting && (
                <>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center justify-center px-4 py-3 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white text-xs uppercase tracking-widest font-bold transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> zurück
                  </button>
                  <button
                    disabled={!isStep2Valid}
                    type="button"
                    onClick={handleSubmit}
                    className={`inline-flex items-center justify-center px-5 py-3 text-xs uppercase tracking-widest font-bold border cursor-pointer ${
                      isStep2Valid
                        ? 'bg-gold border-gold text-black hover:bg-black hover:text-gold shadow-lg transition-all duration-300'
                        : 'border-zinc-900 bg-zinc-900 text-zinc-600 cursor-not-allowed'
                    }`}
                  >
                    Termin jetzt buchen
                    <Sparkles className="w-4 h-4 ml-2" />
                  </button>
                </>
              )}

              {step === 3 && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center px-5 py-3.5 bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 text-xs uppercase tracking-widest font-bold transition cursor-pointer"
                >
                  Schließen
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
