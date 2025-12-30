import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Blog & Savoirs - Yupi Global',
    description: 'Exploration des sagesses ancestrales et des innovations biotechnologiques pour une santé sublimée.',
};

export default function BlogArticlesPage() {
    return (
        <div className="bg-dark-bg min-h-screen pt-32 pb-48 overflow-hidden relative text-left">
            {/* Cinematic Background Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-1/2 right-[-10%] h-[1000px] w-[1000px] rounded-full bg-brand-cyan/10 blur-[250px]" />
                <div className="absolute bottom-0 left-[-10%] h-[800px] w-[800px] rounded-full bg-brand-violet/10 blur-[200px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 lg:px-16">
                {/* Hero Section */}
                <div className="mb-32">
                    <div className="mb-10 flex items-center gap-4">
                        <span className="h-px w-12 bg-brand-violet" />
                        <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-violet">
                            Vibrations & Savoirs
                        </span>
                    </div>
                    <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-12">
                        Articles <br />
                        <span className="text-brand-cyan">& Expertise</span>
                    </h1>
                    <p className="text-2xl text-gray-400 font-medium max-w-2xl leading-relaxed">
                        Plongez dans nos dossiers experts sur la santé cellulaire, la nutrition Ayurvédique et le développement personnel.
                    </p>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[
                        {
                            id: 1,
                            title: "Les Secrets de l'Artemisia : Une Révolution Bio",
                            excerpt: "Comment Yupi Global réinvente l'usage des plantes médicinales africaines grâce à la biotechnologie moléculaire.",
                            category: "Éveil Santé",
                            image: "/media/2025/08/DSC_2323.webp",
                            date: "12 Décembre 2025"
                        },
                        {
                            id: 2,
                            title: "L'Entreprenariat Féminin en Afrique",
                            excerpt: "Portrait de femmes leaders qui transforment l'économie locale grâce au modèle Yupi.",
                            category: "Business",
                            image: "/media/2025/08/DSC_2324.webp",
                            date: "08 Décembre 2025"
                        },
                        {
                            id: 3,
                            title: "Détox Cellulaire : Le Guide Complet",
                            excerpt: "Pourquoi la purification est la première étape vers une santé durable et une énergie retrouvée.",
                            category: "Bien-être",
                            image: "/media/2025/08/DSC_2325.webp",
                            date: "01 Décembre 2025"
                        },
                        {
                            id: 4,
                            title: "Innovation : L'IA au service de la Santé",
                            excerpt: "Découvrez comment nos nouveaux outils digitaux personnalisent votre parcours de bien-être.",
                            category: "Tech",
                            image: "/media/2025/08/DSC_2327.webp",
                            date: "28 Novembre 2025"
                        },
                        {
                            id: 5,
                            title: "Le Pouvoir du Marketing Relationnel",
                            excerpt: "Au-delà de la vente : construire une communauté soudée et bienveillante.",
                            category: "Communauté",
                            image: "/media/2025/08/DSC_2328.webp",
                            date: "20 Novembre 2025"
                        },
                        {
                            id: 6,
                            title: "Nutraceutiques : L'Avenir de la Prévention",
                            excerpt: "Comprendre l'impact des compléments alimentaires de haute qualité sur la longévité.",
                            category: "Science",
                            image: "/media/2025/08/DSC_2329.webp",
                            date: "15 Novembre 2025"
                        }
                    ].map((article) => (
                        <article
                            key={article.id}
                            className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 transition-all duration-700 hover:bg-white/10 hover:-translate-y-4"
                        >
                            <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden mb-10 relative">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-violet/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-brand-violet text-[10px] font-black uppercase tracking-widest text-white">
                                    {article.category}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-cyan opacity-60">
                                    {article.date}
                                </div>
                                <h3 className="text-2xl font-black text-white group-hover:text-brand-violet transition-colors leading-tight">
                                    {article.title}
                                </h3>
                                <p className="text-gray-400 font-medium leading-relaxed line-clamp-3">
                                    {article.excerpt}
                                </p>
                                <div className="pt-6">
                                    <Link
                                        href={`/news/articles/${article.id}`}
                                        className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white group/link hover:text-brand-violet transition-colors"
                                    >
                                        Lire la suite
                                        <span className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover/link:bg-brand-violet group-hover/link:border-brand-violet transition-all text-white">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m4-7H3" /></svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </article>
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
        </div>
    );
}
