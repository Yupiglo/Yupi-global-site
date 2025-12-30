import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Lancements - Yupi Global',
    description: 'Découvrez les nouveaux produits et solutions de santé innovantes lancés par Yupi Global.',
};

const LAUNCH_ITEMS = [
    {
        id: 1,
        title: "Nouvelle Gamme Ayurvédique : Yuvi Herbal",
        date: "Février 2025",
        description: "L&apos;aboutissement de 3 ans de recherche biotechnologique pour une purification cellulaire profonde.",
        image: "/media/2025/07/YUVI-HERBAL-CAPSULE.png",
        status: "Nouveau"
    },
    {
        id: 2,
        title: "Alka Plus : L&apos;Eau Sublimée",
        date: "Janvier 2025",
        description: "Un système de filtration révolutionnaire pour une hydratation alcaline optimale au quotidien.",
        image: "/media/2025/01/alka-plus22.jpg",
        status: "Disponible"
    },
    {
        id: 3,
        title: "Plateforme Yupi Connect 2.0",
        date: "Décembre 2024",
        description: "De nouveaux outils digitaux pour piloter votre succès financier et suivre votre santé en temps réel.",
        image: "/media/2025/01/Untitled-design-24.png",
        status: "Mise à jour"
    }
];

export default function LancementsPage() {
    return (
        <main className="bg-dark-bg min-h-screen">
            {/* Hero Section */}
            <section className="relative py-32 lg:py-56 overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                    <div className="absolute top-1/2 right-[-10%] h-[800px] w-[800px] rounded-full bg-brand-cyan/10 blur-[200px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10 lg:px-16">
                    <div className="max-w-4xl">
                        <div className="mb-10 flex items-center gap-4">
                            <span className="h-px w-12 bg-brand-violet" />
                            <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">
                                Exclusivités & Innovations
                            </span>
                        </div>
                        <h1 className="font-sans text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-12">
                            Lancements <br />
                            <span className="text-brand-cyan text-glow-cyan">Produits & Services</span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* launches Grid */}
            <section className="pb-48">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {LAUNCH_ITEMS.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:bg-white/10 transition-all duration-700 h-[700px]"
                            >
                                <div className="h-2/3 overflow-hidden relative">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                    <div className="absolute top-8 left-8">
                                        <span className="px-6 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-12 lg:p-16 flex flex-col flex-1 justify-between">
                                    <div>
                                        <span className="text-brand-cyan text-[10px] font-black uppercase tracking-widest mb-4 inline-block">{item.date}</span>
                                        <h2 className="text-3xl font-black text-white mb-6 leading-tight">
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-400 font-medium leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                    <Link
                                        href={`/news/lancements/${item.id}`}
                                        className="inline-flex items-center justify-center h-14 w-14 rounded-full border border-white/20 hover:bg-brand-cyan hover:border-brand-cyan transition-all text-white"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m4-7H3" /></svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-40 flex justify-center">
                        <Link
                            href="/news"
                            className="px-12 py-5 border border-white/10 rounded-full text-white font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                        >
                            Retour au Hub
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
