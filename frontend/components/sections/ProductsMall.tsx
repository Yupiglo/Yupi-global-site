"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductsMall() {
    const { t } = useLanguage();

    const FEATURED_PRODUCTS = [
        {
            id: 1,
            name: "Detox Health",
            price: "$49.99",
            image: "/media/2025/01/detox-health30.webp",
            category: "Health"
        },
        {
            id: 2,
            name: "Diabo Care",
            price: "$39.99",
            image: "/media/2025/01/diabo-care.webp",
            category: "Wellness"
        },
        {
            id: 3,
            name: "Immuno Boost",
            price: "$29.99",
            image: "/media/2025/01/immuno-boost30cap.webp",
            category: t("Natural Defenses", "Défenses Naturelles")
        }
    ];

    return (
        <section className="relative py-12 lg:py-20 bg-white overflow-hidden">
            {/* Cinematic Ambient Backgrounds */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-1/2 left-[-10%] h-[1000px] w-[1000px] rounded-full bg-brand-violet/5 blur-[250px]" />
                <div className="absolute bottom-0 right-[-10%] h-[800px] w-[800px] rounded-full bg-brand-cyan/5 blur-[200px]" />
            </div>

            <div className="max-w-[1700px] mx-auto px-6 relative z-10 lg:px-16">
                <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-20">
                    <div className="max-w-4xl">
                        <div className="mb-10 flex items-center gap-4">
                            <span className="h-px w-12 bg-brand-violet" />
                            <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">
                                {t("The elite of health.", "L'élite de la santé.")}
                            </span>
                        </div>
                        <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight">
                            {t("The modern", "L'apothicairerie")} <br />
                            <span className="text-brand-violet">{t("apothecary.", "moderne.")}</span>
                        </h2>
                    </div>
                    <div className="max-w-xl">
                        <p className="text-2xl leading-relaxed text-gray-600 font-medium">
                            {t("An exclusive collection of biological jewels and therapeutic innovations to sublimate your essence.", "Une collection exclusive de joyaux biologiques et d'innovations thérapeutiques pour sublimer votre essence.")}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12">
                    {FEATURED_PRODUCTS.map((product, index) => (
                        <div key={index} className="group relative">
                            {/* Background Decorative Glow (Card Specific) */}
                            <div className="absolute -inset-6 bg-gradient-to-br from-brand-violet/20 to-brand-cyan/20 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-1000 z-0" />

                            <div className="relative z-10 overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 p-5 transition-all duration-700 shadow-2xl shadow-gray-200/40 group-hover:-translate-y-4 group-hover:shadow-brand-violet/25">
                                {/* Immersive Image Container */}
                                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-10">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        className="object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                    />
                                    {/* Glass Badge */}
                                    <div className="absolute top-7 left-7">
                                        <span className="px-6 py-2.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
                                            {product.price}
                                        </span>
                                    </div>
                                </div>

                                {/* Text and interaction */}
                                <div className="px-6 pb-8 space-y-6">
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.4em] text-brand-violet mb-3">{product.category}</p>
                                        <h4 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-brand-violet transition-colors">
                                            {product.title}
                                        </h4>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Discover excellence.</span>
                                        <div className="h-12 w-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-brand-violet group-hover:bg-brand-violet group-hover:text-white transition-all duration-500">
                                            <svg className="w-5 h-5 translate-x-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m4-7H3" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Product Quality Testimonial Video Grid */}
                <div className="mt-32 lg:mt-48">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

                        {/* Left Side: Main Large Video */}
                        <div className="lg:col-span-8">
                            <div className="relative group h-full">
                                <div className="absolute -inset-12 bg-gradient-to-tr from-brand-violet/20 to-brand-cyan/20 blur-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                <div className="relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white/50 backdrop-blur-sm p-5 shadow-2xl shadow-gray-200/50 flex flex-col">
                                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100 mb-10 border border-white/40 shadow-inner">
                                        <iframe
                                            className="absolute inset-0 w-full h-full object-cover"
                                            src="https://www.youtube.com/embed/8EIx5-UKKkc"
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        ></iframe>
                                    </div>

                                    <div className="px-8 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-10 flex-grow">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-3 w-3 rounded-full bg-brand-violet animate-pulse" />
                                                <span className="text-xs font-black uppercase tracking-[0.4em] text-brand-violet">Success Story</span>
                                            </div>
                                            <h3 className="text-4xl font-black text-gray-900 tracking-tight">{t("Transforming lives.", "Transformer des vies.")}</h3>
                                            <p className="text-xl text-gray-500 font-medium max-w-xl leading-relaxed">
                                                {t("Discover the impact of our solutions through the eyes of those who live the change every day.", "Découvrez l'impact de nos solutions à travers le regard de ceux qui vivent le changement au quotidien.")}
                                            </p>
                                        </div>
                                        <div className="flex -space-x-4 self-end md:self-center">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="relative h-14 w-14 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg">
                                                    <Image src={`/media/2022/12/h8-team${i % 3 + 1}.webp`} alt="User" fill className="object-cover" sizes="56px" />
                                                </div>
                                            ))}
                                            <div className="h-14 w-14 rounded-full border-4 border-white bg-brand-violet flex items-center justify-center text-xs font-black text-white shadow-lg">
                                                +5K
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: 2 Small Videos */}
                        <div className="lg:col-span-4 flex flex-col gap-10">
                            {[
                                { id: "FQRP1ONjM4I", title: t("Daily vitality.", "Vitalité quotidienne."), cat: t("Testimonial", "Témoignage") },
                                { id: "bw6UDc_XWqA", title: t("Expertise & care.", "Expertise & soin."), cat: t("Innovation", "Innovation") }
                            ].map((vid, i) => (
                                <div key={i} className="group relative flex-1">
                                    <div className="absolute -inset-6 bg-gradient-to-tr from-brand-violet/10 to-brand-cyan/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white/50 backdrop-blur-sm p-4 flex flex-col shadow-xl hover:shadow-2xl transition-all duration-500">
                                        <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100 mb-6 border border-white/30">
                                            <iframe
                                                className="absolute inset-0 w-full h-full object-cover"
                                                src={`https://www.youtube.com/embed/${vid.id}`}
                                                title={vid.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            ></iframe>
                                        </div>
                                        <div className="px-4 pb-4 space-y-2">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-violet opacity-70">{vid.cat}</span>
                                            <h4 className="text-xl font-black text-gray-900 leading-tight">{vid.title}</h4>
                                            <div className="h-1 w-12 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full w-full bg-brand-violet translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-28 text-center">
                    <Link
                        href="http://yupimall.net/"
                        target="_blank"
                        className="inline-flex items-center justify-center px-12 py-6 bg-brand-violet text-white rounded-full font-black text-lg uppercase tracking-widest hover:bg-brand-violet/90 transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] hover:-translate-y-1"
                    >
                        {t("Visit our mall.", "Aller dans notre mall.")}
                    </Link>
                </div>
            </div>
        </section>
    );
}
