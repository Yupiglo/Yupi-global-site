"use client";

import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { useLanguage } from '@/context/LanguageContext';

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { t } = useLanguage();
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 lg:py-48 bg-dark-bg overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-brand-violet/20 blur-[150px]" />
        </div>

        <div className="max-w-[1700px] mx-auto px-6 lg:px-16 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-brand-cyan text-xs font-black uppercase tracking-widest mb-12 hover:gap-4 transition-all"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m4-7H3" /></svg>
            {t("Back to services", "Retour aux services")}
          </Link>

          <Reveal width="100%">
            <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight capitalize">
              {params.slug.replace(/-/g, ' ')}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 lg:py-40">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-16">
          <div className="max-w-4xl">
            <Reveal delay={0.2}>
              <div className="prose prose-xl prose-slate max-w-none font-medium text-gray-600 leading-relaxed">
                <p className="text-2xl font-black text-gray-900 mb-12 border-l-4 border-brand-violet pl-8">
                  {t("Service details being deployed. This section will soon be enriched with dynamic data from the API.", "Détails du service en cours de déploiement. Cette section sera prochainement enrichie avec les données dynamiques de l'API.")}
                </p>
                <div className="space-y-8">
                  <p>
                    {t(`We are currently working on the full integration of our ${params.slug} solutions to offer you an unprecedented user experience, combining cutting-edge technology and traditional wisdom.`, `Nous travaillons actuellement à l'intégration complète de nos solutions ${params.slug} pour vous offrir une expérience utilisateur sans précédent, alliant technologie de pointe et sagesse traditionnelle.`)}
                  </p>
                  <p>
                    {t("Each Yupi Global service is designed with meticulous attention to detail, ensuring that you receive only the excellence you deserve.", "Chaque service Yupi Global est conçu avec une attention méticuleuse aux détails, garantissant que vous receviez uniquement l'excellence que vous méritez.")}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4} className="mt-20">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-10 py-5 bg-brand-violet text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-brand-violet/90 transition-all shadow-xl hover:-translate-y-1"
              >
                {t("Learn more about this service", "En savoir plus sur ce service")}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

