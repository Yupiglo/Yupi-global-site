"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from 'next/link';

interface BentoCardProps {
    title: string;
    description: string;
    image: string;
    className?: string;
    href?: string;
    index?: number;
}

export default function BentoCard({ title, description, image, className = "", href = "#", index = 0 }: BentoCardProps) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <Link
            href={href}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-4 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] ${className}`}
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 h-full w-full transition-transform duration-1000 group-hover:scale-105">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-all duration-700"
                />
            </div>

            {/* Permanent Content Gradient/Background */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-white/90 to-transparent opacity-100" />

            {/* Hover Shine (Optional, kept subtle) */}
            <div
                className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.05), transparent 80%)`,
                }}
            />

            <div className="relative z-30 p-8 lg:p-10 flex flex-col justify-end h-full">
                <div className="mt-auto">
                    <div className="mb-4 flex items-center gap-4">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-violet">
                            Rituel {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="h-[1px] w-8 bg-brand-violet/50" />
                    </div>

                    <h3 className="mb-4 font-sans text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
                        {title}
                    </h3>

                    <p className="text-base text-gray-600 leading-relaxed font-medium mb-6">
                        {description}
                    </p>

                    <div className="flex items-center gap-3">
                        <span
                            className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-brand-violet transition-all group-hover:gap-4"
                        >
                            Découvrir
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
