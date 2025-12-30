"use client";

import Link from 'next/link';
import LiquidEther from '../ui/LiquidEther';
import { Reveal } from '../ui/Reveal';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();
    return (
        <div className="container mx-auto px-4 md:px-6 mt-4">
            <section className="relative bg-dark-bg w-full rounded-[3rem] pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden min-h-[85vh] flex flex-col justify-center">
                {/* Background decoration: LiquidEther */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                    <LiquidEther
                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                        mouseForce={20}
                        cursorSize={100}
                        isViscous={false}
                        viscous={30}
                        iterationsViscous={32}
                        iterationsPoisson={32}
                        resolution={0.5}
                        isBounce={false}
                        autoDemo={true}
                        autoSpeed={0.5}
                        autoIntensity={2.2}
                        takeoverDuration={0.25}
                        autoResumeDelay={3000}
                        autoRampDuration={0.6}
                    />
                </div>

                {/* Geometric Shapes: Inward Rounded Bottom Corners (Cutouts) */}
                {/* Left side is now standard rounded (convex) via CSS class above. Only Right side remains concave (cutout). */}
                {/* Fixed Ratio: 8rem (32 * 0.25rem = 128px) Size = 8rem Radius for perfect curve */}
                {/* Custom Geometric Shape: Hill/Wave with Clock Icon */}
                <div className="absolute bottom-0 right-10 md:right-20 z-10 hidden md:block">
                    <svg width="275" height="73" viewBox="0 0 275 73" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                        <path fillRule="evenodd" clipRule="evenodd" d="M202.035 36.2937C213.26 54.7306 230.094 73 251.679 73H510C531.539 73 549 90.4609 549 112C549 133.539 531.539 151 510 151H137.5H-236C-257.539 151 -275 133.539 -275 112C-275 90.4609 -257.539 73 -236 73H23.3208C44.9059 73 61.7402 54.7306 72.9649 36.2937C86.2137 14.5322 110.16 0 137.5 0C164.84 0 188.786 14.5322 202.035 36.2937Z" fill="white" />
                        <path d="M127.333 39.6667V34.3333C127.333 28.4423 132.109 23.6667 138 23.6667C143.891 23.6667 148.667 28.4423 148.667 34.3333V39.6667C148.667 45.5577 143.891 50.3333 138 50.3333C132.109 50.3333 127.333 45.5577 127.333 39.6667Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                        <path d="M138 28L138 37" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                {/* Mobile version - smaller or simplified if needed, for now hiding on small screens or adjusting */}
                <div className="absolute bottom-0 right-4 z-10 md:hidden scale-75 origin-bottom-right">
                    <svg width="275" height="73" viewBox="0 0 275 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M202.035 36.2937C213.26 54.7306 230.094 73 251.679 73H510C531.539 73 549 90.4609 549 112C549 133.539 531.539 151 510 151H137.5H-236C-257.539 151 -275 133.539 -275 112C-275 90.4609 -257.539 73 -236 73H23.3208C44.9059 73 61.7402 54.7306 72.9649 36.2937C86.2137 14.5322 110.16 0 137.5 0C164.84 0 188.786 14.5322 202.035 36.2937Z" fill="white" />
                        <path d="M127.333 39.6667V34.3333C127.333 28.4423 132.109 23.6667 138 23.6667C143.891 23.6667 148.667 28.4423 148.667 34.3333V39.6667C148.667 45.5577 143.891 50.3333 138 50.3333C132.109 50.3333 127.333 45.5577 127.333 39.6667Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                        <path d="M138 28L138 37" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative z-10 w-full mb-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Reveal delay={0.1} width="100%">
                            <div className="mb-12 flex items-center justify-center gap-4">
                                <span className="h-[1px] w-12 bg-brand-cyan" />
                                <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-cyan">
                                    {t('Innovation & wellness.', 'Innovation & bien-être.')}
                                </span>
                                <span className="h-[1px] w-12 bg-brand-cyan" />
                            </div>
                        </Reveal>

                        <Reveal delay={0.3} width="100%">
                            <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-12">
                                {t('Welcome to', 'Bienvenue chez')} <br />
                                <span className="text-brand-violet">yupi global.</span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.5} width="100%">
                            <p className="text-xl md:text-2xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                                {t('Your trusted partner for premium health and wellness solutions.', 'Votre partenaire de confiance pour des solutions de santé et de bien-être de qualité supérieure.')}
                            </p>
                        </Reveal>

                        <Reveal delay={0.7} direction="up" distance={20} width="100%">
                            <div className="flex flex-col sm:flex-row gap-8 justify-center">
                                <Link
                                    href="/services"
                                    className="inline-flex items-center justify-center px-10 py-5 bg-brand-violet text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-brand-violet/90 transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[10_0_60px_rgba(124,58,237,0.6)] hover:-translate-y-1"
                                >
                                    {t('Explore our services', 'Explorer nos services')}
                                </Link>
                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center justify-center px-10 py-5 border-2 border-white/10 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/10 hover:border-white transition-all hover:-translate-y-1"
                                >
                                    {t('Contact us', 'Nous contacter')}
                                </Link>
                            </div>
                        </Reveal>
                    </div>

                </div>
            </section>
        </div>
    );
}
