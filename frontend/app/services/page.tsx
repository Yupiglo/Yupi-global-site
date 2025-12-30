"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { useLanguage } from '@/context/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();
  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero Section (The Entrance) */}
      <section className="relative py-32 lg:py-64 bg-dark-bg overflow-hidden flex items-center min-h-[80vh]">
        {/* Atmospheric Cinematic Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[1300px] rounded-full bg-brand-violet/20 blur-[200px]" />
          <div className="absolute bottom-0 right-1/4 h-[700px] w-[700px] rounded-full bg-brand-cyan/15 blur-[150px]" />
        </div>

        <div className="max-w-[1700px] mx-auto px-6 relative z-10 lg:px-16 text-center w-full">
          <div className="max-w-5xl mx-auto">
            <Reveal width="100%">
              <div className="mb-12 flex items-center justify-center gap-4">
                <span className="h-[1px] w-12 bg-gray-600" />
                <span className="text-xs font-black uppercase tracking-[0.5em] text-gray-400">
                  {t("Yupi Excellence.", "L'excellence Yupi.")}
                </span>
                <span className="h-[1px] w-12 bg-brand-cyan" />
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.2}>
              <h1 className="font-sans text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-[1] mb-12">
                {t("Elite health &", "L'élite de la santé &")} <br />
                <span className="text-brand-violet">{t("financial freedom.", "la liberté financière.")}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.4} width="100%">
              <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
                {t("A unique opportunity to transform your life through Ayurvedic excellence and a shared success model.", "Une opportunité unique de transformer votre vie grâce à l'excellence ayurvédique et un modèle de réussite partagée.")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Philosophy Section (The Core) */}
      <section className="py-32 lg:py-56 bg-white overflow-hidden relative">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
          <div className="absolute top-[10%] right-[-5%] h-[800px] w-[800px] rounded-full bg-brand-violet blur-[120px]" />
        </div>

        <div className="max-w-[1700px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-center">
            {/* Image Column */}
            <Reveal direction="left" width="100%" className="order-1 lg:order-2">
              <div className="relative h-[400px] lg:h-[700px] rounded-[2.5rem] overflow-hidden shadow-3xl shadow-brand-violet/10">
                <Image
                  src="/media/services/health_premium.webp"
                  alt="Consultation Santé"
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
              </div>
            </Reveal>

            <div className="space-y-12 order-2 lg:order-1">
              <Reveal direction="right" width="100%">
                <div className="flex items-center gap-4 mb-8">
                  <span className="h-px w-12 bg-brand-violet" />
                  <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">
                    {t("Collective Growth", "Croissance Collective")}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.2} direction="right" width="100%">
                <h2 className="font-sans text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-8">
                  {t("The power of the", "La force du")} <br />
                  <span className="text-brand-violet">{t("Yupi network.", "réseau Yupi.")}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.4} direction="right" width="100%">
                <p className="text-xl text-gray-600 font-medium leading-relaxed mb-12 max-w-xl">
                  {t("Independence doesn't mean loneliness. By joining Yupi Global, you integrate a community of caring leaders, ready to share their strategies and experience.", "L'indépendance ne signifie pas la solitude. En rejoignant Yupi Global, vous intégrez une communauté de leaders bienveillants, prêts à partager leurs stratégies et leur expérience.")}
                  <br /><br />
                  {t("Benefit from exclusive training, turnkey marketing tools, and a proven mentoring system to accelerate your success.", "Bénéficiez de formations exclusives, d'outils marketing clés en main et d'un système de mentorat éprouvé pour accélérer votre réussite.")}
                </p>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Reveal delay={0.6} direction="up" width="100%">
                  <div className="p-10 rounded-3xl bg-gray-50 border border-gray-100 h-full transition-all hover:shadow-xl hover:shadow-brand-violet/5 group">
                    <h3 className="text-lg font-black text-gray-900 mb-6 group-hover:text-brand-violet transition-colors">{t("Pure science.", "Science pure.")}</h3>
                    <div className="h-16 w-16 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg relative mb-6">
                      <Image src="/media/services/avatar1.webp" alt="Leader" className="object-cover" fill sizes="64px" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">{t("Constant innovation based on the thousand-year treasures of Ayurveda.", "Une innovation constante basée sur les trésors millénaires de l'ayurvéda.")}</p>
                  </div>
                </Reveal>
                <Reveal delay={0.7} direction="up" width="100%">
                  <div className="p-10 rounded-3xl bg-gray-50 border border-gray-100 h-full transition-all hover:shadow-xl hover:shadow-brand-cyan/5 group">
                    <h3 className="text-lg font-black text-gray-900 mb-6 group-hover:text-brand-cyan transition-colors">{t("Natural essence.", "Essence naturelle.")}</h3>
                    <div className="h-16 w-16 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg relative mb-6">
                      <Image src="/media/services/avatar2.webp" alt="Leader" className="object-cover" fill sizes="64px" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">{t("Pure plant extracts and organic solutions coming directly from our earth.", "Des extraits végétaux purs et des solutions organiques issues directement de notre terre.")}</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Expanded Bento Services Grid */}
      <section className="relative py-32 lg:py-56 bg-white overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-[20%] right-[-10%] h-[700px] w-[700px] rounded-full bg-brand-cyan/5 blur-[180px]" />
          <div className="absolute bottom-[20%] left-[-10%] h-[700px] w-[700px] rounded-full bg-brand-violet/5 blur-[180px]" />
        </div>

        <div className="max-w-[1700px] mx-auto px-6 relative z-10 lg:px-16">
          <div className="mb-32 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-20">
            <div className="max-w-4xl">
              <Reveal width="100%">
                <div className="mb-10 flex items-center gap-4">
                  <span className="h-px w-12 bg-brand-violet" />
                  <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">
                    {t("Our Expertise", "Nos Expertises")}
                  </span>
                </div>
                <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight">
                  {t("Three pillars for", "Trois piliers pour")} <br />
                  <span className="text-brand-violet">{t("a redefined life.", "une vie redéfinie.")}</span>
                </h2>
              </Reveal>
            </div>
            <div className="max-w-xl">
              <Reveal width="100%" delay={0.2}>
                <p className="text-2xl leading-relaxed text-gray-600 font-medium lg:text-right">
                  {t("The perfect harmony between elite health, entrepreneurial freedom, and digital innovation.", "L'harmonie parfaite entre la santé d'élite, la liberté entrepreneuriale et l'innovation digitale.")}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 auto-rows-[400px]">
            {/* 1. Produits Premium */}
            <Reveal fullHeight width="100%" className="md:col-span-2 md:row-span-2">
              <div className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl h-full border border-gray-100">
                <Image src="/media/2025/01/alka-plus22.jpg" alt="Produits Premium" className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-12 w-full">
                  <span className="inline-block px-4 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-brand-violet text-[10px] font-black uppercase tracking-widest mb-4">{t("Product Excellence", "Excellence produit")}</span>
                  <h3 className="text-4xl font-black text-white mb-4">{t("Premium health.", "Santé haut de gamme.")}</h3>
                  <p className="text-gray-300 font-medium max-w-lg mb-8 text-lg">{t("Certified Ayurvedic solutions, designed to bring tangible results and transform your daily well-being.", "Des solutions ayurvédiques certifiées, conçues pour apporter des résultats tangibles et transformer votre bien-être quotidien.")}</p>
                  <Link href="/services/produits" className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-xs group/link bg-brand-violet/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 hover:bg-brand-violet transition-all">
                    {t("Discover the range", "Découvrir la gamme")}
                    <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m4-7H3" /></svg>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* 2. Marketing Relationnel */}
            <Reveal delay={0.2} fullHeight width="100%">
              <div className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl h-full border border-gray-100">
                <Image src="/media/2025/01/happy-business-team-greeting-someone-meeting.webp" alt="Marketing Relationnel" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-1000" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw" />
                <div className="absolute inset-0 bg-brand-violet/40 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <h3 className="text-2xl font-black text-white transition-colors">{t("Relational marketing.", "Marketing relationnel.")}</h3>
                  <p className="text-white/80 font-medium text-sm mt-2 transition-colors">{t("Grow your business through sharing and the power of the collective network.", "Développez votre entreprise par le partage et la puissance du réseau collectif.")}</p>
                </div>
              </div>
            </Reveal>

            {/* 3. Stabilité Financière */}
            <Reveal delay={0.4} fullHeight width="100%">
              <div className="group relative overflow-hidden rounded-[2.5rem] bg-dark-bg shadow-2xl h-full border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/20 to-brand-cyan/20 blur-3xl opacity-50" />
                <div className="absolute inset-0 p-10 flex flex-col justify-center items-center text-center">
                  <div className="mb-6 h-20 w-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <svg className="w-10 h-10 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-2xl font-black text-white">{t("Freedom & stability.", "Liberté & stabilité.")}</h3>
                  <p className="text-gray-400 font-medium text-base mt-4">{t("A generous compensation plan to lastingly secure your financial future.", "Un plan de compensation généreux pour sécuriser durablement votre futur financier.")}</p>
                </div>
              </div>
            </Reveal>

            {/* 4. Leadership & Formation */}
            <Reveal delay={0.5} fullHeight width="100%" className="md:row-span-2">
              <div className="group relative overflow-hidden rounded-[2.5rem] bg-dark-bg shadow-2xl h-full border border-white/5">
                <Image src="/media/2021/11/h3-team1.jpg" alt="Leadership" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
                  <span className="text-brand-cyan text-[10px] font-black uppercase tracking-widest mb-4 inline-block">{t("Leader Support", "Accompagnement Leader")}</span>
                  <h3 className="text-3xl font-black text-white">{t("Success mentorship.", "Mentorat de réussite.")}</h3>
                  <p className="text-gray-400 font-medium text-base mt-4 mb-8">{t("Benefit from continuous training to become an accomplished leader within our industry.", "Profitez d'une formation continue pour devenir un leader accompli au sein de notre industrie.")}</p>
                  <Link href="/#contact" className="h-14 w-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all group/btn">
                    <svg className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m4-7H3" /></svg>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* 5. Écosystème Digital */}
            <Reveal delay={0.6} fullHeight width="100%">
              <div className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl h-full border border-gray-100">
                <Image src="/media/2025/01/Untitled-design-24.png" alt="Outils Digitaux" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw" />
                <div className="absolute inset-0 p-10 flex flex-col justify-between">
                  <div className="h-14 w-14 bg-brand-violet/10 rounded-2xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-brand-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">{t("Growth tools.", "Outils de croissance.")}</h3>
                    <p className="text-gray-500 font-medium text-base mt-2">{t("Your virtual office and all your marketing tools at your fingertips.", "Votre bureau virtuel et tous vos outils marketing à portée de main.")}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 6. Conciergerie Business */}
            <Reveal delay={0.7} fullHeight width="100%">
              <div className="group relative overflow-hidden rounded-[2.5rem] bg-brand-violet text-white shadow-2xl h-full">
                <div className="absolute inset-0 p-10 flex flex-col justify-center text-center">
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6">{t("Business conciergerie", "Conciergerie")} <br /> {t("de luxe.", "business de luxe.")}</h3>
                  <div className="h-[2px] w-12 bg-white/30 mx-auto mb-8" />
                  <p className="text-white/90 font-medium text-base">{t("VIP support for ambitious entrepreneurs aiming for the top.", "Un accompagnement VIP pour les entrepreneurs ambitieux qui visent le sommet.")}</p>
                  <Link href="https://yupiaffiliate.com/SignUp.aspx" target="_blank" className="mt-10 mx-auto px-10 py-4 border-2 border-white/20 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-brand-violet transition-all">{t("Become a partner", "Devenir partenaire")}</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. The Ritual Process Section */}
      <section className="py-32 lg:py-56 bg-white overflow-hidden relative">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-32 space-y-8">
            <Reveal width="100%">
              <div className="flex justify-center items-center gap-4">
                <span className="h-px w-12 bg-brand-violet" />
                <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">{t("The Journey", "Le Cheminement")}</span>
                <span className="h-px w-12 bg-brand-violet" />
              </div>
            </Reveal>
            <Reveal width="100%" delay={0.2}>
              <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight">
                {t("The Yupi", "Le modèle de")} <span className="text-brand-violet">{t("success model.", "réussite Yupi.")}</span>
              </h2>
            </Reveal>
            <Reveal width="100%" delay={0.4}>
              <p className="text-2xl text-gray-500 max-w-3xl mx-auto font-medium">{t("A strategic three-step journey to build your health and independence.", "Un cheminement stratégique en trois étapes pour bâtir votre santé et votre indépendance.")}</p>
            </Reveal>
          </div>

          <Reveal width="100%" delay={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 lg:gap-32">
              {/* Step 1 */}
              <div className="relative group text-center space-y-12">
                <div className="relative inline-block">
                  <span className="text-[12rem] font-black text-gray-100/50 leading-none group-hover:text-brand-violet/10 transition-colors">01</span>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-32 w-32 rounded-full bg-white shadow-2xl flex items-center justify-center border border-gray-50 group-hover:scale-110 transition-transform">
                      <svg className="w-12 h-12 text-brand-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-3xl font-black text-gray-900 uppercase">{t("Health immersion.", "Immersion santé.")}</h3>
                  <div className="h-1 w-12 bg-brand-violet/20 mx-auto" />
                  <p className="text-gray-500 text-lg font-medium leading-relaxed">{t("Discover our exceptional products and feel the immediate benefits on your own vitality.", "Découvrez nos produits d'exception et ressentez les bienfaits immédiats sur votre propre vitalité.")}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group text-center space-y-12">
                <div className="relative inline-block">
                  <span className="text-[12rem] font-black text-gray-100/50 leading-none group-hover:text-brand-cyan/10 transition-colors">02</span>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-32 w-32 rounded-full bg-white shadow-2xl flex items-center justify-center border border-gray-50 group-hover:scale-110 transition-transform">
                      <svg className="w-12 h-12 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-3xl font-black text-gray-900 uppercase">{t("Sharing & Network.", "Partage & réseau.")}</h3>
                  <div className="h-1 w-12 bg-brand-cyan/20 mx-auto" />
                  <p className="text-gray-500 text-lg font-medium leading-relaxed">{t("Learn to build your own community by sharing the excellence and core values of Yupi.", "Apprenez à bâtir votre propre communauté en partageant l'excellence et les valeurs fondamentales de Yupi.")}</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group text-center space-y-12">
                <div className="relative inline-block">
                  <span className="text-[12rem] font-black text-gray-100/50 leading-none group-hover:text-brand-violet/10 transition-colors">03</span>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-32 w-32 rounded-full bg-white shadow-2xl flex items-center justify-center border border-gray-50 group-hover:scale-110 transition-transform">
                      <svg className="w-12 h-12 text-brand-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-3xl font-black text-gray-900 uppercase">{t("Success & Freedom.", "Succès & liberté.")}</h3>
                  <div className="h-1 w-12 bg-brand-violet/20 mx-auto" />
                  <p className="text-gray-500 text-lg font-medium leading-relaxed">{t("Access lasting financial stability and become a true leader of change in Africa.", "Accédez à une stabilité financière durable et devenez un véritable leader du changement en Afrique.")}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Final CTA Section */}
      <section className="relative py-32 lg:py-64 bg-dark-bg overflow-hidden text-center min-h-[60vh] flex items-center">
        {/* Deep Atmospheric Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1500px] rounded-full bg-brand-violet/20 blur-[250px]" />
        </div>

        <div className="max-w-[1700px] mx-auto px-6 relative z-10 lg:px-16 w-full">
          <div className="max-w-5xl mx-auto space-y-16">
            <Reveal width="100%">
              <h2 className="font-sans text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none">
                {t("A complete offer", "Une offre complète")} <br />
                <span className="text-brand-violet">{t("for your balance.", "pour votre équilibre.")}</span>
              </h2>
            </Reveal>
            <Reveal width="100%" delay={0.2}>
              <p className="text-2xl md:text-3xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
                {t("From personalized health solutions to business opportunities, we have designed a unique ecosystem for your success.", "Des solutions de santé personnalisées aux opportunités d'affaires, nous avons conçu un écosystème unique pour votre réussite.")}
              </p>
            </Reveal>
            <Reveal delay={0.4} width="100%">
              <div className="pt-12">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-16 py-8 bg-brand-violet text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-brand-violet/90 transition-all shadow-[0_0_50px_rgba(124,58,237,0.5)] hover:shadow-[0_0_80px_rgba(124,58,237,0.8)] hover:-translate-y-2 group"
                >
                  {t("Get in touch", "Entrer en contact")}
                  <svg className="w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m4-7H3" /></svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
