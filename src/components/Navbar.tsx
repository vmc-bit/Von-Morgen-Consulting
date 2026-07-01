import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Award, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface NavbarProps {
  onStartConfigurator: () => void;
  onPartnerBecome: () => void;
  onBookAppointment: () => void;
}

export default function Navbar({ onStartConfigurator, onPartnerBecome, onBookAppointment }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generalLinks = [
    { label: 'Über uns', href: '#ueber-uns' },
  ];

  const serviceLinks = [
    { label: 'Photovoltaik', href: '#photovoltaik' },
    { label: 'Wärmepumpen', href: '#waermepumpen' },
    { label: 'Strom & Gas', href: '#strom-gas' },
    { label: 'Immobilien', href: '#immobilien' },
  ];

  const trailingLinks = [
    { label: 'Spar-Rechner', href: '#rechner' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Unsere Partner', href: '#partner' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md md:py-3.5 py-4 border-b border-gold/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent md:py-6 py-5'
      }`}
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Monogram */}
        <a href="#" className="flex items-center group">
          <Logo variant="horizontal" />
        </a>

        {/* Desktop Web Nav Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* General Pre-Links */}
          {generalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold tracking-wider uppercase text-zinc-300 hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* Collapsible Dropdown "Leistungen" */}
          <div className="relative group py-2">
            <button className="flex items-center space-x-1 text-xs font-semibold tracking-wider uppercase text-zinc-300 group-hover:text-gold transition-colors duration-200 cursor-pointer focus:outline-none">
              <span>Leistungen</span>
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-zinc-950 border border-gold/20 shadow-[0_10px_50px_rgba(0,0,0,0.9)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-2">
              <div className="flex flex-col">
                {serviceLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2.5 text-[11px] font-semibold tracking-wider uppercase text-zinc-400 hover:text-black hover:bg-gold transition-all duration-200 border-b border-zinc-900/40 last:border-0"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* General Post-Links */}
          {trailingLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold tracking-wider uppercase text-zinc-300 hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA Action */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={onPartnerBecome}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-none border border-zinc-800 hover:border-gold/30 text-zinc-400 hover:text-white text-xs uppercase tracking-widest font-bold transition-all cursor-pointer"
          >
            Partner werden
          </button>
          <button
            onClick={onBookAppointment}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-none border border-gold/40 hover:border-gold text-gold hover:text-white text-xs uppercase tracking-widest font-bold transition-all cursor-pointer"
          >
            Termin buchen
          </button>
          <button
            onClick={onStartConfigurator}
            id="nav-cta-btn"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-none border border-gold bg-gold hover:bg-black text-black hover:text-gold text-xs uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(197,168,92,0.2)] hover:shadow-[0_0_20px_rgba(197,168,92,0.4)] transition-all duration-300 cursor-pointer"
          >
            Anfrage starten
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center space-x-3 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="p-2 text-zinc-400 hover:text-gold transition-colors focus:outline-none"
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 border-b border-gold/20 absolute top-full left-0 right-0 overflow-hidden"
          >
            <div className="px-5 pt-3 pb-6 space-y-4 shadow-2xl">
              {/* General Links (Über uns, Partner) */}
              {generalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-semibold tracking-wide uppercase text-zinc-300 hover:text-gold py-2.5 border-b border-zinc-900"
                >
                  {link.label}
                </a>
              ))}

              {/* Collapsible Mobile "Leistungen" */}
              <div className="border-b border-zinc-900 py-2.5">
                <button
                  onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                  className="w-full flex items-center justify-between text-sm font-semibold tracking-wide uppercase text-zinc-300 hover:text-gold focus:outline-none"
                >
                  <span>Leistungen</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileServicesExpanded ? 'rotate-180 text-gold' : 'text-zinc-500'}`} />
                </button>
                <AnimatePresence initial={false}>
                  {mobileServicesExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2.5 space-y-3.5 overflow-hidden border-l border-zinc-900"
                    >
                      {serviceLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileServicesExpanded(false);
                          }}
                          className="block text-xs font-semibold tracking-wider uppercase text-zinc-400 hover:text-gold"
                        >
                          {link.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Trailing Links (Spar-Rechner, FAQ) */}
              {trailingLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-semibold tracking-wide uppercase text-zinc-300 hover:text-gold py-2.5 border-b border-zinc-900"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStartConfigurator();
                  }}
                  id="mobile-nav-cta-btn"
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-gold border border-gold text-black uppercase tracking-wider font-bold text-xs"
                >
                  Anfrage starten
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookAppointment();
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-zinc-950 border border-gold/30 hover:border-gold text-gold hover:text-white uppercase tracking-wider font-bold text-xs"
                >
                  Termin jetzt buchen 📅
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onPartnerBecome();
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-zinc-950 border border-white/20 text-white uppercase tracking-wider font-semibold text-[11px]"
                >
                  Partner werden
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
