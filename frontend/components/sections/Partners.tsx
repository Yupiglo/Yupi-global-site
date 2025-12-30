"use client";

import React from 'react';
import Image from 'next/image';

const PARTNERS = [
    { name: 'Detox Health', logo: '/media/2025/01/1Y.webp', label: 'DETOX HEALTH' },
    { name: 'Diabo Care', logo: '/media/2025/01/2Y.webp', label: 'DIABO CARE' },
    { name: 'Immuno Boost', logo: '/media/2025/01/3Y.webp', label: 'IMMUNO BOOST' },
    { name: 'Women Care', logo: '/media/2025/01/4Y.webp', label: 'WOMEN CARE' },
    { name: 'Men Power Malt', logo: '/media/2025/01/5Y.webp', label: 'MEN POWER MALT' },
    { name: 'Sea Buckthorn juice', logo: '/media/2025/01/6Y.webp', label: 'SEA BUCKTHORN JUICE' },
];

export default function Partners() {
    return (
        <section className="py-12 lg:py-20 bg-white overflow-hidden">
            <div className="max-w-[1700px] mx-auto px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">

                    {/* Left Side: Exact Grid Layout (3x2) */}
                    <div className="w-full lg:w-1/2 relative">
                        {/* Decorative Dot from image */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 h-4 w-4 rounded-full bg-brand-violet opacity-30 blur-[2px]" />

                        <div className="grid grid-cols-2 md:grid-cols-3 border-t border-l border-gray-100">
                            {PARTNERS.map((partner, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center p-8 border-r border-b border-gray-100 aspect-square group transition-all duration-500 hover:bg-gray-50/50"
                                >
                                    <div className="relative h-full w-full flex items-center justify-center">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 p-4"
                                            fill
                                            sizes="(max-width: 768px) 50vw, 33vw"
                                            quality={100}
                                            priority
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Narrative Content */}
                    <div className="w-full lg:w-1/2 space-y-10">
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">
                                Nos Partenaires
                            </span>
                            <span className="h-[1px] w-12 bg-brand-violet" />
                        </div>

                        <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]">
                            Entrez dans le <br />
                            <span className="text-brand-violet">Futur</span> de la Santé
                        </h2>

                        <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-xl">
                            Chez Yupi Global, nous combinons la sagesse de l&apos;Ayurveda avec la science moderne pour créer des produits de santé adaptés au monde d&apos;aujourd&apos;hui. Notre mission est simple : transformer des vies avec des solutions conçues pour un bien-être durable.
                        </p>

                        <div className="pt-4">
                            <div className="h-1 w-20 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full w-1/3 bg-brand-violet animate-[shimmer_2s_infinite]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
