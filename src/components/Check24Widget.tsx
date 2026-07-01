import React, { useEffect, useState } from 'react';
import { ShieldCheck, HelpCircle, Loader2 } from 'lucide-react';

export default function Check24Widget() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Reset check24 iframe container content if any previous residue existed
    const targetDiv = document.getElementById('c24pp-power-iframe');
    if (targetDiv) {
      targetDiv.innerHTML = '';
    }

    // 2. Set timeout to stop placeholder loading state after 2.2 seconds (or on script load)
    const loadTimeout = setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    }, 2200);

    // 3. Remove old scripts with the same target source to avoid duplicated listeners
    const oldScripts = document.querySelectorAll('script[src*="c24pp-power-iframe"]');
    oldScripts.forEach((s) => s.remove());

    // 4. Create the script element
    const script = document.createElement('script');
    script.src = 'https://files.check24.net/widgets/auto/1012589/c24pp-power-iframe/power-iframe.js';
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      if (isMounted) {
        setIsLoading(false);
        // Prevent duplicate iframe copies injected by double-triggering widgets
        setTimeout(() => {
          const container = document.getElementById('c24pp-power-iframe');
          if (container && container.children.length > 1) {
            const arr = Array.from(container.children);
            arr.slice(1).forEach((el) => el.remove());
          }
        }, 200);
      }
    };

    // 5. Append package script
    document.body.appendChild(script);

    return () => {
      isMounted = false;
      clearTimeout(loadTimeout);
      // Clean up the script tag on unmount to prevent duplicated script tag leaks
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="check24-comparison-wrapper" className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-4 md:p-6 my-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden text-center">
      {/* Decorative premium accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-zinc-900 via-gold/50 to-zinc-900" />
      
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pb-4 border-b border-zinc-900/80 mb-6">
        <div className="flex items-center space-x-3 text-left">
          <div className="w-10 h-10 bg-[#ff5a00]/10 border border-[#ff5a00]/30 rounded-lg flex items-center justify-center font-bold text-[#ff5a00] font-sans text-xs tracking-tighter">
            C24
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#ff5a00] font-bold flex items-center">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse" />
              INTEGRIERTER VERGLEICHSRECHNER
            </span>
            <h4 className="font-serif text-sm text-white mt-0.5">Offizieller Check24 Tarif-Vergleichspartner</h4>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-[10px] bg-zinc-900/80 text-zinc-400 border border-zinc-800 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Sichere SSL-Schnittstelle</span>
        </div>
      </div>

      {/* Description callout */}
      <div className="text-zinc-400 text-xs text-left max-w-3xl leading-relaxed mb-6 bg-zinc-900/30 p-4 border border-zinc-900 rounded-lg flex items-start gap-3">
        <HelpCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
        <p>
          <strong>HINWEIS:</strong> Berechnen Sie hier direkt im integrierten Widget Ihre Strom- &amp; Gasersparnisse. Als Ihr vertrauenswürdiger, herstellerunabhängiger Makler unterstützen wir Sie auf Wunsch bei allen Details oder übernehmen die Kündigungen vollständig für Sie.
        </p>
      </div>

      {/* LOADING STATE PLACEHOLDER */}
      {isLoading && (
        <div className="w-full min-h-[450px] bg-zinc-900/10 border border-dashed border-zinc-900 flex flex-col items-center justify-center space-y-4 rounded-xl py-12">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
          <p className="text-xs text-zinc-400 font-mono">Lade sicheren Check24-Vergleichsrechner ...</p>
        </div>
      )}

      {/* CHECK24 WIDGET ANCHOR */}
      <div className={`${isLoading ? 'hidden' : 'block'} w-full transition-all duration-500`}>
        <div 
          style={{ width: '100%', minHeight: '600px' }} 
          id="c24pp-power-iframe" 
          data-scrollto="begin"
        />
      </div>

      {/* Safety footprint */}
      <div className="mt-4 pt-4 border-t border-zinc-900/60 text-[9px] text-zinc-500 font-mono flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>Gelistete Tarife inkl. gesetzlicher Energiepreissiegel</span>
        <span>Keinerlei Unterbrechungsgefahr beim Anbieterwechsel</span>
      </div>
    </div>
  );
}
