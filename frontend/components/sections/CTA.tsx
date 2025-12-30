"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function CTA() {
    const { t } = useLanguage();
    return (
        <section className="relative py-12 lg:py-20 bg-dark-bg overflow-hidden">
            {/* Cinematic Background Atmosphere (matches Hero) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1200px] rounded-full bg-brand-violet/20 blur-[200px]" />
                <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-brand-cyan/10 blur-[150px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 lg:px-16 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 flex items-center justify-center gap-4">
                        <span className="h-[1px] w-12 bg-brand-cyan" />
                        <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-cyan">
                            {t("Join the elite.", "Rejoignez l'élite.")}
                        </span>
                        <span className="h-[1px] w-12 bg-brand-cyan" />
                    </div>

                    <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-12">
                        {t("Ready to transform your", "Prêt à transformer votre")} <br />
                        <span className="text-brand-violet">{t("vision of health?", "vision de la santé ?")}</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-400 font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
                        {t("Become a Yupi Global member and access a universe where technology and wellness become one.", "Devenez membre yupi global et accédez à un univers où la technologie et le bien-être ne font qu'un.")}
                    </p>

                    <Link
                        href="https://yupiaffiliate.com/SignUp.aspx"
                        target="_blank"
                        className="inline-flex items-center justify-center px-12 py-6 bg-brand-violet text-white rounded-full font-black text-lg uppercase tracking-widest hover:bg-brand-violet/90 transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] hover:-translate-y-1"
                    >
                        {t("Become a member.", "Devenir membre.")}
                    </Link>

                    {/* Final Signature Line */}
                    <div className="mt-24 opacity-20">
                        <p className="font-sans text-xs font-black uppercase tracking-[0.8em] text-white">
                            {t("Yupi Global • Health Excellence • Africa", "Yupi Global • Excellence Santé • Afrique")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
