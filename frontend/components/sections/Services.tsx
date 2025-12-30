"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Reveal } from '../ui/Reveal';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Services() {
    const { t } = useLanguage();

    const SERVICES_DATA = [
        {
            id: "health-vip",
            smallTitle: t("Elite Health & VIP Service.", "L'élite santé & service VIP."),
            title: t("Not just health, a total optimization.", "Pas seulement de la santé, une optimisation totale."),
            description: t("We go beyond simple supplements. We create a personalized health ecosystem, combining ancestral Ayurvedic wisdom with cutting-edge technologies for absolute vitality.", "Nous allons au-delà des simples compléments. Nous créons un écosystème de santé personnalisé, alliant la sagesse ayurvédique ancestrale aux technologies de pointe pour une vitalité absolue."),
            stats: [
                { label: t("Tested solutions", "Solutions testées"), value: "100+" },
                { label: t("Health categories", "Catégories de santé"), value: "15+" }
            ],
            services: [
                {
                    title: t("Premium health", "Santé haut de gamme"),
                    image: "/media/services/health_premium.png",
                    linkText: t("Learn more", "En savoir plus")
                },
                {
                    title: t("Business concierge", "Conciergerie business"),
                    image: "/media/services/vip_concierge.png",
                    linkText: t("VIP services", "Services VIP")
                }
            ],
            reverse: false
        },
        {
            id: "leadership",
            smallTitle: t("Leadership & network.", "Leadership & réseau."),
            title: t("Goodbye entrepreneurial loneliness, hello collective strength.", "Au revoir la solitude entrepreneuriale, bonjour la force collective."),
            description: t("Our team of experts and our global network accompany you step by step. By marrying high-level mentorship with collective intelligence, we help you achieve sustainable success.", "Notre équipe d'experts et notre réseau mondial vous accompagnent pas à pas. En mariant le mentorat de haut niveau à l'intelligence collective, nous vous aidons à atteindre une réussite durable."),
            trust: {
                avatars: [
                    "/media/services/avatar1.webp",
                    "/media/services/avatar2.webp"
                ],
                rating: 5,
                label: t("5 STARS • ELITE COMMUNITY", "5 ÉTOILES • COMMUNAUTÉ ÉLITE")
            },
            services: [
                {
                    title: t("Success mentorship", "Mentorat de réussite"),
                    image: "/media/services/leadership_mentorship.webp",
                    linkText: t("Get coached", "Se faire coacher")
                },
                {
                    title: t("Relationship marketing", "Marketing relationnel"),
                    image: "/media/services/marketing_community.webp",
                    linkText: t("Join the network", "Rejoindre le réseau")
                }
            ],
            reverse: true
        },
        {
            id: "digital-freedom",
            smallTitle: t("Freedom & Digital Innovation.", "Liberté & innovation digitale."),
            title: t("Your command center, everywhere with you.", "Votre centre de commandement, partout avec vous."),
            description: t("Take control of your financial future with cutting-edge digital tools. Our integrated platform offers you the stability and growth you need to live without limits.", "Prenez le contrôle de votre futur financier avec des outils digitaux de pointe. Notre plateforme intégrée vous offre la stabilité et la croissance dont vous avez besoin pour vivre sans limites."),
            stats: [
                { label: t("Countries covered", "Pays couverts"), value: "12+" },
                { label: t("Growth", "Croissance"), value: "Alpha" }
            ],
            services: [
                {
                    title: t("Freedom & stability", "Liberté & stabilité"),
                    image: "/media/services/financial_stability.webp",
                    linkText: t("Freedom plan", "Plan de liberté")
                },
                {
                    title: t("Growth tools", "Outils de croissance"),
                    image: "/media/services/digital_innovation.webp",
                    linkText: t("Digital tools", "Outils digitaux")
                }
            ],
            reverse: false
        }
    ];

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const y = useTransform(smoothY, [0, 1], [0, -100]);
    const yReverse = useTransform(smoothY, [0, 1], [0, 100]);

    return (
        <section
            id="services"
            ref={containerRef}
            className="relative py-12 lg:py-20 bg-white overflow-hidden"
        >
            {/* Minimalist Background Accents */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-[10%] left-[-5%] h-[800px] w-[800px] rounded-full bg-brand-violet blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 60, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-[10%] right-[-5%] h-[800px] w-[800px] rounded-full bg-brand-cyan blur-[120px]"
                />
            </div>

            <div className="max-w-[1700px] mx-auto px-6 relative z-10 lg:px-16">

                {/* Standardized Master Header (Mall/Portfolio Style) */}
                <div className="mb-24 lg:mb-32 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-20">
                    <div className="max-w-4xl">
                        <Reveal>
                            <div className="mb-10 flex items-center gap-4">
                                <span className="h-px w-12 bg-brand-violet" />
                                <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">
                                    {t("Our expertise.", "Nos expertises.")}
                                </span>
                            </div>
                            <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight">
                                {t("Three pillars for", "Trois piliers pour")} <br />
                                <span className="text-brand-violet">{t("a life redefined.", "une vie redéfinie.")}</span>
                            </h2>
                        </Reveal>
                    </div>
                    <div className="max-w-xl">
                        <Reveal>
                            <p className="text-2xl leading-relaxed text-gray-600 font-medium lg:text-right">
                                {t("The perfect harmony between elite health, entrepreneurial freedom and digital innovation.", "L'harmonie parfaite entre la santé d'élite, la liberté entrepreneuriale et l'innovation digitale.")}
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* Geviti-style Alternating Sections */}
                <div className="space-y-32 lg:space-y-48">
                    {SERVICES_DATA.map((group) => (
                        <div key={group.id} className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">

                            {/* Images Group */}
                            <div className={`grid grid-cols-2 gap-4 lg:gap-6 ${group.reverse ? 'lg:order-last' : 'lg:order-first'}`}>
                                {group.services.map((service, sIndex) => (
                                    <Reveal key={sIndex} delay={sIndex * 0.2} width="100%">
                                        <div className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-100 shadow-2xl shadow-gray-200/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-brand-violet/20">
                                            <motion.div
                                                style={{ y: sIndex % 2 === 0 ? y : yReverse }}
                                                className="absolute inset-0 w-full h-[120%] -top-[10%]"
                                            >
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                                    fill
                                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                                />
                                            </motion.div>

                                            {/* Interactive Glow / Shine */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-violet/0 via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                            <div className="absolute bottom-6 left-6 right-6 z-10">
                                                <h4 className="text-white text-lg lg:text-xl font-black mb-2 leading-tight">
                                                    {service.title}
                                                </h4>
                                                <Link href="/services" className="text-white/70 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors">
                                                    {service.linkText} →
                                                </Link>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>

                            {/* Narrative Content Group */}
                            <div className={`space-y-10 flex flex-col ${group.reverse ? 'lg:items-end lg:text-right lg:order-first' : 'lg:items-start lg:text-left lg:order-last'}`}>
                                <Reveal delay={0.3} width="100%">
                                    {group.smallTitle && (
                                        <div className={`mb-6 flex items-center gap-3 ${group.reverse ? 'lg:flex-row-reverse' : ''}`}>
                                            <span className="h-[2px] w-8 bg-brand-violet/30" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-violet">
                                                {group.smallTitle}
                                            </span>
                                        </div>
                                    )}
                                    <h3 className="font-sans text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-8">
                                        {group.title.split(',')[0].trim()}, <br />
                                        <span className="text-brand-violet">{group.title.split(',')[1]?.trim()}</span>
                                    </h3>

                                    <div className={`flex flex-col gap-4 ${group.reverse ? 'lg:items-end' : 'lg:items-start'}`}>
                                        <p className="text-xl text-gray-600 leading-relaxed max-w-lg mb-4">
                                            {group.description}
                                        </p>
                                    </div>
                                </Reveal>

                                {/* Stats or Trust Indicators */}
                                <Reveal delay={0.4} width="100%">
                                    {group.stats ? (
                                        <div className={`flex flex-wrap gap-12 pt-8 ${group.reverse ? 'lg:justify-end lg:text-right' : 'lg:justify-start lg:text-left'} justify-center`}>
                                            {group.stats.map((stat, stIndex) => (
                                                <motion.div
                                                    key={stIndex}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.5 + stIndex * 0.1 }}
                                                >
                                                    <motion.p
                                                        whileHover={{ color: "#7c3aed" }}
                                                        transition={{ duration: 0.3 }}
                                                        className="text-4xl lg:text-5xl font-black text-gray-900 mb-1 cursor-default transition-colors duration-300 hover:text-brand-violet"
                                                    >
                                                        {stat.value}
                                                    </motion.p>
                                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : group.trust ? (
                                        <div className={`flex flex-col gap-6 pt-8 ${group.reverse ? 'lg:items-end' : 'lg:items-start'} items-center`}>
                                            <motion.div
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                className={`flex items-center -space-x-4 ${group.reverse ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}
                                            >
                                                {group.trust.avatars.map((avatar, aIndex) => (
                                                    <div key={aIndex} className="relative w-14 h-14">
                                                        <Image
                                                            src={avatar}
                                                            className="rounded-full border-4 border-white object-cover shadow-lg"
                                                            alt="User"
                                                            fill
                                                            sizes="56px"
                                                        />
                                                        <motion.div
                                                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                            className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"
                                                        />
                                                    </div>
                                                ))}
                                                <div className="w-14 h-14 rounded-full border-4 border-white bg-brand-violet flex items-center justify-center text-white text-[10px] font-black shadow-lg">
                                                    +5K
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                                className="flex flex-col gap-2"
                                            >
                                                <div className="flex text-amber-500">
                                                    {[...Array(group.trust.rating)].map((_, i) => (
                                                        <svg key={i} className="w-5 h-5 fill-current drop-shadow-sm" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <p className="text-[11px] font-black text-gray-400 tracking-[0.3em] uppercase">{group.trust.label}</p>
                                            </motion.div>
                                        </div>
                                    ) : null}
                                </Reveal>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final Signature Link */}
                <div className="mt-32 text-center">
                    <Reveal>
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center px-12 py-6 bg-gray-900 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-brand-violet transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-brand-violet/20"
                        >
                            {t("Discover the whole Yupi universe.", "Découvrir tout l'univers Yupi.")}
                        </Link>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
