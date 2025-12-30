"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface TestimonialCardProps {
    type?: 'text' | 'video';
    quote?: string;
    author: string;
    role: string;
    image?: string; // For video thumbnail or author avatar
    youtubeId?: string; // Real content ID
    videoDuration?: string;
    verified?: boolean;
}

export default function TestimonialCard({
    type = 'text',
    quote,
    author,
    role,
    image,
    youtubeId,
    verified = true
}: TestimonialCardProps) {
    const { t } = useLanguage();

    if (type === 'video') {
        return (
            <div className="group relative w-full h-[280px] lg:h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                {/* Real YouTube Content or Fallback Image */}
                <div className="absolute inset-0 bg-gray-900">
                    {youtubeId ? (
                        <iframe
                            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title={`Testimonial by ${author}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    ) : image ? (
                        <Image
                            src={image}
                            alt={`Testimonial by ${author}`}
                            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 pointer-events-none" />
                </div>

                {/* Author Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-5 text-white z-20 pointer-events-none">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                                <span className="font-bold text-sm lg:text-base text-white shadow-black drop-shadow-md">{author}</span>
                                {verified && (
                                    <svg className="w-4 h-4 text-brand-cyan" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-[10px] lg:text-xs text-brand-cyan uppercase tracking-wider font-bold">{role}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Text Card
    return (
        <div className="flex flex-col p-6 lg:p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full">
            <div className="flex items-center gap-3 mb-4">
                <div className="relative h-10 w-10 lg:h-12 lg:w-12 rounded-full overflow-hidden bg-gray-100 border border-brand-violet/20">
                    {image ? (
                        <Image
                            src={image}
                            alt={author}
                            className="object-cover"
                            fill
                            sizes="48px"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-brand-violet/10 text-brand-violet font-bold text-lg">
                            {author.charAt(0)}
                        </div>
                    )}
                </div>
                <div>
                    <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-gray-900 text-sm lg:text-base">{author}</h4>
                        {verified && (
                            <svg className="w-4 h-4 text-brand-cyan" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10.09 4.01l.95-.46c.55-.27 1.25.04 1.36.68l.18 1.05c.08.48.45.87.93.99l1.04.25c.62.15.82.9.35 1.34l-.79.74c-.38.35-.51.88-.35 1.37l.32 1.02c.19.6-.33 1.22-.95 1.13l-1.04-.15c-.49-.07-1 .18-1.22.62l-.46.95c-.27.55-1.07.55-1.34 0l-.46-.95c-.23-.44-.73-.69-1.22-.62l-1.04.15c-.62.09-1.14-.53-.95-1.13l.32-1.02c.16-.49.03-1.02-.35-1.37l-.79-.74c-.47-.44-.27-1.19.35-1.34l1.04-.25c.48-.12.85-.51.93-.99l.18-1.05c.11-.64.81-.95 1.36-.68l.95.46c.45.21 1 .21 1.45 0z" />
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" className="text-white" fill="white" />
                                {/* Slightly complex material verified icon simplified */}
                                <path d="M23 12c0-6.07-4.93-11-11-11S1 5.93 1 12s4.93 11 11 11 11-4.93 11-11z" fill="none" />
                            </svg>
                        )}
                    </div>
                    <p className="text-[10px] lg:text-xs text-gray-500 font-medium uppercase tracking-wide">{role}</p>
                </div>
            </div>

            <div className="relative">
                <p className="font-sans text-gray-600 text-sm lg:text-base leading-relaxed">
                    {quote}
                </p>
                <button className="mt-4 text-xs font-bold text-brand-violet hover:text-brand-cyan transition-colors uppercase tracking-wider flex items-center gap-1 group">
                    {t("Read more.", "Lire plus.")}
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
            </div>
        </div>
    );
}
