'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
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

          {/* Mobile Menu Button - Soft & Minimal */}
          <button
            className="lg:hidden relative z-[60] p-2 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-8 h-8 flex flex-col justify-center gap-1.5 transition-all duration-300">
              <span className={`h-[2px] w-full bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-[2px] w-full bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-2/3 ml-auto'}`} />
              <span className={`h-[2px] w-full bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
