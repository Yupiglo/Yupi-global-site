"use client";

import Link from 'next/link';
import PortfolioCard from '../ui/PortfolioCard';
import { useLanguage } from '@/context/LanguageContext';

export default function Portfolio() {
    const { t } = useLanguage();

    const PORTFOLIO_DATA = [
        {
            title: t("Coastal health excellence mission.", "Mission excellence santé littoral."),
            category: t("Humanitarian action.", "Action humanitaire."),
            description: t("Deployment of a mobile care infrastructure for remote areas of the Beninese coast.", "Déploiement d'une infrastructure de soin mobile pour les zones reculées du littoral béninois."),
            image: "/media/2025/08/DSC_2321.jpg",
            className: "md:col-span-2 md:row-span-2",
            href: "/portfolio/excellence-littoral"
        },
        {
            title: t("Wellness innovation summit.", "Sommet innovation wellness."),
            category: t("Event.", "Événement."),
            description: t("Sharing expertise on new preventive care approaches during the Pan-African forum.", "Partage d'expertise sur les nouvelles approches de soins préventifs lors du forum panafricain."),
            image: "/media/2025/08/DSC_2290.jpg",
            className: "md:col-span-1 md:row-span-1",
            href: "/portfolio/innovation-wellness"
        },
        {
            title: t("Yupi medical alliance.", "Alliance médicale Yupi."),
            category: t("Partnership.", "Partenariat."),
            description: t("Signing strategic agreements for access to high-quality biological medicines.", "Signature d'accords stratégiques pour l'accès aux médicaments biologiques de haute qualité."),
            image: "/media/2025/08/DSC_2310.jpg",
            className: "md:col-span-1 md:row-span-1",
            href: "/portfolio/alliance-medicale"
        }
    ];

    return (
        <section className="relative py-12 lg:py-20 bg-[#FAFAFB] overflow-hidden">
            {/* Subtle Artistic Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-[30%] right-[-10%] h-[700px] w-[700px] rounded-full bg-brand-cyan/5 blur-[180px]" />
                <div className="absolute bottom-[10%] left-[-10%] h-[700px] w-[700px] rounded-full bg-brand-violet/5 blur-[180px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 lg:px-16">
                {/* Header aligned with Services style */}
                <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-20">
                    <div className="max-w-4xl">
                        <div className="mb-10 flex items-center gap-4">
                            <span className="h-px w-12 bg-brand-violet" />
                            <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">
                                {t("Our impact.", "Notre impact.")}
                            </span>
                        </div>
                        <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight">
                            {t("Transforming lives", "Transformer des vies")} <br />
                            <span className="text-brand-violet">{t("on the field.", "sur le terrain.")}</span>
                        </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-xl leading-relaxed text-gray-600 font-medium">
                            {t("Every project is a concrete commitment towards more accessible, more human, and more technological health.", "Chaque projet est un engagement concret vers une santé plus accessible, plus humaine et plus technologique.")}
                        </p>
                    </div>
                </div>

                {/* Staggered Cinematic Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 auto-rows-[450px]">
                    {PORTFOLIO_DATA.map((project, index) => (
                        <PortfolioCard
                            key={index}
                            index={index}
                            title={project.title}
                            category={project.category}
                            description={project.description}
                            image={project.image}
                            className={project.className}
                            href={project.href}
                        />
                    ))}
                </div>

                {/* Bottom Divider / Link Area */}
                <div className="mt-40 flex flex-col items-center">
                    <div className="mb-16 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center justify-center px-12 py-6 bg-brand-violet text-white rounded-full font-black text-lg uppercase tracking-widest hover:bg-brand-violet/90 transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] hover:-translate-y-1"
                    >
                        {t("Explore all missions.", "Explorer toutes les missions.")}
                    </Link>
                </div>
            </div>
        </section>
    );
}
