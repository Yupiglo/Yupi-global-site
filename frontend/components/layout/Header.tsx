'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${isScrolled || isMobileMenuOpen
        ? 'bg-dark-bg/90 backdrop-blur-md shadow-lg'
        : 'bg-dark-bg'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            <NextImage
              src="/logos/yupi-blanc.png"
              alt="Yupi Global"
              width={120}
              height={40}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Navigation />
          </nav>

          {/* Actions (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Market/Login */}
            <div className="flex items-center space-x-6 text-sm font-medium text-white">
              <Link href="https://yupimall.net" target="_blank" className="hover:text-brand-cyan transition-colors">
                Market
              </Link>
              <Link href="https://yupiaffiliate.com/" target="_blank" className="hover:text-brand-cyan transition-colors">
                Login
              </Link>
            </div>

            {/* Separator */}
            <div className="h-5 w-px bg-white/20"></div>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs font-black tracking-widest transition-colors ${language === 'en' ? 'text-brand-cyan' : 'text-white/50 hover:text-white'}`}
              >
                EN
              </button>
              <span className="text-white/20 text-xs">|</span>
              <button
                onClick={() => setLanguage('fr')}
                className={`text-xs font-black tracking-widest transition-colors ${language === 'fr' ? 'text-brand-cyan' : 'text-white/50 hover:text-white'}`}
              >
                FR
              </button>
            </div>

            {/* CTA */}
            <Link
              href="https://yupiaffiliate.com/SignUp.aspx"
              target="_blank"
              className="inline-flex items-center justify-center px-8 py-3 bg-brand-violet text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-brand-violet/90 transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:-translate-y-0.5"
            >
              {t('Become a member.', 'Devenez membre.')}
            </Link>
          </div>

          {/* Mobile Menu Button - Premium Style */}
          <button
            className="lg:hidden relative z-[60] p-1 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`h-12 w-12 rounded-full flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border backdrop-blur-md ${isMobileMenuOpen ? 'bg-brand-violet/20 border-brand-violet/50' : 'bg-white/10 border-white/20 hover:bg-brand-violet hover:border-brand-violet'}`}>
              <span className={`h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 w-4 rounded-full bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'group-hover:w-6'}`} />
              <span className={`h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Deep Cinematic Background */}
      <div className={`fixed inset-0 bg-black/95 z-[55] transition-all duration-500 lg:hidden flex flex-col pt-32 px-6 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[20px] pointer-events-none'
        }`}>
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-violet/10 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cyan/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <nav className="flex flex-col gap-6 text-center relative z-10">
          <Link
            href="/"
            className="text-3xl font-black text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-cyan hover:to-brand-violet transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('Home', 'Accueil')}
          </Link>
          <Link
            href="/about"
            className="text-3xl font-black text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-cyan hover:to-brand-violet transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('About', 'À propos')}
          </Link>
          <Link
            href="/services"
            className="text-3xl font-black text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-cyan hover:to-brand-violet transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('Services', 'Services')}
          </Link>
          <Link
            href="/portfolio"
            className="text-3xl font-black text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-cyan hover:to-brand-violet transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('Portfolio', 'Réalisations')}
          </Link>
          <Link
            href="/news"
            className="text-3xl font-black text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-cyan hover:to-brand-violet transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('News', 'Actualités')}
          </Link>

          <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto my-6" />

          <div className="flex flex-col gap-6 items-center">
            <div className="flex gap-8 text-base font-bold text-white/70">
              <Link href="https://yupimall.net" target="_blank" className="hover:text-brand-cyan transition-colors">Market</Link>
              <Link href="https://yupiaffiliate.com/" target="_blank" className="hover:text-brand-cyan transition-colors">Login</Link>
            </div>

            <div className="flex items-center gap-3 py-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${language === 'en' ? 'border-brand-cyan text-brand-cyan bg-brand-cyan/10' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${language === 'fr' ? 'border-brand-cyan text-brand-cyan bg-brand-cyan/10' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'}`}
              >
                Français
              </button>
            </div>

            <Link
              href="https://yupiaffiliate.com/SignUp.aspx"
              target="_blank"
              className="w-full max-w-xs py-5 bg-gradient-to-r from-brand-violet to-brand-violet/80 text-white rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-brand-violet/20 hover:shadow-brand-violet/40 hover:-translate-y-1 transition-all mt-4"
            >
              {t('Become a member', 'Devenir membre')}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
