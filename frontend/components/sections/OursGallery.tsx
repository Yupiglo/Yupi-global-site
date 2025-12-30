"use client";

import CircularGallery from '../ui/CircularGallery';

export default function OursGallery() {
    const galleryItems = [
        { image: '/media/2025/01/july2024-02-PGOofMud.webp' },
        { image: '/media/2025/01/july2024-03-24okcBCv.webp' },
        { image: '/media/2025/01/july2024-04-775BDaue.webp' },
        { image: '/media/2025/01/image21-9HJ9KFIh.webp' },
        { image: '/media/2025/01/image33-I1V2VqG3.webp' },
        { image: '/media/2025/01/image32-9frtmXDk.webp' },
        { image: '/media/2025/01/image23-sKySXPtg.webp' },
        { image: '/media/2025/01/image13-ANgvyuWu.webp' },
        { image: '/media/2025/01/image14-W3Uq9vkH.webp' },
        { image: '/media/2025/01/image12-YF5QFcgY.webp' },
    ];

    return (
        <section className="relative py-12 lg:py-20 bg-dark-bg overflow-hidden">
            {/* Ambient Background Mesh (Cinematic Wellness Flow) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                <div className="absolute top-[10%] left-[-10%] h-[800px] w-[800px] rounded-full bg-brand-violet/10 blur-[180px]" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[800px] w-[800px] rounded-full bg-brand-cyan/10 blur-[180px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 lg:px-16">
                <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-20">
                    <div className="max-w-4xl">
                        <div className="mb-10 flex items-center gap-4">
                            <span className="h-px w-12 bg-brand-cyan" />
                            <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-cyan">
                                L&apos;Énergie Yupi
                            </span>
                        </div>
                        <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
                            Explorer notre <br />
                            <span className="text-brand-violet">Galerie de Vie</span>
                        </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-xl leading-relaxed text-gray-400 font-medium">
                            Découvrez l&apos;énergie et l&apos;engagement de notre équipe à travers nos moments capturés au service de votre santé.
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-[400px] md:h-[600px] relative overflow-visible">
                <CircularGallery
                    bend={3}
                    borderRadius={0.05}
                    scrollEase={0.02}
                    items={galleryItems}
                />
            </div>
        </section>
    );
}
