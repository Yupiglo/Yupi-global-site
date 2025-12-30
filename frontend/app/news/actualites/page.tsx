import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Actualités - Yupi Global',
    description: 'Suivez les dernières actualités et évènements de Yupi Global en temps réel.',
};

const NEWS_ITEMS = [
    {
        id: 1,
        title: "Succès éclatant de la Convention de Cotonou",
        date: "25 Janvier 2025",
        excerpt: "Plus de 1000 partenaires se sont réunis pour découvrir la vision 2025 de Yupi Global.",
        image: "/media/2025/08/20250125_190336.webp",
        category: "Évènement"
    },
    {
        id: 2,
        title: "Inauguration du nouveau siège au Bénin",
        date: "15 Janvier 2025",
        excerpt: "Un espace moderne dédié à l&apos;accompagnement de nos leaders et au développement de l&apos;excellence.",
        image: "/media/2025/08/DSC_2321.webp",
        category: "Corporate"
    },
    {
        id: 3,
        title: "Impact Tour : Lomé accueille Yupi Global",
        date: "10 Janvier 2025",
        excerpt: "Retour sur la tournée de formation intensive qui a transformé la vie de centaines d&apos;entrepreneurs.",
        image: "/media/2025/08/DSC_2290.webp",
        category: "Formation"
    },
    {
        id: 4,
        title: "Partenariat stratégique pour l&apos;Innovation",
        date: "05 Janvier 2025",
        excerpt: "Signature d&apos;un accord majeur pour le déploiement de nouvelles technologies de santé.",
        image: "/media/2025/08/DSC_2310.webp",
        category: "Business"
    }
];

export default function ActualitesPage() {
    return (
        <main className="bg-dark-bg min-h-screen">
            {/* Hero Section */}
            <section className="relative py-32 lg:py-56 overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                    <div className="absolute top-1/2 left-[-10%] h-[800px] w-[800px] rounded-full bg-brand-violet/10 blur-[200px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10 lg:px-16">
                    <div className="max-w-4xl">
                        <div className="mb-10 flex items-center gap-4">
                            <span className="h-px w-12 bg-brand-cyan" />
                            <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-cyan">
                                Fil d&apos;Actualités
                            </span>
                        </div>
                        <h1 className="font-sans text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-12">
                            Le Pouls de <br />
                            <span className="text-brand-violet text-glow-violet">Yupi Global</span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* news List */}
            <section className="pb-48">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-1 gap-12">
                        {NEWS_ITEMS.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row gap-8 lg:gap-16 hover:bg-white/10 transition-all duration-700"
                            >
                                <div className="md:w-1/2 h-[400px] overflow-hidden relative">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        className="object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="md:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="px-4 py-1.5 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-brand-violet text-[10px] font-black uppercase tracking-widest">
                                            {item.category}
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                                            {item.date}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-black text-white mb-6 group-hover:text-brand-cyan transition-colors">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-400 font-medium leading-relaxed mb-10 text-lg">
                                        {item.excerpt}
                                    </p>
                                    <Link
                                        href={`/news/actualites/${item.id}`}
                                        className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white group/link hover:text-brand-violet transition-colors"
                                    >
                                        Lire l&apos;article
                                        <span className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover/link:bg-brand-violet group-hover/link:border-brand-violet transition-all text-white">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m4-7H3" /></svg>
                                        </span>
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
