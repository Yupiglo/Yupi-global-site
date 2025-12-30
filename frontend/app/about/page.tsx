"use client";

import Link from 'next/link';
import Image from 'next/image';
import Partners from '@/components/sections/Partners';
import ProgressBar from '@/components/ui/ProgressBar';
import { Reveal } from '@/components/ui/Reveal';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section (Visionary Entrance) */}
      <section className="relative py-32 lg:py-56 bg-dark-bg overflow-hidden">
        {/* Cinematic Background Atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1200px] rounded-full bg-brand-violet/20 blur-[200px]" />
          <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-brand-cyan/10 blur-[150px]" />
        </div>

        <div className="max-w-[1700px] mx-auto px-6 relative z-10 lg:px-16 text-center">
          <div className="max-w-4xl mx-auto">
            <Reveal width="100%">
              <div className="mb-12 flex items-center justify-center gap-4">
                <span className="h-[1px] w-12 bg-brand-cyan" />
                <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-cyan">
                  {t("The spirit of Yupi Global.", "L'esprit Yupi Global.")}
                </span>
                <span className="h-[1px] w-12 bg-brand-cyan" />
              </div>
            </Reveal>

            <Reveal delay={0.2} width="100%">
              <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-12">
                {t("Building the future of", "Bâtir le futur de la")} <br />
                <span className="text-brand-violet">{t("health in Africa.", "santé en Afrique.")}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.4} width="100%">
              <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                {t("Discover the human and technological adventure of a brand committed to excellence and the well-being of all.", "Découvrez l'aventure humaine et technologique d'une marque engagée pour l'excellence et le bien-être de tous.")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. History Section (The Legacy) */}
      <section className="py-32 lg:py-48 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <div className="mb-10 flex items-center gap-4">
                <span className="h-px w-12 bg-brand-violet" />
                <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">
                  {t("Our history.", "Notre histoire.")}
                </span>
              </div>
              <Reveal delay={0.2} direction="left">
                <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-12">
                  {t("A shared vision", "Une vision partagée")} <br />
                  <span className="text-brand-violet">{t("since the beginning.", "depuis le début.")}</span>
                </h2>
              </Reveal>
              <div className="space-y-8">
                <Reveal delay={0.4}>
                  <p className="text-xl leading-relaxed text-gray-600 font-medium">
                    {t("Yupi Global was founded with a clear vision: to make high-quality healthcare and wellness products accessible across Africa. Our journey began with a simple conviction: every individual deserves excellent health.", "Yupi Global a été fondée avec une vision claire : rendre accessibles des produits de santé et de bien-être de qualité supérieure à travers l'Afrique. Notre aventure a commencé par une conviction simple : chaque individu mérite une santé d'excellence.")}
                  </p>
                </Reveal>
                <Reveal delay={0.5}>
                  <p className="text-xl leading-relaxed text-gray-600 font-medium">
                    {t("Since our beginnings, we have been committed to offering natural and effective solutions to improve the quality of life of our customers, merging traditional know-how and modern innovation.", "Depuis nos débuts, nous nous engageons à offrir des solutions naturelles et efficaces pour améliorer la qualité de vie de nos clients, en fusionnant savoir-faire traditionnel et innovation moderne.")}
                  </p>
                </Reveal>
                <div className="pt-8">
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-4xl font-black text-gray-900 mb-1">10+</p>
                      <p className="text-xs font-black uppercase tracking-widest text-brand-cyan">{t("Years of Expertise", "Ans d'Expertise")}</p>
                    </div>
                    <div className="h-12 w-px bg-gray-200" />
                    <div>
                      <p className="text-4xl font-black text-gray-900 mb-1">50k+</p>
                      <p className="text-xs font-black uppercase tracking-widest text-brand-cyan">{t("Lives Impacted", "Vies Impactées")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Composition */}
            <div className="relative order-1 lg:order-2">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] aspect-video">
                <Image
                  src="/media/2025/01/happy-business-team-greeting-someone-meeting.webp"
                  alt="L&apos;équipe Yupi Global"
                  className="object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Decorative background element */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-violet/5 rounded-full blur-3xl z-0" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl z-0" />

              {/* Floating detail image */}
              <div className="absolute -bottom-16 -right-8 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl z-20 hidden md:block border-4 border-white">
                <Image
                  src="/media/2025/01/serious-coworkers-discussing-reports-outdoor-cafe.webp"
                  alt="Collaboration Yupi"
                  className="object-cover"
                  fill
                  sizes="192px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Section (The Core) */}
      <section className="relative py-32 lg:py-48 bg-dark-bg overflow-hidden">
        {/* Subtle Ambient Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-brand-violet/20 blur-[150px]" />
          <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-brand-cyan/20 blur-[150px]" />
        </div>

        <div className="max-w-[1700px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="text-center mb-24">
            <div className="mb-10 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-brand-cyan" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-cyan">
                {t("Our core purpose.", "Notre raison d'être.")}
              </span>
              <span className="h-px w-12 bg-brand-cyan" />
            </div>
            <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
              {t("Propelling well-being", "Propulser le bien-être")} <br />
              <span className="text-brand-violet">{t("through commitment.", "par l'engagement.")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Mission Card */}
            <Reveal delay={0.2} width="100%">
              <div className="group relative p-12 lg:p-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-700 h-full">
                <div className="mb-10 h-16 w-16 rounded-2xl bg-brand-violet/20 flex items-center justify-center text-brand-violet transition-transform duration-700 group-hover:scale-110">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-3xl font-black text-white mb-6">{t("Our Mission", "Notre Mission")}</h3>
                <p className="text-xl text-gray-400 leading-relaxed font-medium">
                  {t("To provide the highest quality health and wellness products, accessible to all in Africa, while respecting the strictest international standards. We transform every need into a solution of excellence.", "Fournir des produits de santé et bien-être de la plus haute qualité, accessibles à tous en Afrique, tout en respectant les normes internationales les plus strictes. Nous transformons chaque besoin en une solution d'excellence.")}
                </p>
              </div>
            </Reveal>

            {/* Vision Card */}
            <Reveal delay={0.4} width="100%">
              <div className="group relative p-12 lg:p-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-700 h-full">
                <div className="mb-10 h-16 w-16 rounded-2xl bg-brand-cyan/20 flex items-center justify-center text-brand-cyan transition-transform duration-700 group-hover:scale-110">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <h3 className="text-3xl font-black text-white mb-6">{t("Our Vision", "Notre Vision")}</h3>
                <p className="text-xl text-gray-400 leading-relaxed font-medium">
                  {t("To become the undisputed African leader in health and wellness, creating a measurable positive impact on the lives of millions of people across the continent.", "Devenir le leader africain incontesté dans le domaine de la santé et du bien-être, en créant un impact positif mesurable sur la vie de millions de personnes à travers le continent.")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Values Section (The Pillars) */}
      <section className="py-32 lg:py-56 bg-white overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-24">
            <div className="mb-10 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-brand-violet" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">
                {t("Our foundations.", "Nos fondations.")}
              </span>
              <span className="h-px w-12 bg-brand-violet" />
            </div>
            <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight">
              {t("What truly", "Ce qui nous")} <br />
              <span className="text-brand-violet">{t("defines us.", "définit vraiment.")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: t("Quality Excellence", "L'excellence qualité"),
                description: t("We are committed to offering only the highest quality products, rigorously selected and tested.", "Nous nous engageons à offrir uniquement des produits de la plus haute qualité, rigoureusement sélectionnés et testés."),
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              },
              {
                title: t("Absolute Integrity", "L'intégrité absolue"),
                description: t("Transparency and honesty are at the heart of all our relationships, from our partners to our end customers.", "La transparence et l'honnêteté sont au cœur de toutes nos relations, de nos partenaires à nos clients finaux."),
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 003 20c0-2.554 1.442-4.78 3.559-5.9a10.004 10.004 0 0113.882 0C22.558 15.22 24 17.446 24 20c0 1.259-.23 2.463-.645 3.575m-8.355-12.571A9.003 9.003 0 0112 30c-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9z" /></svg>
              },
              {
                title: t("Health Innovation", "L'innovation santé"),
                description: t("We are constantly seeking new solutions and technologies to sustainably improve well-being in Africa.", "Nous recherchons sans cesse de nouvelles solutions et technologies pour améliorer durablement le bien-être en Afrique."),
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 12a3 3 0 100-6 3 3 0 000 6z" /></svg>
              }
            ].map((value, index) => (
              <Reveal key={index} delay={0.2 * index} width="100%">
                <div className="group p-10 lg:p-12 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="mb-8 h-14 w-14 rounded-2xl bg-brand-violet/10 flex items-center justify-center text-brand-violet group-hover:bg-brand-violet group-hover:text-white transition-all duration-500">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-6 leading-tight">{value.title}</h3>
                  <p className="text-lg text-gray-500 leading-relaxed font-medium">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5. Expertise & Performance (New ProgressBar Section) */}
      <section className="py-32 lg:py-56 bg-gray-50/50 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <div>
              <div className="mb-10 flex items-center gap-4">
                <span className="h-px w-12 bg-brand-cyan" />
                <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-cyan">
                  {t("Performance & expertise.", "Performance & expertise.")}
                </span>
              </div>
              <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-12">
                {t("A measurable", "Une excellence")} <br />
                <span className="text-brand-violet">{t("excellence.", "mesurable.")}</span>
              </h2>
              <p className="text-xl leading-relaxed text-gray-600 font-medium mb-12">
                {t("We don't just promise quality, we quantify it. Every aspect of our ecosystem is optimized to achieve the highest standards in the market.", "Nous ne nous contentons pas de promettre la qualité, nous la quantifions. Chaque aspect de notre écosystème est optimisé pour atteindre les standards les plus élevés du marché.")}
              </p>

              <div className="space-y-10">
                <ProgressBar label={t("Ingredient Purity", "Pureté des Ingrédients")} percentage={98} color="violet" delay={100} />
                <ProgressBar label={t("Partner Satisfaction", "Satisfaction Partenaires")} percentage={95} color="cyan" delay={300} />
                <ProgressBar label={t("Technological Innovation", "Innovation Technologique")} percentage={92} color="violet" delay={500} />
                <ProgressBar label={t("Well-being Impact", "Impact Bien-être")} percentage={99} color="cyan" delay={700} />
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-10 bg-brand-violet/5 rounded-full blur-[100px] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <Image
                  src="/media/2021/11/h3-gallery1-600x450.webp"
                  alt="Laboratoire Excellence"
                  className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/40 to-transparent" />
              </div>
              {/* Floating Info */}
              <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 hidden lg:block z-20">
                <p className="text-5xl font-black text-brand-violet mb-2">98%</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{t("Retention rate.", "Taux de rétention.")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. About the Founder (New Detailed Spotlight) */}
      <section className="relative py-32 lg:py-56 bg-white overflow-hidden text-left">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            {/* Content Column */}
            <div className="lg:col-span-7">
              <div className="mb-10 flex items-center gap-4">
                <span className="h-px w-12 bg-brand-violet" />
                <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">
                  {t("President", "Président")}
                </span>
              </div>
              <Reveal delay={0.2} direction="left">
                <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-12">
                  Kelvin <br />
                  <span className="text-brand-violet">Laté Lawson</span>
                </h2>
              </Reveal>

              <div className="space-y-12">
                <div className="prose prose-xl max-w-none text-gray-600 font-medium leading-relaxed">
                  <p className="text-2xl font-black text-gray-900 mb-6 border-l-4 border-brand-cyan pl-6">
                    {t("\"A clear vision to transform health in Africa through excellence and innovation.\"", "\"Une vision claire pour transformer la santé en Afrique par l'excellence et l'innovation.\"")}
                  </p>
                  <p>
                    {t("At the heart of Yupi Global is the visionary leadership of Kelvin Laté Lawson, a pioneer in the wellness industry. His journey is a quest for resilience and innovation to make a real difference.", "Au cœur de Yupi Global se trouve le leadership visionnaire de Kelvin Laté Lawson, a pionnier de l'industrie du bien-être. Son parcours est une quête de résilience et d'innovation pour faire une réelle différence.")}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <Reveal delay={0.4}>
                    <div className="space-y-6">
                      <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{t("His story.", "Son histoire.")}</h3>
                      <p className="text-gray-500 font-medium leading-relaxed">
                        {t("Passionate about the holistic approach, Kelvin understood early on that health is not limited to the absence of disease, but to full fulfillment. His mission is to create products that heal and release everyone's potential.", "Passionné par l'approche holistique, Kelvin a compris tôt que la santé ne se limite pas à l'absence de maladie, mais à un plein épanouissement. Sa mission est de créer des produits qui soignent et libèrent le potentiel de chacun.")}
                      </p>
                    </div>
                  </Reveal>
                  <Reveal delay={0.6}>
                    <div className="space-y-6">
                      <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{t("Leadership philosophy.", "Philosophie de leadership.")}</h3>
                      <ul className="space-y-4">
                        {[
                          { title: t('Empathy', 'Empathie'), desc: t('Understanding the health challenges faced by all.', 'Comprendre les défis de santé rencontrés par tous.') },
                          { title: t('Innovation', 'Innovation'), desc: t('Solutions that bring lasting results.', 'Des solutions qui apportent des résultats durables.') },
                          { title: t('Integrity', 'Intégrité'), desc: t('Building trust through ethical transparency.', 'Bâtir la confiance par la transparence éthique.') }
                        ].map((item, i) => (
                          <li key={i} className="flex gap-4">
                            <span className="h-2 w-2 rounded-full bg-brand-cyan mt-2 shrink-0" />
                            <p className="text-gray-500 font-medium leading-tight">
                              <strong className="text-gray-900">{item.title} :</strong> {item.desc}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>

            {/* Image Column: 3-Image Cinematic Grid Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative grid grid-cols-12 grid-rows-12 gap-4 aspect-[4/5]">
                {/* Main Large Portrait */}
                <Reveal fullHeight width="100%" className="col-start-1 col-end-9 row-start-1 row-end-11 relative group z-20">
                  <div className="absolute -inset-4 bg-brand-violet/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="relative h-full w-full rounded-2xl overflow-hidden border border-gray-100 shadow-2xl">
                    <Image
                      src="/media/2025/01/Untitled-design-20.png"
                      alt="Kelvin Laté Lawson Portrait"
                      className="object-cover transition-all duration-1000 group-hover:scale-105"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </Reveal>

                {/* Secondary Image 1: Official/Action */}
                <Reveal delay={0.6} fullHeight width="100%" className="col-start-8 col-end-13 row-start-3 row-end-8 relative group z-30">
                  <div className="relative h-full w-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                    <Image
                      src="/media/2025/12/WhatsApp-Image-2025-12-02-at-11.15.38-AM.jpeg"
                      alt="Kelvin Laté Lawson"
                      className="object-cover transition-all duration-1000 group-hover:scale-110"
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                    />
                  </div>
                </Reveal>

                {/* Secondary Image 2: Vision Shot (24) */}
                <Reveal fullHeight width="100%" className="col-start-6 col-end-12 row-start-8 row-end-13 relative group z-10 transition-transform duration-700 hover:z-40">
                  <div className="absolute -inset-4 bg-brand-violet/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="relative h-full w-full rounded-2xl overflow-hidden border border-gray-100 shadow-2xl">
                    <Image
                      src="/media/2025/01/Untitled-design-24.png"
                      alt="Kelvin Laté Lawson Vision"
                      className="object-cover transition-all duration-1000 group-hover:scale-110"
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                    />
                  </div>
                </Reveal>

                {/* Decorative Background Elements */}
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full border border-brand-violet/20 animate-pulse" />
                <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full border border-brand-cyan/20 animate-pulse delay-700" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 5. Team Section (The Cinematic Spotlight) */}
      <section className="relative py-32 lg:py-56 bg-dark-bg overflow-hidden text-left">
        {/* Decorative Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none opacity-[0.03]">
          <h2 className="text-[20vw] font-black tracking-tighter text-white whitespace-nowrap leading-none">
            YUPI TEAM
          </h2>
        </div>

        {/* Dynamic Ambient Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-brand-violet/30 blur-[200px]" />
          <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-brand-cyan/20 blur-[150px]" />
        </div>

        <div className="max-w-[1700px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32">
            <div className="max-w-3xl">
              <Reveal width="100%">
                <div className="mb-10 flex items-center gap-4">
                  <span className="h-px w-12 bg-brand-cyan" />
                  <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-cyan">
                    {t("The soul of the vision.", "L'âme de la vision.")}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
                  {t("Talents dedicated to", "Des talents dédiés à")} <br />
                  <span className="text-brand-violet">{t("your fulfillment.", "votre épanouissement.")}</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.4}>
              <p className="text-xl text-gray-400 font-medium max-w-sm mb-4 leading-relaxed order-last lg:order-none">
                Une synergie d&apos;experts passionnés, unis par une mission commune : l&apos;excellence santé pour l&apos;Afrique.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Featured Member (The President) */}
            <div className="lg:col-span-5 group relative">
              {/* Decorative Background Glows for the Portrait */}
              <div className="absolute -top-20 -left-20 w-[120%] h-[120%] bg-brand-violet/15 rounded-full blur-[100px] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute -bottom-20 -right-20 w-[100%] h-[100%] bg-brand-cyan/10 rounded-full blur-[80px] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <div className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/media/2025/12/WhatsApp-Image-2025-12-02-at-11.15.38-AM.jpeg"
                  alt="Lawson Kelvin Late"
                  className="object-cover transition-all duration-1000 group-hover:scale-105"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent opacity-80" />

                {/* Floating Info Overlay */}
                <div className="absolute bottom-16 left-12 right-12 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <span className="inline-block px-4 py-1 rounded-full bg-brand-violet text-[10px] font-black uppercase tracking-widest text-white mb-4">
                    {t("President", "Président")}
                  </span>
                  <h3 className="text-4xl lg:text-5xl font-black text-white mb-4">Lawson Kelvin Late</h3>
                  <p className="text-gray-300 text-lg font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {t("\"A clear ambition to achieve excellence and independence through innovation.\"", "\"Une ambition claire pour atteindre l'excellence et l'indépendance à travers l'innovation.\"")}
                  </p>
                </div>
              </div>
            </div>

            {/* Team Grid (Other Members) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-0 lg:pt-24">
              {[
                {
                  name: "Mr Sanchit Gupta",
                  role: t("Managing Director & CEO", "Directeur Général & CEO"),
                  image: "/media/2025/01/q-a.webp",
                  desc: t("Visionary leader with two decades of experience, propelling Yupi Global towards innovation.", "Leader visionnaire avec deux décennies d'expérience, propulsant Yupi Global vers l'innovation.")
                },
                {
                  name: "Mr Prem Gazra",
                  role: t("Marketing Director", "Directeur Marketing"),
                  image: "/media/2025/01/234.webp",
                  desc: t("Marketing expert, creator of impact strategies to elevate the brand to new heights.", "Expert en marketing, créateur de stratégies d'impact pour élever la marque vers de nouveaux sommets.")
                },
                {
                  name: "Tarun Vashisht",
                  role: t("IT Manager", "Responsable IT"),
                  image: "/media/2025/01/Capture.webp",
                  desc: t("Leads a team of passionate developers and designers for technological excellence.", "Dirige une équipe de développeurs et designers passionnés pour l'excellence technologique.")
                }
              ].map((member, index) => (
                <Reveal fullHeight key={index} delay={0.2 * index} width="100%">
                  <div className="group relative pt-4 first:pt-0 sm:even:mt-12">
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-8 border border-white/5 bg-white/5 backdrop-blur-sm">
                      <Image
                        src={member.image}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                        fill
                        sizes="(max-width: 1024px) 100vw, 25vw"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark-bg/90 to-transparent" />
                    </div>
                    <div className="px-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-cyan mb-2">{member.role} .</p>
                      <h4 className="text-2xl font-black text-white mb-3">{member.name}</h4>
                      <p className="text-gray-500 text-sm font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {member.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Impact Stats (The Numbers) */}
      <section className="py-32 lg:py-48 bg-white overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 text-center md:text-left">
            {[
              { label: t("Happy Clients", "Clients Heureux"), value: "70k", color: "text-brand-violet" },
              { label: t("Team Members", "Membres de l'Équipe"), value: "300+", color: "text-brand-cyan" },
              { label: t("Excellence Awards", "Prix d'Excellence"), value: "1M", color: "text-brand-violet" },
              { label: t("Results Delivered", "Résultats Livrés"), value: "1.5M", color: "text-brand-cyan" }
            ].map((stat, index) => (
              <Reveal key={index} delay={0.2 * index} className="group">
                <div>
                  <p className={`text-6xl lg:text-8xl font-black ${stat.color} mb-4 tracking-tighter transition-transform duration-500 group-hover:scale-110`}>
                    {stat.value}
                  </p>
                  <div className="h-1 w-12 bg-gray-100 mb-6 mx-auto md:mx-0" />
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Partners />

      {/* 7. Final CTA (Join the Journey) */}
      <section className="relative py-32 lg:py-64 bg-dark-bg overflow-hidden text-center">
        {/* Deep Atmospheric Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-brand-violet/20 blur-[180px]" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-brand-cyan/10 blur-[150px]" />
        </div>

        <div className="max-w-[1700px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Reveal width="100%">
              <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-16">
                {t("Let's build the", "Bâtissons")} <br />
                <span className="text-brand-violet">{t("Africa of tomorrow.", "l'Afrique de demain.")}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2} width="100%">
              <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto mb-20 leading-relaxed">
                {t("Join a human adventure in the service of life. Together, let's innovate for accessible and sustainable health.", "Rejoignez une aventure humaine au service de la vie. Ensemble, innovons pour une santé accessible et durable.")}
              </p>
            </Reveal>
            <Reveal delay={0.4} direction="up" width="100%">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-10 py-5 bg-brand-violet text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-brand-violet/90 transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] hover:-translate-y-1"
                >
                  {t("Collaborate with us", "Collaborer avec nous")}
                </Link>
                <Link
                  href="/services"
                  className="text-white font-black uppercase tracking-widest text-sm hover:text-brand-cyan transition-colors duration-300 flex items-center gap-4 group"
                >
                  {t("Consult our services", "Consulter nos services")}
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
