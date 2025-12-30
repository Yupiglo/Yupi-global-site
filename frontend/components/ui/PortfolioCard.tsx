"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface PortfolioCardProps {
    title: string;
    category: string;
    description: string;
    image: string;
    className?: string;
    href?: string;
    index?: number;
}

export default function PortfolioCard({ title, category, description, image, className = "", href = "#" }: PortfolioCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { t } = useLanguage();

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-100 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-4 hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.25)] ${className}`}
        >
            {/* Background Image with Cinematic Blur-to-Focus Effect */}
            <div className="absolute inset-0 z-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover blur-[2px] grayscale-[0.2] transition-all duration-1000 group-hover:blur-0 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-40" />
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            </div>

            {/* Interaction Glow */}
            <div
                className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.15), transparent 80%)`,
                }}
            />

            {/* Content Layer */}
            <div className="relative z-20 p-10 lg:p-12">
                <div className="mb-4 overflow-hidden">
                    <span className="inline-block text-xs font-black uppercase tracking-[0.4em] text-brand-cyan transition-transform duration-700 translate-y-full group-hover:translate-y-0">
                        {category}
                    </span>
                </div>

                <h3 className="mb-3 font-sans text-2xl font-black text-white transition-all duration-700 group-hover:text-brand-violet lg:text-4xl lg:leading-[1.1]">
                    {title}
                </h3>

                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:max-h-32 group-hover:opacity-100 group-hover:mt-4">
                    <p className="max-w-md text-base text-gray-200 leading-relaxed font-medium">
                        {description}
                    </p>
                </div>

                <div className="mt-10 flex items-center gap-6 opacity-0 transition-all duration-700 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 delay-200">
                    <a
                        href={href}
                        className="group/btn relative flex h-14 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 px-10 transition-all duration-500 hover:bg-white hover:border-white"
                    >
                        <span className="relative z-10 text-sm font-black uppercase tracking-widest text-white transition-colors duration-500 group-hover/btn:text-gray-900">
                            {t("View project.", "Voir le projet.")}
                        </span>
                        <div className="absolute inset-0 z-0 translate-y-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/btn:translate-y-0" />
                    </a>
                </div>
            </div>
        </div>
    );
}
