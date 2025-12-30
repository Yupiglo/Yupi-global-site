'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { language, setLanguage, t } = useLanguage();

    // Block body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Handle escape key (even if not visible on mobile, it's good practice for accessibility)
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div
            className={`fixed inset-0 bg-[#0f172a] z-[55] transition-all duration-500 lg:hidden flex flex-col pt-32 px-6 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
                }`}
        >
            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-violet/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cyan/10 blur-[100px] rounded-full mix-blend-screen" />
            </div>

            <nav className="flex flex-col gap-6 text-center relative z-10">
                <Link
                    href="/"
                    className="text-3xl font-black text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-cyan hover:to-brand-violet transition-all"
                    onClick={onClose}
                >
                    {t('Home', 'Accueil')}
                </Link>
                <Link
                    href="/about"
                    className="text-3xl font-black text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-cyan hover:to-brand-violet transition-all"
                    onClick={onClose}
                >
                    {t('About', 'À propos')}
                </Link>
                <Link
                    href="/services"
                    className="text-3xl font-black text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-cyan hover:to-brand-violet transition-all"
                    onClick={onClose}
                >
                    {t('Services', 'Services')}
                </Link>
                <Link
                    href="/portfolio"
                    className="text-3xl font-black text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-cyan hover:to-brand-violet transition-all"
                    onClick={onClose}
                >
                    {t('Portfolio', 'Réalisations')}
                </Link>
                <Link
                    href="/news"
                    className="text-3xl font-black text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-brand-cyan hover:to-brand-violet transition-all"
                    onClick={onClose}
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
    );
}
