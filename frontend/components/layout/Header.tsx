'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
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
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${isScrolled
        ? 'bg-dark-bg/90 backdrop-blur-md shadow-lg'
        : 'bg-dark-bg'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <NextImage
              src="/logos/yupi-blanc.webp"
              alt="Yupi Global"
              width={120}
              height={40}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Navigation />
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            {/* Market/Login */}
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-white">
              <Link href="https://yupimall.net" target="_blank" className="hover:text-brand-cyan transition-colors">
                Market
              </Link>
              <Link href="https://yupiaffiliate.com/" target="_blank" className="hover:text-brand-cyan transition-colors">
                Login
              </Link>
            </div>

            {/* Separator */}
            <div className="hidden md:block h-5 w-px bg-white/20"></div>

            {/* Language Selector */}
            <div className="hidden md:flex items-center gap-2">
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

            {/* Mobile Menu */}
            <button className="lg:hidden text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
