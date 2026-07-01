import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Target, Cpu, Users, Award, ArrowRight, ShieldCheck, HeartHandshake, Eye, TrendingUp, CheckSquare } from 'lucide-react';
import teamPartnerImg from '../assets/images/team_partner.jpg';

interface AboutUsProps {
  onStartConfigurator?: () => void;
}

export default function AboutUs({ onStartConfigurator }: AboutUsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // The 4 Core Pillars from the uploaded Munich Team Brand Graphic
  const pillars = [
    {
      id: 'pillar-1',
      title: 'Klare Strategie',
      badge: 'Statt Zufall',
      description: 'Keine Standardlösungen von der Stange. Wir entwerfen für Ihre Immobilie eine herstellerneutrale, mathematisch abgesicherte und maßgeschneiderte Energiestrategie — für maximalen Autarkiegrad und krisensichere Renditen.',
      icon: Target,
    },
    {
      id: 'pillar-2',
      title: 'Bewährte Prozesse',
      badge: 'Statt Chaos',
      description: 'Von der detaillierten Lastganganalyse bis zur schlüsselfertigen Übergabe durch zertifizierte Meisterbetriebe. Jedes Gewerk greift nahtlos ineinander, digital überwacht und frei von zeitaufwändiger Bürokratie.',
      icon: Cpu,
    },
    {
      id: 'pillar-3',
      title: 'Starke Partner',
      badge: 'Statt Austauschbar',
      description: 'Wir kooperieren ausschließlich mit lizenzierten Großhändlern und marktführenden Premium-Herstellern. Keine dubiosen Subunternehmer – Ihr Vorhaben wird durch absolute Fach-Meisterbetriebe unseres Vertrauens direkt realisiert.',
      icon: Users,
    },
    {
      id: 'pillar-4',
      title: 'Echter Mehrwert',
      badge: 'Statt leere Versprechen',
      description: 'Ob extreme staatliche KfW-Heizungsförderungen bis 70%, massive Steuererleichterungen für Solarstrom oder die enorme Wertsteigerung Ihrer Premium-Immobilie in München — wir machen Einsparungen messbar.',
      icon: Award,
    },
  ];

  return (
    <section ref={containerRef} id="geschichte" className="py-24 bg-zinc-950 bg-grid-white text-white relative overflow-hidden border-b border-zinc-900">
      {/* Decorative gradients */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[50%] h-[50%] bg-gold/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 right-10 w-[30%] h-[30%] bg-gold/5 rounded-full blur-[140px]" />
      </motion.div>
      {/* Fine-line vertical separator for crispness */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent opacity-30 pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Text Block: The Story of Von Morgen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2.5 bg-zinc-900 border border-gold/30 text-gold rounded-full px-3.5 py-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] font-display">
                Über Uns &amp; Unsere Philosophie
              </span>
            </div>

            <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none text-white">
              Von Morgen. <br />
              <span className="text-gold-gradient italic">Für Morgen.</span>
            </h2>

            <p className="text-gold font-serif text-lg italic border-l-2 border-gold pl-4 py-1 leading-relaxed">
              &quot;Wir, Elvin und Edi Kaguri, bündeln Jahrzehnte an Erfahrung in Management und Marktstrategie, um für Sie die besten Lösungen im Bereich Energie und Immobilien zu kuratieren.&quot;
            </p>

            {/* Founder Biographies */}
            <div className="space-y-8 pt-4">
              
              {/* Edi Kaguri Card */}
              <div className="p-6 bg-black border border-zinc-900 hover:border-gold/20 transition-all duration-300">
                <span className="text-[10px] uppercase tracking-widest text-gold font-mono font-bold block mb-1">
                   Co-Gründer &amp; Strategie
                </span>
                <h3 className="font-serif text-xl text-white mb-3">
                  Edi Kaguri: <span className="font-normal text-zinc-400">Vertriebs-Exzellenz von der Pike auf</span>
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed font-light">
                  Vom Assistenten bis zum Head of Sales in der DACH-Region (Deutschland, Österreich, Schweiz): 
                  Edi Kaguri blickt auf über 20 Jahre Führungserfahrung in den Bereichen Unternehmensberatung, 
                  Immobilien und Finanzwesen zurück. Diese umfassende Marktübersicht nutzt er heute, um als 
                  strategischer Kopf bei Von Morgen Consulting herstellerunabhängig nur die profitabelsten 
                  und sichersten Konzepte für unsere Kunden auszuwählen.
                </p>
              </div>

              {/* Elvin Kaguri Card */}
              <div className="p-6 bg-black border border-zinc-900 hover:border-gold/20 transition-all duration-300">
                <span className="text-[10px] uppercase tracking-widest text-gold font-mono font-bold block mb-1">
                  Co-Gründer &amp; Struktur
                </span>
                <h3 className="font-serif text-xl text-white mb-3">
                  Elvin Kaguri: <span className="font-normal text-zinc-400">Strukturen für höchste Verlässlichkeit</span>
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed font-light">
                  Mit über 15 Jahren Erfahrung im Personalmanagement und Einzelhandel ist Elvin Kaguri 
                  der Architekt hinter unseren reibungslosen Abläufen. Er transformiert komplexe 
                  Anforderungen in klare, verlässliche Strukturen. Wo der Energiemarkt oft chaotisch wirkt, 
                  sorgt er dafür, dass unsere Prozesse halten, was wir versprechen: Professionalität ohne Zufälle.
                </p>
              </div>

              {/* General principle callout */}
              <div className="p-6 bg-zinc-900/40 border border-gold/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-full blur-lg" />
                <span className="text-[10px] uppercase tracking-widest text-gold font-mono font-bold block mb-1">
                  Das Von Morgen Prinzip
                </span>
                <h4 className="font-serif text-lg text-white mb-2">
                  Planbarer Erfolg
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                  Wir haben Von Morgen Consulting gegründet, weil wir wissen: Qualität ist kein Zufall. Durch 
                  die Kombination aus Edis strategischem Marktblick und Elvins struktureller Präzision bieten 
                  wir Ihnen eine Vertriebsstruktur, die herstellerneutral die &bdquo;Crème de la Crème&ldquo; des 
                  Marktes für Sie filtert &ndash; für Ergebnisse, die heute überzeugen und morgen Bestand haben.
                </p>
              </div>

            </div>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2 text-gold">
                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs uppercase font-bold tracking-widest">100% Unabhängig</span>
              </div>
              <div className="flex items-center space-x-2 text-gold">
                <HeartHandshake className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs uppercase font-bold tracking-widest">Maximierter Sachwert</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Munich Visual / Custom HTML Team Card replica */}
          <motion.div 
            className="lg:col-span-5 lg:sticky lg:top-24 mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative border border-zinc-800/80 p-6 sm:p-8 bg-zinc-950 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Abstract decorative graphic that looks like a metallic card blueprint */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/15 to-transparent blur-xl pointer-events-none" />

              {/* High-fidelity Custom Team Portrait Image Frame */}
              <div className="relative aspect-video w-full bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 z-10" />
                
                {/* Real generated image */}
                <img 
                  src={teamPartnerImg} 
                  alt="Elvin und Edi Kaguri - Von Morgen Consulting" 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Simulated Partner avatars & golden coordinate line */}
                <div className="absolute inset-x-0 bottom-6 text-center z-20 px-4 drop-shadow-md">
                  <h3 className="font-serif uppercase tracking-[0.15em] text-white text-base font-bold">Elvin &amp; Edi Kaguri</h3>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-gold mt-1">München • Gründer &amp; Geschäftsführer</p>
                  
                  {/* Glowing line vector mockup mimicking the custom brand asset layout */}
                  <div className="w-4/5 mx-auto h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mt-4 relative">
                    <span className="absolute -top-1 right-1/4 w-2.5 h-2.5 bg-gold rounded-full animate-ping" />
                    <span className="absolute -top-0.5 right-1/4 w-1.5 h-1.5 bg-gold rounded-full" />
                  </div>
                </div>

                <div className="absolute top-4 left-4 z-20 bg-black/60 border border-gold/20 px-3 py-1 backdrop-blur-md">
                  <p className="text-gold-light text-[9px] uppercase font-bold tracking-widest font-mono">
                    München • Aktiv
                  </p>
                </div>
              </div>

              {/* Value metrics at glance */}
              <div className="grid grid-cols-3 gap-3.5 mt-6 text-center">
                <div className="bg-zinc-900/50 p-4 border border-zinc-900">
                  <span className="block text-lg font-bold font-display text-gold">20+ J.</span>
                  <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest font-bold block mt-0.5">Vertrieb</span>
                </div>
                <div className="bg-zinc-900/50 p-4 border border-zinc-900">
                  <span className="block text-lg font-bold font-display text-white">15+ J.</span>
                  <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest font-bold block mt-0.5">Prozesse</span>
                </div>
                <div className="bg-zinc-900/50 p-4 border border-zinc-900">
                  <span className="block text-lg font-bold font-display text-gold">100 %</span>
                  <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest font-bold block mt-0.5">Lösungsfokus</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* The 4 pillars from the graphic in elegant grid layout with scroll triggers */}
        <div className="mt-28 pt-16 border-t border-zinc-900">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-gold font-display block">
              Unsere Leitwerte
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white">
              Das Fundament einer exzellenten Partnerschaft
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Wir haben verstanden, worauf anspruchsvolle Mandanten wirklich Wert legen — verlässliche Maßstäbe für Ihren Erfolg.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => {
              const IconComp = p.icon;
              return (
                <motion.div
                  key={p.id}
                  className="bg-black p-6 border border-zinc-900 hover:border-gold/30 transition-all duration-300 flex flex-col justify-between"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="space-y-4">
                    {/* Golden top bar indicator & icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 border border-gold/20 flex items-center justify-center text-gold">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-gold font-bold px-2 py-0.5 bg-zinc-900/50 border border-zinc-900">
                        {p.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                        {p.title}
                      </h4>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Prompt action bottom */}
          <div className="mt-16 text-center">
            <button
              onClick={onStartConfigurator}
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold hover:text-white transition-colors cursor-pointer group"
            >
              <span>Jetzt herstellerneutrale Bedarfsanalyse anfordern</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
