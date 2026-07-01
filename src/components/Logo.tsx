import React from 'react';

interface LogoProps {
  variant?: 'emblem' | 'horizontal' | 'vertical' | 'footer-full';
  className?: string;
  iconSize?: string; // e.g. "w-10 h-10" or "w-16 h-16"
}

export default function Logo({ variant = 'horizontal', className = '', iconSize }: LogoProps) {
  // Ultra-luxurious rich gold gradient (warm premium palette)
  const gradientId = "gold-logo-grad";

  const goldGradient = (
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f7f1e5" />
        <stop offset="30%" stopColor="#ebd6ab" />
        <stop offset="55%" stopColor="#d5b265" />
        <stop offset="85%" stopColor="#7d6132" />
        <stop offset="100%" stopColor="#ebd6ab" />
      </linearGradient>
      
      {/* Premium subtle drop-shadow */}
      <filter id="gold-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#000" floodOpacity="0.75" />
      </filter>
    </defs>
  );

  // The circular "VM" Monogram emblem
  const Emblem = ({ size = "w-10 h-10" }) => (
    <svg 
      viewBox="0 0 100 100" 
      className={`${size} flex-shrink-0 transition-transform duration-300 drop-shadow-[0_2px_10px_rgba(213,178,101,0.2)]`}
      aria-hidden="true"
    >
      {goldGradient}
      {/* Outer elegant thin gold circle */}
      <circle 
         cx="50" 
         cy="50" 
         r="44" 
         fill="transparent" 
         stroke={`url(#${gradientId})`} 
         strokeWidth="2.8" 
         filter="url(#gold-shadow)"
      />
      {/* Centered Serif 'VM' text with elegant Cinzel design */}
      <text
        x="50"
        y="59"
        fontFamily='"Cinzel", "Times New Roman", Georgia, serif'
        fontSize="25"
        fontWeight="400"
        fill={`url(#${gradientId})`}
        textAnchor="middle"
        letterSpacing="-0.2"
      >
        VM
      </text>
    </svg>
  );

  if (variant === 'emblem') {
    return <Emblem size={iconSize || "w-10 h-10"} />;
  }

  // Vertical, large showcase style
  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <Emblem size={iconSize || "w-20 h-20 sm:w-24 sm:h-24"} />
        
        <div className="mt-4 space-y-1">
          <h1 
            className="font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase leading-none font-normal text-[#ebd6ab]"
            style={{ 
              fontFamily: '"Cinzel", "Times New Roman", Georgia, serif'
            }}
          >
            VON MORGEN
          </h1>
          <p 
            className="text-[9px] sm:text-[10px] tracking-[0.42em] uppercase font-serif font-light pt-1 text-[#d5b265]"
            style={{ 
              fontFamily: '"Cinzel", "Times New Roman", Georgia, serif'
            }}
          >
            — CONSULTING —
          </p>
        </div>
      </div>
    );
  }

  // Footer stacked full variant
  if (variant === 'footer-full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <Emblem size={iconSize || "w-11 h-11"} />
        <div className="flex flex-col items-center mt-2">
          <span 
            className="font-serif text-[13px] tracking-[0.18em] uppercase font-normal leading-none text-[#ebd6ab]"
            style={{ 
              fontFamily: '"Cinzel", "Times New Roman", Georgia, serif'
            }}
          >
            VON MORGEN
          </span>
          <span 
            className="text-[6.5px] tracking-[0.38em] uppercase font-serif font-light mt-1.5 text-[#d5b265]"
            style={{ 
              fontFamily: '"Cinzel", "Times New Roman", Georgia, serif'
            }}
          >
            — CONSULTING —
          </span>
        </div>
      </div>
    );
  }

  // DEFAULT / "horizontal" is beautifully stacked vertically as shown in premium photo representation
  return (
    <div className={`flex flex-col items-center text-center group ${className}`}>
      {/* Circle is placed beautifully ABOVE the text layout, with hover scale accentuation */}
      <Emblem size={iconSize || "w-11 h-11 sm:w-12 sm:h-12 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(213,178,101,0.35)] transition-all duration-300"} />
      
      <div className="flex flex-col items-center mt-1.5">
        <span 
          className="font-serif text-[11.5px] sm:text-[12.5px] tracking-[0.18em] uppercase font-normal leading-none text-[#ebd6ab] group-hover:text-[#f7f1e5] transition-colors duration-300"
          style={{ 
            fontFamily: '"Cinzel", "Times New Roman", Georgia, serif'
          }}
        >
          VON MORGEN
        </span>
        <span 
          className="text-[6.5px] sm:text-[7.2px] tracking-[0.38em] uppercase font-serif font-light mt-1.5 pl-[0.38em] text-[#d5b265] group-hover:text-[#ebd6ab] transition-colors duration-300"
          style={{ 
            fontFamily: '"Cinzel", "Times New Roman", Georgia, serif'
          }}
        >
          — CONSULTING —
        </span>
      </div>
    </div>
  );
}
